import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Post-Beginner Chess — From Rules to Real Game Plans",
  description:
    "Bridge the gap from knowing chess rules to reading positions and planning moves. Tactics, opening traps, and structured competition. From INR 3,999.",
  alternates: {
    canonical: "https://atrueskill.academy/programs/post-beginner",
  },
  openGraph: {
    title: "Post-Beginner Chess Program | TrueSkill Academy",
    description: "Tactical awareness, principled openings, and pawn structure plans. Monthly practice tournaments included.",
    url: "https://atrueskill.academy/programs/post-beginner",
  },
};

export default function PostBeginnerPage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[1]} />
    </PageTransition>
  );
}
