"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      /* Show after scrolling past the hero section (~60vh) */
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="cta-sticky-mobile" aria-label="Quick enrollment">
      <Link href="/contact" className="btn-primary">
        Create your account
      </Link>
    </div>
  );
}
