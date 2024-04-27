import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   whiteSmoke: "#f1f2f6",
    //   lightYellow: "#f7f1e3",
    //   sky: "#c7ecee",
    //   hotPink: "#fab1a0",
    //   lightPurple: "#a29bfe", 
    //   lightGray: "#d2dae2", 
    //   gray: "#485460", 
    //   darkgray: "#222f3e", 
    //   indigo: "#130f40", 
    //   lime: "#badc58",
    //   lightOrange: "#ffbe76",
    //   orange: "#f0932b",
    // },
  },
  plugins: [],
};
export default config;
