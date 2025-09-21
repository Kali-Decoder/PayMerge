import { motion } from "framer-motion";

const ACCENT = "#7C4DFF";
const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.55, ease: "easeOut" } };

function IconGitHub(props: any) { return (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.21.7-3.89-1.39-3.89-1.39-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.72 1.27 3.38.97.1-.75.41-1.27.75-1.56-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.51.11-3.15 0 0 .97-.31 3.18 1.19.92-.26 1.9-.39 2.88-.4.98 0 1.96.13 2.88.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.64.23 2.85.11 3.15.75.82 1.2 1.86 1.2 3.12 0 4.41-2.7 5.38-5.28 5.67.42.36.8 1.07.8 2.16v3.2c0 .31.2.66.8.55A11.5 11.5 0 0 0 12 .5Z"/></svg>); }
function IconSlider(props: any) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}><rect x="3" y="5" width="18" height="3" rx="1.5"/><rect x="3" y="16" width="18" height="3" rx="1.5"/><circle cx="9" cy="6.5" r="2.2" fill="currentColor"/><circle cx="15" cy="17.5" r="2.2" fill="currentColor"/></svg>); }
function IconAudit(props: any) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}><rect x="3" y="4" width="12" height="16" rx="2"/><path d="M7 8h4M7 12h4M7 16h4"/><circle cx="18" cy="18" r="3"/><path d="M20.5 20.5 22 22" strokeLinecap="round"/></svg>); }
function IconStream(props: any) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}><path d="M5 7h14M5 12h14M5 17h14"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="17" cy="17" r="1.5" fill="currentColor"/></svg>); }
function IconShield(props: any) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}><path d="M12 3l7 3v6c0 4.97-3.43 8.31-7 9-3.57-.69-7-4.03-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4" strokeLinecap="round"/></svg>); }
function IconLogo(props: any){ return (<svg viewBox="0 0 32 32" fill="none" {...props}><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#F5F3FF"/><stop offset="60%" stopColor="#D9CCFF"/><stop offset="100%" stopColor="#7C4DFF"/></linearGradient></defs><rect x="4" y="4" width="24" height="24" rx="8" fill="url(#g)"/><path d="M11 17.5l4 4 6-10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>); }

function Glass({ children, className = "" }: {children: any, className?: string}){
  return (
    <div className={`relative rounded-2xl bg-white/55 backdrop-blur-2xl border border-white/80 shadow-[0_20px_60px_rgba(124,77,255,0.14),0_10px_25px_rgba(31,41,55,0.08)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(180deg,white,transparent_60%)]" style={{background:"linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,.35))"}}/>
      <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.7), inset 0 1px 40px rgba(255,255,255,0.25)"}}/>
      <div className="relative">{children}</div>
    </div>
  )
}

export default function PruxelLandingPremiumV3(){
  return (
    <div className="min-h-screen w-full text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#ECE4FF_0%,transparent_65%),radial-gradient(60%_40%_at_90%_20%,#F1E9FF_0%,transparent_60%),linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_70%)]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage:
            "linear-gradient(0deg,transparent 24%,rgba(0,0,0,0.06) 25%,rgba(0,0,0,0.06) 26%,transparent 27%),linear-gradient(90deg,transparent 24%,rgba(0,0,0,0.06) 25%,rgba(0,0,0,0.06) 26%,transparent 27%)",
          backgroundSize: "40px 40px",
        }}/>
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(124,77,255,.35), transparent)"}}/>
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(124,77,255,.25), transparent)"}}/>
      </div>

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)] bg-gradient-to-b from-white to-[#F2ECFF] grid place-items-center">
              <IconLogo className="h-8 w-8"/>
            </span>
            <span className="font-semibold tracking-tight text-slate-900 text-lg">Pruxel</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#integrations" className="hover:text-slate-900">Integrations</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium border border-slate-200 bg-white/80 hover:bg-white transition-colors shadow-[0_2px_10px_rgba(17,24,39,0.06)]">Docs</button>
            <button className="inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,77,255,0.5)]" style={{backgroundColor:ACCENT}}>Try now!</button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
          <motion.div {...fade} className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">Your ultimate solution for fair payroll</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600">Pruxel turns GitHub contributions into transparent, auditable payroll with one‑click on‑chain payouts.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]" style={{backgroundColor:ACCENT}}>Try now!</a>
              <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors shadow-[0_6px_18px_rgba(17,24,39,0.06)]">Join Community</a>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{...fade.transition, delay:.06}} className="mt-14 mx-auto max-w-5xl">
            <Glass className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Glass className="p-4">
                  <div className="flex items-center justify-between"><span className="text-sm text-slate-500">Weights</span><IconSlider className="h-5 w-5 text-slate-400"/></div>
                  <div className="mt-4 space-y-3">
                    {[ ["PR merged",80],["Reviews",60],["Issues closed",50],["Tests ↑",70],["Complexity ↓",40] ].map(([label,val],i)=> (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-slate-500"><span>{label as string}</span><span>{val as number}%</span></div>
                        <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full shadow-[0_2px_8px_rgba(124,77,255,0.5)]" style={{width:`${val}%`, background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)`}}/></div>
                      </div>
                    ))}
                  </div>
                </Glass>
                <Glass className="p-4">
                  <div className="flex items-center justify-between"><span className="text-sm text-slate-500">Leaderboard</span><IconGitHub className="h-5 w-5 text-slate-400"/></div>
                  <div className="mt-4 divide-y divide-white/70">
                    {["Alice","Bobby","Chandra","Devi"].map((n,i)=> (
                      <div key={i} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3"><div className="h-7 w-7 rounded-full bg-gradient-to-b from-white to-slate-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)]" /><span className="text-sm text-slate-800">{n}</span></div>
                        <div className="text-sm text-slate-600">{(22-i*4).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </Glass>
                <Glass className="p-4">
                  <div className="flex items-center justify-between"><span className="text-sm text-slate-500">Payouts</span><IconStream className="h-5 w-5 text-slate-400"/></div>
                  <div className="mt-5 space-y-3">
                    {[1,2,3].map((i)=> (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_#fff]" />
                        <div className="grow h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-2 rounded-full shadow-[0_2px_8px_rgba(124,77,255,0.5)]" style={{width:`${60+i*10}%`, background: `linear-gradient(90deg, ${ACCENT}, #9A7BFF)`}}/></div>
                        <span className="text-xs text-slate-500">live</span>
                      </div>
                    ))}
                  </div>
                </Glass>
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      <section id="integrations" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500">Integration Partners</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-items-center gap-6">
            {["norton","bestsmile","barclays","valve","open","stack"].map((k,i)=> (
              <Glass key={i} className="h-10 w-28 grid place-items-center"><div className="h-4 w-20 rounded bg-gradient-to-b from-slate-200 to-slate-300"/></Glass>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div {...fade}><Glass className="p-6"><h3 className="text-xl font-semibold text-slate-900">Explainable scoring you control</h3><p className="mt-3 text-slate-600">Start from a transparent rubric (PRs, reviews, tests, complexity, docs). Configure policies and publish your weights so everyone knows how pay is computed.</p><ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside"><li>Published weights and policies</li><li>Size clamps & lockfile/vendor excludes</li><li>Maintainer approvals required for merges</li></ul></Glass></motion.div>
            <motion.div {...fade} transition={{...fade.transition, delay:.06}}><Glass className="p-6"><h3 className="text-xl font-semibold text-slate-900">Instant, programmable payouts</h3><p className="mt-3 text-slate-600">Stream or transfer in one click—choose asset and stream length, batch transactions with automatic retries. Each contributor sees a precise share breakdown, wallet confirmation, and a public receipt link with tx hash.</p><ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside"><li>USDC streams or instant settlement</li><li>Receipts with tx hash and audit trail</li><li>Privacy controls and CSV export</li></ul></Glass></motion.div>
          </div>
        </div>
      </section>

      <section id="how" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fade} className="mx-auto max-w-2xl text-center"><h2 className="text-3xl md:text-4xl font-bold text-slate-900">Automate in 5 steps</h2><p className="mt-3 text-slate-600">Connect → Tune → Compute → Preview → Pay & share receipts.</p></motion.div>
          <div className="mt-12 grid md:grid-cols-5 gap-4">
            {[
              {title:"Connect", desc:"OAuth with GitHub, select repos.", icon:<IconGitHub className="h-5 w-5"/>},
              {title:"Tune weights", desc:"Use Default Fair or adjust sliders.", icon:<IconSlider className="h-5 w-5"/>},
              {title:"Compute", desc:"Scores → shares per contributor.", icon:<IconAudit className="h-5 w-5"/>},
              {title:"Preview", desc:"Review amounts & deltas.", icon:<IconShield className="h-5 w-5"/>},
              {title:"Pay", desc:"Stream or transfer; receipts sent.", icon:<IconStream className="h-5 w-5"/>},
            ].map((s,i)=> (
              <motion.div key={i} {...fade} transition={{...fade.transition, delay: i*0.05}}>
                <Glass className="p-5"><div className="h-10 w-10 rounded-xl grid place-items-center text-white shadow-[0_10px_25px_rgba(124,77,255,0.5)]" style={{background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)`}}>{s.icon}</div><h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.desc}</p></Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fade} className="mx-auto max-w-2xl text-center"><h2 className="text-3xl md:text-4xl font-bold text-slate-900">Features that set us apart</h2><p className="mt-3 text-slate-600">Weights editor, live leaderboard, audit cards, one‑click payouts, Farcaster Frames, CSV/ERP export.</p></motion.div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[{t:"Weights editor", d:"Publish your rubric. Lock policies before a run."},{t:"Live leaderboard", d:"Scores, shares, and currency preview in real‑time."},{t:"Per‑dev audit cards", d:"Events → points → payout. Disputes vanish."},{t:"One‑click payouts", d:"Instant transfers or time‑based streams."},{t:"Farcaster Frames", d:"Receipts & wallet mapping inside Warpcast."},{t:"CSV/ERP export", d:"Hand off clean records to finance & HR."}].map((f,i)=> (
              <motion.div key={i} {...fade} transition={{...fade.transition, delay: i*0.04}}>
                <Glass className="p-6"><h3 className="font-semibold text-slate-900">{f.t}</h3><p className="mt-2 text-sm text-slate-600">{f.d}</p></Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Glass className="p-10 text-center shadow-[0_24px_80px_rgba(124,77,255,0.2)]">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Supercharge your workflow — try Pruxel</h2>
            <p className="mt-3 text-slate-600">Run your first scoring in minutes. Streams and receipts included.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-[0_16px_40px_rgba(124,77,255,0.6)]" style={{background: `linear-gradient(180deg, ${ACCENT}, #9A7BFF)`}}>Start now</a>
              <a className="inline-flex items-center rounded-2xl px-6 py-3 text-base font-medium border border-white/80 bg-white/80 hover:bg-white transition-colors shadow-[0_6px_18px_rgba(17,24,39,0.06)]">Talk to us</a>
            </div>
          </Glass>
        </div>
      </section>

      <footer className="py-10 border-t border-white/80 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-sm text-slate-600">
          <div><div className="flex items-center gap-3"><span className="h-8 w-8 rounded-lg bg-gradient-to-b from-white to-[#F2ECFF] shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)] grid place-items-center"><IconLogo className="h-7 w-7"/></span><span className="font-semibold text-slate-900">Pruxel</span></div><p className="mt-3">Payroll by proof of contribution.</p></div>
          <div><div className="font-semibold text-slate-900">Product</div><ul className="mt-2 space-y-1"><li><a href="#how" className="hover:text-slate-900">How it works</a></li><li><a href="#features" className="hover:text-slate-900">Features</a></li><li><a href="#integrations" className="hover:text-slate-900">Integrations</a></li></ul></div>
          <div><div className="font-semibold text-slate-900">Company</div><ul className="mt-2 space-y-1"><li><a className="hover:text-slate-900">Security</a></li><li><a className="hover:text-slate-900">Changelog</a></li><li><a className="hover:text-slate-900">Contact</a></li></ul></div>
          <div><div className="font-semibold text-slate-900">Integrations</div><ul className="mt-2 space-y-1"><li>GitHub</li><li>Sablier / Superfluid</li><li>Farcaster</li></ul></div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Pruxel. All rights reserved.</div>
      </footer>
    </div>
  )
}
