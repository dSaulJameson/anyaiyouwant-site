"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/services", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/learn", label: "Insights" },
  { href: "/community", label: "Community" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between" aria-label="Primary navigation">
        <Logo />
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={cn("px-3 py-2 text-sm rounded-md transition-colors", active ? "text-foreground bg-surface" : "text-muted hover:text-foreground hover:bg-surface/60")}>
                {link.label}
              </Link>
            );
          })}
          <Link href="/book" className="ml-3 px-4 py-2 text-sm rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors">
            Start a project →
          </Link>
        </div>
        <button onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="lg:hidden p-2 text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2.5 text-foreground">{link.label}</Link>)}
            <Link href="/book" onClick={() => setOpen(false)} className="mt-2 px-4 py-2.5 text-center rounded-md bg-accent text-black font-medium">Start a project →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
