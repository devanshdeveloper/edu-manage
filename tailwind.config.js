import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(autocomplete|avatar|button|calendar|card|checkbox|chip|code|date-input|date-picker|divider|drawer|dropdown|input|input-otp|kbd|link|modal|navbar|number-input|pagination|radio|scroll-shadow|select|slider|snippet|spinner|toggle|table|toast|ripple|form|listbox|popover|menu|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
