import { Mail } from "lucide-react";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { PageTransition } from "@/components/PageTransition";
import { GlowCard } from "@/components/ui/GlowCard";

const sections: [string, string[]][] = [
  ["Qualifications", ["Strong chess fundamentals and coaching experience", "Comfort teaching children and teens", "Tournament exposure preferred"]],
  ["Skills", ["Clear communication", "Patient correction", "Ability to convert games into practical lessons"]],
  ["Responsibilities", ["Lead live sessions", "Review student games", "Share progress notes with families"]],
  ["Why Join Us", ["A refined teaching system", "Motivated students", "Room to shape a serious academy culture"]]
];

export default function CareersPage() {
  return (
    <PageTransition>
      <section className="pt-32">
        <div className="section-shell grid items-center gap-10 py-16 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Careers</p>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6.2rem)] font-black leading-none text-balance">
              Coach the next generation of strategic thinkers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              TrueSkill is looking for chess educators who can make disciplined learning feel vivid, respectful, and personal.
            </p>
          </div>
          <div className="glass-surface chess-corners grid min-h-80 place-items-center rounded-lg">
            <div className="relative">
              <ChessPiece piece="king" className="h-56 w-56 text-gold" title="King with graduation cap" />
              <div className="absolute left-12 top-6 h-8 w-28 -rotate-6 border border-gold bg-[#0d0d0d]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-2">
          {sections.map(([title, items]) => (
            <GlowCard key={title} className={title === "Why Join Us" ? "border-gold/55 shadow-gold" : ""}>
              <h2 className="font-display text-3xl font-bold">{title}</h2>
              <ul className="mt-5 grid gap-3 text-ivory/72">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <ChessPiece piece="pawn" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
        <div className="section-shell mt-8">
          <a href="mailto:careers@atrueskill.academy" className="inline-flex min-h-12 items-center gap-3 rounded bg-gold px-5 py-3 font-cinzel text-sm font-semibold uppercase tracking-[0.14em] text-[#120d08] shadow-gold">
            <Mail className="h-4 w-4" /> Apply Now
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
