import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CopyButton } from "@/components/CopyButton";
import { ArrowLeft, Clock, Hammer, Check, Terminal, Code2, Lightbulb } from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="mx-auto max-w-[900px] px-4 pb-24 sm:px-6">
      <div className="pt-6 sm:pt-8">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-white">
          <ArrowLeft size={14} /> Back to projects
        </Link>
      </div>

      <div className="mt-6 rounded-[16px] border p-5 sm:p-7" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-black"><Hammer size={12} /> {project.level}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}><Clock size={12} /> {project.duration}</span>
          <span className="text-xs text-[var(--text-faint)]">{project.steps.length} steps</span>
        </div>
        <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight sm:text-[32px]">{project.title}</h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)] sm:text-[15px]">{project.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold tracking-widest text-[var(--text-faint)]">STEPS — follow in order. Copy any block.</p>
      </div>

      <div className="mt-4 grid gap-4">
        {project.steps.map((step, idx) => (
          <article key={step.id} className="overflow-hidden rounded-[14px] border bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-start gap-3 border-b p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">{idx + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-semibold leading-tight">{step.title}</h2>
                  <span className="rounded-full bg-black px-2 py-1 text-[11px] font-medium text-zinc-400">{step.duration}</span>
                </div>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[var(--accent)]"><Lightbulb size={12} /> {step.concept}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">{step.explain}</p>
              </div>
            </div>

            {step.terminal && (
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]"><Terminal size={12} /> Terminal</span>
                  <CopyButton text={step.terminal} />
                </div>
                <pre className="mt-3 overflow-x-auto rounded-[10px] border bg-black p-4 text-[12.5px] leading-6 text-zinc-100" style={{ borderColor: "var(--border)" }}><code>{step.terminal}</code></pre>
              </div>
            )}

            {step.code && (
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]"><Code2 size={12} /> {step.lang ?? "code"}</span>
                  <CopyButton text={step.code} />
                </div>
                <pre className="mt-3 overflow-x-auto rounded-[10px] border bg-black p-4 text-[12.5px] leading-6 text-zinc-100" style={{ borderColor: "var(--border)" }}><code>{step.code}</code></pre>
              </div>
            )}

            {step.tip && (
              <div className="mx-4 mb-4 rounded-[10px] border bg-[var(--accent-soft)] px-3 py-2.5 text-[13px] leading-5 text-[var(--text-muted)] sm:mx-5" style={{ borderColor: "rgba(245,158,11,0.22)" }}>
                <span className="font-semibold text-[var(--accent)]">Tip: </span>{step.tip}
              </div>
            )}

            {step.checklist && step.checklist.length > 0 && (
              <div className="border-t px-4 py-3 sm:px-5" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)]">Checklist</p>
                <ul className="mt-2 space-y-1.5">
                  {step.checklist.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[13px] leading-5 text-[var(--text-muted)]">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--success)]" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className="inline-flex h-11 items-center gap-2 rounded-full border bg-[var(--surface)] px-6 text-sm font-semibold hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
          <ArrowLeft size={16} /> All projects
        </Link>
        <Link href="/learn/m1l1" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]">
          Start lessons
        </Link>
      </div>
    </div>
  );
}