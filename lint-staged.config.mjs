/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{cjs,cjsx,js,jsx,mjs,mjsx,ts,tsx}": "eslint --max-warnings=0",
  "*.{css,html,json,less,postcss,scss}": "prettier --log-level warn --write",
  "*.{css,less,postcss,scss}": "stylelint --max-warnings=0",
  "*.md": "markdownlint"
};

export default config;
