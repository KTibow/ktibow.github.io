<script>
  import Ripple from "$lib/Ripple.svelte";

  const blogPosts = [
    { slug: "sleep", title: "How one estimates sleep cycles" },
    { slug: "humanresearch", title: "Human Research" },
    { slug: "interesting", title: "31% of 2FA codes are interesting" },
    { slug: "gflash", title: "Why is Gemini Flash so popular?" },
    { slug: "simplymatch", title: "Simply match curly brackets" },
    { slug: "reasoningtax", title: "I invented a new term" },
    { slug: "infidelity", title: "The Own Wife eval" },
    { slug: "texihi", title: "TeXIHI" },
    { slug: "rps", title: "The Rock Paper Scissors eval" },
    { slug: "focussis", title: "What <em>is</em> Focus SIS" },
    { slug: "nixcraft", title: "Why I don't like nixCraft" },
    { slug: "zedthoughts", title: "What I think of Zed" },
    { slug: "slidestemplates", title: "Slides Templates are funny" },
    { slug: "selectingtext", title: "Selecting is easy, actually" },
    { slug: "geminiaudio", title: "Gemini > Whisper????" },
    { slug: "farewellcfpages", title: "What Do You Do When Cloudflare Pages Gets Blocked?" },
    { slug: "aurora", title: "Unlinking Zigbee devices (Aurora)" },
    { slug: "routellm", title: "Ripping off RouteLLM" },
    { slug: "grading", title: "Grade math" },
    { slug: "compressionstream", title: "A stream of thoughts on compression" },
    { slug: "llama3", title: "Llama 3 fails some basic tests" },
    { slug: "useesm", title: "Rant: Why aren't you using ESM (downranked)" },
    { slug: "hafrontend", title: "My gripes with the HA frontend" },
    { slug: "admaven", title: "We probably shouldn't use AdMaven" },
    { slug: "chromasubsampling", title: "Why do we still use chroma subsampling" },
    { slug: "floatprecision", title: "You don't need that big of a float precision" },
    { slug: "toiconsets", title: "How I published 165 icon sets to NPM" },
    { slug: "aipredictions", title: "2024 AI predictions" },
    { slug: "improvements", title: "Life improvements I've done" },
    { slug: "vcareexplanation", title: "VC31 explanation" },
    { slug: "materialmenus", title: "Material menus are goofy" },
    { slug: "isthisarat", title: "Is This A Rat has problems" },
    { slug: "thebestai", title: "AI isn't good without good UI/UX" },
    { slug: "2vFiomba", title: "2vFiomba" },
  ];
</script>

<svelte:head>
  <title>@KTibow's blog</title>
</svelte:head>

<div class="flex flex-wrap flex-grow gap-2 p-6">
  {#each blogPosts as post}
    <a href="/blog/{post.slug}/" class="entry">
      <Ripple />
      {@html post.title}
    </a>
  {/each}
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
