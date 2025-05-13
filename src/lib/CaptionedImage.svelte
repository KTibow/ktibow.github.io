<script lang="ts">
  import CaptionedMedia from "./CaptionedMedia.svelte";

  let {
    src,
    alt,
    view = "light",
  }: { src: string; alt: string; view?: "light" | "makedark" | "dark" } = $props();
</script>

<CaptionedMedia {alt} dark={view != "light"}>
  <img {src} {alt} class="m-0!" class:invert={view == "makedark"} />
</CaptionedMedia>

<style>
  .invert {
    filter: invert(1) hue-rotate(180deg);
  }
</style>
