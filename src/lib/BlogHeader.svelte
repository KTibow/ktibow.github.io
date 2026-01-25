<script lang="ts">
  import { page } from "$app/state";
  let { date, title, bg }: { date: string; title: string; noindex?: boolean; bg?: string } =
    $props();
  let noindex = $derived(page.route.id?.startsWith("/blog/(noindex)"));
</script>

<svelte:head>
  <title>{title}</title>
  {#if noindex}
    <meta name="robots" content="noindex" />
  {/if}
</svelte:head>

{#if bg}
  <img src={bg} alt="" />
  <div class="img-shadow"></div>
{/if}

<h1>{title}</h1>
{#if date}
  {@const [y, m, d] = date.split("-").map((n) => +n)}
  <p class="opacity-60 -mt-8 mb-8">
    <time datetime={date}
      >{new Date(y, m - 1, d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</time
    >
  </p>
{/if}
{#if noindex}
  <p>
    If you're a human seeing this, that's very interesting. This page is internal and was marked to
    not be indexed by search engines.
  </p>
{/if}

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
