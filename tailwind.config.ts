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
        white: "rgb(255, 255, 255)",
        black: "rgb(0, 0, 0)",
        primary: "#5cabdf",
        secondary: "#4a99cd",
        background: "#fafafa",
        "background-dark": "#f5f5f5",
        link: "#5cabdf",
        grey: "#6b7280",
      },
    },
  },
  plugins: [],
} satisfies Config;
