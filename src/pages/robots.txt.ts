import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
  const sitemapURL = new URL("/sitemap-index.xml", url).href;
  return new Response(`# hi robots!

Sitemap: ${sitemapURL}
`);
};
