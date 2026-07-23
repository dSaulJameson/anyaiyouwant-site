# anyaiyouwant.com

Marketing, work, and community site for **Any AI You Want** — a senior U.S.-based product engineering company led by D. Saul Jameson.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Recharts**, deployed in Docker on **HostHatch** behind a Cloudflare Tunnel.

## Pages

- `/` — Product-engineering position, capability strip, selected outcomes, industries, insights, and consultation brief
- `/services` and `/services/[slug]` — Product engineering, data, ML, secure AI, modernization, and technical leadership
- `/work` and `/work/[slug]` — Outcome-oriented case studies plus a supporting interactive analytics lab
- `/industries/[slug]` — Industry operating systems, use cases, KPIs, and representative dashboards
- `/learn/[slug]` — Engineering insights across software, data, ML, secure AI, SEO, and GEO
- `/ai-events/[city]` — Live city event resources backed by the Offline Networking database
- `/glossary/[term]` — Practical software, data, AI, and growth-engineering definitions
- `/about` — Company operating model, technical leadership, and Builders & Backers Network
- `/book` — Private project brief and embedded TidyCal consultation calendar

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

Production deployments from `main` are built and released by GitHub Actions through the dedicated non-root HostHatch deploy account.

## Asset map

| Path | Use |
|------|-----|
| `public/media/headshot.png` | About page profile photo |
| `public/media/logo-white.png` | Header logo on dark UI |
| `public/media/browser-icon.png` | Favicon / Apple touch icon |
| `public/media/logo-mark.png` | Alt mark variant |

## Notes

- Booking link: https://tidycal.com/dsauljameson/15-minute-meeting
- Experiential product work is mentioned only as supporting technical range; it is not a primary commercial offering
- Builders & Backers Network: Chairman of the Board role mentioned on About page
