import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/certificados/verificar/",
        ],
      },
    ],

    sitemap:
      "https://www.jornadasiberoamericanasdederechoprocesalpenal.com/sitemap.xml",

    host:
      "https://www.jornadasiberoamericanasdederechoprocesalpenal.com",
  };
}