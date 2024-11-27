/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
