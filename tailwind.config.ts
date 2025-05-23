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
        omyu: ["omyu_pretty", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
        minsans: ["MinSans-Regular", "sans-serif"],
        ownda: ["Ownglyph_ParkDaHyun", "sans-serif"],
      },
      lineHeight: {
        "4p": "1.04",
      },
      screens: {
        sm: "360px",
      },
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          550: "var(--color-primary-550)",
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
      keyframes: {
        list2: {
          "0%": { transform: "translate(-4rem, 6rem) scale(0.6)" },
          "60%": { transform: "translate(-4rem, 6rem) scale(1.2)" },
          "100%": { transform: "translate(-4rem, 6rem) scale(1)" },
        },
        list3: {
          "0%": { transform: "translate(4rem, 8rem) scale(0.6)" },
          "60%": { transform: "translate(4rem, 8rem) scale(1.2)" },
          "100%": { transform: "translate(4rem, 8rem) scale(1)" },
        },
        music2: {
          "0%": {
            height: "0px",
            opacity: "0",
          },
          "100%": {
            height: "109px",
            opacity: "1",
          },
        },
        friend2: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        list2: "list2 0.4s ease-in-out",
        list3: "list3 0.4s ease-in-out",
        music2: "music2 0.5s ease-out",
        friend2: "friend2 0.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
