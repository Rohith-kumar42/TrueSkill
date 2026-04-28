import { PageTransition } from "@/components/PageTransition";
import { LevelPageLayout } from "@/components/sections/LevelPageLayout";
import { programs } from "@/lib/data";

export default function PostBeginnerPage() {
  return (
    <PageTransition>
      <LevelPageLayout program={programs[1]} />
    </PageTransition>
  );
}
