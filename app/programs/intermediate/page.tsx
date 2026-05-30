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
  },
};

export default function IntermediatePage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[2]} />
    </PageTransition>
  );
}
