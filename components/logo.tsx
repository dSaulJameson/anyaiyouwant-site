import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span
        className="relative inline-flex items-center justify-center rounded-md overflow-hidden ring-1 ring-border group-hover:ring-accent/40 transition-shadow"
        style={{ width: size, height: size }}
      >
        <Image
          src="/media/browser-icon.png"
          alt="Any AI You Want mark"
          width={size}
          height={size}
          priority
          className="object-cover"
        />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-foreground/90">
          ANY AI YOU WANT
        </span>
        <span className="text-[10px] font-mono text-muted">anyaiyouwant.com</span>
      </div>
    </Link>
  );
}
