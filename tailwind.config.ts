import ContactUs from "@/app/Component/ContactUs";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

 fontFamily: {
  sans: ['Roboto', 'sans-serif'],
    },

      colors: {
        main: '#1D4ED8',      // Replace with your primary color
        secondary: '#9333EA', // Replace with your secondary color
      },
    },
  },
  plugins: [],
};
export default config;
