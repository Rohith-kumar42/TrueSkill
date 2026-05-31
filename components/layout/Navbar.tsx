"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Home, GraduationCap, Trophy, BriefcaseBusiness, MessageCircle } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { navLinks } from "@/lib/data";

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/programs", label: "Programs", icon: GraduationCap },
  { href: "/advantages", label: "Advantages", icon: Trophy },
  { href: "/careers", label: "Careers", icon: BriefcaseBusiness },
  { href: "/contact", label: "Contact", icon: MessageCircle },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 80], ["rgba(13,13,13,0)", "rgba(13,13,13,0.9)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(212,168,67,0)", "rgba(212,168,67,0.18)"]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: background, borderColor: border }}
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md py-5"
        role="banner"
      >
        <nav className="section-shell flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3">
            <ChessPiece piece="knight" className="h-10 w-10 text-gold" title="TrueSkill knight logo" />
            <span className="font-cinzel text-lg font-semibold text-ivory">TrueSkill Academy</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-cinzel text-sm transition-colors duration-150 min-h-0 ${
                  pathname === link.href ? "text-gold" : "text-ivory/80 hover:text-gold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-[-5px] left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link href="/contact" className="inline-flex items-center justify-center rounded bg-gold px-3.5 py-1 font-cinzel text-sm font-semibold text-[#120d08] shadow-gold hover:bg-gold-dim transition-colors">
              Enroll Now
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
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
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-x-0 top-[84px] z-50 border-y border-gold/20 bg-[#0d0d0d]/95 p-6 backdrop-blur lg:hidden"
            >
              <div className="grid gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded border px-4 py-4 font-cinzel text-ivory transition-colors ${
                      pathname === link.href
                        ? "border-gold/40 bg-gold/10"
                        : "border-gold/15 hover:border-gold/35"
                    }`}
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

      {/* Mobile bottom navigation — persistent, thumb-friendly */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 flex justify-around border-t border-gold/15 bg-[#0d0d0d]/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Mobile navigation"
      >
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 text-[0.65rem] font-medium transition-colors ${
                isActive ? "text-gold" : "text-ivory/50 hover:text-ivory/75"
              }`}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
