import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import type { Program } from "@/lib/data";

export function LevelCard({ program }: { program: Program }) {
  return (
    <Link href={`/programs/${program.slug}`} className="group glass-surface chess-corners block rounded-lg p-7 transition duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold">
      <div className="flex items-start justify-between gap-4">
        <ChessPiece piece={program.piece} className="h-20 w-20 text-gold transition duration-200 group-hover:scale-105" title={`${program.name} piece`} />
        <span className="rounded border border-gold/30 px-3 py-1 font-cinzel text-xs uppercase tracking-[0.12em] text-gold">{program.price}</span>
      </div>
      <h2 className="mt-8 font-display text-3xl font-bold text-ivory">{program.name}</h2>
      <p className="mt-3 min-h-16 text-sm leading-7 text-ivory/68">{program.teaser}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-cinzel text-sm text-gold">
        Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
