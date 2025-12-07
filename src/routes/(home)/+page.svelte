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
<h1 class="text-8xl font-wb text-background self-center mt-16">@KTibow</h1>
<p class="self-center text-background text-xl">i'm Kendell, here to make stuff</p>
<details class="text-center text-background">
  <summary class="text-xl">view more</summary>
  <p>
    i like writing code and web apps, but i also like making things fast. shoutout to tree shaking
    and e18e.
  </p>
  <p>
    i also like chatting - i'm online most of the time. sorry if i'm having trouble communicating, i
    do have autism.
  </p>
  <p>it's {time} where i live.</p>
</details>
<div class="connected">
  <a href="/blog"> blog(s) </a>
  <a href="https://github.com/KTibow">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>GitHub</title>
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2"
      />
    </svg>
  </a>
  <a href="https://discord.gg/DSzZQxpzHR">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Discord</title>
      <path
        fill="currentColor"
        d="M25.7 7.1C23.9 6.3 22 5.7 20 5.3h-.1c-.2.4-.5 1-.7 1.5c-2.2-.3-4.3-.3-6.4 0c-.2-.5-.5-1-.7-1.5H12c-2 .3-3.9.9-5.7 1.8C2.7 12.5 1.7 17.8 2.2 23v.1c2.4 1.8 4.7 2.8 7 3.5h.1c.5-.7 1-1.5 1.4-2.3v-.1c-.8-.3-1.5-.6-2.2-1c-.1 0-.1-.1 0-.1c.1-.1.3-.2.4-.3H9c4.6 2.1 9.5 2.1 14.1 0h.1c.1.1.3.2.4.3c.1 0 0 .1 0 .1c-.7.4-1.4.8-2.2 1c0 0-.1.1 0 .1c.4.8.9 1.6 1.4 2.3h.1c2.3-.7 4.6-1.8 7-3.5V23c.6-6-1-11.2-4.2-15.9M11.4 19.9c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8c0 1.5-1.1 2.8-2.5 2.8m9.3 0c-1.4 0-2.5-1.3-2.5-2.8s1.1-2.8 2.5-2.8s2.5 1.3 2.5 2.8c0 1.5-1.1 2.8-2.5 2.8"
      />
    </svg>
  </a>
  <a href="https://github.com/sponsors/KTibow">sponsor (thanks)</a>
</div>

<Raccoon />

<style>
  .connected {
    display: flex;
    gap: 0.5rem;
    margin: auto;
    @media (width < 37.5rem) {
      flex-direction: column;
    }
    > * {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 6rem;
      padding-inline: 1.5rem;
      font-size: 1.5rem;
      > svg {
        width: 3rem;
        height: 3rem;
      }
      background-color: var(--m3c-background);
      color: var(--m3c-on-background);
      &:hover {
        background-color: var(--m3c-primary-container);
        color: var(--m3c-on-primary-container);
      }
      transition: all 0.1s;
      border-radius: 0.5rem;
      @media (width >= 37.5rem) {
        &:first-child {
          border-start-start-radius: 1rem;
          border-end-start-radius: 1rem;
        }
        &:last-child {
          border-start-end-radius: 1rem;
          border-end-end-radius: 1rem;
        }
      }
      @media (width < 37.5rem) {
        &:first-child {
          border-start-start-radius: 1rem;
          border-start-end-radius: 1rem;
        }
        &:last-child {
          border-end-start-radius: 1rem;
          border-end-end-radius: 1rem;
        }
      }
    }
  }
</style>
