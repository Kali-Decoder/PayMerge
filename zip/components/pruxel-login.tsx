"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Default export — full-page GitHub-only login
export default function PruxelLogin({ loginUrl = "/api/auth/github" }: { loginUrl?: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const go = () => {
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="relative min-h-screen w-full text-slate-800">
      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
