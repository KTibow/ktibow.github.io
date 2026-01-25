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

{#snippet arrow()}
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    ><path
      fill="currentColor"
      d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
    /></svg
  >
{/snippet}

<HomeBackground />
<div class="flex max-lg:flex-col self-center gap-6 my-auto text-surface">
  <div class="flex flex-col">
    <h1 class="text-5xl font-wb mb-auto">Kendell</h1>
    <p class="link">{time}</p>
    <a class="link layer" href="https://github.com/KTibow">GitHub {@render arrow()}</a>
    <a class="link layer" href="https://github.com/sponsors/KTibow"
      >GitHub Sponsors {@render arrow()}</a
    >
    <a class="link layer" href="https://discord.gg/DSzZQxpzHR">Discord {@render arrow()}</a>
  </div>
  <div class="content">
    <div>
      <p>
        EHLO! i like making things; these are some things i've made. i also have a passion for
        minification (shoutout e18e and voidzero) and chatting.
      </p>
    </div>
    <a class="layer" href="/blog/">Blog</a>
    <a class="layer" href="/blog/humanresearch/">Milliblog</a>
    <a class="layer" href="/nanoblog/">Nanoblog</a>
    <a class="layer" href="/projects/">Projects</a>
  </div>
</div>

<Raccoon />

<style>
  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    &:last-child {
      margin-bottom: -0.5rem;
    }
  }
  .content {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 0.5rem;
    > * {
      padding: 1rem;
      border-radius: 1rem;
    }
    > div {
      background-color: var(--m3c-on-surface);
      grid-column: 1 / span 2;
    }
    > a {
      background-color: var(--m3c-surface);
      color: var(--m3c-on-surface);
    }
  }
  p {
    @media (width >= 64rem) {
      max-width: 25rem;
    }
  }
</style>
