<script module>
  export const date = "2024-01-24";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {bg} title="Why do we still use chroma subsampling" />
<p>
  Chroma subsampling is a simple idea. Our eyes are less sensitive to colors than they are to light,
  and most colors within a range are close to each other, so we can only send the chroma for every 4
  pixels instead of for every 1.
</p>
<img
  src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Common_chroma_subsampling_ratios.svg"
  class="bg-neutral-300 rounded-2xl p-1 w-full"
  alt=""
/>
<p>
  Our eyes can barely tell the difference. As such, this system is used in basically all lossy image
  formats. JPEG? Used it since the start. AVIF and WEBP? On by default. You can find it anywhere.
</p>
<p>
  However, there's a problem. As you can see in the diagram, if pixels are close together with
  different chromas, they end up being different. Here's an example where you can really see the
  artifacts:
</p>
<div class="grid md:grid-cols-2 gap-2">
  <div class="bg-neutral-800 rounded-lg p-2">
    Original
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d9/420-original444.png"
      class="rounded-2xl"
      alt=""
    />
  </div>
  <div class="bg-neutral-800 rounded-lg p-2">
    Chroma subsampled
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/1c/420-progressive-still.png"
      class="rounded-2xl"
      alt=""
    />
  </div>
</div>
<p>
  I was thinking about this for a while, and came up with some ideas but eventually came to a
  conclusion. Here's how that all went in my head.
</p>

<h2>attempt 1: use more pixels with a gradient system</h2>
<p>
  Instead of mapping every 4 pixels to 1 chroma, how about we map every 8 pixels to 2 chromas? We
  have one chroma for the low luminance, another chroma for a high luminance, and create a gradient
  between them.
</p>
<p>This would help in cases like the above. It might also generally improve image quality.</p>
<p>
  On the other hand, if each box is the same luminance but with different chroma, that would create
  <em>more</em> artifacts. So I went back to the drawing board.
</p>

<h2>attempt 2: dynamic subsampling ranges</h2>
<p>
  What if instead of always using a 2x2 grid to subsample, we vary the width to minimize artifacts?
  For example, in the example images above, we would have a long red strip, a long green strip, and
  a long red strip, and the place where the boundary is would match up with the place where the
  chroma changes.
</p>
<p>
  This could work just fine. We could even add back attempt 1's system conditionally if it would
  improve quality. We could also make it so that the height could vary. But wait... are we just
  reinventing image compression?
</p>

<h2>realization: we shouldn't really use chroma subsampling</h2>
<p>
  Chroma subsampling relies on the ideas that our eyes are less sensitive to certain parts and that
  there are big parts of images similar in one way in another. But those are the same ideas that
  image compression already uses.
</p>
<p>
  Chroma subsampling essentially makes two versions of the image, a grayscale one at full res and a
  chroma one at half res. But since we already have the ability to vary our quality, why not just
  apply more lossy compression to the chroma? Surely that would be more effective than a simple
  downscale?
</p>
<p>
  I don't know. I haven't made any codecs myself. I just find it funny that essentially all lossy
  codecs still use this system by default.
</p>
