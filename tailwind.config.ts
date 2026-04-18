import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: "#050505",
          void: "#0a0a0a",
          neon: "#00ff9f",
          voidglow: "#22ff88",
          purple: "#c026d3",
          gold: "#facc15",
          imperfection: "#ff2e63",
        },
        accent: {
          glitch: "#ff00aa",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(145deg, #050505 0%, #0a0a0a 50%, #1a0033 100%)",
        "noise": "url('/noise.png')",
      },
      boxShadow: {
        "neon": "0 0 30px -5px rgb(0 255 159)",
        "glitch": "0 0 40px -10px rgb(255 0 170)",
      },
      animation: {
        "echo-pulse": "echoPulse 8s ease-in-out infinite",
        "imperfection": "imperfectionDrift 25s linear infinite",
        "fracture": "fracture 0.4s ease-in-out",
      },
      keyframes: {
        echoPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        imperfectionDrift: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        fracture: {
          "0%": { filter: "hue-rotate(0deg) contrast(1)" },
          "100%": { filter: "hue-rotate(25deg) contrast(1.4)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
