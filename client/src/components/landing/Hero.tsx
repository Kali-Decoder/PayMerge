"use client";

import { motion } from "framer-motion";
import Link from "next/link";
const IconLogo = (props: any) => (
  <span {...props}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#7C4DFF" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontFamily="sans-serif">PP</text>
    </svg>
  </span>
);

const ACCENT = "#7C4DFF";
const fade = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

export function Hero() {
  return (
    <div className="w-full text-slate-800 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    
      <motion.div {...fade} className="mx-auto max-w-3xl text-center py-20">
        <h1 className="text-4xl capitalize md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Payroll by proof of contribution, not politics. 
        </h1>
        <p className="text-lg uppercase md:text-xl text-indigo-600 font-semibold mb-4">
          Reward Contributors Fairly and Transparently
        </p>
        <motion.p
          className="mt-4 text-lg md:text-xl text-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
         Pruxel turns GitHub contributions into fair, automatic payroll—teams get paid exactly by what shipped, <br />
          with a transparent audit trail and one‑click on‑chain payouts.
        </motion.p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]"
              style={{ backgroundColor: ACCENT }}
            >
              Get started
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/learn-more"
              className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors shadow-[0_6px_18px_rgba(17,24,39,0.06)] text-indigo-700"
            >
              Learn more
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}