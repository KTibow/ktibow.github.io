<script lang="ts">
  import HomeBackground from "./HomeBackground.svelte";
  import Raccoon from "./Raccoon.svelte";

  let time = $state("");
  let isLoaded = true;
  const updateTime = () => {
    if (!isLoaded) {
      return;
    }

    const now = new Date();
    time = now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });

    setTimeout(updateTime, 60000 - (Date.now() % 60000));
  };
  $effect(() => {
    updateTime();
    return () => (isLoaded = false);
  });
</script>

<svelte:head>
  <title>@KTibow</title>
</svelte:head>

<HomeBackground />
<div class="wrapper">
  <div class="flex gap-2">
    <div class="flex flex-col justify-center rounded-full px-8 bg-background grow">
      <h1 class="text-3xl font-wb">@KTibow</h1>
      <p class="text-xl">i'm Kendell, a developer from the pacific northwest</p>
    </div>
    <img src="/favicon.svg" alt="logo: a few squircles" class="w-32 rounded-full bg-background" />
  </div>
  <details class="text-center">
    <summary>View more</summary>
    <p>i like building code and ui. shoutout to zopfli, avif, and esm.</p>
    <p>
      i also like chatting. i'm online most of the time. sorry if i'm having trouble communicating,
      i do have autism.
    </p>
    <p>it's {time} where i live.</p>
  </details>

  <a class="link flex flex-col justify-center" href="https://github.com/sponsors/KTibow">
    <h2 class="text-3xl font-wb">would you consider a sponsorship?</h2>
    <div
      class="flex flex-wrap items-center justify-center gap-2 overflow-auto whitespace-nowrap mt-4 [&>*]:p-2 [&>*]:rounded-full [&>*]:bg-black/10"
    >
      reasons to be a sponsor:
      <div>get a manually optimized svg</div>
      <div>advertise yourself</div>
      <div>supports my open source work</div>
      <div class="max-xl:hidden">makes you look charitable</div>
      <div class="max-xl:hidden">supports my education</div>
      <div class="max-xl:hidden">prioritizes your questions</div>
    </div>
  </a>
  <a class="link" href="/blog/">blog</a>
  <a class="link" href="https://github.com/KTibow" aria-label="GitHub">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2"
      />
    </svg>
  </a>
  <a class="link" href="https://discord.gg/DSzZQxpzHR" aria-label="Discord">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path
        fill="currentColor"
        d="M25.7 7.1C23.9 6.3 22 5.7 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12c-2 .3-3.9.9-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8c0 1.5-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8c0 1.5-1.1 2.8-2.5 2.8"
      />
    </svg>
  </a>
  <a class="link" href="/expertise/">past projects</a>
</div>

<Raccoon />

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex-grow: 1;

    padding: 1rem;
    @media (width >= 64rem) {
      padding: 1.5rem;
    }
  }

  .link {
    display: flex;
    align-items: center;

    padding: 0.5rem;
    border-radius: 1.5rem;
    background-color: rgb(var(--m3-scheme-background));
    transition: 150ms;
    flex-grow: 1;
  }
  .link:hover {
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  .link:nth-of-type(1) {
    flex-basis: 40px;
  }
  .link:nth-of-type(2) {
    flex-basis: 35px;
  }
  .link:nth-of-type(3) {
    flex-basis: 30px;
  }
  .link:nth-of-type(4) {
    flex-basis: 25px;
  }
  .link:nth-of-type(5) {
    flex-basis: 20px;
  }
</style>
