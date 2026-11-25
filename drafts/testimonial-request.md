# Asking for testimonials

The Testimonials section stays hidden until `testimonials` in `src/data.js` has
real entries. Two or three short quotes are enough.

## Who to ask

- Your lead or manager at Life Layer Health Solutions (1 yr 8 mos together).
- A senior engineer or product owner at Quikkred / Fluxus Forge who has seen the
  lender API, Quikkred Collect or the lending cloud up close.
- Optionally, someone who integrated against the lender API or reviewed your PRs.

## Message (LinkedIn or WhatsApp)

> Hi <name>, hope you're doing well! I'm refreshing my portfolio
> (mohitpatel.org) and would really value a short recommendation from you,
> just 2–3 sentences. If it helps, you could mention <one specific thing:
> e.g. "the Redis caching work that made our APIs 10x faster" / "the lender
> API and its developer docs" / "how I handled production issues">.
> If you post it as a LinkedIn recommendation, I'll quote it on the site with
> your name and title. Thanks a lot!

Asking about **one specific piece of work** gets you a concrete quote instead
of "great team player".

## Adding a quote

In `src/data.js`:

```js
export const testimonials = [
  {
    quote: "…exactly as they wrote it…",
    name: "Full Name",
    role: "Title, Company",
  },
];
```

Use the quote word for word, and only with the person's OK.

## Blog posts

`drafts/devto-signed-webhooks.md` and `drafts/devto-tenant-isolation.md` are
ready to paste into dev.to (they start as `published: false`). Once one is
published under the `moohiit` account, the Writing section appears on its own:
the site fetches `dev.to/api/articles?username=moohiit`.
