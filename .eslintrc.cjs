/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  ignorePatterns: [
    "!.*",
    ".next/**",
    ".swc/**",
    "coverage/**",
    "node_modules/**",
    "playwright-report/**",
    "test-results/**"
  ],
  env: { browser: true, es2020: true },
  extends: [
    "./.eslintrc.base.cjs",
    "./.eslintrc.react.cjs",
    "./.eslintrc.next.cjs"
  ],
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
              "cofounder",
              "csstools",
              "daisyui",
              "desynchronization",
              "docuseal",
              "ekaterina",
              "escompat",
              "esign",
              "flowbite",
              "hoverable",
              "idas",
              "katia",
              "ksenia",
              "liubinskii",
              "netania",
              "persistor",
              "picsum",
              "preprocesses",
              "raanana",
              "rofr",
              "smacss",
              "sonarjs",
              "stylelintrc",
              "ueta",
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
      files: "./src/schema/**",
      rules: { "import/no-relative-parent-imports": "warn" }
    },
    {
      files: "./src/schema/routes.ts",
      rules: {
        "jsdoc/require-description-complete-sentence": "off",
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
        "@typescript-eslint/no-unsafe-member-access": "off"
      }
    }
  ]
};

module.exports = config;
