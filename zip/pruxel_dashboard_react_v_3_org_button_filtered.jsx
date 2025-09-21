import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Brand token
const ACCENT = "#7C4DFF";

// ---------- Types ----------
interface Contributor {
  id: string;
  name: string;
  prs: number; // merged PRs
  reviews: number; // code reviews
  issues: number; // issues closed
  tests: number; // tests added
}
interface Repo {
  id: string;
  owner: string;
  name: string;
  language: string;
  stars: number;
  forks: number;
  updated: string; // ISO
  contributors: Contributor[];
}

// ---------- Mock data (replace with GitHub API later) ----------
const MOCK: Repo[] = [
  {
    id: "1",
    owner: "pruxel",
    name: "scoring-engine",
    language: "TypeScript",
    stars: 421,
    forks: 38,
    updated: "2025-09-07T10:00:00Z",
    contributors: [
      { id: "u1", name: "Alice", prs: 18, reviews: 34, issues: 6, tests: 22 },
      { id: "u2", name: "Bobby", prs: 12, reviews: 21, issues: 9, tests: 10 },
      { id: "u3", name: "Chandra", prs: 9, reviews: 15, issues: 5, tests: 18 },
    ],
  },
  {
    id: "2",
    owner: "pruxel",
    name: "ui",
    language: "React",
    stars: 297,
    forks: 24,
    updated: "2025-09-06T15:00:00Z",
    contributors: [
      { id: "u2", name: "Bobby", prs: 10, reviews: 17, issues: 3, tests: 8 },
      { id: "u4", name: "Devi", prs: 8, reviews: 19, issues: 2, tests: 16 },
      { id: "u5", name: "Ethan", prs: 6, reviews: 12, issues: 1, tests: 5 },
    ],
  },
  {
    id: "3",
    owner: "pruxel",
    name: "cloud-runner",
    language: "Go",
    stars: 188,
    forks: 12,
    updated: "2025-09-05T09:00:00Z",
    contributors: [
      { id: "u1", name: "Alice", prs: 6, reviews: 9, issues: 7, tests: 5 },
      { id: "u6", name: "Farah", prs: 9, reviews: 7, issues: 3, tests: 11 },
    ],
  },
  {
    id: "4",
    owner: "pruxel",
    name: "docs",
    language: "Markdown",
    stars: 76,
    forks: 6,
    updated: "2025-09-03T18:00:00Z",
    contributors: [
      { id: "u7", name: "Grace", prs: 12, reviews: 6, issues: 4, tests: 0 },
      { id: "u3", name: "Chandra", prs: 3, reviews: 7, issues: 1, tests: 0 },
    ],
  },
];

// ---------- Helpers ----------
function score(c: Contributor) {
  // Transparent, tunable weights (simple for demo): PRs 45%, Reviews 30%, Issues 15%, Tests 10%
  return c.prs * 0.45 + c.reviews * 0.3 + c.issues * 0.15 + c.tests * 0.1;
}

// ---------- Premium Glass Atoms ----------
function Glass({ children, className = "" }: { children: any; className?: string }) {
  return (
    <div className={`relative rounded-2xl bg-white/55 backdrop-blur-2xl border border-white/80 shadow-[0_24px_80px_rgba(124,77,255,0.16),0_12px_32px_rgba(17,24,39,0.08)] ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(180deg,white,transparent_60%)]"
        style={{ background: "linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.45))" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
function Chip({ children }: { children: any }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-slate-700 border border-white/70 bg-white/60 backdrop-blur">
      {children}
    </span>
  );
}
function GradientText({ children }: { children: any }) {
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, #B39DFF)` }}>
      {children}
    </span>
  );
}

