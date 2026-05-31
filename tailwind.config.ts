import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        deep: "var(--color-bg-deep)",
        board: "var(--color-bg-board)",
        gold: "var(--color-gold)",
        "gold-dim": "var(--color-gold-dim)",
        ivory: "var(--color-ivory)",
        slate: "var(--color-slate)",
        success: "var(--color-success)",
        error: "var(--color-error)"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        decorative: ["var(--font-cinzel-decorative)", "serif"]
      },
      fontSize: {
        "fluid-sm":   "var(--text-sm)",
        "fluid-base": "var(--text-base)",
        "fluid-lg":   "var(--text-lg)",
        "fluid-xl":   "var(--text-xl)",
        "fluid-2xl":  "var(--text-2xl)",
        "fluid-3xl":  "var(--text-3xl)",
        "fluid-4xl":  "var(--text-4xl)",
      },
      boxShadow: {
        gold: "0 0 24px rgba(212,168,67,0.25)",
        "gold-lg": "0 22px 80px rgba(212,168,67,0.16)"
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at center, rgba(212,168,67,0.16), transparent 55%)"
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(0.23, 1, 0.32, 1)",
        "ease-in-out-custom": "cubic-bezier(0.77, 0, 0.175, 1)",
        "ease-drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
      }
    }
  },
  plugins: []
};

export default config;
