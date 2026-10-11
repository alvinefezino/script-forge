import Link from "next/link";
import { notFound } from "next/navigation";
import { curriculum, getLessonById, nextLesson } from "@/data/curriculum";
import { Playground } from "@/components/Playground";
import { Quiz } from "@/components/Quiz";
import { ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from "lucide-react";
import { LessonClientChrome } from "./LessonClientChrome";

export function generateStaticParams() {
  return curriculum.flatMap((m) => m.lessons.map((l) => ({ slug: [l.id] })));
}

export default async function LearnPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const id = slug?.[0] ?? "m1l1";
  const found = getLessonById(id);
  if (!found) return notFound();
  const { mod, lesson } = found;
  const nav = nextLesson(id);
  const lessonIndex = nav ? nav.index + 1 : 1;
  const total = nav ? nav.total : curriculum.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 sm:pt-8">
        <Link href={`/modules/${mod.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-white">
          <ArrowLeft size={14} /> {mod.title}
        </Link>
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
          Lesson {lessonIndex} of {total} - {lesson.duration}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${(lessonIndex / total) * 100}%` }} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[var(--text-muted)]" style={{ borderColor: "var(--border)" }}>
              {mod.track.toUpperCase()}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-widest text-black">{mod.level.toUpperCase()}</span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-faint)]"><BookOpen size={14} />{mod.title}</span>
          </div>
          <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">{lesson.title}</h1>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-6 text-[var(--text-muted)]">{lesson.description}</p>

          <div className="mt-6 rounded-[14px] border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">IN PLAIN LANGUAGE</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Read the code, change one line at a time, then tap Run. The takeaways are what to remember for the next lesson.</p>
            <ul className="mt-4 grid gap-2">
              {lesson.takeaways.map((t) => (
                <li key={t} className="flex gap-2 text-sm leading-5 text-[var(--text)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight">Try it yourself</h2>
              <span className="text-xs text-[var(--text-faint)]">Editable. Runs on your device.</span>
            </div>
            <Playground initialCode={lesson.code} expectedOutput={lesson.expectedOutput} />
            <p className="mt-2 text-xs leading-4 text-[var(--text-faint)]">Tip: on mobile tap the code to edit, then Run. Reset brings the original back.</p>
          </div>

          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="mt-6 grid gap-3">
              {lesson.quiz.map((q, i) => (
                <Quiz key={i} q={q.q} options={q.options} answer={q.answer} explain={q.explain} />
              ))}
            </div>
          )}

          <LessonClientChrome lessonId={lesson.id} nextHref={nav?.next ? `/learn/${nav.next.lesson.id}` : null} prevHref={nav?.prev ? `/learn/${nav.prev.lesson.id}` : null} nextLabel={nav?.next ? nav.next.lesson.title : null} />

          <div className="mt-6 grid grid-cols-2 gap-3">
            {nav?.prev ? (
              <Link href={`/learn/${nav.prev.lesson.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-3 text-sm font-medium hover:bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
                <ChevronLeft size={16} /> Previous
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full border px-4 py-3 text-sm text-[var(--text-faint)]" style={{ borderColor: "var(--border)" }}>Start</span>
            )}
            {nav?.next ? (
              <Link href={`/learn/${nav.next.lesson.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black">
                Next <ChevronRight size={16} />
              </Link>
            ) : (
              <Link href="/" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black">
                Back to home <ChevronRight size={16} />
              </Link>
            )}
          </div>

          <div className="mt-6 rounded-[12px] border px-4 py-3 text-xs leading-5 text-[var(--text-muted)]" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
            Inspired by boot.dev and freeCodeCamp. Same idea order, rewritten to be short and runnable on a phone.
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-[68px] rounded-[14px] border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            <p className="text-xs font-semibold tracking-widest text-[var(--text-muted)]">IN THIS MODULE</p>
            <p className="mt-1 text-sm font-semibold">{mod.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{mod.lessons.length} lessons</p>
            <div className="mt-4 grid gap-1.5">
              {mod.lessons.map((l) => {
                const active = l.id === lesson.id;
                return (
                  <Link key={l.id} href={`/learn/${l.id}`} className={`rounded-[10px] border px-3 py-2.5 text-sm ${active ? "border-white bg-white text-black" : "border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-[var(--surface-raised)] hover:text-white"}`}>
                    <span className="flex items-center justify-between gap-2"><span className="line-clamp-1">{l.title}</span>{active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black" aria-hidden />}</span>
                  </Link>
                );
              })}
            </div>
            <Link href={`/modules/${mod.slug}`} className="mt-4 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
              View all in module
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-8 lg:hidden">
        <h3 className="text-sm font-semibold">More in {mod.title}</h3>
        <div className="mt-3 grid gap-2">
          {mod.lessons.map((l) => (
            <Link key={l.id} href={`/learn/${l.id}`} className={`flex items-center justify-between rounded-[12px] border px-4 py-3 text-sm ${l.id === lesson.id ? "border-white bg-white font-semibold text-black" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]"}`}>
              <span>{l.title}</span>
              <span className="text-xs opacity-60">{l.duration}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}