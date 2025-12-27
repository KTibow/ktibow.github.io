<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import buttonDemo from "./button-demo.png";
  import sliderDemo from "./slider-demo.png";
  import themeDemo from "./theme-demo.png";
</script>

<BlogHeader {bg} title="Replacing Svelte class names with emojis for fun and profit" />
<p>
  Svelte tags every component with class names that look like <code>svelte-abc123</code>. But
  doesn't that seem wasteful? It makes your HTML and CSS larger just to scope styles.
</p>
<p>
  You can customize this behavior by setting <a
    href="https://svelte.dev/docs/svelte/svelte-compiler#:~:text=cssHash">cssHash</a
  >. I played around with a few options:
</p>
<ul>
  <li>
    Just switching from <code>svelte-</code> to <code>svelte</code> gave a 0.24% compressed size
    reduction. Didn't PR this because it isn't really free - what if someone, for some reason, was
    targeting the <code>svelte-</code> class name?
  </li>
  <li>
    The max compressed size reduction I got was a 4.3% by switching to Base 62. But this is very
    risky - for example, what if a component's class is <code>m</code> when <code>m</code> indicates
    the medium size? It also wasn't deterministic, because the identifier I used was the number of times
    cssHash was called.
  </li>
</ul>
<p>
  But then I tried emojis. The profit: they were instantly recognizable, letting you both use them
  to identify which elements belonged to which components or tune them out, plus were smaller than
  the default <code>svelte-abc123</code>. The fun:
</p>
<img src={buttonDemo} alt="Button demo HTML" />
<img src={sliderDemo} alt="Slider demo HTML" />
<img src={themeDemo} alt="Theme demo HTML" />
<p>
  They also happened to be poetically accurate. <code>💅</code> for the theme settings,
  <code>🛗</code>
  for the arrow icon, <code>📺</code> for the demo section...
</p>
