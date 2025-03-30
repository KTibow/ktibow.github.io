<script>
  import BlogHeader from "$lib/BlogHeader.svelte";

  let vbHeight = $state("");
  let displayHeight = $state("");
  let density = $state(1);
  let result = $derived.by(() => {
    const vb = +vbHeight;
    const disp = +displayHeight;
    const d = density || 1;

    const pxPortion = 1 / vb;
    const pxSize = pxPortion * disp * d;

    if (!isFinite(pxSize) || !vb || !disp) return "";
    return `1 pixel svg = ${pxSize.toFixed(3)} pixels on screen
0.1 pixel svg = ${(pxSize * 0.1).toFixed(3)} pixels on screen
0.01 pixel svg = ${(pxSize * 0.01).toFixed(3)} pixels on screen
0.001 pixel svg = ${(pxSize * 0.001).toFixed(3)} pixels on screen`.trim();
  });
</script>

<BlogHeader title="You don't need that big of a float precision" />
<p>
  So I love using SVGO for optimizing my SVGs. One of the integral parameters is <code
    >floatPrecision</code
  >, which determines how many decmial points to use when writing out numbers. It's set to 3 by
  default, but it can probably be lowered.
</p>
<p>
  We're going to assume that we're scaling your SVG up to the height of my laptop's screen, 1824px.
  My laptop is relatively high density, so we're going to say we won't tolerate an on-screen error
  of more than 0.5px. Now let's calculate how big of a precision you need based on your SVG's size.
</p>
<ul>
  <li>3648px or bigger: floatPrecision of 0</li>
  <li>365px or bigger: floatPrecision of 1</li>
  <li>37px or bigger: floatPrecision of 2</li>
  <li>4px or bigger: floatPrecision of 3</li>
</ul>
<p>Now let's look at errors for some common SVG sizes.</p>
<ul>
  <li>24px: 3 -> 0.076px error, 2 -> 0.76px error</li>
  <li>48px: 3 -> 0.038px error, 2 -> 0.38px error</li>
  <li>192px: 2 -> 0.095px error, 1 -> 0.95px error</li>
  <li>625px: 2 -> 0.029px error, 1 -> 0.292px error</li>
  <li>1024px: 2 -> 0.018px error, 1 -> 0.178px error</li>
  <li>1080px: 2 -> 0.017px error, 1 -> 0.169px error</li>
</ul>
<p>Here's a calculator too.</p>
<div class="flex flex-col gap-2">
  <input
    type="number"
    bind:value={vbHeight}
    placeholder="viewbox's height"
    class="bg-surface-container-low rounded-lg p-2"
  />
  <input
    type="number"
    bind:value={displayHeight}
    placeholder="pixel height"
    class="bg-surface-container-low rounded-lg p-2"
  />
  <input
    type="number"
    bind:value={density}
    placeholder="density of display (default 1)"
    class="bg-surface-container-low rounded-lg p-2"
  />
  <output class="whitespace-pre-wrap">{result}</output>
</div>

<p>Warning: When converting to absolute, SVGO sometimes loses precision, since it rounds twice.</p>
