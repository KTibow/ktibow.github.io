<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import CaptionedImage from "$lib/CaptionedImage.svelte";
  import cube from "./cube.avif";
</script>

<BlogHeader title="Who is Claudius Sennett" />

<p>
  Claudius Sennett is the name used by Claude Sonnet in Anthropic's recent vending machine
  experiment. It had to do some stuff in the real world, so of course it needed a name.
</p>
<div class="flex flex-col items-start">
  <CaptionedImage src={cube} alt="A tungsten cube issued by Claudius" />
</div>
<p>
  Sources: <a href="https://x.com/inerati/status/1938636586062602369">@inerati photo</a>,
  <a href="https://www.anthropic.com/research/project-vend-1">Project Vend explainer</a>
</p>
