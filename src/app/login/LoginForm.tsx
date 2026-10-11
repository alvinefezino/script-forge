"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!email || !password) { setErr("Enter your email and password."); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
        if (error) throw error;
        setMsg("Check your email to confirm your account, then come back and log in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setMsg("Signed in. Redirecting...");
        router.push("/");
        router.refresh();
      }
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : "Something went wrong.";
      setErr(m);
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-[420px] rounded-[14px] border bg-[var(--surface)] p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
      <div className="flex rounded-full border p-1" style={{ borderColor: "var(--border)", background: "var(--surface-raised)" }}>
        <button
          type="button"
          onClick={() => { setMode("login"); setErr(null); setMsg(null); }}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${mode === "login" ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white"}`}
          aria-pressed={mode === "login"}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => { setMode("signup"); setErr(null); setMsg(null); }}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-white text-black" : "text-[var(--text-muted)] hover:text-white"}`}
          aria-pressed={mode === "signup"}
        >
          Create account
        </button>
      </div>

      {!hasEnv && (
        <div className="mt-4 rounded-[10px] border px-3 py-3 text-xs leading-5" style={{ borderColor: "rgba(245,158,11,0.35)", background: "rgba(245,158,11,0.08)", color: "var(--text-muted)" }}>
          Supabase is not configured yet. Add <span className="font-mono text-[var(--text)]">NEXT_PUBLIC_SUPABASE_URL</span> and <span className="font-mono text-[var(--text)]">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> to your env, then redeploy. The form below will work once those are set.
        </div>
      )}

      <form onSubmit={submit} className="mt-5 grid gap-4" noValidate>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-[10px] border bg-[var(--bg)] px-3 text-sm outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--border-strong)]"
            style={{ borderColor: "var(--border)" }}
            required
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Password</span>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-[10px] border bg-[var(--bg)] px-3 pr-10 text-sm outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--border-strong)]"
              style={{ borderColor: "var(--border)" }}
              required
            />
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow((v) => !v)}
              className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] hover:text-white"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        {err && (
          <div role="alert" className="rounded-[10px] border px-3 py-2.5 text-sm leading-5" style={{ borderColor: "rgba(229,72,77,0.35)", background: "rgba(229,72,77,0.08)", color: "#FCA5A5" }}>
            {err}
          </div>
        )}
        {msg && !err && (
          <div role="status" className="rounded-[10px] border px-3 py-2.5 text-sm leading-5" style={{ borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.1)", color: "var(--text)" }}>
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)] disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          {loading ? (mode === "signup" ? "Creating account..." : "Signing in...") : mode === "signup" ? "Create account" : "Log in"}
          {!loading && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-xs leading-5 text-[var(--text-faint)]">
          {mode === "signup" ? "Already have an account? " : "Need an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="font-semibold text-[var(--text)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-white"
          >
            {mode === "signup" ? "Log in" : "Create one"}
          </button>
        </p>
      </form>

      <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs leading-5 text-[var(--text-faint)]">
          By continuing you agree to our terms. Progress and favourites sync when you are signed in, and stay local when you are not.
        </p>
        <div className="mt-3 flex gap-2">
          <Link href="/roadmap" className="rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
            View roadmap
          </Link>
          <Link href="/modules/js-foundations" className="rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-[var(--surface-raised)]" style={{ borderColor: "var(--border)" }}>
            Browse modules
          </Link>
        </div>
      </div>
    </div>
  );
}
