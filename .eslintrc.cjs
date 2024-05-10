/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: ["./.eslintrc.base.cjs"],
  globals: {},
  ignorePatterns: ["!.*", ".next/**", "coverage/**", "node_modules/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "import/no-internal-modules": [
      "warn",
      {
        allow:
          // @sort
          ["flowbite/plugin", "next/*", "next/font/*", "react-icons/*"]
      }
    ],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "spellcheck/spell-checker": [
      "warn",
      {
        comments: true,
        identifiers: true,
        lang: "en_US",
        minLength: 3,
        skipWords:
          // @sort
          [
            "2xl",
            "3xl",
            "autofix",
            "bebas",
            "camelcase",
            "checkbox",
            "cjs",
            "commonjs",
            "compat",
            "crowdworking",
            "daisyui",
            "destructure",
            "discoverable",
            "ecma",
            "enum",
            "escompat",
            "eslintrc",
            "favicon",
            "filenames",
            "flowbite",
            "foreach",
            "globals",
            "href",
            "ico",
            "instanceof",
            "jpg",
            "jsdoc",
            "jsx",
            "lang",
            "langs",
            "latin",
            "mjs",
            "neue",
            "parens",
            "picsum",
            "postcss",
            "redeclare",
            "req",
            "roboto",
            "semibold",
            "smacss",
            "sonarjs",
            "str",
            "stylelint",
            "stylelintrc",
            "subsets",
            "svg",
            "tagline",
            "tailwindcss",
            "tsconfig",
            "tsx",
            "uri",
            "webp",
            "zod"
          ],
        strings: true,
        templates: true
      }
    ],
    "unicorn/no-null": "off"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