// ---------- Repository Card ----------
function RepoCard({ repo, onOpen }: { repo: Repo; onOpen: (id: string) => void }) {
  const total = repo.contributors.reduce((s, c) => s + score(c), 0);
  const top = [...repo.contributors].sort((a, b) => score(b) - score(a)).slice(0, 3);
  const readiness = Math.min(100, Math.round((total / 100) * 12)); // faux readiness meter 0-100

  return (
    <Glass className="group p-5 transition-transform will-change-transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-slate-900 font-semibold">{repo.owner}/{repo.name}</div>
          <div className="mt-1 text-xs text-slate-500">Updated {new Date(repo.updated).toLocaleDateString()}</div>
        </div>
        <Chip>{repo.language}</Chip>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-slate-500">Readiness</div>
          <div className="mt-1 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-2 rounded-full" style={{ width: `${readiness}%`, background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)` }} />
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Stars</div>
          <div className="mt-1 text-sm font-medium text-slate-800">{repo.stars.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Forks</div>
          <div className="mt-1 text-sm font-medium text-slate-800">{repo.forks.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-slate-500">Top contributors</div>
        <div className="mt-2 flex items-center gap-3">
          {top.map((c) => (
            <div key={c.id} className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/70 backdrop-blur px-2.5 py-1.5">
              <div className="h-6 w-6 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white" />
              <div className="text-xs text-slate-700">{c.name}</div>
              <div className="text-[10px] text-slate-500">{Math.round((score(c) / total) * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-slate-500">Eligible amount (est.)</div>
        <button
          onClick={() => onOpen(repo.id)}
          className="rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(124,77,255,0.5)]"
          style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
        >
          Open details
        </button>
      </div>
    </Glass>
  );
}

// ---------- Contributors Summary (global) ----------
function ContributorsSummary({ repos }: { repos: Repo[] }) {
  const list = useMemo(() => {
    const map = new Map<string, { id: string; name: string; prs: number; reviews: number; issues: number; tests: number; points: number }>();
    repos.forEach((r) => {
      r.contributors.forEach((c) => {
        const key = c.id + "::" + c.name;
        const prev = map.get(key) ?? { id: c.id, name: c.name, prs: 0, reviews: 0, issues: 0, tests: 0, points: 0 };
        const points = score(c);
        map.set(key, {
          id: c.id,
          name: c.name,
          prs: prev.prs + c.prs,
          reviews: prev.reviews + c.reviews,
          issues: prev.issues + c.issues,
          tests: prev.tests + c.tests,
          points: prev.points + points,
        });
      });
    });
    const arr = Array.from(map.values());
    const totalPoints = arr.reduce((s, x) => s + x.points, 0) || 1;
    return arr
      .map((x) => ({ ...x, share: Math.round((x.points / totalPoints) * 100) }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 8);
  }, [repos]);

  return (
    <Glass className="p-5">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-slate-900">Contributors summary</div>
        <span className="text-xs text-slate-500">Top {list.length}</span>
      </div>
      <div className="mt-4 space-y-3">
        {list.map((u, i) => (
          <div key={u.id + i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white" />
              <div>
                <div className="text-sm text-slate-800">{u.name}</div>
                <div className="text-xs text-slate-500">{u.prs} PRs · {u.reviews} reviews · {u.issues} issues · {u.tests} tests</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-2 rounded-full" style={{ width: `${u.share}%`, background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)` }} />
              </div>
              <span className="text-xs text-slate-600 w-8 text-right">{u.share}%</span>
            </div>
          </div>
        ))}
      </div>
    </Glass>
  );
}

