---
title: "Tenant isolation by construction, not by convention"
published: false
description: "How we keep one lender's data, branding and config from leaking into another's in a multi-tenant, white-label lending platform built as a TypeScript monorepo."
tags: typescript, architecture, saas, node
---

<!--
DRAFT for dev.to. The facts come from the Fluxus Forge build story on
mohitpatel.org. Code samples are illustrative, not production code. Check
the TODO notes, and make sure your team is happy with what's shared
before publishing.
-->

Every new lender (an NBFC or a fintech) needs the same stack: a branded website and borrower app, loan origination and management, collections, a CRM for staff, and a field app. Building that once per lender doesn't scale. Sharing one deployment across lenders does, but then a single bug can show one lender's borrowers another lender's data, logo or interest rates.

On Fluxus Forge Lending Cloud, a multi-tenant, white-label lending platform I'm the lead engineer on, we decided early that isolation couldn't depend on everyone remembering a rule. It had to be **impossible to get wrong by accident**. Here's how that works, layer by layer.

## Layer 1: the edge decides who the tenant is

Each lender gets its own domain. A Cloudflare Worker sits in front of everything and maps the incoming host to a tenant before any application code runs:

```js
// Illustrative Worker: host -> tenant, then forward with the tenant attached.
export default {
  async fetch(req, env) {
    const host = new URL(req.url).hostname;
    const tenant = await env.TENANTS.get(host); // written by the control plane
    if (!tenant) return new Response("Unknown host", { status: 404 });

    const headers = new Headers(req.headers);
    headers.set("x-tenant-id", tenant);
    return fetch(new Request(req, { headers }));
  },
};
```

The mapping is written by a **control plane** that handles self-serve signup and provisioning: when a lender signs up, it creates the lender's databases and registers its domain. The application never guesses the tenant from a query parameter or a form field.

<!-- TODO: if the production Worker signs or otherwise protects this header so
     it can't be spoofed by calling the origin directly, say so here. It's the
     first question readers will ask. -->

## Layer 2: tenant context travels with every request

Inside the Fastify services, a shared kernel builds the request context: Zod-validated routes, sessions, idempotency keys, rate limits, OpenAPI generation and tenant-tagged logs. The tenant is part of that context and is never passed around by hand.

In Node, one common way to do this is `AsyncLocalStorage`:

```ts
import { AsyncLocalStorage } from "node:async_hooks";

const tenantStore = new AsyncLocalStorage<{ tenantId: string }>();

app.addHook("onRequest", (req, _reply, done) => {
  tenantStore.run({ tenantId: req.headers["x-tenant-id"] as string }, done);
});

export function currentTenant() {
  const ctx = tenantStore.getStore();
  if (!ctx) throw new Error("No tenant in context"); // fail closed
  return ctx.tenantId;
}
```

The important part is the last line. Code that runs without a tenant **throws**. It never falls back to a default.

## Layer 3: only one package may open a database

Each tenant has its own databases (PostgreSQL via Kysely, plus MongoDB and Redis). The rule that does the most work is also the simplest: **exactly one package in the monorepo is allowed to open a database connection**. It reads the tenant from the context and hands back a connection for that tenant only.

Every other package asks that package for a connection. A lint rule makes the alternative a CI failure:

```js
// eslint config (illustrative)
"no-restricted-imports": ["error", {
  paths: [
    { name: "pg", message: "Use @platform/tenant-db; it scopes connections to the current tenant." },
    { name: "mongodb", message: "Use @platform/tenant-db." },
  ],
}],
```

With this rule, a mistake is a failed build, not something that slips through code review.

## Layer 4: scan for the things that leak

White-label products leak in quieter ways too: a hard-coded brand name in a template, a sample secret in a test fixture, real personal data in a seed file. Custom lint rules and a scanner in CI block **hard-coded brands, secrets and personal data** before they merge.

## Layer 5: permissions come from the code

Every route declares the capability it needs. The entitlement catalog (24 capabilities across 29 roles so far) is **generated from the code**, so the documentation and the code can't drift apart:

```ts
app.post("/loans/:id/disburse", {
  config: { capability: "loan.disburse" },
  schema: { params: LoanParams, body: DisburseBody },
}, handler);
```

## Layer 6: an audit trail you can trust

Writes go through an outbox that turns them into events. The audit log is hash-chained, so you can't quietly edit or remove a past entry. And money is always `Decimal`, never a float.

## What it costs

Isolation by construction isn't free:

- **More upfront work.** The kernel, the tenant-db package and the lint rules came before the first lending feature.
- **Friction for quick hacks.** You can't "just query the other tenant's table for a report". That's the point, but it needs a proper cross-tenant path for platform admins.
- **CI has to stay fast.** We use self-hosted runners with affected-only test selection and a merge gate, so the extra checks don't slow the team down.

The payoff: the rest of the team builds the lending engine, CRM and lender sites on these foundations without having to think about isolation on every line.

<!-- TODO: add a sentence on team size or the monorepo's shape (6 apps,
     15 packages) if you want the scale on record. -->

If you're working through the same problem, I'd love to hear how you approached it.
