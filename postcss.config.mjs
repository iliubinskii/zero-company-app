/**
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    "autoprefixer": {},
    "postcss-import": {},
    "tailwindcss": {},
    "tailwindcss/nesting": {}
  }
};

export default config;
