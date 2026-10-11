import Link from "next/link";

export function Logo({ withBadge = true }: { withBadge?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border"
        style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "#000" }}
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.2 3.2 L2.8 9 L6.2 14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.8 3.2 L15.2 9 L11.8 14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.2 3 L6.8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">Script Forge</span>
        <span className="text-[10px] font-medium tracking-[0.14em] text-[var(--text-faint)]">LEARN JS & TS</span>
      </span>
      {withBadge && (
        <span
          className="hidden sm:inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold tracking-widest text-[var(--text-muted)]"
          style={{ borderColor: "var(--border)" }}
        >
          JS + TS
        </span>
      )}
    </Link>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[8px] border shrink-0"
      style={{ width: size, height: size, background: "var(--accent)", borderColor: "var(--accent)", color: "#000" }}
      aria-hidden
    >
      <svg width={Math.round(size * 0.62)} height={Math.round(size * 0.62)} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.2 3.2 L2.8 9 L6.2 14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.8 3.2 L15.2 9 L11.8 14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.2 3 L6.8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
