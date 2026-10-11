import Link from "next/link";
import { roadmapPhases, careerPaths, roadmapStats } from "@/data/roadmap";
import { ArrowRight, Map, Clock, GraduationCap, Hammer, Layers, Route, Compass, Trophy, ChevronRight, Sparkles, Target, Zap } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-6">
      {/* HERO */}
      <div className="pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden />
          Your path from first line to shipped product
        </div>
        <h1 className="mt-4 text-[30px] font-semibold leading-[0.9] tracking-tight sm:text-[46px]">
          Roadmap <span className="text-[var(--text-muted)]">from</span> <span className="text-[var(--accent)]">zero</span> <span className="text-[var(--text-muted)]">to</span> shipped.
        </h1>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-6 text-[var(--text-muted)]">
          Eight phases, 27 lessons, three projects. Follow in order or jump to what you need. Every phase ends with something you can run and demo.
        </p>

        {/* Stats — the cool strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="relative overflow-hidden rounded-[14px] border bg-[var(--surface)] p-4 sm:p-5" style={{ borderColor: "var(--border)" }}>
            <div className="absolute -right-2 -top-2 text-[56px] font-bold leading-none text-white/[0.04] select-none">08</div>
            <p className="text-[28px] font-semibold leading-none tracking-tight">{String(roadmapStats.phases).padStart(2, "0")}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--text-faint)]">Phases</p>
            <p className="mt-2 text-xs leading-4 text-[var(--text-muted)]">Foundations to shipping</p>
          </div>
          <div className="relative overflow-hidden rounded-[14px] border bg-[var(--surface)] p-4 sm:p-5" style={{ borderColor: "var(--border)" }}>
            <div className="absolute -right-2 -top-2 text-[56px] font-bold leading-none text-white/[0.04] select-none">27</div>
            <p className="text-[28px] font-semibold leading-none tracking-tight">{roadmapStats.lessons}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--text-faint)]">Lessons</p>
            <p className="mt-2 text-xs leading-4 text-[var(--text-muted)]">Each runnable</p>
          </div>
          <div className="relative overflow-hidden rounded-[14px] border bg-[var(--accent)] p-4 sm:p-5">
            <div className="absolute -right-1 -top-1 text-[56px] font-bold leading-none text-black/[0.08] select-none">8H</div>
            <p className="text-[28px] font-semibold leading-none tracking-tight text-black">{Math.floor(roadmapStats.minutes / 60)}h {roadmapStats.minutes % 60}m</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-black/60">Total time</p>
            <p className="mt-2 text-xs leading-4 text-black/60">At your pace</p>
          </div>
          <div className="relative overflow-hidden rounded-[14px] border bg-[var(--surface)] p-4 sm:p-5" style={{ borderColor: "var(--border)" }}>
            <div className="absolute -right-2 -top-2 text-[56px] font-bold leading-none text-white/[0.04] select-none">03</div>
            <p className="text-[28px] font-semibold leading-none tracking-tight">{String(roadmapStats.projects).padStart(2, "0")}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--text-faint)]">Projects</p>
            <p className="mt-2 text-xs leading-4 text-[var(--text-muted)]">Portfolio, blog, store</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/learn/m1l1" className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]">
            Start at phase 01 <ArrowRight size={14} />
          </Link>
          <Link href="/projects" className="inline-flex h-10 items-center gap-2 rounded-full border bg-[var(--surface)] px-5 text-sm font-semibold hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
            <Hammer size={14} /> Jump to projects
          </Link>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-8 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><span className="h-2 w-2 rounded-full bg-[var(--accent)]" /> JavaScript track</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><span className="h-2 w-2 rounded-full bg-white" /> TypeScript track</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><span className="h-2 w-2 rounded-full bg-zinc-600" /> Ship</span>
      </div>

      {/* TIMELINE */}
      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Route size={16} className="text-[var(--accent)]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-faint)]">The path</h2>
          <span className="h-px flex-1 bg-[var(--border)]" aria-hidden />
        </div>

        <div className="relative mt-6">
          {/* vertical line — mobile left, desktop center */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-[var(--border)] sm:left-1/2 sm:-translate-x-px" aria-hidden />

          <div className="grid gap-6">
            {roadmapPhases.map((phase, i) => {
              const isEven = i % 2 === 0;
              const isTS = phase.n === "06" || phase.n === "07";
              const isShip = phase.n === "08";
              return (
                <div key={phase.n} className={`relative flex gap-4 sm:gap-6 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* dot */}
                  <div className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${isShip ? "bg-[var(--accent)] text-black border-[var(--accent)]" : isTS ? "bg-white text-black border-white" : "bg-[var(--accent)] text-black border-[var(--accent)]"}`}>
                      {phase.n}
                    </span>
                  </div>

                  {/* spacer for desktop alternating */}
                  <div className="hidden flex-1 sm:block" aria-hidden />

                  {/* card */}
                  <div className="ml-12 flex-1 sm:ml-0">
                    <Link href={phase.href} className="group block overflow-hidden rounded-[16px] border bg-[var(--surface)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
                      <div className="relative p-5 sm:p-6">
                        {/* big ghost number */}
                        <span className="pointer-events-none absolute right-4 top-3 text-[56px] font-bold leading-none text-white/[0.04] sm:text-[64px]">{phase.n}</span>
                        <div className="relative">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${isShip ? "bg-[var(--accent)] text-black" : isTS ? "bg-white text-black" : "bg-zinc-800 text-zinc-200"}`}>
                              {isShip ? "Ship" : isTS ? "TypeScript" : "JavaScript"} · {phase.minutes} min
                            </span>
                            <span className="text-xs text-[var(--text-faint)]">{phase.lessons.length} lessons</span>
                          </div>
                          <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-tight group-hover:text-white sm:text-[19px]">{phase.title}</h3>
                          <p className="mt-1 text-[13.5px] leading-5 text-[var(--text-muted)]">{phase.subtitle}</p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {phase.skills.map((s) => (
                              <span key={s} className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>{s}</span>
                            ))}
                          </div>

                          <ul className="mt-3 space-y-1.5">
                            {phase.lessons.map((l) => (
                              <li key={l} className="flex items-center gap-2 text-[13px] leading-5 text-[var(--text-muted)]">
                                <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--text-faint)]" aria-hidden /> {l}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-3 inline-flex items-start gap-1.5 rounded-[10px] bg-[var(--accent-soft)] px-3 py-2 text-[12.5px] leading-5 text-[var(--text-muted)]" style={{ border: "1px solid rgba(245,158,11,0.18)" }}>
                            <Trophy size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" /> <span><span className="font-semibold text-[var(--accent)]">Deliverable:</span> {phase.deliverable}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t px-5 py-3 text-sm font-semibold sm:px-6" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
                        <span className="text-[var(--accent)] inline-flex items-center gap-1.5">{phase.cta} <ArrowRight size={14} className="transition group-hover:translate-x-0.5" /></span>
                        <span className="text-xs font-medium text-[var(--text-faint)]">Phase {phase.n} →</span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* end cap */}
          <div className="relative mt-2 flex justify-center sm:justify-center">
            <span className="ml-12 inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] sm:ml-0" style={{ borderColor: "var(--border)" }}>
              <Sparkles size={14} className="text-[var(--accent)]" /> You are ready to ship
            </span>
          </div>
        </div>
      </section>

      {/* CAREER PATHS */}
      <section className="mt-12">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-[var(--accent)]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-faint)]">Where this takes you</h2>
          <span className="h-px flex-1 bg-[var(--border)]" aria-hidden />
        </div>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)]">Finish the roadmap and you have three honest paths. Pick one and we show the next steps.</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {careerPaths.map((c) => (
            <div key={c.role} className="relative overflow-hidden rounded-[16px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent-soft)] blur-2xl" aria-hidden />
              <div className="relative">
                <div className="inline-flex rounded-full border bg-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-300" style={{ borderColor: "var(--border)" }}>{c.level}</div>
                <h3 className="mt-3 text-[17px] font-semibold leading-tight">{c.role}</h3>
                <p className="mt-1 text-[13.5px] leading-5 text-[var(--text-muted)]">{c.tagline}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]">Focus</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.focus.map((f) => (
                      <span key={f} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]">Prove it with</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.projects.map((pr) => (
                      <span key={pr} className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><Hammer size={12} /> {pr}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-[12px] border bg-black p-3" style={{ borderColor: "var(--border)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]">Next steps</p>
                  <ul className="mt-2 space-y-1.5">
                    {c.nextSteps.map((s) => (
                      <li key={s} className="flex gap-2 text-[13px] leading-5 text-[var(--text-muted)]">
                        <ChevronRight size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACE + CTA */}
      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[16px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 text-[var(--accent)]"><Zap size={16} /> <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]">At your pace</span></div>
          <h3 className="mt-2 text-[18px] font-semibold tracking-tight">Three ways to go</h3>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-[12px] border bg-black px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm font-medium">Sprint</span><span className="text-xs text-[var(--text-muted)]">2 lessons a day — finish in 2 weeks</span>
            </div>
            <div className="flex items-center justify-between rounded-[12px] border bg-[var(--accent)] px-4 py-3 text-black">
              <span className="text-sm font-semibold">Steady</span><span className="text-xs font-medium text-black/70">1 lesson a day — finish in 4 weeks</span>
            </div>
            <div className="flex items-center justify-between rounded-[12px] border bg-black px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm font-medium">Weekend</span><span className="text-xs text-[var(--text-muted)]">4 lessons on weekends — finish in 7 weeks</span>
            </div>
          </div>
        </div>
        <div className="rounded-[16px] border bg-white p-6 text-black sm:p-7">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"><Target size={16} /></div>
          <h3 className="mt-4 text-[20px] font-semibold leading-tight tracking-tight">Start now. Your progress saves on this device.</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">No account needed. Open any lesson, run the code, and come back where you left off.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/learn/m1l1" className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-zinc-900">Start phase 01 <ArrowRight size={14} /></Link>
            <Link href="/modules/js-foundations" className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold hover:bg-zinc-50">View curriculum</Link>
          </div>
        </div>
      </section>
    </div>
  );
}