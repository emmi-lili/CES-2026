import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Hero design
        brand: {
          green: "#3DF07A",
          "green-bright": "#5BFF8F",
          "green-deep": "#0B2417",
          violet: "#8B5CF6",
        },
        surface: {
          black: "#000000",
          base: "#05070A",
          nav: "#0A1A12",
          card: "#15181C",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
