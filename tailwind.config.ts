import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#028174",
          secondary: "#0AB68B",
          accent: "#92DE8B",
          neutral: "#3d4451",
          "base-100": "#FFE3B3",
          "base-200": "#FFE3A2",
          "base-300": "#FFE391",
        },
      },
    ],
  },
} satisfies Config;
