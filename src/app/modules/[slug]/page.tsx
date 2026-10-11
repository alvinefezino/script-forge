import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { Clock, ArrowLeft, Play } from "lucide-react";

export function generateStaticParams() {
  return curriculum.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = curriculum.find((m) => m.slug === slug);
  if (!mod) return notFound();
  const idx = curriculum.findIndex((m) => m.slug === slug);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="pt-6 sm:pt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-white">
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>

      <div className="mt-6 rounded-[16px] border p-5 sm:p-7" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest" style={{ borderColor: "var(--border)", color: mod.track === "TypeScript" ? "var(--accent)" : "var(--text-muted)" }}>
            {mod.track.toUpperCase()}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-widest text-black">{mod.level.toUpperCase()}</span>
          <span className="text-xs text-[var(--text-faint)]">Module {(idx + 1).toString().padStart(2, "0")} of {curriculum.length.toString().padStart(2, "0")}</span>
        </div>
        <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">{mod.title}</h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--text-muted)] sm:text-[15px]">{mod.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--text-faint)]">
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5" style={{ borderColor: "var(--border)" }}><Clock size={14} /> {mod.lessons.reduce((s, l) => s + parseInt(l.duration), 0)} min total</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5" style={{ borderColor: "var(--border)" }}>{mod.lessons.length} lessons</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {mod.lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.id}`}
            className="group flex items-center gap-4 rounded-[14px] border p-4 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface)] sm:p-5"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold leading-5 group-hover:text-white sm:text-[15px]">{lesson.title}</h3>
                <span className="rounded-full border px-2 py-0.5 text-[11px] text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>{lesson.duration}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--text-muted)]">{lesson.description}</p>
            </div>
            <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black group-hover:bg-[var(--accent)] sm:inline-flex">
              <Play size={14} fill="currentColor" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {idx > 0 && (
          <Link href={`/modules/${curriculum[idx - 1].slug}`} className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium hover:bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
            Previous module
          </Link>
        )}
        {idx < curriculum.length - 1 && (
          <Link href={`/modules/${curriculum[idx + 1].slug}`} className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-black">
            Next module
          </Link>
        )}
        <Link href={`/learn/${mod.lessons[0].id}`} className="inline-flex h-11 items-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]">
          Start this module
        </Link>
      </div>
    </div>
  );
}
