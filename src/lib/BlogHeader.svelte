<script lang="ts">
  let { title, bg }: { title: string; bg?: string } = $props();
</script>

<svelte:head>
  <title>{title} @KTibow</title>
</svelte:head>

{#if bg}
  <img src={bg} alt="" />
  <div class="shadow"></div>
{/if}

<h1>{title}</h1>

<style>
  img,
  .shadow {
    position: absolute;
    inset: 0;
    margin: 0;
    width: 100%;
    height: clamp(32rem, 50dvh, 50dvw);
    z-index: -1;
  }
  img {
    object-fit: cover;
    object-position: top;
  }
  .shadow {
    content: "";
    background: linear-gradient(
      to bottom,
      rgb(var(--m3-scheme-background) / 0.6) 0%,
      rgb(var(--m3-scheme-background) / 0.612) 10%,
      rgb(var(--m3-scheme-background) / 0.636) 20%,
      rgb(var(--m3-scheme-background) / 0.704) 40%,
      rgb(var(--m3-scheme-background) / 0.792) 60%,
      rgb(var(--m3-scheme-background) / 0.892) 80%,
      rgb(var(--m3-scheme-background) / 0.944) 90%,
      rgb(var(--m3-scheme-background) / 1) 100%
    );
  }
</style>
