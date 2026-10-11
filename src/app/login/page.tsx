import { LoginForm } from "./LoginForm";
import Link from "next/link";
import { CheckCircle2, Play, Hammer, Route, Smartphone, Zap } from "lucide-react";

export const metadata = { title: "Log in — Script Forge" };

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-56px)]">
      <div className="mx-auto flex min-h-[calc(100dvh-56px)] max-w-[1100px] flex-col md:flex-row">
        {/* LEFT — description */}
        <div className="flex flex-1 flex-col justify-center border-b px-5 py-8 sm:px-6 md:border-b-0 md:border-r md:px-10 md:py-12" style={{ borderColor: "var(--border)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-faint)]">Script Forge</p>
          <h1 className="mt-3 text-[32px] font-semibold leading-[0.95] tracking-[-0.03em] sm:text-[40px] md:text-[44px]">
            Learn<br />
            <span className="text-[var(--accent)]">JavaScript</span>
            <br />
            and TypeScript<br />
            <span className="text-[var(--text-muted)]">by doing.</span>
          </h1>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-6 text-[var(--text-muted)]">
            Explanatory lessons, a runnable playground in every chapter, and three real Next.js projects you build step by step. Mobile first. Works offline after the first load.
          </p>
          <ul className="mt-6 grid gap-2 text-sm leading-6">
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /> 8 modules, 27 lessons, from variables to real projects</li>
            <li className="flex gap-2"><Play size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /> Run code in the browser, no setup</li>
            <li className="flex gap-2"><Hammer size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /> Portfolio, Blog and Storefront builds with Next.js</li>
            <li className="flex gap-2"><Route size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /> Roadmap with career paths and time estimates</li>
            <li className="flex gap-2"><Smartphone size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /> Install to your home screen, learn offline</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border px-3 py-1.5 font-medium" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>08 phases</span>
            <span className="rounded-full border px-3 py-1.5 font-medium" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>27 lessons</span>
            <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-black">Free to start</span>
          </div>
          <p className="mt-6 text-xs leading-5 text-[var(--text-faint)]">
            Curriculum inspired by <span className="text-[var(--text-muted)]">boot.dev</span> and <span className="text-[var(--text-muted)]">freeCodeCamp</span>. Content is original and written to explain, not just to list.
          </p>
        </div>
        {/* RIGHT — auth card */}
        <div className="flex flex-1 items-center justify-center bg-[var(--surface)] px-5 py-8 sm:px-6 md:bg-transparent md:px-10 md:py-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
