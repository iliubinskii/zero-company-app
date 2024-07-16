/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: "plugin:@next/next/recommended",
  rules: {
    "@next/next/no-img-element": "off"
  },
  overrides: [
    {
      files: "./next-env.d.ts",
      rules: { "misc/sort-top-comments": "off" }
    }
  ]
};

module.exports = config;
