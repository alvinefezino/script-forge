import Link from "next/link";
import { projects, dependenciesExplained, howNextWorks, pathsExplained, whyNextVsPlain, offlineHow } from "@/data/projects";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Hammer, Layers, Package, Terminal, Clock, GraduationCap, Folder, Globe, Wifi, WifiOff, FileText, ArrowUpRight } from "lucide-react";

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
        <p className="mt-3 max-w-[64ch] text-[15px] leading-6 text-[var(--text-muted)]">
          Three full frontend projects. Each one is steps you follow in your terminal and editor. Before you build, learn how Next.js works, how to install it, what every dependency does, how directories and paths work, why a framework beats opening an .html file, and how this site runs offline.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link href="#dirs" className="rounded-full border px-3 py-1.5 text-[var(--text-muted)] hover:bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>Directories and paths ↓</Link>
          <Link href="#why-not-html" className="rounded-full border px-3 py-1.5 text-[var(--text-muted)] hover:bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>Why not just HTML? ↓</Link>
          <Link href="#offline" className="rounded-full bg-[var(--accent)] px-3 py-1.5 font-semibold text-black">Works offline ↓</Link>
        </div>
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
        <p className="mt-3 text-xs leading-5 text-[var(--text-faint)]">In short: folders are routes, components render on the server first, the build splits JS by page, and the dev server hot-reloads without a full refresh.</p>
      </section>

      {/* How to download / install */}
      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">How to download Next.js</h2>
        </div>
        <div className="mt-4 rounded-[14px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
          <div className="text-sm font-semibold">You need Node 18.18 or newer</div>
          <p className="mt-1 text-[13.5px] leading-5 text-[var(--text-muted)]">Next.js is not a download button. It is an npm package scaffolded by create-next-app. Node gives you npm. npm gives you Next.js. npm is the package manager — like an app store for code.</p>
          <div className="mt-4 rounded-[10px] border bg-black p-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-faint)]">Terminal</span>
              <CopyButton text={`node -v\n# need 18.18+ — if older, install from nodejs.org\n\nnpx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias \"@/*\"\n\ncd my-app\nnpm run dev\n# open http://localhost:3000`} />
            </div>
            <pre className="mt-2 overflow-x-auto text-[13px] leading-6 text-zinc-100"><code>{`# 1 Check Node\nnode -v\n# need 18.18+ — if older, install from nodejs.org\n\n# 2 Scaffold a new app\nnpx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"\n\n# 3 Run it\ncd my-app\nnpm run dev\n# open http://localhost:3000`}</code></pre>
          </div>
          <div className="mt-3 rounded-[10px] border bg-[var(--accent-soft)] px-3 py-2.5 text-xs leading-5 text-[var(--text-muted)]" style={{ borderColor: "rgba(245,158,11,0.18)" }}>
            <span className="font-semibold text-[var(--accent)]">What those flags mean:</span> --typescript adds type checking · --tailwind adds utility CSS · --eslint adds lint rules · --app uses App Router · --src-dir puts code in src/ · --import-alias "@/ *" lets you write @/components/Button.
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><code className="font-mono text-xs">npm run dev</code> — Turbopack dev + HMR</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><code className="font-mono text-xs">npm run build</code> — type check + static pages</span>
            <span className="rounded-full border px-3 py-1.5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><code className="font-mono text-xs">npm run lint</code> — ESLint</span>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Dependencies — what each package does</h2>
        </div>
        <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">Dependencies are code other people wrote that your project reuses. They live in <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">node_modules/</code> and are listed in <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">package.json</code>. You never edit <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">node_modules</code> by hand — npm manages it.</p>
        {/* Mobile cards */}
        <div className="mt-4 grid gap-3 md:hidden">
          {dependenciesExplained.map((d) => (
            <div key={d.name} className="rounded-[14px] border bg-[var(--surface)] p-4" style={{ borderColor: "var(--border)" }}>
              <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">{d.name}</div>
              <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">{d.why}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--text-faint)]">{d.when}</p>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <div className="mt-4 hidden overflow-hidden rounded-[14px] border md:block" style={{ borderColor: "var(--border)" }}>
          <table className="w-full border-collapse text-left text-sm">
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
        <div className="mt-3 rounded-[10px] border bg-black p-4" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-faint)]">Try it</span>
            <CopyButton text={"npm install\nnpm uninstall tailwindcss\nnpm install sharp\nnpm run build"} />
          </div>
          <pre className="mt-2 overflow-x-auto text-[13px] leading-6 text-zinc-100"><code>{`npm install          # read package.json and install node_modules\nnpm uninstall tailwindcss   # remove a dependency\nnpm install sharp            # add image optimization locally\nnpm run build                # shows which routes are static vs dynamic`}</code></pre>
        </div>
      </section>

      {/* DIRECTORIES AND PATHS */}
      <section id="dirs" className="mt-8 scroll-mt-20">
        <div className="flex items-center gap-2">
          <Folder size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Directories, relative and absolute paths</h2>
        </div>
        <p className="mt-2 max-w-[64ch] text-[13.5px] leading-6 text-[var(--text-muted)]">If paths confuse you, this is the section. A directory is a folder. Directories nest — your project is a tree. Knowing absolute vs relative paths explains why imports look different and why your app finds files where it expects them.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pathsExplained.map((c) => (
            <div key={c.title} className="rounded-[14px] border bg-[var(--surface)] p-5" style={{ borderColor: "var(--border)" }}>
              <div className="text-sm font-semibold">{c.title}</div>
              <p className="mt-2 text-[13.5px] leading-5 text-[var(--text-muted)]">{c.desc}</p>
              <div className="relative mt-3">
                <div className="absolute right-2 top-2"><CopyButton text={c.example} /></div>
                <pre className="overflow-x-auto rounded-[10px] border bg-black p-4 pr-12 text-[12px] leading-5 text-zinc-100" style={{ borderColor: "var(--border)" }}><code>{c.example}</code></pre>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-[10px] border bg-[var(--accent-soft)] px-3 py-2.5 text-xs leading-5 text-[var(--text-muted)]" style={{ borderColor: "rgba(245,158,11,0.18)" }}>
          <span className="font-semibold text-[var(--accent)]">Rule of thumb:</span> absolute is <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-200">/src/app/page.tsx</code> or <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-200">@/app/page.tsx</code> — same from anywhere. Relative is <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-200">./Button</code> and <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-200">../layout.tsx</code> — depends where the file lives. Prefer <code className="rounded bg-black px-1 py-0.5 font-mono text-[11px] text-zinc-200">@/</code> so moves do not break imports.
        </div>
      </section>

      {/* WHY NOT JUST HTML + LIVE SERVER */}
      <section id="why-not-html" className="mt-8 scroll-mt-20">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Why Next.js and React are not just HTML + Live Server</h2>
        </div>
        <div className="rounded-[14px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
          <p className="text-[13.5px] leading-6 text-[var(--text-muted)]">{whyNextVsPlain.intro}</p>
          <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">When you double-click an <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">index.html</code> you open it with <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">file://</code>. Live Server fixes that by serving over <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs text-zinc-200">http://</code> so fetch and relative links work. Both still serve raw static files — no components, no bundling, no routing, no data layer. Next.js adds all of that.</p>
          {/* Mobile stacked */}
          <div className="mt-4 grid gap-3 md:hidden">
            {whyNextVsPlain.rows.map((r) => (
              <div key={r.plain} className="rounded-[12px] border bg-black p-4" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Just HTML + Live Server</p>
                <p className="mt-1 text-[13px] leading-5 text-zinc-400">{r.plain}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">With Next.js + React</p>
                <p className="mt-1 text-[13px] leading-5 text-zinc-100">{r.next}</p>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <div className="mt-4 hidden overflow-hidden rounded-[12px] border md:block" style={{ borderColor: "var(--border)" }}>
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-black text-xs uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium"><span className="inline-flex items-center gap-1.5"><FileText size={12} /> Just HTML + Live Server</span></th>
                  <th className="px-4 py-3 font-medium"><span className="inline-flex items-center gap-1.5"><Layers size={12} /> Next.js + React</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {whyNextVsPlain.rows.map((r) => (
                  <tr key={r.plain} className="bg-[var(--surface)]">
                    <td className="px-4 py-3 text-[13px] leading-5 text-[var(--text-muted)]">{r.plain}</td>
                    <td className="px-4 py-3 text-[13px] leading-5 text-white">{r.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-[10px] border bg-[var(--surface-raised)] px-3 py-2.5 text-xs leading-5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
            <span className="font-semibold text-white">Bottom line:</span> {whyNextVsPlain.closing}
          </div>
        </div>
      </section>

      {/* OFFLINE */}
      <section id="offline" className="mt-8 scroll-mt-20">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-[var(--accent)]" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Make it run offline — install this site like an app</h2>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[14px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-black"><WifiOff size={12} /> Works offline</div>
            <h3 className="mt-3 text-[16px] font-semibold tracking-tight">What happens offline</h3>
            <ul className="mt-3 space-y-2">
              {offlineHow.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-[13.5px] leading-5 text-[var(--text-muted)]"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden /> {pt}</li>
              ))}
            </ul>
            <div className="mt-4 rounded-[10px] border bg-black p-4" style={{ borderColor: "var(--border)" }}>
              <div className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-faint)]">Service Worker is already active</div>
              <p className="mt-2 text-[13px] leading-5 text-zinc-300">You do not need to configure anything for your own projects to be offline-capable. The pattern is: <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-xs text-zinc-100">manifest</code> + <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-xs text-zinc-100">service worker</code> + cache pages you visit.</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/offline" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-black">View offline page <ArrowUpRight size={12} /></Link>
              <a href="/manifest.webmanifest" className="inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}><FileText size={12} /> manifest.webmanifest</a>
            </div>
          </div>
          <div className="rounded-[14px] border bg-white p-5 sm:p-6">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white"><Wifi size={14} /></div>
            <h3 className="mt-3 text-[16px] font-semibold leading-tight tracking-tight text-black">Add to Home Screen</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[13.5px] leading-5 text-zinc-600">
              <li><span className="font-semibold text-black">Android Chrome:</span> menu (⋮) → Add to Home screen → Add.</li>
              <li><span className="font-semibold text-black">iPhone Safari:</span> Share → Add to Home Screen → Add.</li>
              <li><span className="font-semibold text-black">Desktop Chrome:</span> address bar install icon → Install.</li>
            </ol>
            <p className="mt-3 text-xs leading-5 text-zinc-500">After installing, open from your home screen. Pages you have visited open even with airplane mode on. New pages need one online visit to cache.</p>
            <div className="mt-4 rounded-[10px] border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
              For your own Next.js app, copy <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px] text-black">public/sw.js</code> and the manifest from this repo — they work on any Next.js build.
            </div>
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
        <Link href="/roadmap" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-100">View roadmap</Link>
      </div>
    </div>
  );
}