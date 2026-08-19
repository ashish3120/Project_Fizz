# Written Explanation: Architecture & Engineering Decisions (`DECISIONS.md`)

---

## 1. Why This Architecture Over the Rejected Alternatives?

We chose a **React + Vite SPA** with **React Three Fiber (R3F)** and **GSAP ScrollTrigger** over the common alternative of using heavy pre-rendered video/image-frame sequences (canvas scrubbing) or complex SSR frameworks (Next.js).

* **Vector/WebGL Fidelity vs. Image Sequence Overhead:** Scrubbing through 300+ pre-rendered JPEG/PNG frames consumes substantial network bandwidth, bloats memory caches, and degrades severely on mobile viewports. Real-time 3D via Three.js uses a single lightweight `.glb` geometry (~2MB) and dynamic texture swapping, delivering crisp resolution at any screen density while using a fraction of the network footprint.
* **Scroll Performance & GPU Load:** Using GSAP ScrollTrigger with low scrub inertia (`scrub: 0.5`) and `gsap.ticker.lagSmoothing(1000, 16)` ensures instantaneous, deterministic viewport tracking. To prevent GPU pixel fill-rate exhaustion on mobile Retina screens, the Canvas device pixel ratio is clamped (`dpr={[1, 1.5]}`), reducing shading overhead by ~40% while sustaining 60 FPS.
* **Standalone Client Architecture:** We migrated away from Next.js server components to a pure Vite SPA to eliminate cold-start server latency, reduce bundle size, and achieve near-instant client-side hydration.

---

## 2. Trade-offs Made Under the Time Limit & 1-Week Roadmap

### Trade-offs Made
1. **Local Static Configuration over Headless CMS:** Hardcoded flavor metadata, nutrition breakdowns, and copy into local static JSON rather than wiring up a headless CMS (e.g., Prismic/Sanity). This prioritized sub-second initial paint times, 0-dependency offline reliability, and layout precision over dynamic content editing.
2. **Simplified Lighting & Shadow Pipeline:** Disabled real-time dynamic shadow cascades on secondary floating 3D cans and used an ambient environment preset with directional key lighting to guarantee smooth framerates on low-power mobile devices.

### What We Would Build With a Full Week
* **Custom GLSL Condensation Shaders:** Implement custom fragment shaders for realistic, interactive water droplets and condensation on the can surface reacting to scroll speed.
* **Spatial Web Audio:** Add subtle, interactive spatial audio effects (can opening, carbonation fizz, ambient hum) mapped to user scroll depth and interactive clicks.
* **Interactive 3D Can Customizer:** A real-time 3D customization studio allowing users to design custom flavor combinations and generate shareable previews.
* **End-to-End Cart & Checkout:** Connect Stripe Elements or Shopify Storefront API for a complete sample-pack purchasing workflow.

---

## 3. AI Tool Usage, Verification & Manual Refactoring

### Where AI Tools Were Used
* **Initial Scaffolding:** Used AI (Cursor / Google Antigravity) to scaffold the initial React component structure, Tailwind responsive layout utilities, and baseline Three.js geometry loaders.
* **GSAP Timeline Coordination:** Assisted in structuring initial timeline keyframes and scroll trigger boundaries.

### What Was Personally Verified, Debugged & Refactored
* **Elimination of Scroll Inertia Lag:** Identified that default `scrub: 1.5` settings introduced an artificial 1.5s lag; tuned the timeline scrub rate down to `0.5` and added `lagSmoothing` to prevent frame drops on rapid scrolling.
* **CDN Failure & WebGL Crash Fix:** Debugged and resolved an uncaught runtime crash (`THREE.WebGLRenderer: Context Lost` / `Could not load cloud.png from rawcdn.githack.com`) during browser hard refreshes by localizing all external textures to `/public/textures/` and adding Suspense fallback boundaries.
* **WebGL Render Pass Optimization:** Identified that Three.js texture mutations (`flipY = false`) were executing on every React render pass in `SodaCan.tsx`; refactored this into a `useEffect` hook to prevent redundant GPU texture re-uploads.
* **Viewport & Layout Auditing:** Verified strict compliance at 390px (mobile) and 1440px (desktop) in DevTools, resolving layout shifts, preventing text-on-canvas collisions, and ensuring `overflow-x: hidden` with zero horizontal scroll.
* **Honesty Compliance:** Scanned and pruned all AI-generated placeholder partner logos, fake 5-star ratings, and fabricated user testimonials to strictly meet the challenge's authenticity criteria.
