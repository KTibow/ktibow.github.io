<script module>
  export const date = "2025-12-29";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} title="M3 Svelte 7" {bg} />

<p>
  M3 Svelte 7 isn't a complete reorganizing like M3 Svelte 6 was. We have incremental improvements
  though:
</p>

<h2>You need to update your CSS</h2>
<p>
  A good start is to regenerate your theme. This takes care of using the new <code>etc</code> entry
  point folder, dropping deprecated colors and deprecated workarounds, and adding a
  <code>--m3-density()</code>. There are a few other things you need to do:
</p>
<ul>
  <li>
    Replace <code>--m3c-background</code> with <code>--m3c-surface</code>, and
    <code>--m3c-on-background</code>
    with <code>--m3c-on-surface</code> everywhere.
  </li>
  <li>
    If you were using the default font, Roboto, you'll need to update your Google Fonts embed to
    download Google Sans Flex instead.
  </li>
</ul>

<h2>Saner syntax for buttons, layers, and focus</h2>
<p>
  If you were using a button linked to an input - that is, a toggle or connected button - you need
  to update your code from this pattern:
</p>
<pre>{`<input type="checkbox" id="goofy-mode" bind:checked={goofyMode} />
<Button for="goofy-mode" square>Goofy mode</Button>`}</pre>
<p>To this pattern:</p>
<pre>{`<Button square label>
  <input type="checkbox" bind:checked={goofyMode} />
  Goofy mode
</Button>`}</pre>

<p>If you were using layers, you need to update your code from this pattern:</p>
<pre>{`<button>
  <Layer />
  Hello
</button>
<${""}style>
  button {
    position: relative;
  }
</style>`}</pre>
<p>To this pattern:</p>
<pre>{`<button class="m3-layer">
  Hello
</button>`}</pre>

<p>
  Focus styles have been moved into the main stylesheet, but as the base layer; move any other CSS
  resets you have to the base layer. They were also refactored to use mixins; replace the classes <code
    >focus-inset</code
  >
  and <code>focus-none</code> with the styles <code>@apply --m3-focus-inward</code> and
  <code>@apply --m3-focus-none</code>.
</p>

<h2>Minute things</h2>
<p>Colors have been updated a lot:</p>
<ul>
  <li>
    No longer exported from default entrypoint. If you want to use them, you will need to install <code
      >@ktibow/material-color-utilities-nightly</code
    >
    and switch your entrypoint to <code>m3-svelte/etc/colors</code>.
  </li>
  <li><code>pairs</code> is gone, vendor it if you were using it</li>
  <li><code>colors</code> now excludes the deprecated background roles</li>
  <li><code>genCSS</code> now expects a third argument with a list of colors to use</li>
</ul>
<p><code>parseSize</code> is gone, vendor it if you were using it.</p>
<p>
  Most components now check for truthiness instead of whether the prop exists at all when deciding
  between states. This means you can't do <code>{`href={undefined}`}</code> to make a fake link, but
  there's no reason you would want to do that. It also means you can do
  <code>{`onclick={loaded ? run : undefined}`}</code> without getting TS errors or having to make two
  separate branches, one with onclick and one without.
</p>

<h2>The upshot</h2>
<p>
  Converting from Layer to m3-layer, plus using inputs inside labels, led to decreasing the demo's
  HTML size by 8.75 kB.
</p>
<p>
  Switching to Google Sans Flex (a font with optical sizing) led to decreasing the demo's CSS size
  by 11.82 kB.
</p>
<p>
  Switching to Sans Flex, and other recent optimizations (like converting colors to tokens,
  switching to light-dark(), and using a specialized <code>--m3-density()</code>), decreased a
  barebones setup's CSS size by 5.29 kB. A token shaked barebones setup (rendering one Button) is
  now 7.09 kB, or just 1.78 kB compressed.
</p>
<p>
  There's more to do: I'm planning to start using CSS Modules soon, which I hope will bring the size
  of a M3 Svelte button reasonably close to a manually created one.
</p>
