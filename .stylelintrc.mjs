/**
 * @type {import("stylelint").Config}
 */
const config = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-tailwindcss",
    "stylelint-config-tailwindcss/scss",
    "stylelint-config-property-sort-order-smacss"
  ],
  plugins: [
    "stylelint-no-unsupported-browser-features",
    "stylelint-value-no-unknown-custom-properties"
  ],
  rules: {
    "csstools/value-no-unknown-custom-properties": true,
    "plugin/no-unsupported-browser-features": [
      true,
      { ignore: ["css-nesting", "css-appearance", "css-overflow"] },
    ],
    "property-no-vendor-prefix": null,
  }
};

export default config;
