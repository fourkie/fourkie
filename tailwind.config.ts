import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        ownglyph: "var(--font-own-glyph)",
        pretendard: "var(--font-pretendard)",
      },
      lineHeight: {
        "4p": "1.04",
      },
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
        },
        secondary: {
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
        },
        pointColor: "var(--color-point)",
        grey: {
          0: "var(--color-grey-0)",
          1: "var(--color-grey-1)",
          2: "var(--color-grey-2)",
          3: "var(--color-grey-3)",
          4: "var(--color-grey-4)",
          5: "var(--color-grey-5)",
          6: "var(--color-grey-6)",
          7: "var(--color-grey-7)",
          8: "var(--color-grey-8)",
          9: "var(--color-grey-9)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
