---
title: "My Site Sent 2.3 MB of JavaScript to Show Fourteen Logos"
date: 2026-11-21
excerpt: "A performance audit on my own portfolio turned up a forced-reflow warning, a meta description four pixels over budget, and one icon package shipping 690 logos for the sixteen I use. Here is what I changed, what it measured, and the two optimizations that did not work."
tags: [Performance, Next.js, Frontend, Web]
---

I ran a performance and SEO audit on this site and got a list of findings that looked unrelated. Total Blocking Time of 1.69 s with four forced reflows. Six images that could be served smaller. A meta description 1004 pixels against a 1000 pixel budget. Two duplicated blocks of text. Anchor text a few hundred characters long.

Three of those were real and cheap to fix. The blocking time sent me looking for the actual bottleneck, and the answer was not in the audit. It was in the bundle. And after the bundle was fixed, I went after the last 80 ms and made the number worse, which is the more useful half of the story.

## The findings, and which ones held up

**The description was genuinely over budget.** 158 characters rendered at 1004 pixels, four over. It was also repeated verbatim in the JSON-LD `Person` record, which is what the duplicate-text warning was partly about. The description is now 138 characters, and the structured data carries its own shorter line.

**The duplicated text was real, and it was mine.** The Stage 1 objective appeared twice on the page: once in the stage block, and once in the reading rail's note panel, which also restated the page count, the hour cost and the reading note. The rail is navigation, so it now carries only the position, the block in view and that block's book count. Measured: two occurrences before, one now.

**The anchor text was real.** The blog rows and the hero focus card linked entire blocks, so their accessible names ran to a few hundred characters. Both now carry a short `aria-label` with the visible text untouched. The count of anchor names over 60 characters went from five to one, and the survivor is a post's actual title, which I am not truncating.

**The reflows were real.** The scroll-spy read `getBoundingClientRect()` for all eight reading stages on every scroll event, and a read like that can flush pending layout work before it returns:

```ts
// before: eight layout reads per scroll event
for (const entry of readingStages) {
  const el = document.getElementById(entry.id);
  if (el && el.getBoundingClientRect().top <= probe) current = entry.id;
}

// after: measure once, then compare scrollY against cached offsets
const tops = readingStages.map((entry) => {
  const el = document.getElementById(entry.id);
  return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
});
```

The offsets are measured once, and again on window resize and through a `ResizeObserver` on the sections, because the covers shift the section heights as they load. The scroll handler now reads only `scrollY`.

**The images were a configuration nit, not a weight problem.** `next/image` was already serving WebP. It now prefers AVIF where the browser accepts it, and the badge artwork that was a 400 KB PNG serves as 26.5 KB.

## The LCP element was a red herring

The audit also reported the Largest Contentful Paint element: the hero `<h1>`, "Frank Angelo Malubag". That is not a finding. On a text-first page the headline is the largest thing painted, so it is the LCP element by construction. What matters is *when* it paints, and at every measurement LCP and first-contentful-paint were the same instant. The headline was never late relative to the page. The whole first paint was taking the time.

I measured it properly rather than trusting the summary. On the live origin, under a 4x CPU throttle and a Slow 4G profile, the home page's LCP was 2084 ms with a TTFB of 207 ms. The web fonts finished at 250 ms, so the font was not the gate. The gap between the HTML arriving and the first paint was about 1.9 seconds, and that gap is the render-blocking path.

## The icon barrel

I looked at what the browser actually downloaded. One JavaScript chunk was 8.9 MB decoded, and it was full of inline image data: 5,993 long data-URI literals. The package responsible was `tech-stack-icons`, and the numbers are almost absurd:

| | |
| --- | --- |
| Package in `node_modules` | 8.3 MB |
| Its single `dist/index.js` | 8,728,130 bytes |
| Icons it ships | 690, in three colour variants |
| Icons this site uses | 16 |

Tree-shaking cannot save you from a package like this. The artwork lives behind a runtime lookup by name, so the bundler sees one object literal and keeps the whole thing. Sixteen icons were used across the hero stack row and the skills sheet, and every page sent roughly 2.3 MB of JavaScript to draw them. On a slow mobile connection that saturates the pipe and the render-blocking stylesheet waits behind it.

