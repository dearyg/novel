# Launch Playbook — Life of an SDE

Cold-start strategy. Three deliverables, three audiences, in priority order.

## What's in this folder

| File | Audience | Effort | When |
|---|---|---|---|
| [`show-hn.md`](./show-hn.md) | Hacker News | 30 min copy + ~6 hr engagement window | One shot, Tue/Wed 8–10 AM PT |
| [`tech-twitter.md`](./tech-twitter.md) | AI Twitter / X | 30 min/tweet × 4 days | Drip across launch week |
| [`release-cadence.md`](./release-cadence.md) | Email subscribers | Ongoing | 5-week compile-pass schedule (optional) |

## Order of operations

1. **Pre-launch (1 day before):** Pre-warm prod cache. Smoke-test `/`, `/1`, `/20`, `/receipt`, `/api/og/receipt?c=AABABA`. Verify share-to-X opens an intent URL with the OG image attached.
2. **Day 0:** Submit Show HN at 8:30 AM PT. Paste the first author comment within 30 seconds. Stay near the keyboard for 6 hours.
3. **Day 1–4:** Run the Tech Twitter pack — one tweet per day, in the order in `tech-twitter.md`.
4. **Day 7+:** If response is strong, start the [release cadence](./release-cadence.md). If it's quiet, archive that doc and move on.

## What you control vs. what you don't

You control:
- The artifact quality (already done — keep iterating on prose, comments → revisions)
- The launch timing (Tuesday or Wednesday morning Pacific is empirically best)
- The first 30 seconds of HN engagement (the post body and first author comment)

You don't control:
- Whether HN ranks you
- Whether a researcher retweets you
- The discourse the receipt will generate (this is a feature, not a bug)

If the launch doesn't go viral, **the work is still finished and the URL is permanent.** That matters more than the launch numbers.

## Specific things to *not* do

- ❌ Don't post on Friday afternoon, weekends, or US holidays.
- ❌ Don't ask anyone for upvotes. HN penalizes vote manipulation.
- ❌ Don't tweet "if you liked this, please RT." Tech Twitter punishes that.
- ❌ Don't pivot to Twitter Spaces or an interview with someone before the work has been read by ~1,000 people. Talking-about-it before it's been-read is a known trap.
- ❌ Don't add features during the launch window. Bugs are fine to fix; new features dilute focus.

## Specific things you should do

- ✅ Reply to every comment in the first 6 hours of any post.
- ✅ Fix any bug a reader finds and reply with a deploy URL within 30 minutes.
- ✅ Save every screenshot anyone shares of the receipt; you'll want them for the post-launch retrospective.
- ✅ When the launch is over, write a post-mortem (in `context/launch/post-mortem.md`) — what worked, what didn't, what you'd repeat.
