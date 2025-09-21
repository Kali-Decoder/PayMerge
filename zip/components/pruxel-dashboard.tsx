"use client"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { type Repo, Glass, GradientText, MOCK, ACCENT } from "./path-to-your-imports" // Adjust the path as necessary

// ---------- Repository Card ----------
function RepoCard({ repo, onOpen }: { repo: Repo; onOpen: (id: string) => void }) {
  return (
    <Glass className="group p-5 transition-transform will-change-transform hover:-translate-y-1">
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
  )
}

// ---------- Main Dashboard ----------
export default function PruxelDashboardSimple() {
  const [query, setQuery] = useState("")
  const [repos] = useState<Repo[]>(MOCK)
  const [selected, setSelected] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [wallet, setWallet] = useState<string | null>(null)
  const router = useRouter()

  function onOpenDetails(repoId: string) {
    router.push(`/payout?repo=${repoId}`)
  }

  const filtered = useMemo(() => {
    return repos.filter((repo) => repo.name.toLowerCase().includes(query.toLowerCase()))
  }, [query, repos])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
          <RepoCard key={r.id} repo={r} onOpen={onOpenDetails} />
        ))}
        {filtered.length === 0 ? (
          <Glass className="p-8 text-center text-slate-600">No repositories found.</Glass>
        ) : null}
      </section>
    </div>
  )
}
