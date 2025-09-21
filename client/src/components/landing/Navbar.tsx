"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white border-b"
    >
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-14">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Pruxel
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <motion.button
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border-2 border-indigo-100 shadow hover:shadow-md focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="Profile menu"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </motion.button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-indigo-100 z-10 py-2 flex flex-col gap-1"
                  >
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Link href="#features" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Features</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Link href="#how-it-works" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">How it Works</Link>
                    </motion.div>
                    <motion.div className="px-4 py-2" whileHover={{ scale: 1.03 }}>
                      <ConnectButton />
                    </motion.div>
                    {session ? (
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-indigo-700 font-semibold hover:bg-indigo-50">Dashboard</Link>
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Link href="/auth/signin" className="block px-4 py-2 text-sm text-indigo-700 font-semibold hover:bg-indigo-50">Sign In</Link>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-2 space-y-1">
              <div className="pt-2">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
