<script module>
  export const title = "My gripes with the HA frontend";
  export const date = "2024-02-07";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {title} {bg} />
<h2>Slow dev workflow</h2>
<p>
  The frontend uses Webpack. This means that a lot has to be rebuilt every time that something
  changes. There's also no HMR, so you have to manually reload the page. This makes dev slower.
</p>
<div class="bg-white/10 p-4 rounded-[1.5rem] not-prose">
  <p class="font-bold">Solution</p>
  <p>
    <a href="https://vitejs.dev/" class="underline text-white">Vite</a> - has a dev server with a faster
    feedback loop.
  </p>
</div>
<h2>Slow build workflow</h2>
<p>
  The build workflow takes 15 minutes. Imagine I'm trying to change something in the build workflow
  - I only get to try out 3 changes every hour, not an enjoyable experience.
</p>
<div class="bg-white/10 p-4 rounded-[1.5rem] not-prose">
  <p class="font-bold">Solution</p>
  <p>1. Make the prebuild steps run in parallel, be cached, preprepared, etc</p>
  <p>
    2. Switch to Vite for faster JS building (Rollup is fast and Rolldown is going to be even
    faster)
  </p>
  <p>3. Build with Brotli instead of Zopfli</p>
  <p class="mt-4">
    Some argue that we should stick with Zopfli because gzip has better browser support. Here's a
    diagram to demonstrate that we can implement Brotli without worrying about this.
  </p>
  <div class="flex gap-2">
    <div style="flex-basis: 60%" class="bg-white/10 p-4 rounded-[1.5rem]">
      <p class="font-bold">99% of browsers recieve Brotli</p>
      <p class="mt-2">Get better compression than Zopfli</p>
    </div>
    <div style="flex-basis: 40%" class="bg-white/10 p-4 rounded-[1.5rem]">
      <p class="font-bold">7 year old browsers recieve Gzip</p>
      <p class="mt-2">Get decent on-the-fly compression</p>
      <p class="mt-2">This is standard and fast - a chunk can be gzipped in around 10ms</p>
    </div>
  </div>
</div>
<h2>Slow load times</h2>
<p>Big bundles make loading slow. Why are the bundles big though?</p>
<p>
  Webpack is one reason - modules are all or nothing, meaning a whole file may be loaded even if you
  only needed part of it. Switching to Vite will fix this as it uses Rollup.
</p>
<p>
  MWC is another. When we finally switch to only material-web, this will likely help decrease our
  bundle sizes.
</p>
<p>The Intl polyfills are another cause, as these add a base size to all entry points.</p>
<div class="bg-white/10 p-4 rounded-[1.5rem] not-prose">
  <p class="font-bold">Solution</p>
  <p>Switch to Vite, switch to material-web, and switch to a custom message formatter.</p>
</div>
<h2>The way that packages are managed</h2>
<p>
  In my opinion, the frontend has too many dependencies. Some of these were added in just so a card
  could work. Others were added in so an alternative way of frontend development works.
</p>
<p>
  Here's a visualization of the dependencies. I didn't make this a grid because the human mind tends
  to underestimate the number of objects in a grid.
</p>
<div id="deps" class="flex overflow-auto gap-2 items-center">
  <p class="m-0 flex-none">scroll horizontally</p>
  {#each Array.from({ length: 122 + 98 }, (_, i) => i) as i}
    <div
      style="display: flex; height: 4rem; width: 4rem; align-items: center; justify-content: center; text-align: center; flex: none; background-color: rgb(255 255 255 / 0.2); border-radius: 1rem;"
    >
      {i}
      {#if i >= 122}
        (dev)
      {/if}
    </div>
  {/each}
</div>
<p>This makes it take a long time to install packages whenever you make a new dev environment.</p>
<div class="bg-white/10 p-4 rounded-[1.5rem] not-prose">
  <p class="font-bold">Solution</p>
  <p>Small packages can be inlined or replaced with vanilla JS implementations.</p>
  <p>Ecosystems with large packages (like formatjs or MWC) can be moved to other ecosystems.</p>
  <p>Ecosystems not really needed (like WDS) can be removed.</p>
</div>
<p>
  I also don't like yarn, I like pnpm more (it does symlinks and feels faster), but that's just a
  matter of preference.
</p>
<h2>Have I tried to fix these?</h2>
<p>
  Yes. I've tried to make a version of the HA frontend using Vite with varying success, and I've
  tried to get some changes merged in. I couldn't do much with Vite since the code base has a lot of
  complexity, and many of the changes I tried to get merged sadly got rejected.
</p>
