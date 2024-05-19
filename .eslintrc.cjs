/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: ["./.eslintrc.base.cjs", "./.eslintrc.next.cjs"],
  globals: {},
  ignorePatterns: ["!.*", ".next/**", "coverage/**", "node_modules/**"],
  overrides: [
    {
      files: "./src/schema/**",
      rules: {
        "import/no-relative-parent-imports": "warn"
      }
    },
    {
      files: ["./src/schema/routes.ts"],
      rules: {
        "no-magic-numbers": "off",
        "typescript-sort-keys/interface": "off"
      }
    }
  ],
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
    "no-console": ["warn", { allow: ["error", "info", "warn"] }],
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
            "consts",
            "crowdworking",
            "daisyui",
            "defs",
            "destructure",
            "discoverable",
            "dom",
            "ecma",
            "enum",
            "escompat",
            "eslintrc",
            "favicon",
            "filenames",
            "flowbite",
            "foreach",
            "globals",
            "gravatar",
            "href",
            "ico",
            "instanceof",
            "jpg",
            "jsdoc",
            "jsdom",
            "jsx",
            "lang",
            "langs",
            "latin",
            "mjs",
            "nda",
            "neue",
            "nextjs",
            "nonnegative",
            "nullable",
            "openapi",
            "parens",
            "pathname",
            "picsum",
            "postcss",
            "readonly",
            "redeclare",
            "req",
            "roboto",
            "rofr",
            "schemas",
            "semibold",
            "smacss",
            "sonarjs",
            "str",
            "stylelint",
            "stylelintrc",
            "subsets",
            "svg",
            "swr",
            "tagline",
            "tailwindcss",
            "textarea",
            "tsconfig",
            "tsx",
            "unobserve",
            "uri",
            "webhooks",
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
