/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL || 'https://georgecht.com',
  generateRobotsTxt: true,
  output: 'export',
}

module.exports = config
