"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X, Flame, Trophy, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useProgress } from "./ProgressProvider";
import { Logo } from "./Logo";

function firstNameOf(user: any) {
  const fn = user?.user_metadata?.full_name as string | undefined;
  if (fn && fn.trim()) return fn.trim().split(/\s+/)[0];
  const e = user?.email as string | undefined;
  if (e) return e.split("@")[0].split(".")[0];
  return null;
}

const NAV = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/modules/js-foundations", label: "Modules", match: (p: string) => p.startsWith("/modules") || p.startsWith("/learn") },
  { href: "/projects", label: "Projects", match: (p: string) => p.startsWith("/projects") },
  { href: "/roadmap", label: "Roadmap", match: (p: string) => p.startsWith("/roadmap") },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { streak, xp, level, xpInfo } = useProgress();
  const name = firstNameOf(user);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="mx-auto flex h-[64px] max-w-[1160px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: brand */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Center: pill nav — desktop only */}
        <nav
          className="hidden items-center gap-1 rounded-full border p-1 md:flex"
          style={{ background: "var(--surface-raised)", borderColor: "var(--border)" }}
        >
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              {/* Streak — always visible on sm+ */}
              <span
                className="hidden items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold sm:inline-flex"
                style={{
                  borderColor: streak >= 3 ? "rgba(245,158,11,0.35)" : "var(--border)",
                  background: streak >= 3 ? "rgba(245,158,11,0.12)" : "transparent",
                  color: streak >= 3 ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Flame size={14} className={streak >= 3 ? "text-[var(--accent)]" : "text-[var(--text-faint)]"} />
                {streak}d
              </span>
              {/* Level + XP */}
              <span className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black sm:inline-flex">
                <Star size={12} className="fill-black text-black" />
                Lv {level} · {xp} XP
              </span>
              {/* Welcome */}
              {name && (
                <span className="hidden max-w-[140px] truncate text-sm font-medium md:inline" style={{ color: "var(--text)" }}>
                  Welcome {name}
                </span>
              )}
              <button
                onClick={() => signOut()}
                className="hidden items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <LogOut size={14} /> Log out
              </button>
              <Link
                href="/learn/m1l1"
                className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] md:inline-flex"
              >
                Continue
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-raised)] md:inline-flex"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                Log in
              </Link>
              <Link
                href="/learn/m1l1"
                className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] md:inline-flex"
              >
                Start learning
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* XP progress line — only when logged in */}
      {!loading && user && xpInfo && (
        <div className="h-[2px] w-full" style={{ background: "var(--surface-raised)" }}>
          <div className="h-full bg-[var(--accent)] transition-all duration-700" style={{ width: `${Math.round(xpInfo.pct * 100)}%` }} />
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="border-t px-4 py-4 md:hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex flex-col gap-2">
            {!loading && user ? (
              <>
                {name && (
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black">Welcome {name}</div>
                )}
                <div className="flex gap-2">
                  <span
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-2xl border px-3 py-2.5 text-xs font-semibold"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    <Flame size={14} className="text-[var(--accent)]" /> {streak} day streak
                  </span>
                  <span className="flex-1 inline-flex items-center justify-center gap-1 rounded-2xl bg-white px-3 py-2.5 text-xs font-bold text-black">
                    <Trophy size={14} /> Lv {level}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-raised)" }}>
                  <div className="h-full bg-[var(--accent)] transition-all duration-700" style={{ width: `${Math.round(xpInfo.pct * 100)}%` }} />
                </div>
                <div
                  className="flex items-center justify-between rounded-2xl border px-4 py-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="truncate text-xs" style={{ color: "var(--text-muted)" }}>
                    {user.email}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: "var(--border)" }}
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
              >
                Log in or create account
              </Link>
            )}

            {NAV.map((item) => (
              <Link
                key={item.href}
                onClick={() => setOpen(false)}
                href={item.href}
                className="rounded-2xl border px-4 py-3 text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              href="/certificate"
              className="rounded-2xl border border-transparent bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-black"
            >
              Certificate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
