"use client";

import { motion } from "framer-motion";
import { ChessPiece } from "@/components/chess/ChessPiece";
import type { PieceName } from "@/lib/data";

type FloatingPieceProps = {
  piece: PieceName;
  className?: string;
  delay?: number;
};

export function FloatingPiece({ piece, className, delay = 0 }: FloatingPieceProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.18, 0.42, 0.18],
        scale: 1,
        x: [0, 18, -8, 0],
        y: [0, -20, 12, 0],
        rotate: [0, 3, -2, 0]
      }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChessPiece piece={piece} className="h-full w-full text-gold drop-shadow-[0_0_22px_rgba(212,168,67,0.24)]" />
    </motion.div>
  );
}
