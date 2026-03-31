import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TWK Lausanne", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
