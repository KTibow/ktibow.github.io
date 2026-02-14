import rss from "@astrojs/rss";
import { blogRSSTitle } from "$lib/layouts/Base.astro";
import { blogPosts } from "virtual:post-lists";

export async function GET(context) {
  return rss({
    title: blogRSSTitle,
    description: "Thoughts, primarily about technology.",
    site: context.url.origin,
    items: blogPosts,
  });
}
