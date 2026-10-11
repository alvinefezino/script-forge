"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X, Flame, Trophy, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useProgress } from "./ProgressProvider";
import { Logo } from "./Logo";

function firstNameOf(user:any){
  const fn = user?.user_metadata?.full_name as string | undefined;
  if(fn && fn.trim()) return fn.trim().split(/\s+/)[0];
  const e=user?.email as string|undefined;
  if(e) return e.split("@")[0].split(".")[0];
  return null;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { streak, xp, level, xpInfo } = useProgress();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const name = firstNameOf(user);

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
              <span className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold sm:inline-flex animate-in" style={{ borderColor: streak>=3?"rgba(245,158,11,0.35)":"var(--border)", background: streak>=3?"rgba(245,158,11,0.1)":"transparent" }}>
                <Flame size={14} className={streak>=3?"text-[var(--accent)] animate-pulse-subtle":"text-[var(--text-faint)]"} /> {streak}d
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black sm:inline-flex">
                <Star size={12} fill="currentColor" /> Lv {level} · {xp} XP
              </span>
              <span className="hidden max-w-[150px] truncate text-sm font-medium md:inline">
                {name ? <span>Welcome {name}</span> : <span className="text-[var(--text-muted)]">{user.email}</span>}
              </span>
              <button onClick={() => signOut()} className="hidden items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex" style={{ borderColor: "var(--border)" }}><LogOut size={14} /> Log out</button>
              <Link href="/learn/m1l1" className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] md:inline-flex">Continue</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex" style={{ borderColor: "var(--border)" }}>Log in</Link>
              <Link href="/learn/m1l1" className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] md:inline-flex">Start learning</Link>
            </>
          )}
          <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden" style={{ borderColor: "var(--border)" }}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t px-4 py-4 md:hidden animate-in" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex flex-col gap-2">
            {!loading && user ? (
              <>
                {name && <div className="rounded-[10px] bg-white px-4 py-3 text-sm font-semibold text-black animate-in">Welcome {name}</div>}
                <div className="flex gap-2">
                  <span className="flex-1 inline-flex items-center justify-center gap-1 rounded-[10px] border px-3 py-2 text-xs font-semibold" style={{ borderColor: "var(--border)" }}><Flame size={14} className="text-[var(--accent)]" /> {streak} day streak</span>
                  <span className="flex-1 inline-flex items-center justify-center gap-1 rounded-[10px] bg-white px-3 py-2 text-xs font-bold text-black"><Trophy size={14} /> Lv {level}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background:"var(--surface-raised)" }}><div className="h-full bg-[var(--accent)] transition-all duration-700" style={{ width: `${Math.round(xpInfo.pct*100)}%` }} /></div>
                <div className="flex items-center justify-between rounded-[10px] border px-4 py-3" style={{ borderColor: "var(--border)" }}><span className="truncate text-xs text-[var(--text-muted)]">{user.email}</span><button onClick={() => { signOut(); setOpen(false); }} className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: "var(--border)" }}>Log out</button></div>
              </>
            ) : (
              <Link onClick={() => setOpen(false)} href="/login" className="rounded-[10px] bg-white px-4 py-3 text-center text-sm font-semibold text-black">Log in or create account</Link>
            )}
            <Link onClick={() => setOpen(false)} href="/" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Home</Link>
            <Link onClick={() => setOpen(false)} href="/modules/js-foundations" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Modules</Link>
            <Link onClick={() => setOpen(false)} href="/learn/m1l1" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Learn</Link>
            <Link onClick={() => setOpen(false)} href="/projects" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Projects</Link>
            <Link onClick={() => setOpen(false)} href="/roadmap" className="rounded-[10px] border px-4 py-3 text-sm font-medium" style={{ borderColor: "var(--border)" }}>Roadmap</Link>
            <Link onClick={() => setOpen(false)} href="/certificate" className="rounded-[10px] border bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-black border-transparent">Certificate</Link>
          </div>
        </div>
      )}
    </header>
  );
}
