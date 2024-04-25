import withMT from "@material-tailwind/react/utils/withMT";

/**
 * @type {import("tailwindcss").Config}
 */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  theme: { extend: {} }
};

export default withMT(config);
