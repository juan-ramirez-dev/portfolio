# Juan Ramírez — The Architecture Issue

An editorial, scroll-driven portfolio styled like a luxury watch magazine. Instead of a wall of logos, it walks through the architectures I built: micro-frontends, offline payments, Mercado Pago, Stripe Connect, microservices and CI/CD.

> **Status:** visual prototype. All copy, companies and metrics are placeholders until the design is settled.

## Stack

- Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4
- GSAP + ScrollTrigger for scroll-scrubbed animation, Lenis for smooth scrolling
- Bodoni Moda, Inter Tight and JetBrains Mono through `next/font`

## How it works

- **The watch** (`components/watch/Watch.tsx`) is a hand-built SVG of a Presage-style watch. On the cover it is large; as you scroll it flies into the right-hand rail (`WatchRail.tsx`).
- **The drive** (`components/watch/drive.ts`): every section in `content/stations.ts` is a station on the dial. The hour hand points at the current station, the minute hand turns once per station, the date window shows the station number and the bezel clicks round.
- **Chapters** (`sections/Chapter.tsx`) render from `content/chapters.ts`. Each one has a cover spread, a spec sheet, the problem, an architecture diagram that draws itself (`components/diagrams/ArchDiagram.tsx`), a CI/CD pipeline (`Pipeline.tsx`) and impact metrics.
- **Generic scroll effects** are opted into with data attributes such as `data-reveal`, `data-split`, `data-parallax` and `data-countup` (see `components/scroll/Animations.tsx`).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/portfolio
npm run build      # static export to ./out
```

## Deploy

Pushing to `redesign/calibre` runs `.github/workflows/pages.yml`, which publishes to https://juan-ramirez-dev.github.io/portfolio/.
