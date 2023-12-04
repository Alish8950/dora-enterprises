import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#56B280",
      secondary: "#272727",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      white: "#fff",
      
      //primary shades
      "primary-light": "#56B2801A",

      //White shades
      "white-[200]": "#F7F8FA",
      "white-[300]": "#E1E1E1",

      //Blue Shades
      "blue-[800]": "#0B254B",
      "blue-[900]": "#1D293F",

      //Green Shades
      "green-[100]": "#DDF0E6",
      "green-[200]": "#849A8E",

      //Grey shades
      "grey-[200]": "#A7A7A7",
      "grey-[300]": "#E6E6E6",
      "grey-[400]": "#858585",
      "grey-[500]": "#7C8087",
      "grey-[600]": "#5E6E89",
      "grey-[700]": "#1D252C",
    },
    boxShadow: {
      "sm": "0px 4px 24px 0px rgba(139, 167, 178, 0.16)",
      "lg": "0px 4px 24px 0px rgba(123, 123, 123, 0.15)",
    }
  },
  plugins: [],
};
export default config;
