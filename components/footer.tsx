import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-sm font-semibold tracking-[0.18em]">ANY AI YOU WANT</div>
          <p className="mt-3 text-muted text-sm max-w-md">
            Fractional CTO and machine learning engineer. From a 2-hour script to a 2,000-hour platform —
            algorithms, automation, and apps that ship.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
            >
              Book 15 minutes →
            </a>
            <a
              href="mailto:Saul@anyaiyouwant.com"
              className="text-sm font-mono text-muted hover:text-foreground transition-colors"
            >
              Saul@anyaiyouwant.com
            </a>
          </div>
        </div>

        <div>
          <div className="label-mono mb-3">Site</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/work" className="text-muted hover:text-foreground">Work</Link></li>
            <li><Link href="/services" className="text-muted hover:text-foreground">Services</Link></li>
            <li><Link href="/about" className="text-muted hover:text-foreground">About</Link></li>
            <li><Link href="/book" className="text-muted hover:text-foreground">Book</Link></li>
          </ul>
        </div>

        <div>
          <div className="label-mono mb-3">Apps</div>
          <ul className="space-y-2 text-sm">
            <li><a href="https://storywarz.win" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">storywarz.win</a></li>
            <li><a href="https://songselfie.com" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">songselfie.com</a></li>
            <li><a href="https://buildersandbackers.org" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">Builders & Backers</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted font-mono">
          <span>© {new Date().getFullYear()} D. Saul Jameson — Any AI You Want</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success pulse-dot" />
            Currently accepting new engagements
          </span>
        </div>
      </div>
    </footer>
  );
}
