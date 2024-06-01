/* eslint-disable node/no-unpublished-import -- Ok */
/* eslint-disable no-magic-numbers -- Ok */

import daisyui from "daisyui";
import flowbite from "flowbite/plugin";
import plugin from "tailwindcss/plugin";

/**
 * @type {import("tailwindcss").Config}
 */
const config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  plugins: [
    daisyui,
    flowbite,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          // Edge, IE
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          // Chrome, Opera, Safari
          display: "none"
        }
      });
    })
  ],
  safelist: [
    "max-w-screen-sm",
    "max-w-screen-md",
    "max-w-screen-lg",
    "max-w-screen-xl",
    "max-w-screen-2xl"
  ],
  theme: {
    extend: {
      borderWidth: {
        1.5: "1.5px"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      height: {
        "aspect-ratio-16/9": `${0.01 * 900}rem`
      },
      minWidth: {
        "1/3": "33.333333%"
      },
      width: {
        "aspect-ratio-16/9": `${0.01 * 1600}rem`
      }
    }
  }
};

export default config;
