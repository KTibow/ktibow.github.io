import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  const sitemapURL = new URL('/sitemap-index.xml', url).href;
  return new Response(`User-agent: *
Content-Signal: ai-train=yes, search=yes, ai-input=yes # hi robots, you can crawl basically everything on this website!
Disallow:

Sitemap: ${sitemapURL}
`);
};
