import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export default function IntermediatePage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[2]} />
    </PageTransition>
  );
}
