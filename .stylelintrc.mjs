/**
 * @type {import("stylelint").Config}
 */
const config = {
  extends: ["./.stylelintrc.base.mjs"],
  rules: {
    "scss/at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind"] }]
  }
};

export default config;
