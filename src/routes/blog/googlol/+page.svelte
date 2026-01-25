<script module>
  export const title = "Googlol";
  export const date = "2025-05-11";
</script>

<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import CaptionedImage from "$lib/CaptionedImage.svelte";
  import CaptionedMedia from "$lib/CaptionedMedia.svelte";
  import bg from "./bg.avif";
  import more from "./more.png";
  import logowhere from "./logowhere.png";
  import sohot from "./sohot.png";
  import pointerer from "./pointerer.jpeg";
  import geminimeter from "./geminimeter.mp4";
  import arcgen from "./arcgen.jpeg";
  import untrue from "./untrue.png";
  import nocode from "./nocode.png";
  import richharris from "./richharris.png";
  import yesno from "./yesno.png";
</script>

<BlogHeader {date} {title} {bg} />
<p>
  Google is a 325 billion dollar company. So why are they so inattentive to detail that it made me
  go to the effort of setting this page up? Perhaps paying attention to the finer aspects isn't
  profitable.
</p>

<div class="flex flex-col items-start gap-4">
  <CaptionedImage src={more} alt="Symmetry might have fallen out of fashion" view="dark" />
  <CaptionedImage src={logowhere} alt="What's Wikipedia's logo? We will never know" view="dark" />
  <CaptionedImage
    src={sohot}
    alt="This badge was added to AI studio when Gemini image gen was cool and never removed"
    view="dark"
  />
  <CaptionedImage
    src={pointerer}
    alt="Someone forgot to set pointer events none, so this element stops you from clicking"
    view="dark"
  />
  <CaptionedImage src={untrue} alt="Nothing here is helpful (taken on Jun 11)" view="dark" />
  <CaptionedImage src={nocode} alt="No code snippets for you" view="dark" />
  <CaptionedImage
    src={richharris}
    alt={'"There is no prominent comic character named Rich Harris"'}
    view="dark"
  />
  <CaptionedImage src={yesno} alt="The no button here literally does nothing" view="dark" />
</div>

<h2>Aside - Gemini's own silly mistakes</h2>
<div class="flex flex-col items-start gap-4">
  <CaptionedMedia alt="Gemini made a meter where the needle goes upside down">
    <video autoplay loop muted playsinline src={geminimeter}></video>
  </CaptionedMedia>
  <CaptionedImage
    src={arcgen}
    alt="Gemini image generation corrupts an ARC AGI task when asked to complete it"
  />
</div>
