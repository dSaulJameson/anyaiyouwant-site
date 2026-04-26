"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { cn, TIDYCAL_URL } from "@/lib/utils";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-md transition-colors",
                  active
                    ? "text-foreground bg-surface"
                    : "text-muted hover:text-foreground hover:bg-surface/60"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={TIDYCAL_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-3 px-4 py-2 text-sm rounded-md bg-accent text-black font-medium hover:bg-accent/90 transition-colors"
          >
            Book 15 min →
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 text-foreground"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground">
                {l.label}
              </Link>
            ))}
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 px-4 py-2 text-center rounded-md bg-accent text-black font-medium"
            >
              Book 15 min →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
