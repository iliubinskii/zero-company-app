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
          [
            "flowbite/plugin",
            "next/*",
            "next/font/*",
            "react-icons/*",
            "tailwindcss/plugin"
          ]
      }
    ],
    "n/no-unsupported-features/node-builtins": "off",
    "node/no-unsupported-features/es-builtins": [
      "error",
      {
        ignores: [],
        version: ">=20.0.0"
      }
    ],
    "node/no-unsupported-features/node-builtins": [
      "warn",
      {
        ignores: [],
        version: ">=20.0.0"
      }
    ],
    "react-hooks/exhaustive-deps": [
      "warn",
      { additionalHooks: "^(useGuardedLoader)$" }
    ],
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
            "4xl",
            "5xl",
            "6xl",
            "autofix",
            "bebas",
            "builtins",
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
            "docuseal",
            "dom",
            "droppable",
            "dropzone",
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
            "keydown",
            "lang",
            "langs",
            "latin",
            "mjs",
            "nda",
            "neue",
            "nextjs",
            "nonnegative",
            "nowrap",
            "nullable",
            "openapi",
            "parens",
            "pathname",
            "persistor",
            "picsum",
            "postcss",
            "readonly",
            "redeclare",
            "redux",
            "req",
            "resize",
            "roboto",
            "rofr",
            "safelist",
            "schemas",
            "scrollable",
            "scrollbar",
            "semibold",
            "serializable",
            "smacss",
            "snackbar",
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
            "urls",
            "ver",
            "vscode",
            "webhooks",
            "webkit",
            "webp",
            "whitespace",
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
