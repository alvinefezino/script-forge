import Link from "next/link";
import { WifiOff, RefreshCcw, BookOpen, Hammer, Route } from "lucide-react";
export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-[560px] px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
        <WifiOff size={22} className="text-[var(--text-muted)]" />
      </div>
      <h1 className="mt-6 text-[26px] font-semibold tracking-tight">You are offline</h1>
      <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-6 text-[var(--text-muted)]">
        Script Forge is installed, so lessons and projects you have visited are available offline. Connect again to fetch new content.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="/" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black"><RefreshCcw size={16} /> Try again</a>
        <Link href="/learn/m1l1" className="inline-flex h-11 items-center gap-2 rounded-full border bg-[var(--surface)] px-6 text-sm font-semibold" style={{ borderColor: "var(--border)" }}><BookOpen size={16} /> Open a lesson</Link>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 text-left">
        <Link href="/modules/js-foundations" className="rounded-[12px] border bg-[var(--surface)] p-4 hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}><BookOpen size={16} /><p className="mt-2 text-xs font-semibold">Modules</p></Link>
        <Link href="/projects" className="rounded-[12px] border bg-[var(--surface)] p-4 hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}><Hammer size={16} /><p className="mt-2 text-xs font-semibold">Projects</p></Link>
        <Link href="/roadmap" className="rounded-[12px] border bg-[var(--surface)] p-4 hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}><Route size={16} /><p className="mt-2 text-xs font-semibold">Roadmap</p></Link>
      </div>
      <p className="mt-6 text-xs leading-5 text-[var(--text-faint)]">Tip: Add to Home Screen from your browser menu to open like an app — no internet needed for cached pages.</p>
    </div>
  );
}