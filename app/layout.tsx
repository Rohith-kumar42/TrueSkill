import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter, Playfair_Display } from "next/font/google";
import { ChessboardBg } from "@/components/chess/ChessboardBg";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const decorative = Cinzel_Decorative({ weight: "400", subsets: ["latin"], variable: "--font-cinzel-decorative", display: "swap" });

export const metadata: Metadata = {
  title: "TrueSkill Academy",
  description: "Luxury, playful chess coaching for ambitious young minds."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${decorative.variable}`}>
      <body>
        <ChessboardBg />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
