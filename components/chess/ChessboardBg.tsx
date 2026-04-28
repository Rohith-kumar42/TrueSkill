"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ChessboardBg() {
  const { scrollYProgress } = useScroll();
  const yBoard = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yPieces = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: yBoard }}
        className="absolute inset-x-[-10%] top-[-20%] h-[140%] opacity-[0.08]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(234,215,178,0.24) 25%, transparent 25%), linear-gradient(-45deg, rgba(234,215,178,0.24) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(139,94,60,0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(139,94,60,0.3) 75%)",
            backgroundPosition: "0 0, 0 32px, 32px -32px, -32px 0",
            backgroundSize: "64px 64px"
          }}
        />
      </motion.div>
      <motion.div style={{ y: yPieces }} className="absolute inset-0 opacity-[0.05]">
        <div className="absolute left-[8%] top-[18%] font-display text-[12rem] text-gold">♞</div>
        <div className="absolute right-[6%] top-[46%] font-display text-[14rem] text-ivory">♛</div>
        <div className="absolute bottom-[4%] left-[42%] font-display text-[10rem] text-gold">♜</div>
      </motion.div>
    </div>
  );
}
