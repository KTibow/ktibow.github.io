<script lang="ts">
  import SeriesBlog from "$lib/SeriesBlog.svelte";
  import Raccoon from "./Raccoon.svelte";
  import bg from "./bg.svg?url";
  import cursor from "./cursor.svg?url";

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

  const bodyProps = [
    `cursor: url("${cursor}"), auto`,
    `background-image: url("${bg}")`,
    `background-color: var(--m3c-primary)`,
    `background-size: 100%`,
    `background-repeat: no-repeat`,
    `background-attachment: fixed`,
    `background-position: top center`,
  ].join(";");
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

{@html `<style>body { ${bodyProps} }</style>`}
<SeriesBlog />
<main class="flex max-lg:flex-col self-center gap-6 mx-2 my-auto text-surface">
  <div class="flex flex-col">
    <h1 class="text-5xl font-wb mb-auto">Kendell</h1>
    <p class="link">{time}</p>
    <a class="link layer" href="https://github.com/KTibow">GitHub {@render arrow()}</a>
    <a class="link layer" href="https://github.com/sponsors/KTibow"
      >GitHub Sponsors {@render arrow()}</a
    >
    <a class="link layer" href="https://discord.gg/DSzZQxpzHR">Discord {@render arrow()}</a>
  </div>
  <div>
    <p>
      EHLO! i like making things; these are some things i've made. you might also know me for my
      chatting (where i'm known as KTibow) or for my interest in minification (e18e, svgo, etc are
      awesome).
    </p>
  </div>
</main>

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
  p {
    max-width: 25rem;
  }
</style>
