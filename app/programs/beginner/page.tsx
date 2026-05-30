import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beginner Chess Program — First Moves to Confident Play",
  description:
    "A joyful first step into chess. TrueSkill's beginner program teaches rules, tactics, and board vision for new players aged 5 and up. From INR 2,999.",
  alternates: {
    canonical: "https://atrueskill.academy/programs/beginner",
  },
  openGraph: {
    title: "Beginner Chess Program | TrueSkill Academy",
    description: "Build a clean chess foundation — movement, safety, checkmate patterns, and chess manners. 2 sessions per week.",
    url: "https://atrueskill.academy/programs/beginner",
  },
};

export default function BeginnerPage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[0]} />
    </PageTransition>
  );
}
