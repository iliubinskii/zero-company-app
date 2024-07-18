/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{cjs,js,mjs,jsx,ts,tsx}": "eslint --max-warnings=0",
  "*.{css,html,json,less,postcss,scss}": "prettier --write",
  "*.{css,less,postcss,scss}": "stylelint --max-warnings=0",
  "*.md": "markdownlint"
};

export default config;
