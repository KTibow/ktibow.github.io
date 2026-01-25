<script lang="ts">
  import { page } from "$app/state";
  const pages = {
    blog: { url: "/blog/", description: "big thoughts" },
    milliblog: { url: "/blog/humanresearch/", description: "human research" },
    microblog: { url: "https://x.com/anametolast", description: "X" },
    nanoblog: { url: "/nanoblog/", description: "small thoughts" },
    projects: { url: "/projects/", description: "past work" },
    home: { url: "/", description: "about me" },
  };
</script>

<nav class="flex flex-wrap gap-2 p-6 pb-0">
  {#each Object.entries(pages) as [name, { url, description }]}
    {#if page.url.pathname == url}
      <span class="pill selected">{name} - you are here</span>
    {:else}
      <a class="pill layer" href={url}>
        {name} - {description}
      </a>
    {/if}
  {/each}
</nav>

<style>
  .pill {
    display: inline-flex;
    height: 2rem;
    align-items: center;
    position: relative;
    user-select: none;

    border-radius: 9999px;
    padding: 0 1rem;
    background-color: var(--m3c-surface-container-low);
    &.selected {
      background-color: var(--m3c-secondary-container);
      color: var(--m3c-on-secondary-container);
    }
    &:last-child {
      @media (width >= 64rem) {
        margin-left: auto;
      }
    }
  }
</style>
