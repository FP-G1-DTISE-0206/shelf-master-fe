import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "shelf-blue": "#4A69E2",
        "shelf-black": "#232321",
        "shelf-orange": "#FFA52F",
        "shelf-white": "#FFFFFF",
        
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
