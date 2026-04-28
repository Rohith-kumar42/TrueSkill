import { LevelCard } from "@/components/ui/LevelCard";
import { PageTransition } from "@/components/PageTransition";
import { programs } from "@/lib/data";

export default function ProgramsPage() {
  return (
    <PageTransition>
      <section className="pt-32">
        <div className="section-shell min-h-[42vh] py-16">
          <p className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold">Programs</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] font-black leading-none text-balance">
            A complete path from first moves to tournament command.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/70">
            Choose the level that matches the student today. Each track has live coaching, practice structure, and review built in.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="section-shell grid gap-5 md:grid-cols-2">
          {programs.map((program) => (
            <LevelCard key={program.slug} program={program} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
