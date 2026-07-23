import Link from "next/link";
import { TIDYCAL_URL } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2"><div className="text-sm font-semibold tracking-[0.18em]">ANY AI YOU WANT</div><p className="mt-3 text-muted text-sm max-w-md">A senior U.S.-based product engineering company. We architect, code, deploy, and operate full-stack software, data systems, machine learning, and secure AI.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/book" className="inline-flex px-4 py-2 text-sm rounded-md bg-accent text-black font-medium">Talk to an engineer →</Link><a href={TIDYCAL_URL} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm rounded-md border border-border hover:bg-surface">Book 15 minutes</a></div></div>
        <div><div className="label-mono mb-3">Explore</div><ul className="space-y-2 text-sm"><li><Link href="/services" className="text-muted hover:text-foreground">Capabilities</Link></li><li><Link href="/work" className="text-muted hover:text-foreground">Work</Link></li><li><Link href="/industries" className="text-muted hover:text-foreground">Industries</Link></li><li><Link href="/demos" className="text-muted hover:text-foreground">Analytics lab</Link></li></ul></div>
        <div><div className="label-mono mb-3">Resources</div><ul className="space-y-2 text-sm"><li><Link href="/learn" className="text-muted hover:text-foreground">Engineering insights</Link></li><li><Link href="/glossary" className="text-muted hover:text-foreground">Technical glossary</Link></li><li><Link href="/ai-events" className="text-muted hover:text-foreground">AI & tech events</Link></li><li><Link href="/community" className="text-muted hover:text-foreground">Community</Link></li></ul></div>
        <div><div className="label-mono mb-3">Company</div><ul className="space-y-2 text-sm"><li><Link href="/about" className="text-muted hover:text-foreground">About</Link></li><li><Link href="/book" className="text-muted hover:text-foreground">Talk to an engineer</Link></li><li><a href="mailto:Saul@anyaiyouwant.com" className="text-muted hover:text-foreground">Email us</a></li><li><a href="https://buildersandbackers.org" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">Builders & Backers</a></li></ul></div>
      </div>
      <div className="border-t border-border"><div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted font-mono"><span>© {new Date().getFullYear()} Any AI You Want</span><span>All engineering work performed by U.S.-based engineers</span></div></div>
    </footer>
  );
}
