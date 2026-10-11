import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { ModuleCard } from "@/components/ModuleCard";
import { ArrowRight, Play, CheckCircle2, Smartphone, Code2, GraduationCap } from "lucide-react";

export default function Home() {
  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const totalMins = curriculum.reduce((s, m) => s + m.lessons.reduce((a, l) => a + parseInt(l.duration), 0), 0);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
              Built for phones first. Every lesson runs in the browser.
            </div>
            <h1 className="mt-5 text-[32px] font-semibold leading-[0.95] tracking-tight sm:text-[44px] lg:text-[52px]">
              Learn JavaScript
              <br />
              <span className="text-[var(--text-muted)]">and TypeScript</span>
              <br />
              <span className="text-[var(--accent)]">by doing.</span>
            </h1>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-6 text-[var(--text-muted)] sm:text-[16px]">
              Short, explanatory lessons inspired by boot.dev and freeCodeCamp. Each lesson has plain language, runnable code, and a quick check. No video buffering. No setup. Just open and run.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/learn/m1l1" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)]">
                Start with Foundations <ArrowRight size={16} />
              </Link>
              <Link href="/modules/js-foundations" className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
                View curriculum
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-[420px]">
              <div className="rounded-[12px] border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-lg font-semibold leading-none">{curriculum.length}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Modules</p>
              </div>
              <div className="rounded-[12px] border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-lg font-semibold leading-none">{totalLessons}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Lessons</p>
              </div>
              <div className="rounded-[12px] border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-lg font-semibold leading-none">{totalMins} min</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Total</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><Smartphone size={14} />Phone first</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><Code2 size={14} />Run code inline</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><GraduationCap size={14} />JS to TS path</span>
            </div>
          </div>

          <div className="rounded-[16px] border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-widest text-[var(--text-muted)]">PREVIEW</p>
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">Editable and runnable</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-[12px] border" style={{ borderColor: "var(--border)", background: "#0B0B0B" }}>
              <div className="flex items-center gap-1.5 border-b px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" aria-hidden />
                <span className="ml-2 text-xs font-medium text-[var(--text-muted)]">Variables and Declarations</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-5 text-[var(--text-muted)]">
{`let score = 0;
const player = "Ava";
score += 10;
console.log(player, score);
// Ava 10`}
              </pre>
              <div className="flex items-center justify-between border-t px-3 py-2.5" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs text-[var(--text-muted)]">Tap Run inside any lesson to execute.</span>
                <Link href="/learn/m1l1" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black"><Play size={12} fill="currentColor" /> Open</Link>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-5 text-[var(--text-muted)]">
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--success)]" /> Every code block is editable and runs on device</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--success)]" /> Explanations stay plain, no jargon without examples</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--success)]" /> Progress saves locally, works offline after load</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">CURRICULUM</p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-tight sm:text-[26px]">Eight modules, {totalLessons} lessons</h2>
            <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)]">Start with JavaScript foundations and build to async, then add TypeScript from essentials to real project setup.</p>
          </div>
          <Link href="/modules/js-foundations" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-white sm:inline-flex">All modules <ArrowRight size={14} /></Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="rounded-[16px] border p-5 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="text-xs font-semibold tracking-widest text-[var(--text-muted)]">HOW IT WORKS</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">1</p>
              <h3 className="mt-3 text-sm font-semibold">Read the plain explanation</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">Each lesson opens with what the concept does, why it matters, and where you will use it. No wall of text.</p>
            </div>
            <div>
              <p className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">2</p>
              <h3 className="mt-3 text-sm font-semibold">Run and edit the code</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">The editor is on the same page. Change a line, tap Run, see output instantly. Built for touch and small screens.</p>
            </div>
            <div>
              <p className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">3</p>
              <h3 className="mt-3 text-sm font-semibold">Check and continue</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">Take the quick check, mark the lesson done, and move to the next one. Progress stays on your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects teaser */}
      <section className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6">
        <div className="rounded-[16px] border p-5 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">PROJECTS</p>
          <h2 className="mt-2 text-[22px] font-semibold tracking-tight sm:text-[26px]">Build three real apps with Next.js</h2>
          <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)]">Each project is a set of steps you follow in your terminal and editor. Learn how Next.js works, how to install it, and what every dependency does, then ship a portfolio, a blog, and a storefront.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/projects" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]">View projects</a>
            <a href="/projects/portfolio" className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>Start with Portfolio</a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>Portfolio - Beginner - 55 min</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>Blog - Intermediate - 60 min</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>Storefront - Advanced - 75 min</span>
          </div>
        </div>
      </section>

      {/* Roadmap teaser */}
      <section className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6">
        <div className="relative overflow-hidden rounded-[16px] border p-5 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" aria-hidden />
          <div className="absolute right-6 top-6 hidden text-[72px] font-bold leading-none text-white/[0.04] sm:block" aria-hidden>ROAD</div>
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[var(--accent)]"><span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden /> ROADMAP</p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-tight sm:text-[26px]">Your path from zero to shipped</h2>
            <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)]">Eight phases, career paths, and a timeline that looks good on a phone. Pick frontend, TypeScript, or indie builder — then follow the steps.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white px-3 py-1.5 font-medium text-black">08 phases · 27 lessons</span>
              <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>3 career paths</span>
              <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>~8h total</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/roadmap" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-100">View roadmap</a>
              <a href="/roadmap" className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>Choose a career →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus note */}
      <section className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6">
        <div className="rounded-[16px] border p-5 sm:p-6" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
          <h3 className="text-sm font-semibold">Want to adjust the syllabus?</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">You asked to scrape boot.dev and freeCodeCamp as inspiration. This curriculum maps to their structure. Tell me which modules to add, remove, or expand and I will update it. Try a different accent or layout too.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border)" }}>Add DOM and Fetch projects</span>
            <span className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border)" }}>Add testing and tooling module</span>
            <span className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border)" }}>Switch to Warm Paper theme</span>
          </div>
        </div>
      </section>
    </div>
  );
}
