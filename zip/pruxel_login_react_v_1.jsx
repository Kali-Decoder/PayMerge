import { useState } from "react";
import { motion } from "framer-motion";

// Brand token
const ACCENT = "#7C4DFF";

// Simple GitHub logo
function IconGitHub(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.21.7-3.89-1.39-3.89-1.39-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.72 1.27 3.38.97.1-.75.41-1.27.75-1.56-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.51.11-3.15 0 0 .97-.31 3.18 1.19.92-.26 1.9-.39 2.88-.4.98 0 1.96.13 2.88.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.64.23 2.85.11 3.15.75.82 1.2 1.86 1.2 3.12 0 4.41-2.7 5.38-5.28 5.67.42.36.8 1.07.8 2.16v3.2c0 .31.2.66.8.55A11.5 11.5 0 0 0 12 .5Z"/>
    </svg>
  );
}

// Glass helper
function Glass({ children, className = "" }: { children: any; className?: string }) {
  return (
    <div className={`relative rounded-3xl bg-white/55 backdrop-blur-2xl border border-white/80 shadow-[0_24px_80px_rgba(124,77,255,0.18),0_12px_32px_rgba(17,24,39,0.08)] ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:linear-gradient(180deg,white,transparent_60%)]"
        style={{ background: "linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.45))" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// Default export — full-page GitHub-only login
export default function PruxelLogin({ loginUrl = "/api/auth/github" }: { loginUrl?: string }) {
  const [loading, setLoading] = useState(false);

  const go = () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      window.location.href = loginUrl;
    }
  };

  return (
    <div className="relative min-h-screen w-full text-slate-800">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#ECE4FF_0%,transparent_65%),radial-gradient(60%_40%_at_90%_20%,#F1E9FF_0%,transparent_60%),linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_70%)]" />
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.35), transparent)" }} />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.25), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid place-items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-b from-white to-[#F2ECFF] shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)] grid place-items-center">
                <IconGitHub className="h-6 w-6 text-slate-800" />
              </span>
              <span className="font-semibold tracking-tight text-slate-900 text-lg">Pruxel</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Sign in with GitHub</h1>
            <p className="mt-2 text-slate-600">No passwords. Only GitHub. Minimal, read-only scopes.</p>
          </div>

          {/* Card */}
          <Glass className="p-8">
            <button
              onClick={go}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-3 font-semibold text-white focus:outline-none focus:ring-4 shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
              aria-label="Continue with GitHub"
              data-testid="github-login-btn"
            >
              <IconGitHub className="h-5 w-5 text-white" />
              {loading ? "Redirecting…" : "Continue with GitHub"}
            </button>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="rounded-xl border border-white/80 bg-white/70 backdrop-blur p-3 text-center">Read user/org</div>
              <div className="rounded-xl border border-white/80 bg-white/70 backdrop-blur p-3 text-center">Repo metadata</div>
              <div className="rounded-xl border border-white/80 bg-white/70 backdrop-blur p-3 text-center">No code content</div>
            </div>

            <p className="mt-6 text-xs text-center text-slate-500">
              By continuing you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.
            </p>
          </Glass>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-slate-600 hover:text-slate-900">← Back to home</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
