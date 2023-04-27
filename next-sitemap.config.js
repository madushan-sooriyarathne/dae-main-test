/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://dea.fun/";

module.exports = {
  siteUrl: siteUrl,
  exclude: ["/404", "/server-sitemap-index.xml"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
    ],
  },
};
