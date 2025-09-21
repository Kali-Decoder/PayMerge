"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import IconLogo from "./IconLogo" // Assuming IconLogo is a component in the same directory

const ACCENT = "#7C4DFF"
const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
}

export default function PruxelLandingPremiumV3() {
  return (
    <div className="min-h-screen w-full text-slate-800">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)] bg-gradient-to-b from-white to-[#F2ECFF] grid place-items-center">
              <IconLogo className="h-8 w-8" />
            </span>
            <span className="font-semibold tracking-tight text-slate-900 text-lg">Pruxel</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#integrations" className="hover:text-slate-900">
              Integrations
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium border border-slate-200 bg-white/80 hover:bg-white transition-colors shadow-[0_2px_10px_rgba(17,24,39,0.06)]">
              Docs
            </button>
            <Link
              href="/login"
              className="inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,77,255,0.5)]"
              style={{ backgroundColor: ACCENT }}
            >
              Try now!
            </Link>
          </div>
        </div>
      </header>

      <motion.div {...fade} className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Your ultimate solution for fair payroll
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Pruxel turns GitHub contributions into transparent, auditable payroll with one‑click on‑chain payouts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
            style={{ backgroundColor: ACCENT }}
          >
            Try now!
          </Link>
          <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors shadow-[0_6px_18px_rgba(17,24,39,0.06)]">
            Join Community
          </a>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/login"
          className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
          style={{ background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)` }}
        >
          Start now
        </Link>
        <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors shadow-[0_6px_18px_rgba(17,24,39,0.06)]">
          Talk to us
        </a>
      </div>
    </div>
  )
}
