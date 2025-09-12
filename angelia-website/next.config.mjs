// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Ativa o suporte do compilador para styled-components
    styledComponents: true,
  },
};

export default nextConfig;