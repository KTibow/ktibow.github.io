<script lang="ts">
  import Ripple from "$lib/Ripple.svelte";
</script>

<svelte:head>
  <title>@KTibow's blog</title>
</svelte:head>

{#snippet blog(page: string, title: string)}
  {@const url = page.includes(".") ? `/blog/${page}` : `/blog/${page}/`}
  <a href={url} class="entry">
    <Ripple />
    {@html title}
  </a>
{/snippet}

<div class="flex flex-wrap flex-grow gap-2 p-6">
  {@render blog("qwenflation", "Qwenflation")}
  {@render blog("xelite", "The X Elite experience")}
  {@render blog("regionid", "Using FlashAlert's API")}
  {@render blog("porkbunt", "porkbunt")}
  {@render blog("sleep-fragmentation", "Fragmentation and statistics in sleep")}
  {@render blog("sleep", "How one estimates sleep stages")}
  {@render blog("humanresearch", "Human Research")}
  {@render blog("cssinjection/work.pdf", "CSS Injection is All You Need")}
  {@render blog("interesting", "Almost 32% of 2FA codes are interesting")}
  {@render blog("gflash", "Why is Gemini Flash so popular?")}
  {@render blog("simplymatch", "Simply match curly brackets")}
  {@render blog("reasoningtax", "I invented a new term")}
  {@render blog("infidelity", "The Own Wife eval")}
  {@render blog("texihi", "TeXIHI")}
  {@render blog("rps", "The Rock Paper Scissors eval")}
  {@render blog("focussis", "What <em>is</em> Focus SIS")}
  {@render blog("nixcraft", "Why I don't like nixCraft")}
  {@render blog("zedthoughts", "What I think of Zed")}
  {@render blog("slidestemplates", "Slides Templates are funny")}
  {@render blog("selectingtext", "Selecting is easy, actually")}
  {@render blog("geminiaudio", "Gemini > Whisper????")}
  {@render blog("farewellcfpages", "What Do You Do When Cloudflare Pages Gets Blocked?")}
  {@render blog("aurora", "Unlinking Zigbee devices (Aurora)")}
  {@render blog("routellm", "Ripping off RouteLLM")}
  {@render blog("grading", "Grade math")}
  {@render blog("compressionstream", "A stream of thoughts on compression")}
  {@render blog("llama3", "Llama 3 fails some basic tests")}
  {@render blog("useesm", "Rant: Why aren't you using ESM (downranked)")}
  {@render blog("hafrontend", "My gripes with the HA frontend")}
  {@render blog("admaven", "We probably shouldn't use AdMaven")}
  {@render blog("chromasubsampling", "Why do we still use chroma subsampling")}
  {@render blog("floatprecision", "You don't need that big of a float precision")}
  {@render blog("toiconsets", "How I published 165 icon sets to NPM")}
  {@render blog("aipredictions", "2024 AI predictions")}
  {@render blog("improvements", "Life improvements I've done")}
  {@render blog("vcareexplanation", "VC31 explanation")}
  {@render blog("materialmenus", "Material menus are goofy")}
  {@render blog("isthisarat", "Is This A Rat has problems")}
  {@render blog("thebestai", "AI isn't good without good UI/UX")}
  {@render blog("2vFiomba", "2vFiomba")}
</div>

<style>
  .entry {
    flex: 1 1 16rem;
    border-radius: 1rem;
    padding: 1rem;
    background-color: rgb(var(--m3-scheme-surface-container-low));
    position: relative;
  }
</style>
