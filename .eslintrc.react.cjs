/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    "react/jsx-curly-brace-presence": [
      "warn",
      { children: "never", props: "never" }
    ],
    "react/jsx-sort-props": "warn",
    "react/prop-types": "off",
    "react/self-closing-comp": "warn"
  },
  settings: { react: { version: "detect" } }
};

module.exports = config;
