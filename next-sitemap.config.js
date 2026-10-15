module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://quote.glossyglimpse.co.nz',
  sourceDir: process.env.NEXT_BUILD_DIR || '.next',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/form-submitted/thank-you', '/get-free-quote', '/move-out-cleaning-hamilton', '/move-in-cleaning-hamilton', '/carpet-shampoo-hamilton', '/end-of-tenancy-cleaning'],
};