// ---------- Detail Panel ----------
function RepoDetail({ repo, onApprove }: { repo: Repo; onApprove: () => void }) {
  const totals = useMemo(() => repo.contributors.reduce((s, c) => s + score(c), 0), [repo]);
  const rows = useMemo(
    () =>
      repo.contributors
        .map((c) => ({ ...c, points: score(c), share: Math.round((score(c) / totals) * 100) }))
        .sort((a, b) => b.points - a.points),
    [repo, totals]
  );

  return (
    <Glass className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-slate-900 font-semibold">{repo.owner}/{repo.name}</div>
          <div className="text-xs text-slate-500 mt-1">Payroll preview — transparent shares</div>
        </div>
        <Chip>{repo.language}</Chip>
      </div>

      <div className="mt-4 rounded-2xl border border-white/70 bg-white/70">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-4 py-3">Contributor</th>
              <th className="px-4 py-3">PRs</th>
              <th className="px-4 py-3">Reviews</th>
              <th className="px-4 py-3">Issues</th>
              <th className="px-4 py-3">Tests</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/70">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-slate-200 border border-white" />
                    <span className="text-slate-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{r.prs}</td>
                <td className="px-4 py-3 text-slate-700">{r.reviews}</td>
                <td className="px-4 py-3 text-slate-700">{r.issues}</td>
                <td className="px-4 py-3 text-slate-700">{r.tests}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{r.points.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-2 rounded-full" style={{ width: `${r.share}%`, background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)` }} />
                    </div>
                    <span className="text-xs text-slate-700 w-8">{r.share}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        <button className="rounded-xl px-4 py-2 text-sm font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors">Export CSV</button>
        <button
          onClick={onApprove}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
          style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
        >
          Approve payroll
        </button>
      </div>
    </Glass>
  );
}

// ---------- Icons ----------
function IconWallet(props: any) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h12v2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3h-4a2 2 0 0 1 0-4h4V9a2 2 0 0 0-2-2H5Z" />
      <circle cx="17" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconPlus(props: any) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

// ---------- Main Dashboard ----------
export default function PruxelDashboardSimple() {
  const [query, setQuery] = useState("");
  const [repos] = useState<Repo[]>(MOCK);
  const [selected, setSelected] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  // Hide the pruxel/scoring-engine card everywhere (per request)
  const visibleRepos = useMemo(
    () => repos.filter((r) => `${r.owner}/${r.name}`.toLowerCase() !== "pruxel/scoring-engine"),
    [repos]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = visibleRepos;
    if (!q) return base;
    return base.filter((r) => `${r.owner}/${r.name}`.toLowerCase().includes(q) || r.language.toLowerCase().includes(q));
  }, [query, visibleRepos]);

  const active = useMemo(() => visibleRepos.find((r) => r.id === selected) ?? filtered[0] ?? null, [visibleRepos, selected, filtered]);

  function onConnectWallet() {
    // Placeholder; integrate wagmi/rainbowkit later
    setWallet("0xA1b2...C3d4");
    setToast("Wallet connected ✅");
    setTimeout(() => setToast(null), 1600);
  }
  function onCreateOrg() {
    setToast("Organization created ✅");
    setTimeout(() => setToast(null), 1600);
  }

  return (
    <div className="min-h-screen w-full text-slate-800">
      {/* Ambient background lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#ECE4FF_0%,transparent_65%),radial-gradient(60%_40%_at_90%_20%,#F1E9FF_0%,transparent_60%),linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_70%)]" />
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.35), transparent)" }} />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.25), transparent)" }} />
      </div>

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)] bg-gradient-to-b from-white to-[#F2ECFF] grid place-items-center" />
            <span className="font-semibold tracking-tight text-slate-900 text-lg">Pruxel</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repos…"
              className="w-60 rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={onCreateOrg}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,77,255,0.5)]"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
            >
              <IconPlus className="h-4 w-4" />
              Create organization
            </button>
            <button
              onClick={onConnectWallet}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-800 border border-white/80 bg-white/70 hover:bg-white transition-colors shadow-[0_2px_10px_rgba(17,24,39,0.06)]"
            >
              <IconWallet className="h-4 w-4" />
              {wallet ? wallet : "Connect wallet"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repositories list */}
        <section className="lg:col-span-2 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-900 font-semibold"
          >
            <GradientText>Repositories</GradientText>
          </motion.h2>
          {filtered.map((r) => (
            <RepoCard key={r.id} repo={r} onOpen={(id) => setSelected(id)} />
          ))}
          {filtered.length === 0 ? (
            <Glass className="p-8 text-center text-slate-600">No repositories found.</Glass>
          ) : null}
        </section>

        {/* Right rail: summary + details */}
        <aside className="lg:col-span-1 space-y-6">
          <ContributorsSummary repos={visibleRepos} />
          {active ? (
            <RepoDetail
              repo={active}
              onApprove={() => {
                setToast("Payroll approved and receipt queued ✅");
                setTimeout(() => setToast(null), 2200);
              }}
            />
          ) : (
            <Glass className="p-8 text-center text-slate-600">Select a repository to view details.</Glass>
          )}
        </aside>
      </main>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-0 right-0 mx-auto w-fit">
          <div
            className="rounded-xl px-4 py-2 text-sm text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)` }}
          >
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
