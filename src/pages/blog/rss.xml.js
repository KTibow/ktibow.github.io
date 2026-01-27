import rss from "@astrojs/rss";
import list from "./_list";

export const blogRSSTitle = "Kendell's blog";
export async function GET(context) {
  return rss({
    title: blogRSSTitle,
    description: "Thoughts, primarily about technology.",
    site: context.url.origin,
    items: list,
  });
}
