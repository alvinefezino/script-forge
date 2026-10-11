"use client";
import { useAuth } from "@/components/AuthProvider";
import { useProgress } from "@/components/ProgressProvider";
import { Award, Download, Share2, Check, Lock } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

function firstName(user:any){
  const f=user?.user_metadata?.full_name as string|undefined;
  if(f && f.trim()) return f.trim();
  return user?.email ?? "Learner";
}

export default function CertificatePage(){
  const { user } = useAuth();
  const { isComplete, completedCount, completedProjectsCount, xp, level, streak } = useProgress();
  const name = firstName(user);
  const date = new Date().toLocaleDateString("en-US",{ year:"numeric", month:"long", day:"numeric"});
  const ref = useRef<HTMLDivElement>(null);

  const doPrint=()=>{
    if(!ref.current) return;
    const w=window.open("","_blank");
    if(!w) return;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Script Forge Certificate - ${name}</title><style>
      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
      body{margin:0;background:#0A0A0A;color:#FAFAFA;font-family:Geist,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
      .card{border:1px solid rgba(255,255,255,0.12);border-radius:16px;background:#000;padding:32px;max-width:720px;width:100%;text-align:center}
      .badge{display:inline-flex;align-items:center;gap:8px;background:#F59E0B;color:#000;border-radius:999px;padding:8px 14px;font-weight:700;font-size:13px}
      h1{font-size:28px;margin:16px 0 6px;letter-spacing:-0.02em}
      .name{font-size:22px;font-weight:700;margin:12px 0}
      .meta{color:#A1A1A1;font-size:13px;margin-top:10px}
      .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}
      .stat{border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;background:#0A0A0A}
      .stat b{font-size:18px}
      .stat span{color:#737373;font-size:11px;letter-spacing:0.08em}
      @media print{body{background:white;color:black} .card{border-color:#ddd;background:white}}
    </style></head><body>${ref.current.outerHTML}</body></html>`);
    w.document.close(); w.focus(); setTimeout(()=>w.print(), 400);
  };

  if(!isComplete){
    return (
      <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6">
        <div className="rounded-[16px] border p-6 text-center sm:p-8 animate-in" style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor:"var(--border)", background:"var(--surface-raised)" }}><Lock size={20} className="text-[var(--text-faint)]" /></div>
          <h1 className="mt-4 text-[22px] font-semibold tracking-tight">Certificate locked</h1>
          <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-[var(--text-muted)]">Finish all 27 lessons and ship all 3 projects to unlock your certificate. You are at {completedCount}/27 lessons and {completedProjectsCount}/3 projects.</p>
          <div className="mt-3 flex justify-center gap-2 text-xs">
            <span className="rounded-full border px-3 py-1" style={{ borderColor:"var(--border)" }}>{completedCount}/27 lessons</span>
            <span className="rounded-full border px-3 py-1" style={{ borderColor:"var(--border)" }}>{completedProjectsCount}/3 projects</span>
            <span className="rounded-full border px-3 py-1" style={{ borderColor:"var(--border)" }}>Lv {level} · {xp} XP</span>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Link href="/learn/m1l1" className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black">Continue learning</Link>
            <Link href="/achievements" className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor:"var(--border)" }}>View achievements</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[780px] px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-[22px] font-semibold tracking-tight sm:text-[26px] flex items-center gap-2"><Award className="text-[var(--accent)]" size={22} /> Certificate</h1>
        <button onClick={doPrint} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"><Download size={14} /> Print / Save PDF</button>
      </div>

      <div ref={ref} className="mt-6 overflow-hidden rounded-[16px] border bg-[var(--bg)] p-6 text-center sm:p-8 animate-in" style={{ borderColor:"rgba(245,158,11,0.35)" }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-bold tracking-widest text-black"><Award size={14} /> SCRIPT FORGE</div>
        <h2 className="mt-4 text-[26px] font-semibold tracking-tight sm:text-[30px]">Certificate of Completion</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">This certifies that</p>
        <p className="mt-3 text-[22px] font-bold tracking-tight sm:text-[26px] animate-bounce-subtle inline-block">{name}</p>
        <p className="mx-auto mt-3 max-w-[560px] text-sm leading-6 text-[var(--text-muted)]">has completed all 27 lessons and shipped all 3 projects in Script Forge — JavaScript and TypeScript by doing. Built mobile first, explanatory, and offline ready.</p>
        <div className="mx-auto mt-6 grid max-w-[560px] grid-cols-3 gap-3 text-center">
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--surface)" }}><p className="text-lg font-bold">{completedCount}/27</p><p className="text-[11px] tracking-widest text-[var(--text-faint)]">LESSONS</p></div>
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--surface)" }}><p className="text-lg font-bold">{completedProjectsCount}/3</p><p className="text-[11px] tracking-widest text-[var(--text-faint)]">PROJECTS</p></div>
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--surface)" }}><p className="text-lg font-bold">Lv {level}</p><p className="text-[11px] tracking-widest text-[var(--text-faint)]">{xp} XP · {streak}d streak</p></div>
        </div>
        <p className="mt-6 text-xs text-[var(--text-faint)]">{date} · Script Forge · script-forge-brown.vercel.app</p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs" style={{ borderColor:"rgba(34,197,94,0.3)", background:"rgba(34,197,94,0.08)", color:"#86EFAC" }}><Check size={12} /> Verified completion</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={doPrint} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black"><Download size={14} /> Download / Print</button>
        <button onClick={()=>{ if(navigator.share) navigator.share({ title:"My Script Forge Certificate", text:`I completed Script Forge — ${name}`, url: window.location.href }).catch(()=>{}); else navigator.clipboard.writeText(window.location.href); }} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor:"var(--border)" }}><Share2 size={14} /> Share</button>
        <Link href="/achievements" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor:"var(--border)" }}>View achievements</Link>
      </div>
    </div>
  );
}
