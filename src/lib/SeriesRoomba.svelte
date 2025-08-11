<script>
  import { page } from "$app/state";
  import Ripple from "./Ripple.svelte";

  const seriesPosts = [
    "/blog/humanresearch/lightbumper/",
    "/blog/slamffusion/",
    "/blog/roombamotors/",
  ];

  const currentIndex = $derived(seriesPosts.findIndex((post) => page.url.pathname == post));
  const previousPost = $derived(currentIndex > 0 ? seriesPosts[currentIndex - 1] : null);
  const nextPost = $derived(
    currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
  );
</script>

<nav class="grid grid-cols-3 items-center mt-8 not-prose">
  {#if previousPost}
    <a
      href={previousPost}
      class="inline-flex items-center p-2 px-4 text-sm font-medium bg-surface-container-low text-primary rounded-full col-1 justify-self-start relative"
    >
      <Ripple />
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Previous
    </a>
  {/if}

  <span class="text-sm text-on-surface-variant justify-self-center col-2">
    Part {currentIndex + 1} of {seriesPosts.length}
  </span>

  {#if nextPost}
    <a
      href={nextPost}
      class="inline-flex items-center p-2 px-4 text-sm font-medium bg-surface-container-low text-primary rounded-full col-3 justify-self-end relative"
    >
      <Ripple />
      Next
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  {/if}
</nav>
