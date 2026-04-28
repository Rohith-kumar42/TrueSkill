import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export default function BeginnerPage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[0]} />
    </PageTransition>
  );
}
