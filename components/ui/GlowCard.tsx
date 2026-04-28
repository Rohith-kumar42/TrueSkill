import { cn } from "@/lib/utils";

export function GlowCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("glass-surface rounded-lg p-6 transition duration-200 hover:border-gold/50 hover:shadow-gold", className)}>{children}</div>;
}
