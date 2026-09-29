/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B4D8C",
          dark: "#5B9BD5",
        },
        secondary: {
          DEFAULT: "#0F172A",
          dark: "#E2E8F0",
        },
        background: {
          DEFAULT: "#F8FAFC",
          dark: "#0B1220",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#111827",
        },
        text: {
          DEFAULT: "#0F172A",
          dark: "#F1F5F9",
        },
        muted: {
          DEFAULT: "#64748B",
          dark: "#94A3B8",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#1F2937",
        },
        tier: {
          verified: {
            DEFAULT: "#16A34A",
            dark: "#22C55E",
            bg: "#F0FDF4",
            "bg-dark": "#052e16",
          },
          unverified: {
            DEFAULT: "#CA8A04",
            dark: "#EAB308",
            bg: "#FEFCE8",
            "bg-dark": "#422006",
          },
          warning: {
            DEFAULT: "#DC2626",
            dark: "#EF4444",
            bg: "#FEF2F2",
            "bg-dark": "#450a0a",
          },
          info: {
            DEFAULT: "#2563EB",
            dark: "#60A5FA",
            bg: "#EFF6FF",
            "bg-dark": "#172554",
          },
        },
      },
    },
  },
  plugins: [],
};
