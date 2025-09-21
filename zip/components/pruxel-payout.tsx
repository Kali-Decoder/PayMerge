"use client"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

// Brand token
const ACCENT = "#7C4DFF"

// Mock data (same as dashboard)
interface Contributor {
  id: string
  name: string
  prs: number
  reviews: number
  issues: number
  tests: number
}

interface Repo {
  id: string
  owner: string
  name: string
  language: string
  stars: number
  forks: number
  updated: string
  contributors: Contributor[]
}

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
]

function score(c: Contributor) {
  return c.prs * 0.45 + c.reviews * 0.3 + c.issues * 0.15 + c.tests * 0.1
}

function Glass({ children, className = "" }: { children: any; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl bg-white/55 backdrop-blur-2xl border border-white/80 shadow-[0_24px_80px_rgba(124,77,255,0.16),0_12px_32px_rgba(17,24,39,0.08)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(180deg,white,transparent_60%)]"
        style={{ background: "linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.45))" }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function Chip({ children }: { children: any }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-slate-700 border border-white/70 bg-white/60 backdrop-blur">
      {children}
    </span>
  )
}

export default function PruxelPayout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const repoId = searchParams.get("repo")
  const [payoutAmount, setPayoutAmount] = useState("1000")
  const [payoutType, setPayoutType] = useState("instant")
  const [processing, setProcessing] = useState(false)

  const repo = useMemo(() => MOCK.find((r) => r.id === repoId), [repoId])

  const contributors = useMemo(() => {
    if (!repo) return []
    const total = repo.contributors.reduce((s, c) => s + score(c), 0)
    return repo.contributors
      .map((c) => ({
        ...c,
        points: score(c),
        share: Math.round((score(c) / total) * 100),
        amount: Math.round((score(c) / total) * Number.parseFloat(payoutAmount)),
      }))
      .sort((a, b) => b.points - a.points)
  }, [repo, payoutAmount])

  const handlePayout = () => {
    setProcessing(true)
    // Simulate payout processing
    setTimeout(() => {
      setProcessing(false)
      alert("Payout completed successfully! 🎉")
    }, 2000)
  }

  if (!repo) {
    return (
      <div className="min-h-screen w-full text-slate-800 flex items-center justify-center">
        <Glass className="p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">Repository not found</h1>
          <p className="mt-2 text-slate-600">The requested repository could not be found.</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,77,255,0.5)]"
            style={{ backgroundColor: ACCENT }}
          >
            Back to Dashboard
          </Link>
        </Glass>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full text-slate-800">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#ECE4FF_0%,transparent_65%),radial-gradient(60%_40%_at_90%_20%,#F1E9FF_0%,transparent_60%),linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_70%)]" />
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.35), transparent)" }}
        />
        <div
          className="absolute top-40 -right-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(124,77,255,.25), transparent)" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              ← Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight text-slate-900 text-lg">Pruxel Payout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Repository Info */}
          <Glass className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {repo.owner}/{repo.name}
                </h1>
                <p className="text-slate-600">Premium Distribution & Payout</p>
              </div>
              <Chip>{repo.language}</Chip>
            </div>
          </Glass>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Payout Configuration */}
            <div className="lg:col-span-1">
              <Glass className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Payout Configuration</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Total Amount (USDC)</label>
                    <input
                      type="number"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm text-slate-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Payout Type</label>
                    <select
                      value={payoutType}
                      onChange={(e) => setPayoutType(e.target.value)}
                      className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-sm text-slate-700 focus:outline-none"
                    >
                      <option value="instant">Instant Transfer</option>
                      <option value="stream">Stream (30 days)</option>
                      <option value="stream-90">Stream (90 days)</option>
                    </select>
                  </div>

                  <button
                    onClick={handlePayout}
                    disabled={processing}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)] disabled:opacity-50"
                    style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
                  >
                    {processing ? "Processing..." : "Execute Payout"}
                  </button>
                </div>
              </Glass>
            </div>

            {/* Contributors Distribution */}
            <div className="lg:col-span-2">
              <Glass className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Distribution Breakdown</h2>

                <div className="rounded-2xl border border-white/70 bg-white/70 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 border-b border-white/70">
                        <th className="px-4 py-3">Contributor</th>
                        <th className="px-4 py-3">PRs</th>
                        <th className="px-4 py-3">Reviews</th>
                        <th className="px-4 py-3">Issues</th>
                        <th className="px-4 py-3">Tests</th>
                        <th className="px-4 py-3">Share</th>
                        <th className="px-4 py-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/70">
                      {contributors.map((c) => (
                        <tr key={c.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-slate-200 border border-white" />
                              <span className="text-slate-800 font-medium">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{c.prs}</td>
                          <td className="px-4 py-3 text-slate-700">{c.reviews}</td>
                          <td className="px-4 py-3 text-slate-700">{c.issues}</td>
                          <td className="px-4 py-3 text-slate-700">{c.tests}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${c.share}%`,
                                    background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)`,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-slate-700 w-8">{c.share}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900">${c.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Glass>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
