import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter, Playfair_Display } from "next/font/google";
import { ChessboardBg } from "@/components/chess/ChessboardBg";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import OrganizationSchema from "../components/seo/OrganizationSchema";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const decorative = Cinzel_Decorative({ weight: "400", subsets: ["latin"], variable: "--font-cinzel-decorative", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://atrueskill.academy"),
  title: {
    default: "TrueSkill Academy | Chess Coaching for Ambitious Young Minds",
    template: "%s | TrueSkill Academy",
  },
  description:
    "TrueSkill Academy offers expert chess coaching for kids and adults. Structured programs from beginner to advanced with FIDE-level training, strategic thinking, and competitive readiness.",
  openGraph: {
    type: "website",
    siteName: "TrueSkill Academy",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TrueSkill Academy — Think Deeply. Play Beautifully." }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${decorative.variable}`} data-scroll-behavior="smooth">
      <body>
        <LocalBusinessSchema />
        <OrganizationSchema />
        <ChessboardBg />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
