<script lang="ts">
  import { page } from "$app/state";
  import Ripple from "./Ripple.svelte";

  const series = [
    [
      "/blog/humanresearch/lightbumper/",
      "/blog/slamffusion/",
      "/blog/roombamotors/",
      "/blog/humanresearch/roombadock/",
      "/blog/humanresearch/roombadockillustrated/",
    ],
    [
      "/blog/farewellcfpages/",
      "/blog/imisscfpages/",
      "/blog/lowselfconfidence/",
      "/blog/butexperience/",
    ],
  ];

  const thisSeries = $derived(series.find((s) => s.includes(page.url.pathname))!);
  const currentIndex = $derived(thisSeries.findIndex((post) => post == page.url.pathname));
  const previousPost = $derived(currentIndex > 0 ? thisSeries[currentIndex - 1] : null);
  const nextPost = $derived(
    currentIndex < thisSeries.length - 1 ? thisSeries[currentIndex + 1] : null,
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
    Part {currentIndex + 1} of {thisSeries.length}
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
