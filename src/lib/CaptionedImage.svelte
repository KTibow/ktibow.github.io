<script lang="ts">
  import CaptionedMedia from "./CaptionedMedia.svelte";

  let { src, alt, dark = false }: { src: string; alt: string; dark?: boolean } = $props();
</script>

<CaptionedMedia {alt} {dark}>
  <img {src} {alt} class="m-0!" />
</CaptionedMedia>
