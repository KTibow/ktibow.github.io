<script lang="ts">
  let { title, bg }: { title: string; bg?: string } = $props();
</script>

<svelte:head>
  <title>{title} @KTibow</title>
</svelte:head>

{#if bg}
  <img src={bg} alt="" />
  <div class="img-shadow"></div>
{/if}

<h1>{title}</h1>

<style>
  img,
  .img-shadow {
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
  .img-shadow {
    content: "";
    background: linear-gradient(
      to bottom,
      oklab(from var(--m3c-surface) l a b / 0.6) 0%,
      oklab(from var(--m3c-surface) l a b / 0.612) 10%,
      oklab(from var(--m3c-surface) l a b / 0.636) 20%,
      oklab(from var(--m3c-surface) l a b / 0.704) 40%,
      oklab(from var(--m3c-surface) l a b / 0.792) 60%,
      oklab(from var(--m3c-surface) l a b / 0.892) 80%,
      oklab(from var(--m3c-surface) l a b / 0.944) 90%,
      oklab(from var(--m3c-surface) l a b / 1) 100%
    );
  }
</style>
