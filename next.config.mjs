/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        pathname: "/**",
        protocol: "https"
      }
    ]
  },
  productionBrowserSourceMaps: true
};

export default nextConfig;
