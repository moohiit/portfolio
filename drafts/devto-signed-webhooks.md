---
title: "Signed requests, idempotent imports and webhooks that never lose an update"
published: false
description: "What I learned opening a field-collections platform to external lenders through one public API: HMAC signing, idempotency keys, and an outbox for webhook delivery."
tags: node, api, security, backend
---

<!--
DRAFT for dev.to. Everything below is taken from the Quikkred Collect build
story on mohitpatel.org. The code is illustrative, not copied from the
production codebase. Before publishing, check the TODO notes and adjust any
detail you'd rather not make public.
-->

Quikkred Collect sends vetted field partners to borrowers with overdue loans. It started as one lender's tool. Then other lenders wanted to hand their cases to the same partner network, each with its own data formats, payment flows and status updates.

Writing custom integration code for every lender doesn't scale, so the platform became multi-tenant behind one public API. Three problems decided whether that API could be trusted with money:

1. **Is this request really from that lender, and unchanged?** (signing)
2. **What happens when a lender sends the same thing twice?** (idempotency)
3. **What happens when the lender's server is down?** (webhook delivery)

## 1. Signing every request with HMAC

Each lender gets a shared secret. Every request carries a timestamp and an HMAC-SHA256 signature of `timestamp.body`:

```http
POST /v1/cases
X-Timestamp: 1764051234
X-Signature: sha256=9f2c…
Idempotency-Key: import_2026_11_25_001
Content-Type: application/json
```

Verifying it on the server takes three checks, and the order matters:

```js
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(req, secret) {
  // 1. Reject old requests, so a captured request can't be replayed later.
  const ts = Number(req.headers["x-timestamp"]);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) {
    throw httpError(401, "stale_timestamp");
  }

  // 2. Sign the *raw* body. Re-serialising parsed JSON changes whitespace
  //    and key order, and the signatures stop matching.
  const expected = createHmac("sha256", secret)
    .update(`${ts}.${req.rawBody}`)
    .digest("hex");

  // 3. Compare in constant time, so response timing doesn't reveal how many
  //    characters of a forged signature were right.
  const given = String(req.headers["x-signature"]).replace(/^sha256=/, "");
  if (given.length !== expected.length ||
      !timingSafeEqual(Buffer.from(given), Buffer.from(expected))) {
    throw httpError(401, "invalid_signature");
  }
}
```

The raw-body point is the one that costs a day if you miss it. In Fastify, keep the raw buffer in a custom content-type parser (or use a raw-body plugin) before JSON parsing, and sign exactly those bytes.

The timestamp is part of the signed string on purpose. If it weren't, an attacker could attach a fresh timestamp to an old body and signature.

## 2. Idempotency: same key, same answer

Networks retry. Lenders' cron jobs retry. A lender re-sending a CSV of 2,000 cases must not create 4,000 cases, and re-sending a remittance batch must not pay anyone twice.

Every write takes an `Idempotency-Key`. The server stores the key together with a hash of the body and the response it sent:

```js
const key = req.headers["idempotency-key"];
const bodyHash = sha256(req.rawBody);
const hit = await idempotency.find({ orgId, key });

if (hit) {
  // Same key with a different body is a client bug: refuse it loudly.
  if (hit.bodyHash !== bodyHash) throw httpError(422, "idempotency_key_reused");
  // Same key, same body: return the original answer and do nothing else.
  return reply.header("Idempotent-Replayed", "true").code(hit.status).send(hit.body);
}

const result = await importCases(orgId, req.body);
await idempotency.save({ orgId, key, bodyHash, status: 201, body: result });
return reply.code(201).send(result);
```

Two details matter:

- **Scope keys to the organisation.** Two lenders can pick the same key without colliding.
- **Make the check and the write atomic.** Otherwise two copies of the same request arriving together can both pass the "not seen yet" check. A unique index on `(orgId, key)` is the simplest guard.

Imports and remittances run as idempotent *batches*, so the same guarantee covers a whole file, not just a single case.

## 3. Webhooks through an outbox

Lenders want to know when a case is visited, collected or closed. Calling their webhook directly from the request that changed the case is tempting, and fragile. If their server is down or slow, the update is lost, or your request hangs.

So the update is written to a durable event store first (the outbox pattern), and a separate worker delivers events:

- every attempt goes into a **delivery log** (status code, latency, response body)
- failed deliveries are **retried**
- events that keep failing land in a **dead-letter queue** instead of vanishing
- lenders can **replay** any delivery, or read a **poll feed** if they'd rather not run a webhook endpoint at all

<!-- TODO: confirm this matches the production API before publishing. -->
Sign outgoing webhooks the same way as incoming requests, so lenders can verify you with the same code they use to sign their own calls.

<!-- TODO: if you're happy to share them, add numbers here: retry schedule,
     typical delivery latency, how many lenders or events. -->

## 4. Documentation is part of the API

Signing is the easiest part of an integration to get subtly wrong: the wrong bytes signed, the timestamp left out, hex mixed up with base64. So the developer portal (Docusaurus) has HMAC signing samples in **Node, Python, PHP and cURL**, plus sandbox and go-live guides, so lender teams can integrate without hand-holding.

## Try it

I put a small in-browser version of this flow on my portfolio: sign a request, replay it, tamper with it, or send a stale one, and watch what a server should do with each. It uses the real Web Crypto HMAC, and nothing leaves your browser: [mohitpatel.org → Lab → Signed API](https://mohitpatel.org/#lab).

If you're building something similar, I'm happy to compare notes.
