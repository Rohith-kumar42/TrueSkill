"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 80], ["rgba(13,13,13,0)", "rgba(13,13,13,0.9)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(212,168,67,0)", "rgba(212,168,67,0.18)"]);

  return (
    <motion.header
      style={{ backgroundColor: background, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <ChessPiece piece="knight" className="h-10 w-10 text-gold" title="TrueSkill knight logo" />
          <span className="font-cinzel text-lg font-semibold text-ivory">TrueSkill Academy</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative font-cinzel text-sm text-ivory/80">
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/contact" className="rounded bg-gold px-4 py-2 font-cinzel text-sm font-semibold text-[#120d08] shadow-gold">
            Enroll Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-gold/30 text-gold lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-20 z-50 border-y border-gold/20 bg-[#0d0d0d]/95 p-6 backdrop-blur lg:hidden"
          >
            <div className="grid gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded border border-gold/15 px-4 py-4 font-cinzel text-ivory"
                >
                  <ChessPiece piece="pawn" className="h-6 w-6 text-gold" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
