import Link from "next/link";
import { projects, dependenciesExplained, howNextWorks } from "@/data/projects";
import { ArrowRight, Hammer, Layers, Package, Terminal, Clock, GraduationCap } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-6">
      {/* Hero */}
      <div className="pt-8 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
          Build real apps. No video buffering. Copy, paste, run.
        </div>
        <h1 className="mt-4 text-[30px] font-semibold leading-[0.95] tracking-tight sm:text-[42px]">
          Projects <span className="text-[var(--text-muted)]">with</span> <span className="text-[var(--accent)]">Next.js</span>
        </h1>
        <p className="mt-3 max-w-[60ch] text-[15px] leading-6 text-[var(--text-muted)]">
          Three full frontend projects. Each one is a set of steps you follow in your terminal and editor. Before you build, learn how Next.js works, how to install it, and what every dependency does.
        </p>
      </div>

      {/* How Next.js works */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">How Next.js works</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {howNextWorks.map((c) => (
            <div key={c.title} className="rounded-[14px] border bg-[var(--surface)] p-5" style={{ borderColor: "var(--border)" }}>
              <div className="text-sm font-semibold">{c.title}</div>
              <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to download / install */}
      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">How to download Next.js</h2>
        </div>
        <div className="mt-4 rounded-[14px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
          <div className="text-sm font-semibold">You need Node 18.18 or newer</div>
          <p className="mt-1 text-[13.5px] leading-5 text-[var(--text-muted)]">Next.js is not a download button. It is an npm package scaffolded by create-next-app. Node gives you npm. npm gives you Next.js.</p>
          <div className="mt-4 rounded-[10px] border bg-black p-4" style={{ borderColor: "var(--border)" }}>
            <div className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-faint)]">Terminal</div>
            <pre className="mt-2 overflow-x-auto text-[13px] leading-6 text-zinc-100">
              <code>{`# 1 Check Node\nnode -v\n# need 18.18+ — if older, install from nodejs.org\n\n# 2 Scaffold a new app\nnpx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"\n\n# 3 Run it\ncd my-app\nnpm run dev\n# open http://localhost:3000`}</code>
            </pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>--typescript adds type checking</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>--tailwind adds utility CSS</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>--eslint adds lint rules</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>--app uses App Router</span>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Dependencies — what each package does</h2>
        </div>
        {/* Mobile cards */}
        <div className="mt-4 grid gap-3 md:hidden">
          {dependenciesExplained.map((d) => (
            <div key={d.name} className="rounded-[14px] border bg-[var(--surface)] p-4" style={{ borderColor: "var(--border)" }}>
              <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">{d.name}</div>
              <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">{d.why}</p>
              <p className="mt-2 text-xs text-[var(--text-faint)]">When: {d.when}</p>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <div className="mt-4 hidden overflow-hidden rounded-[14px] border md:block" style={{ borderColor: "var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--surface-raised)] text-xs uppercase tracking-widest text-[var(--text-faint)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Package</th>
                  <th className="px-4 py-3 font-medium">What it does</th>
                  <th className="px-4 py-3 font-medium">When you need it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {dependenciesExplained.map((d) => (
                  <tr key={d.name} className="bg-[var(--surface)]">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-[var(--accent)]">{d.name}</td>
                    <td className="px-4 py-3 text-[13.5px] leading-5 text-[var(--text-muted)]">{d.why}</td>
                    <td className="px-4 py-3 text-xs leading-5 text-[var(--text-faint)]">{d.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Hammer size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Build these</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="group flex flex-col rounded-[14px] border bg-[var(--surface)] p-5 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${p.level === "Beginner" ? "bg-[var(--accent)] text-black" : p.level === "Intermediate" ? "bg-white text-black" : "bg-zinc-800 text-white"}`}>{p.level}</span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-faint)]"><Clock size={12} />{p.duration}</span>
              </div>
              <h3 className="mt-3 text-[17px] font-semibold leading-tight group-hover:text-white">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>{s}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
                View steps <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
              </div>
              <div className="mt-3 text-xs text-[var(--text-faint)]">{p.steps.length} steps</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/modules/js-foundations" className="inline-flex h-11 items-center gap-2 rounded-full border bg-[var(--surface)] px-6 text-sm font-semibold hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
          <GraduationCap size={16} /> Back to modules
        </Link>
      </div>
    </div>
  );
}