The fix was to stop shipping the catalogue. I rendered the sixteen icons the site actually uses, vendored the SVG markup into one component, pointed the two consumers and the data module at it, and removed the dependency. Same artwork, 37 KB, no package.

## Before and after

Both runs are DebugBear, same origin and same profile: US East, 12 Mbps, 70 ms RTT, medium device, Lighthouse 13.5. The [before run](https://www.debugbear.com/test/website-speed/8ZQ9WGxG/overview) is 20 Nov 09:20, the [after run](https://www.debugbear.com/test/website-speed/snw5XEoT/overview) is 20 Nov 12:44, once the icons were vendored and deployed. Every percentage below is computed from those two runs.

| Signal | Before | After | Change |
| --- | --- | --- | --- |
| Lighthouse performance | 73 | 93 | +27% |
| Total Blocking Time | 1690 ms | 280 ms | -83% |
| Time to Interactive | 5000 ms | 2926 ms | -42% |
| Page weight | 3.37 MB | 1.48 MB | -56% |
| JavaScript | 2.39 MB | 531 KB | -78% |
| Images | 819 KB | 802 KB | -2% |
| Largest Contentful Paint | 1.13 s | 1.58 s | +40% |
| Time to First Byte | 421 ms | 572 ms | +36% |
| Cumulative Layout Shift | 0 | 0 | unchanged |

The LCP row is the one to read twice, and it is not a regression from the work. TTFB moved with it, 421 to 572 ms, the render-blocking stylesheet from 131 to 455 ms, and the maximum critical path latency from 620 to 1193 ms. All three are server response, not payload. Five sequential requests from my own machine gave 433, 176, 168, 407 and 193 ms, so the response is bimodal and warm is about 170 ms. The route is still prerendered, one of 37 static routes, so nothing in the change made it dynamic. The bundle improved and the LCP stayed wherever the server put it.

The forced-reflow insight is gone from the after run. The before run reported 304 ms of unattributed reflow time, and the cause was the scroll-spy reading layout on every scroll event. That reading is now cached, and the insight no longer fires.

At 280 ms the site was still above the 200 ms that counts as good, because TBT is the lab stand-in for Interaction to Next Paint. The remaining gap did not look like the bundle. The after run's JavaScript execution time was 1.0 s, of which 747 ms was unattributed and 531 ms sat in a single chunk, while Google Tag Manager was 235 ms of main-thread CPU. So I went after the unattributed part.

The exact byte counts, measured the same way on both builds, are 2,321,379 to 341,364 bytes of initial JavaScript and 9.85 MB to 1.27 MB across the whole build. The badge artwork went from a 400 KB PNG to a 26.5 KB AVIF, the meta description from 158 characters to 138, the Stage 1 objective from two occurrences to one, and the anchor names over 60 characters from five to one.

## Then I tried to close the last 80 ms, and it got worse

The four ledger sections were client components, so their markup, their data and their handlers all hydrated on every visit to the home page, including the sections far below the fold. That is the unattributed work, and the theory was that hydration was the cost.

I rewrote Skills, Projects, Certificates and Contact as server components and left six small client islands for the interactions: two filters, a document switcher, an expand-all control, a certificate viewer, and the copy-email button. The islands act on markup already in the document, toggling `hidden` and `open` rather than re-rendering it, and the rows became native `<details>` disclosures so expanding them needs no JavaScript at all. The section data left the initial client bundle, and initial JavaScript fell from 341,841 to 319,070 bytes.

It measured worse. The [second run](https://www.debugbear.com/test/website-speed/WU80mudt/overview) gave a TBT of 459 ms and a Lighthouse score of 88, against 280 ms and 93.

| Signal | Before | After | Change |
| --- | --- | --- | --- |
| Total Blocking Time | 280 ms | 459 ms | +64% |
| Lighthouse performance | 93 | 88 | -5 |
| Main-thread work | 2.8 s | 3.2 s | +14% |
| Script evaluation | 942 ms | 1049 ms | +11% |
| Style and layout | 406 ms | 520 ms | +28% |
| Long tasks in the FCP to TTI window | 2 | 6 | +4 |

The reason is that TBT counts tasks, not bytes. Splitting the code into more and smaller chunks means more separate script evaluations, and every script evaluation is its own task. Two long tasks inside the window became six, and they sum exactly: 85 + 179 + 1 + 109 + 75 + 10 = 459. The server-rendered rows also put a larger DOM on the page, which is where the extra style and layout time went.

So the premise was half right. Hydration was a cost, and removing it did remove work. But the remainder came back as tasks, and the net on the metric I was chasing was negative. I reverted the rewrite.

Two honest caveats. This is one run against one run, and TBT moves between runs, so the size of the delta is not certain even though the direction matches the mechanism. The same build later measured 399 ms, which means the 280 ms baseline above was a favourable run and the delta is inside the noise. And the deployed bundle is not byte-identical to my local build: Vercel's build split the chunks differently, which is a reminder that what gets measured is a build, not a commit.

## The last 130 ms

The obvious suspect was Google Tag Manager, and I tried it twice.

First I moved it out of the window by loading it after `load` instead of during hydration. It did not help: TBT went from 399 to [419 ms](https://www.debugbear.com/test/website-speed/wfFDyZXC/overview), and Time to Interactive went from 3.2 s to 4.5 s. The reason generalises. `load` on this page waits for 297 KB of cover images from archive.org, so the tag ended up running at about 4.2 s, inside the quiet window that TTI is measured from. On a page whose load event is image-bound, there is no "later" that is still during the visit.

Then I removed it, which is the only version that keeps it out of the window. Vercel Web Analytics already covers page views and referrers and sets no cookies, so GA4 was the redundant tracker. The [357 ms run](https://www.debugbear.com/test/website-speed/Yc8RPlge/overview) became [215 ms](https://www.debugbear.com/test/website-speed/xzJd0tPG/overview).

| Signal | Before | After | Change |
| --- | --- | --- | --- |
| Total Blocking Time | 357 ms | 215 ms | -39% |
| Lighthouse performance | 92 | 96 | +4 |
| Page weight | 1.49 MB | 1.31 MB | -12% |
| JavaScript execution time | 1.1 s | 0.7 s | -36% |

Then I took framer motion out of the hero focus card. It was the app chunk's only third-party import, and the chunk halved from 74 KB to 35 KB. TBT did not move: 215 ms, then 243 ms, both inside the noise. The task in that chunk is React hydrating the components, and halving the bytes does not halve the hydration. I kept the change for the weight and the dependency, not for the metric.

The [next run](https://www.debugbear.com/test/website-speed/zjj5315n/overview) landed at 78 ms and a 100 lab score, with the app chunk at 63 ms and the framework at 15 ms.

| Signal | Before the work | After |
| --- | --- | --- |
| Total Blocking Time | 1690 ms | 78 ms |
| Lighthouse performance | 73 | 100 |
| Page weight | 3.37 MB | 1.27 MB |
| JavaScript | 2.39 MB | 312 KB |
| Main-thread work | 3.2 s | 1.6 s |
| Cumulative Layout Shift | 0 | 0 |

**The number to trust is the range, not the reading.** Across the eight runs, one build has measured 215, 243, 357, 399, 419 and 459 ms. The 78 ms is the best of them and it may be the luckiest. What the runs agree on is the size of the real changes: 1410 ms from the icon barrel, 142 ms from GA4, and nothing measurable from relocating or shrinking code that still hydrates. Confirm a 20 ms claim with three runs. Do not confirm it with one.

## The audit's advice was not the cause

The audit told me to avoid repeatedly reading layout properties and to use modern image formats. Both were true, both were worth doing, and neither was the blocking time. The forced reflows were four reads on a scroll handler. The images were already being optimised. The thing that actually dominated the first paint was a dependency nobody thought to audit, because nothing on the page looked slow. Fourteen small logos in a row.

That is the first lesson: **an audit reports symptoms, and the symptom it names is usually the cheapest one to fix, not the most expensive one to carry.** The findings list is a place to start, not a diagnosis. The diagnosis comes from measuring what the browser actually fetched, in order, with the network throttled the way a phone sees it.

The second lesson cost me a deploy. **Bytes are easy to count and feel like progress, and TBT does not count them.** It counts tasks on the main thread between the first paint and the page becoming interactive. A change can ship fewer bytes and more work, and the way to tell is not the bundle analyser but the long-task list. I had that list in the same report the whole time, and I read the byte counts first.

> Nothing on the page looked slow. That is exactly why it was worth measuring. And the number I wanted to move was not the number that moved.
