"use client";

import { motion } from "framer-motion";
import { pageMotion } from "@/lib/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main initial={pageMotion.initial} animate={pageMotion.animate} exit={pageMotion.exit}>
      {children}
    </motion.main>
  );
}
