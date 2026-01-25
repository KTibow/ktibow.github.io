<script lang="ts">
  import SeriesBlog from "$lib/SeriesBlog.svelte";

  const dates = import.meta.glob<string>("./*/+page.svelte", { eager: true, import: "date" });
  const titles = import.meta.glob<string>("./*/+page.svelte", { eager: true, import: "title" });
  const blogs = Object.keys(dates)
    .sort((a, b) => dates[b].localeCompare(dates[a]))
    .map((path) => {
      const url = `/blog/${path.split("/")[1]}/`;
      const title = titles[path];
      return { url, title };
    });
  blogs.splice(
    blogs.findIndex(({ url }) => url == "/blog/sleep/"),
    0,
    { url: "/blog/cssinjection/work.pdf", title: "CSS Injection is All You Need" },
  );
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<SeriesBlog />

<div class="flex flex-wrap grow gap-2 p-6">
  {#each blogs as { url, title }}
    <a href={url} class="entry layer">{title}</a>
  {/each}
</div>

<style>
  .entry {
    flex: 1 1 16rem;
    border-radius: 1rem;
    padding: 1rem;
    background-color: var(--m3c-surface-container-low);
    position: relative;
  }
</style>
