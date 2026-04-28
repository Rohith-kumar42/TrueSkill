import { BrainCircuit } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { PageTransition } from "@/components/PageTransition";
import { GlowCard } from "@/components/ui/GlowCard";
import { benefits } from "@/lib/data";

export default function AdvantagesPage() {
  return (
    <PageTransition>
      <section className="pt-32">
        <div className="section-shell py-16 text-center">
          <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Advantages of Chess</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,6.2rem)] font-black leading-none text-balance">
            Chess strengthens the whole student, not only the player.
          </h1>
          <div className="relative mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-[1fr_260px_1fr]">
            <div className="grid gap-5">
              {benefits.slice(0, 2).map((benefit) => (
                <Benefit key={benefit.title} benefit={benefit} />
              ))}
            </div>
            <div className="glass-surface grid min-h-64 place-items-center rounded-lg">
              <div className="relative">
                <BrainCircuit className="h-36 w-36 text-gold drop-shadow-[0_0_26px_rgba(212,168,67,0.3)]" aria-label="Brain graphic" />
                <ChessPiece piece="queen" className="absolute -right-6 -top-4 h-12 w-12 text-ivory/70" />
              </div>
            </div>
            <div className="grid gap-5">
              {benefits.slice(2).map((benefit) => (
                <Benefit key={benefit.title} benefit={benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function Benefit({ benefit }: { benefit: (typeof benefits)[number] }) {
  return (
    <GlowCard className="text-left">
      <div className="flex items-center gap-3">
        <benefit.icon className="h-6 w-6 text-gold" aria-hidden="true" />
        <ChessPiece piece={benefit.piece} className="h-8 w-8 text-gold/70" />
      </div>
      <h2 className="mt-5 font-display text-3xl font-bold">{benefit.title}</h2>
      <p className="mt-3 leading-7 text-ivory/70">{benefit.text}</p>
    </GlowCard>
  );
}
