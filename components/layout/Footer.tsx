import Link from "next/link";
import { ChessPiece } from "@/components/chess/ChessPiece";
import { navLinks, programs } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-[#090909] py-12">
      <div className="section-shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <ChessPiece piece="king" className="h-12 w-12 text-gold" title="TrueSkill king logo" />
            <span className="font-cinzel text-xl font-semibold">TrueSkill Academy</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-ivory/65">
            Chess coaching with rigor, imagination, and a clear path from first moves to competitive confidence.
          </p>
        </div>
        <div>
          <h2 className="font-cinzel text-sm uppercase tracking-[0.16em] text-gold">Programs</h2>
          <div className="mt-4 grid gap-2 text-sm text-ivory/70">
            {programs.map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`} className="hover:text-gold">
                {program.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-cinzel text-sm uppercase tracking-[0.16em] text-gold">Academy</h2>
          <div className="mt-4 grid gap-2 text-sm text-ivory/70">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-gold/10 pt-6 text-sm text-ivory/50">
        © 2026 TrueSkill Academy. Think deeply. Play beautifully.
      </div>
    </footer>
  );
}
