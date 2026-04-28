import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { PawnToQueenButton } from "@/components/chess/PawnToQueenButton";

export function BottomCta() {
  return (
    <section className="py-24">
      <div className="section-shell glass-surface chess-corners rounded-lg p-8 text-center md:p-12">
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,4.4rem)] font-bold leading-tight text-balance">
          Your next move can be a better way to think.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ivory/70">
          Explore the academy levels or join the teaching team shaping thoughtful young competitors.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PawnToQueenButton href="/programs">Explore Programs</PawnToQueenButton>
          <Link href="/careers" className="inline-flex min-h-12 items-center gap-3 rounded border border-gold/35 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.14em] text-gold hover:bg-gold/10">
            <BriefcaseBusiness className="h-4 w-4" /> Join Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
