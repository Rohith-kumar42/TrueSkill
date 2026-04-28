import Link from "next/link";
import { Check, CalendarDays } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { PawnToQueenButton } from "@/components/chess/PawnToQueenButton";
import type { Program } from "@/lib/data";

export function LevelPageLayout({ program }: { program: Program }) {
  return (
    <>
      <section className="pt-32">
        <div className="section-shell grid min-h-[54vh] items-center gap-10 py-16 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <Link href="/programs" className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">
              Programs
            </Link>
            <h1 className="mt-4 font-display text-[clamp(3.2rem,9vw,7rem)] font-black leading-none">{program.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">{program.intro}</p>
          </div>
          <div className="glass-surface chess-corners grid min-h-80 place-items-center rounded-lg">
            <ChessPiece piece={program.piece} className="h-56 w-56 text-gold drop-shadow-[0_0_42px_rgba(212,168,67,0.34)]" title={`${program.name} program piece`} />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
          <InfoBlock title="Key Objectives" items={program.objectives} />
          <InfoBlock title="Curriculum Highlights" items={program.curriculum} />
          <aside className="glass-surface rounded-lg p-6">
            <CalendarDays className="h-6 w-6 text-gold" aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl font-bold">Schedule & Pricing</h2>
            <p className="mt-4 text-ivory/70">{program.schedule}</p>
            <p className="mt-6 font-cinzel text-2xl text-gold">{program.price}</p>
            <div className="mt-7">
              <PawnToQueenButton href="/contact" className="w-full justify-center">
                Enroll
              </PawnToQueenButton>
            </div>
          </aside>
        </div>
        <div className="section-shell mt-6">
          <InfoBlock title="What's Included" items={program.included} />
        </div>
      </section>
    </>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-surface rounded-lg p-6">
      <h2 className="font-display text-3xl font-bold">{title}</h2>
      <ul className="mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ivory/72">
            <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
