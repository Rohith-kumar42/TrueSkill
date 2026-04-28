import type { LucideIcon } from "lucide-react";
import { Brain, GraduationCap, HeartHandshake, Route, Sparkles, Trophy, Users } from "lucide-react";

export type PieceName = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

export type Program = {
  slug: string;
  name: string;
  piece: PieceName;
  accent: string;
  price: string;
  teaser: string;
  intro: string;
  objectives: string[];
  curriculum: string[];
  included: string[];
  schedule: string;
};

export const programs: Program[] = [
  {
    slug: "beginner",
    name: "Beginner",
    piece: "pawn",
    accent: "Warm cream",
    price: "From INR 2,999",
    teaser: "A joyful first step into rules, tactics, and confident board vision.",
    intro: "For new players building a clean foundation in movement, safety, checkmate patterns, and chess manners.",
    objectives: ["Understand every piece and legal move", "Spot simple threats before they arrive", "Finish games with basic checkmates"],
    curriculum: ["Board setup and notation", "Opening principles for young minds", "King safety and one-move tactics", "Rook and queen checkmates"],
    included: ["Weekly live sessions", "Practice positions", "Parent progress notes", "Friendly academy games"],
    schedule: "2 sessions per week, 45 minutes each"
  },
  {
    slug: "post-beginner",
    name: "Post-Beginner",
    piece: "knight",
    accent: "Teal gold",
    price: "From INR 3,999",
    teaser: "For players ready to convert early knowledge into real game plans.",
    intro: "The bridge from knowing the rules to reading positions, planning moves, and enjoying structured competition.",
    objectives: ["Build tactical awareness", "Play principled openings", "Create plans from pawn structure"],
    curriculum: ["Forks, pins, skewers, and discovered attacks", "Opening traps and how to avoid them", "Elementary endgames", "Annotated student games"],
    included: ["Tactics training track", "Monthly practice tournament", "Game review notes", "Rating readiness checklist"],
    schedule: "2 sessions per week, 60 minutes each"
  },
  {
    slug: "intermediate",
    name: "Intermediate",
    piece: "rook",
    accent: "Steel blue gold",
    price: "From INR 5,499",
    teaser: "Sharper calculation, positional decisions, and tournament discipline.",
    intro: "For ambitious players who want more reliable calculation, better plans, and stronger tournament habits.",
    objectives: ["Calculate candidate moves accurately", "Improve middlegame planning", "Convert technical endgames"],
    curriculum: ["Calculation trees", "Minor piece strategy", "Pawn breaks and open files", "Rook endings and conversion technique"],
    included: ["Personal game database", "Tournament preparation", "Opening repertoire map", "Biweekly progress review"],
    schedule: "3 sessions per week, 60 minutes each"
  },
  {
    slug: "advanced",
    name: "Advanced",
    piece: "queen",
    accent: "Deep crimson gold",
    price: "Custom plan",
    teaser: "Elite preparation for serious competitors and title-track students.",
    intro: "A high-touch program for players seeking deep analysis, repertoire sophistication, and competitive edge.",
    objectives: ["Develop a durable repertoire", "Master complex strategic themes", "Prepare for rated tournaments"],
    curriculum: ["Model game analysis", "Dynamic imbalance training", "Advanced endgame studies", "Opponent-specific preparation"],
    included: ["One-to-one analysis", "Opening files", "Tournament calendar planning", "Performance review calls"],
    schedule: "Custom weekly cadence"
  }
];

export const approach = [
  { title: "Discover", text: "We locate the student's current board vision and learning temperament.", piece: "pawn" as PieceName },
  { title: "Build", text: "Core principles become repeatable habits through short, purposeful exercises.", piece: "rook" as PieceName },
  { title: "Challenge", text: "Students meet fresh positions, timed decisions, and instructive mistakes.", piece: "knight" as PieceName },
  { title: "Review", text: "Games are annotated with one clear next improvement, not a fog of theory.", piece: "bishop" as PieceName },
  { title: "Compete", text: "Practice games and tournament preparation make progress visible.", piece: "queen" as PieceName },
  { title: "Master", text: "The student learns how to study independently and think with poise.", piece: "king" as PieceName }
];

export const benefits: Array<{ title: string; text: string; icon: LucideIcon; piece: PieceName }> = [
  { title: "Cognitive", text: "Pattern recognition, calculation, memory, and flexible problem solving.", icon: Brain, piece: "bishop" },
  { title: "Emotional", text: "Patience, resilience, self-control, and graceful recovery after mistakes.", icon: HeartHandshake, piece: "king" },
  { title: "Educational", text: "Sharper focus, structured thinking, and confidence with complexity.", icon: GraduationCap, piece: "rook" },
  { title: "Social", text: "Respectful competition, communication, and community across age groups.", icon: Users, piece: "knight" }
];

export const navLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/advantages", label: "Advantages" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" }
];

export const highlights = [
  { icon: Trophy, label: "Tournament-ready coaching" },
  { icon: Route, label: "Clear level progression" },
  { icon: Sparkles, label: "Playful, rigorous practice" }
];
