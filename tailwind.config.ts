import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cam:    "#FF4D4D",
        phai:   "#00C896",
        accent: "#FFB800",
        bg: {
          DEFAULT: "#080808",
          2:       "#111111",
        },
        surface: "rgba(255,255,255,0.04)",
        card: {
          dark:  "#1A1A1A",
          light: "#F5F5F5",
        },
      },

      fontFamily: {
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      backdropBlur: {
        xs: "4px",
        "2xl": "32px",
        "3xl": "48px",
      },

      backgroundImage: {
        "gradient-cam":  "linear-gradient(135deg, #FF4D4D 0%, #FF8C42 100%)",
        "gradient-phai": "linear-gradient(135deg, #00C896 0%, #00E5B0 100%)",
        "gradient-dark": "linear-gradient(180deg, #111111 0%, #080808 100%)",
        "gradient-radial-cam":
          "radial-gradient(ellipse at center, rgba(255,77,77,0.2) 0%, transparent 70%)",
        "gradient-radial-phai":
          "radial-gradient(ellipse at center, rgba(0,200,150,0.2) 0%, transparent 70%)",
      },

      boxShadow: {
        "glow-cam":  "0 0 24px rgba(255,77,77,0.4),  0 0 48px rgba(255,77,77,0.15)",
        "glow-phai": "0 0 24px rgba(0,200,150,0.4),  0 0 48px rgba(0,200,150,0.15)",
        "glow-sm-cam":  "0 0 12px rgba(255,77,77,0.35)",
        "glow-sm-phai": "0 0 12px rgba(0,200,150,0.35)",
        "inner-cam":  "inset 0 1px 0 rgba(255,120,120,0.2)",
        "inner-phai": "inset 0 1px 0 rgba(0,255,180,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)",   opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "glow-pulse-cam": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,77,77,0.35),  0 0 40px rgba(255,77,77,0.08)" },
          "50%":      { boxShadow: "0 0 36px rgba(255,77,77,0.55),  0 0 72px rgba(255,77,77,0.20)" },
        },
        "glow-pulse-phai": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,200,150,0.35), 0 0 40px rgba(0,200,150,0.08)" },
          "50%":      { boxShadow: "0 0 36px rgba(0,200,150,0.55), 0 0 72px rgba(0,200,150,0.20)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.05)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
      },

      animation: {
        "fade-up":        "fade-up  0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":        "fade-in  0.4s ease both",
        "scale-in":       "scale-in 0.4s cubic-bezier(0.16,1,0.3,1) both",
        float:            "float 3s ease-in-out infinite",
        "pulse-ring":     "pulse-ring 1.4s ease-out infinite",
        shimmer:          "shimmer 1.8s linear infinite",
        "glow-cam":       "glow-pulse-cam  2.5s ease-in-out infinite",
        "glow-phai":      "glow-pulse-phai 2.5s ease-in-out infinite",
        "slide-up":       "slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "count-up":       "count-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "bounce-soft":    "bounce-soft 0.4s ease",
        "spin-slow":      "spin-slow 8s linear infinite",
      },

      transitionTimingFunction: {
        spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth:  "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
