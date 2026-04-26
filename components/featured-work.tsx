import Link from "next/link";

const items = [
  {
    title: "Avocado Demand Forecasting",
    label: "ML / FORECASTING",
    blurb: "Built a Bayesian regression model that beat the open market for 3 consecutive years for one of the nation's largest avocado suppliers.",
    accent: "from-accent/30 to-accent-2/20",
  },
  {
    title: "$300M Bidding Engine",
    label: "ML / OPTIMIZATION",
    blurb: "Designed and deployed a large-scale product recommendation and bidding optimization engine for an auction company processing $300M+ annually.",
    accent: "from-accent-2/30 to-accent-warm/20",
  },
  {
    title: "Storywarz",
    label: "WEB APP / GAMES",
    blurb: "Multiplayer story-building game with real-time rooms, matchmaking, and AI-assisted narrative generation.",
    href: "https://storywarz.win",
    accent: "from-accent-warm/30 to-accent/20",
  },
  {
    title: "Song Selfie",
    label: "WEB APP / B2B2C",
    blurb: "Make AI songs about yourself. Venue partnerships, Stripe-powered revenue splits, share-ready audio.",
    href: "https://songselfie.com",
    accent: "from-success/30 to-accent/20",
  },
];

export function FeaturedWork() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="label-mono">Featured work</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Real systems. <span className="text-gradient">Real revenue.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors font-mono"
          >
            View all work →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((it) => {
            const Inner = (
              <div className={`card p-6 h-full relative overflow-hidden transition-transform hover:-translate-y-0.5`}>
                <div className={`absolute -top-32 -right-32 w-72 h-72 rounded-full opacity-50 blur-3xl bg-gradient-to-br ${it.accent}`} />
                <div className="relative">
                  <div className="label-mono">{it.label}</div>
                  <h3 className="mt-3 text-xl font-semibold">{it.title}</h3>
                  <p className="mt-3 text-muted text-sm leading-relaxed">{it.blurb}</p>
                  {it.href && (
                    <div className="mt-4 text-xs font-mono text-accent">
                      {new URL(it.href).hostname} ↗
                    </div>
                  )}
                </div>
              </div>
            );
            return it.href ? (
              <a key={it.title} href={it.href} target="_blank" rel="noreferrer">{Inner}</a>
            ) : (
              <div key={it.title}>{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
