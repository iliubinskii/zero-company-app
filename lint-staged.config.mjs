/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{css,html,json,less,postcss,scss}": "prettier --write",
  "*.{css,less,postcss,scss}": "stylelint --max-warnings=0",
  "*.{js,jsx,ts,tsx}": [() => "npm run type-check", "eslint --max-warnings=0"],
  "*.md": "markdownlint"
};

export default config;
