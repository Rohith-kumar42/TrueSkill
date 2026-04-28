"use client";

import { motion } from "framer-motion";
import { FloatingPiece } from "@/components/chess/FloatingPiece";
import { PawnToQueenButton } from "@/components/chess/PawnToQueenButton";
import { highlights } from "@/lib/data";

const words = ["Think", "Deeply.", "Play", "Beautifully."];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 opacity-45">
        <div className="absolute left-1/2 top-1/2 grid aspect-square w-[min(88vw,760px)] -translate-x-1/2 -translate-y-1/2 rotate-45 grid-cols-8 overflow-hidden rounded-lg border border-gold/20 shadow-gold-lg">
          {Array.from({ length: 64 }).map((_, index) => (
            <div key={index} className={(Math.floor(index / 8) + index) % 2 === 0 ? "bg-[#ead7b2]/30" : "bg-[#8b5e3c]/38"} />
          ))}
        </div>
      </div>
      <FloatingPiece piece="knight" delay={0.2} className="absolute left-[8%] top-[22%] h-20 w-20 md:h-28 md:w-28" />
      <FloatingPiece piece="queen" delay={1.1} className="absolute right-[10%] top-[28%] h-24 w-24 md:h-36 md:w-36" />
      <FloatingPiece piece="rook" delay={2.2} className="absolute bottom-[13%] left-[18%] h-20 w-20 md:h-28 md:w-28" />

      <div className="section-shell relative z-10 text-center">
        <p className="mx-auto mb-5 inline-flex rounded border border-gold/40 px-4 py-2 font-decorative text-sm tracking-[0.16em] text-gold">
          Est. for ambitious young minds
        </p>
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(3.5rem,12vw,8.5rem)] font-black leading-[0.86] text-balance">
          {words.map((word, index) => (
            <span className="inline-block overflow-hidden px-2" key={word}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-ivory/75">
          TrueSkill Academy turns chess into a disciplined, expressive practice: strategy, confidence, and competitive readiness taught with warmth.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PawnToQueenButton href="/programs">Explore Programs</PawnToQueenButton>
          <a href="#approach" className="inline-flex min-h-12 items-center rounded border border-gold/35 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.14em] text-gold hover:bg-gold/10">
            Our Approach
          </a>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="glass-surface rounded p-4 text-left">
              <item.icon className="h-5 w-5 text-gold" aria-hidden="true" />
              <p className="mt-3 text-sm text-ivory/75">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
