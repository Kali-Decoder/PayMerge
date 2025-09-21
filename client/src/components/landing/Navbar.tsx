"use client";

import { useState } from "react";
import Link from "next/link";
// import { WalletConnect } from "../WalletConnect";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="text-lg font-semibold text-gray-800">
            PullPerks
          </Link>
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="#features" className="text-gray-500 text-sm hover:text-black">Features</Link>
            <Link href="#how-it-works" className="text-gray-500 text-sm hover:text-black">How it Works</Link>
            {session ? (
              <Link href="/dashboard" className="text-sm px-3 py-1 rounded bg-gray-800 text-white">Dashboard</Link>
            ) : (
              <Link href="/auth/signin">
                <Button onClick={() => setIsMobileMenuOpen(false)} className="text-sm px-3 py-1 rounded bg-gray-800 text-white">Sign In</Button>
              </Link>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-2 space-y-1">
            <Link href="#features" className="block text-sm text-gray-500 hover:text-black">Features</Link>
            <Link href="#how-it-works" className="block text-sm text-gray-500 hover:text-black">How it Works</Link>
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
