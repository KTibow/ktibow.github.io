<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import fromsvelte from "./fromsvelte.png";
  import fromandroid from "./fromandroid.png";
  import CaptionedImage from "$lib/CaptionedImage.svelte";
  import Snippet from "$lib/Snippet.svelte";
  import { javascript } from "svelte-highlight/languages";
</script>

{#snippet color(hex: string, label: string)}
  <span
    class="inline-flex gap-1 items-center"
    style="color: color-mix(in oklab, currentColor, {hex} 30%)"
  >
    <div class="size-3 rounded-full" style="background-color: {hex}"></div>
    {label}
  </span>
{/snippet}
<BlogHeader title="Why M3 Svelte has on on primary" />
<p><em>The rest of this post speaks in terms of dark mode.</em></p>
<p>
  Normally in Material 3, primary is light, on primary is the opposite, primary container is dark,
  and on primary container is the opposite. So Material 3 decided to make the checkmark in its
  checked switch have a background of {@render color("#453a5f", "on primary")} and a color of
  {@render color("#eadeff", "on primary container")}. What could possibly go wrong?
</p>
<p>
  Well it turns out that in some themes, primary container is <em>not</em> dark. Instead of {@render color(
    "#574c72",
    "primary container",
  )} and {@render color("#eadeff", "on primary container")} (normal), you might have {@render color(
    "#ae8dff",
    "primary container",
  )} and {@render color("#2b006e", "on primary container")} (vibrant), or {@render color(
    "#d4d4d4",
    "primary container",
  )} and {@render color("#000000", "on primary container")} (monochrome), or even {@render color(
    "#aa9dc8",
    "primary container",
  )} and {@render color("#000000", "on primary container")} (high contrast). When placed on {@render color(
    "#453a5f",
    "on primary",
  )}, this makes the icon literally invisible or at least ugly.
</p>
<div class="flex flex-col items-start gap-2">
  <CaptionedImage src={fromsvelte} alt="Invisible checkmark in M3 Svelte" view="dark" />
  <CaptionedImage
    src={fromandroid}
    alt="Invisible checkmark in Android's implementation"
    view="dark"
  />
</div>
<p>M3 Svelte solves this with a custom color called on on primary, defined like this:</p>
<Snippet
  code={`const onOnPrimary = DynamicColor.fromPalette({
  name: "on_on_primary",
  palette: (s) => s.primaryPalette,
  background: () => materialColors.onPrimary(),
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});`}
  language={javascript}
/>
