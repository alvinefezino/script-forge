"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b bg-[var(--bg)]" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={`rounded-full px-3 py-1.5 text-sm ${pathname === "/" ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Home</Link>
          <Link href="/modules/js-foundations" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/modules") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Modules</Link>
          <Link href="/learn/m1l1" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/learn") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Learn</Link>
          <Link href="/projects" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/projects") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Projects</Link>
          <Link href="/roadmap" className={`rounded-full px-3 py-1.5 text-sm ${isActive("/roadmap") ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-raised)]"}`}>Roadmap</Link>
        </nav>
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <span className="hidden max-w-[160px] truncate text-xs text-[var(--text-muted)] md:inline">{user.email}</span>
              <button onClick={() => signOut()} className="hidden items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex" style={{ borderColor: "var(--border)" }}><LogOut size={14} /> Log out</button>
              <Link href="/learn/m1l1" className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)] md:inline-flex">Continue</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex" style={{ borderColor: "var(--border)" }}>Log in</Link>
              <Link href="/learn/m1l1" className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)] md:inline-flex">Start learning</Link>
            </>
          )}
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
            {!loading && user ? (
              <div className="flex items-center justify-between rounded-[10px] border px-4 py-3" style={{ borderColor: "var(--border)" }}><span className="truncate text-sm">{user.email}</span><button onClick={() => { signOut(); setOpen(false); }} className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: "var(--border)" }}>Log out</button></div>
            ) : (
              <Link onClick={() => setOpen(false)} href="/login" className="rounded-[10px] bg-white px-4 py-3 text-center text-sm font-semibold text-black">Log in or create account</Link>
            )}
            <Link onClick={() => setOpen(false)} href="/" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Home</Link>
            <Link onClick={() => setOpen(false)} href="/modules/js-foundations" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Modules</Link>
            <Link onClick={() => setOpen(false)} href="/learn/m1l1" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Learn</Link>
            <Link onClick={() => setOpen(false)} href="/projects" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Projects</Link>
            <Link onClick={() => setOpen(false)} href="/roadmap" className="rounded-[10px] border bg-white px-4 py-3 text-sm font-semibold text-black" style={{ borderColor: "var(--border)" }}>Roadmap</Link>
          </div>
        </div>
      )}
    </header>
  );
}