/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL || 'https://georgecht.com',
  generateRobotsTxt: true,
  // Robots configuration options @see: https://www.npmjs.com/package/next-sitemap#configuration-options
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/404' },
    ],
  },
  output: 'export',
}

module.exports = config
