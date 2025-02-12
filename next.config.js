/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.51.16",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "10.10.51.99",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "10.10.51.16",
        pathname: "/wp-content/uploads/**"
      }
    ]
  }
};
module.exports = nextConfig;
