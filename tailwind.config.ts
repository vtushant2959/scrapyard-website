import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#081018",
        "bg-secondary": "#0d1825",
        "bg-card": "#0f1e2e",
        "primary-green": "#6F9E62",
        "primary-blue": "#003C9E",
        "accent-glow": "#2CEB88",
        "silver": "#C8CDD5",
        "dark-border": "#1a2a3a",
        "text-muted": "#8899aa",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "shimmer": "shimmer 2s linear infinite",
        "truck": "truckMove 4s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 10px #2CEB88" },
          "50%": { opacity: "1", boxShadow: "0 0 30px #2CEB88, 0 0 60px #6F9E62" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        truckMove: {
          "0%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "metal-texture": "linear-gradient(135deg, #0f1e2e 0%, #081018 50%, #0d1520 100%)",
        "glow-green": "radial-gradient(ellipse at center, rgba(44,235,136,0.15) 0%, transparent 70%)",
        "glow-blue": "radial-gradient(ellipse at center, rgba(0,60,158,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(44,235,136,0.3), 0 0 40px rgba(44,235,136,0.1)",
        "glow-blue": "0 0 20px rgba(0,60,158,0.5), 0 0 40px rgba(0,60,158,0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card": "0 4px 24px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        "glass": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
