"use client";
import { useState } from "react";

export function Quiz({ q, options, answer, explain }: { q: string; options: string[]; answer: number; explain: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const show = picked !== null;
  const correct = picked === answer;

  return (
    <div className="rounded-[14px] border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">QUICK CHECK</p>
      <p className="mt-2 text-sm font-medium leading-6">{q}</p>
      <div className="mt-3 grid gap-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === answer;
          let cls = "border-[var(--border)] bg-transparent hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]";
          if (show) {
            if (isAnswer) cls = "border-[var(--success)] bg-[rgba(34,197,94,0.08)]";
            else if (isPicked && !correct) cls = "border-[var(--danger)] bg-[rgba(229,72,77,0.08)]";
            else cls = "border-[var(--border)] opacity-60";
          } else if (isPicked) {
            cls = "border-white bg-white text-black";
          }
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={show}
              className={`rounded-[10px] border px-4 py-3 text-left text-sm font-medium transition ${cls}`}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs" style={{ borderColor: "currentColor", opacity: 0.6 }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {show && (
        <div className={`mt-3 rounded-[10px] border px-3 py-3 text-sm leading-6 ${correct ? "border-[var(--success)] bg-[rgba(34,197,94,0.08)]" : "border-[var(--danger)] bg-[rgba(229,72,77,0.08)]"}`}>
          <span className="font-semibold">{correct ? "Correct. " : "Not quite. "}</span>
          {explain}
        </div>
      )}
    </div>
  );
}
