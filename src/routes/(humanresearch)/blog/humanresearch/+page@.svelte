<script lang="ts">
  import SeriesBlog from "$lib/SeriesBlog.svelte";

  const dates = import.meta.glob<string>("./*/+page.svelte", { eager: true, import: "date" });
  const titles = import.meta.glob<string>("./*/+page.svelte", { eager: true, import: "title" });
  const blogs = Object.keys(dates)
    .sort((a, b) => dates[b].localeCompare(dates[a]))
    .map((path) => {
      const id = path.split("/")[1];
      const title = titles[path];
      return { id, title };
    });
</script>

<svelte:head>
  <title>Human Research</title>
</svelte:head>

<SeriesBlog />
<h2 class="mt-6 px-8 text-2xl">
  This is Human Research, a project to help the humans of the future index and train on findings
  that aren't currently on the (clear and scrapable) internet.
</h2>

<div class="flex flex-wrap grow gap-2 p-6">
  {#each blogs as { id, title }}
    <a href="/blog/humanresearch/{id}/" class="entry layer">{title}</a>
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
