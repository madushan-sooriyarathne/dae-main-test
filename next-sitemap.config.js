/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://dae.fun/";

module.exports = {
  siteUrl: siteUrl,
  exclude: ["/404", "/server-sitemap.xml"],
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
