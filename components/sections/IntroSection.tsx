"use client";

import { motion } from "framer-motion";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function IntroSection() {
  return (
    <section className="py-24">
      <motion.div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div>
          <motion.p variants={fadeUp} className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">
            Who We Are
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-tight text-balance">
            A chess academy where rigor still feels alive.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-ivory/72">
            We coach students to see the board with patience, courage, and structure. The goal is not memorized moves; it is <mark>mastery</mark> that can survive a real game.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-ivory/72">
            Every level combines tactical fluency, thoughtful review, and guided competition so young players learn how to think before they move.
          </motion.p>
        </div>
        <motion.div variants={fadeUp} className="glass-surface chess-corners relative min-h-[360px] rounded-lg p-8">
          <div className="absolute right-8 top-8 rounded border border-gold/40 px-4 py-2 font-decorative text-gold">2026</div>
          <ChessPiece piece="queen" className="absolute left-8 top-16 h-32 w-32 text-gold" />
          <ChessPiece piece="knight" className="absolute bottom-10 right-14 h-28 w-28 text-ivory/70" />
          <ChessPiece piece="pawn" className="absolute bottom-16 left-20 h-16 w-16 text-gold/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
