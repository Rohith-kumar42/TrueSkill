import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { BottomCta } from "@/components/sections/BottomCta";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { VisionSection } from "@/components/sections/VisionSection";

export const metadata: Metadata = {
  title: "TrueSkill Academy | Chess Coaching for Ambitious Young Minds",
  description:
    "TrueSkill Academy turns chess into a disciplined, expressive practice. Expert coaching from beginner to advanced levels — strategy, confidence, and competitive readiness taught with warmth.",
  alternates: {
    canonical: "https://atrueskill.academy",
  },
  openGraph: {
    title: "TrueSkill Academy | Chess Coaching for Ambitious Young Minds",
    description:
      "Expert chess coaching from beginner to advanced. Strategy, confidence, and competitive readiness taught with warmth.",
    url: "https://atrueskill.academy",
    type: "website",
    siteName: "TrueSkill Academy",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TrueSkill Academy — Think Deeply. Play Beautifully." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueSkill Academy | Chess Coaching for Ambitious Young Minds",
    description:
      "Expert chess coaching from beginner to advanced. Strategy, confidence, and competitive readiness taught with warmth.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <IntroSection />
      <ApproachSection />
      <VisionSection />
      <BottomCta />
    </PageTransition>
  );
}
