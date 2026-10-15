/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  async redirects() {
    return [
      { source: '/get-free-quote', destination: '/#quote', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      ...['move-out-cleaning-hamilton', 'move-in-cleaning-hamilton', 'carpet-shampoo-hamilton', 'end-of-tenancy-cleaning', 'move-out-cleaning-wellington', 'move-in-cleaning-wellington', 'carpet-shampoo-wellington'].map(path => ({ source: `/${path}`, destination: '/', permanent: true })),
    ];
  },
};
module.exports = nextConfig;
