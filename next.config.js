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
        hostname: "10.10.50.238",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "it-datnt.aum.local.net",
        pathname: "**", // Không cần chỉ định port ở đây
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "admindsome.devlab.info.vn",
        pathname: "/wp-content/uploads/**"
      }
    ]
  }
};

module.exports = nextConfig;
