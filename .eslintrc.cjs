/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  ignorePatterns: ["!.*", "coverage/**", ".next/**", "node_modules/**"],
  env: { browser: true, es2020: true },
  globals: {},
  extends: ["./.eslintrc.base.cjs", "./.eslintrc.next.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        cspell: {
          words:
            // @sorted
            [
              "bebas",
              "borderless",
              "crowdworking",
              "daisyui",
              "desynchronization",
              "docuseal",
              "ekaterina",
              "escompat",
              "flowbite",
              "hoverable",
              "kaffeesatz",
              "katia",
              "kickstarter",
              "ksenia",
              "liubinskii",
              "neue",
              "noreferrer",
              "persistor",
              "picsum",
              "preprocesses",
              "roboto",
              "rofr",
              "smacss",
              "sonarjs",
              "stylelintrc",
              "unclicked",
              "yanone"
            ]
        }
      }
    ],
    "import/no-internal-modules": [
      "warn",
      {
        allow:
          // @sorted
          [
            "@testing-library/jest-dom/matchers",
            "flowbite/plugin",
            "next/*",
            "next/font/*",
            "react-icons/*",
            "tailwindcss/plugin"
          ]
      }
    ],
    "misc/consistent-optional-props": [
      "warn",
      { classes: "combined", interfaces: "combined" }
    ],
    "misc/typescript/no-complex-declarator-type": "off",
    "misc/typescript/no-unsafe-object-assignment": "off",
    "n/no-unsupported-features/node-builtins": "off",
    "node/no-unsupported-features/es-builtins": [
      "warn",
      { ignores: [], version: ">=20.0.0" }
    ],
    "node/no-unsupported-features/node-builtins": [
      "warn",
      { ignores: [], version: ">=20.0.0" }
    ],
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks:
          "^(useAsyncCallback|useAuthGuardedLoader|useClickOutside|useEscapePress)$"
      }
    ],
    "unicorn/no-null": "off"
  },
  overrides: [
    {
      files: "./next-env.d.ts",
      rules: { "misc/sort-top-comments": "off" }
    },
    {
      files: "./src/schema/**",
      rules: { "import/no-relative-parent-imports": "warn" }
    },
    {
      files: "./src/schema/routes.ts",
      rules: {
        "misc/comment-spacing": "off",
        "misc/typescript/no-never": "off",
        "misc/typescript/prefer-readonly-array": "off",
        "misc/typescript/prefer-readonly-property": "off",
        "no-magic-numbers": "off",
        "typescript-sort-keys/interface": "off"
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "node/no-unpublished-import": "off"
      }
    },
    { files: "./utils/**", rules: { "node/no-unpublished-import": "off" } }
  ]
};

module.exports = config;
