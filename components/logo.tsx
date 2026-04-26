import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/media/logo-white.png"
        alt="Any AI You Want"
        width={size}
        height={size}
        priority
        className="opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-foreground/90">
          ANY AI YOU WANT
        </span>
        <span className="text-[10px] font-mono text-muted">anyaiyouwant.com</span>
      </div>
    </Link>
  );
}
