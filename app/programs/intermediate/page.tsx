import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Intermediate Chess Coaching — Sharper Calculation & Tournament Play",
  description:
    "Sharpen calculation, positional decision-making, and tournament discipline. Personal game database, opening repertoire maps, and rook endgame technique. From INR 5,499.",
  alternates: {
    canonical: "https://atrueskill.academy/programs/intermediate",
  },
  openGraph: {
    title: "Intermediate Chess Coaching | TrueSkill Academy",
    description: "3 sessions per week of focused calculation, middlegame planning, and conversion technique.",
    url: "https://atrueskill.academy/programs/intermediate",
    type: "website",
    siteName: "TrueSkill Academy",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TrueSkill Academy — Think Deeply. Play Beautifully." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intermediate Chess Coaching | TrueSkill Academy",
    description: "3 sessions per week of focused calculation, middlegame planning, and conversion technique.",
    images: ["/og-image.png"],
  },
};

export default function IntermediatePage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[2]} />
    </PageTransition>
  );
}
