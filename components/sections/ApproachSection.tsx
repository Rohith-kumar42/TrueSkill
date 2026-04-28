"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { approach } from "@/lib/data";

export function ApproachSection() {
  const [active, setActive] = useState(0);
  const current = approach[active];

  return (
    <section id="approach" className="bg-[#0a0a0a]/75 py-24">
      <div className="section-shell">
        <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Our Approach</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-tight">
          Progress is taught like a rank: one intentional square at a time.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-6">
          {approach.map((step, index) => (
            <button
              type="button"
              key={step.title}
              onClick={() => setActive(index)}
              className={`grid min-h-32 place-items-center rounded border p-4 transition ${active === index ? "border-gold bg-gold/10 shadow-gold" : "border-gold/15 bg-white/[0.03] hover:border-gold/45"}`}
            >
              <ChessPiece piece={step.piece} className={`h-12 w-12 ${active === index ? "text-gold" : "text-ivory/55"}`} />
              <span className="mt-3 font-cinzel text-xs uppercase tracking-[0.12em]">{step.title}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-surface mt-6 rounded-lg p-7"
          >
            <h3 className="font-display text-3xl font-bold">{current.title}</h3>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-ivory/72">{current.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
