/* eslint-disable no-magic-numbers -- Ok */

import daisyui from "daisyui";
import flowbite from "flowbite/plugin";

/**
 * @type {import("tailwindcss").Config}
 */
const config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  plugins: [daisyui, flowbite],
  theme: {
    extend: {
      borderWidth: {
        1.5: "1.5px"
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
