/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: "plugin:@next/next/recommended",
  rules: {
    "@next/next/no-img-element": "off"
  }
};

module.exports = config;
