import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 2 0%",
        "5": "5 5 0%",
      },
      colors: {
        "yellow-custom": "#A8843A",
      },
      screens: {
        "xs": "360px",
        "2xl": "1400px",
        "3xl": "1536px",
      },
      boxShadow: {
        "3xl": "1px 1px 4px 1px rgba(0, 0, 0, 0.1)",
      },
      backgroundColor: {
        "green-custom": "#1C9722",
        primary: "#FCFEFF",
        "gray-custom": "#f6f6f6",
      },
    },
  },
  plugins: [],
};
export default config;
