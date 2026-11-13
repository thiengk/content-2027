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
        cam: "#FF4D4D",
        phai: "#00C896",
        accent: "#FFB800",
        card: {
          dark: "#1A1A1A",
          light: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
