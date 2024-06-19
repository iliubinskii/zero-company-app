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
      colors: {
        "charcoal": "#2A2C2F",
        "green-primary": "#379237",
        "green-secondary": "#357C3C",
        "light-gray-cold": "#f8f9fa",
        "light-gray-warm": "#FAF6F0"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      fontSize: {
        teaser: "1.55rem"
      },
      gridTemplateColumns: {
        "header-grid-container": "1fr auto 1fr",
        "header-grid-container-lg": "auto 1fr",
        "main-grid-container": "1fr auto"
      },
      height: {
        "aspect-ratio-16/9": `${0.01 * 900}rem`
      },
      minWidth: {
        "1/3": "33.333333%"
      },
      transitionProperty: {
        width: "width"
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      width: {
        "aspect-ratio-16/9": `${0.01 * 1600}rem`
      }
    }
  }
};

export default config;
