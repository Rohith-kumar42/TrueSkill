"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { cn } from "@/lib/utils";

type PawnToQueenButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PawnToQueenButton({ href, children, className }: PawnToQueenButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center gap-3 rounded px-5 py-3 font-cinzel text-sm font-semibold uppercase tracking-[0.14em] text-[#120d08] shadow-gold transition duration-200 hover:bg-gold-dim",
        "bg-gold",
        className
      )}
    >
      <span className="relative h-7 w-7 overflow-hidden" aria-hidden="true">
        <motion.span className="absolute inset-0 block group-hover:-translate-y-8 transition-transform duration-200">
          <ChessPiece piece="pawn" className="h-7 w-7 text-[#120d08]" />
        </motion.span>
        <motion.span className="absolute inset-0 translate-y-8 block group-hover:translate-y-0 transition-transform duration-200">
          <ChessPiece piece="queen" className="h-7 w-7 text-[#120d08]" />
        </motion.span>
      </span>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
