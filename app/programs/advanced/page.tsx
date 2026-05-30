import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Advanced Chess Program — Elite Tournament Preparation",
  description:
    "Elite preparation for serious competitors and title-track students. Deep analysis, repertoire sophistication, opponent-specific preparation, and one-to-one coaching.",
  alternates: {
    canonical: "https://atrueskill.academy/programs/advanced",
  },
  openGraph: {
    title: "Advanced Chess Program | TrueSkill Academy",
    description: "High-touch coaching for players seeking competitive edge — model game analysis, dynamic imbalance training, and tournament calendar planning.",
    url: "https://atrueskill.academy/programs/advanced",
    type: "website",
    siteName: "TrueSkill Academy",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TrueSkill Academy — Think Deeply. Play Beautifully." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Chess Program | TrueSkill Academy",
    description: "High-touch coaching for players seeking competitive edge — model game analysis, dynamic imbalance training, and tournament calendar planning.",
    images: ["/og-image.png"],
  },
};

export default function AdvancedPage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[3]} />
    </PageTransition>
  );
}
