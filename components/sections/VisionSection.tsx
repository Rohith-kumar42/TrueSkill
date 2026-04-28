"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function VisionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <motion.div style={{ x }} className="absolute inset-x-[-10%] top-1/2 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="section-shell text-center">
        <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Vision & Mission</p>
        <blockquote className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-tight text-balance">
          “We teach chess so students can meet difficulty with <mark>clarity</mark>, imagination, and grace.”
        </blockquote>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-ivory/70">
          Our mission is to make strong chess education feel personal, aspirational, and deeply practical for every learner.
        </p>
      </div>
    </section>
  );
}
