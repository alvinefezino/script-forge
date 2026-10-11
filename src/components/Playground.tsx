"use client";
import { useState } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";

function runJS(code: string): { out: string; error?: string } {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map((a) => {
      if (typeof a === "object" && a !== null) {
        try { return JSON.stringify(a); } catch { return String(a); }
      }
      return String(a);
    }).join(" ")),
  };
  try {
    const fn = new Function("console", code);
    fn(fakeConsole);
    return { out: logs.join("\n") };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const out = logs.join("\n");
    return { out: out ? out + "\n" + msg : msg, error: msg };
  }
}

export function Playground({ initialCode, expectedOutput }: { initialCode: string; expectedOutput?: string }) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [ran, setRan] = useState(false);

  const handleRun = () => {
    const r = runJS(code);
    setResult(r.out);
    setError(r.error);
    setRan(true);
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult("");
    setError(undefined);
    setRan(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="overflow-hidden rounded-[14px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" aria-hidden />
          <span className="ml-2 hidden text-xs font-medium tracking-widest text-[var(--text-muted)] sm:inline">EDITOR</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium text-[var(--text-muted)] hover:text-white hover:border-[var(--border-strong)]" style={{ borderColor: "var(--border)" }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={handleReset} className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium text-[var(--text-muted)] hover:text-white" style={{ borderColor: "var(--border)" }}>
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={handleRun} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-xs font-semibold text-black hover:bg-[var(--accent-hover)]">
            <Play size={14} fill="currentColor" /> Run
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--border)" }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-[300px] w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-5 text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] sm:h-[360px] sm:text-[13.5px]"
            style={{ touchAction: "manipulation" }}
          />
        </div>

        <div className="flex min-h-[180px] flex-col">
          <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "var(--border)" }}>
            <span className="text-[11px] font-semibold tracking-widest text-[var(--text-muted)]">OUTPUT</span>
            {ran && <span className={`text-[11px] font-medium ${error ? "text-[var(--danger)]" : "text-[var(--success)]"}`}>{error ? "Error" : "Finished"}</span>}
          </div>
          <pre className={`flex-1 whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-5 ${error ? "text-[#FCA5A5]" : "text-[var(--text-muted)]"}`}>
            {ran ? (result || "(no output)") : "Tap Run to see output. Edit the code first if you want to experiment."}
          </pre>
          {expectedOutput && (
            <div className="border-t px-3 py-2.5" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[11px] font-semibold tracking-widest text-[var(--text-muted)]">EXPECTED</p>
              <pre className="mt-1 whitespace-pre-wrap break-words font-mono text-xs leading-4 text-[var(--text-faint)]">{expectedOutput}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
