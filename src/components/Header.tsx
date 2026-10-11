"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b bg-[var(--bg)]" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[var(--accent)] text-[11px] font-bold tracking-widest text-black">
            SF
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Script Forge</span>
          <span className="hidden rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-widest text-[var(--text-muted)] sm:inline-flex" style={{ borderColor: "var(--border)" }}>
            JS + TS
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/") && pathname === "/" ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Home</Link>
          <Link href="/modules/js-foundations" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/modules") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Modules</Link>
          <Link href="/learn/m1l1" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/learn") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Learn</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/learn/m1l1" className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)] md:inline-flex">
            Start learning
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t px-4 py-4 md:hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex flex-col gap-2">
            <Link onClick={() => setOpen(false)} href="/" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Home</Link>
            <Link onClick={() => setOpen(false)} href="/modules/js-foundations" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>All modules</Link>
            <Link onClick={() => setOpen(false)} href="/learn/m1l1" className="rounded-[10px] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black text-center">Start with Variables</Link>
          </div>
        </div>
      )}
    </header>
  );
}
