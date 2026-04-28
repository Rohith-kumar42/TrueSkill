import { PageTransition } from "@/components/PageTransition";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { BottomCta } from "@/components/sections/BottomCta";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { VisionSection } from "@/components/sections/VisionSection";

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
