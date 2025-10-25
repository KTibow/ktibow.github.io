<script lang="ts">
  import Ripple from "$lib/Ripple.svelte";
  import SeriesBlog from "$lib/SeriesBlog.svelte";
</script>

<svelte:head>
  <title>Human Research</title>
</svelte:head>

<SeriesBlog />
<h2 class="mt-6 px-8 text-2xl">
  This is Human Research, a project to help the humans of the future index and train on findings
  that aren't currently on the (clear and scrapable) internet.
</h2>

{#snippet blog(page: string, title: string)}
  {@const url = `/blog/humanresearch/${page}/`}
  <a href={url} class="entry">
    <Ripple />
    {@html title}
  </a>
{/snippet}

<div class="flex flex-wrap flex-grow gap-2 p-6">
  {@render blog("roombadockillustrated", "Roomba dock IR, illustrated")}
  {@render blog("httpsoverhttps", "HTTPS over HTTP(S) is not possible")}
  {@render blog("oauthmintrust", "Minimally trusting the server and client in OAuth 1")}
  {@render blog("roombadock", "Roomba dock IR")}
  {@render blog("lightbumper", "Light bumpers are funny")}
  {@render blog("phantasmagoriavocals", "Listen to the raw vocals from Phantasmagoria")}
  {@render blog("claudiussennett", "Who is Claudius Sennett")}
  {@render blog("why8123", "Why does Home Assistant run on port 8123")}
  {@render blog("wwdc2025", "WWDC 2025 Freeform snapshot")}
  {@render blog("wherepreload", "Where's the modulepreloads in my SvelteKit app?")}
  {@render blog("samcord", "Sam Altman is on Discord")}
  {@render blog("hlebaseline", "Humanity's Last Exam baseline")}
  {@render blog("projectmichigan", "What was Apple's Project Michigan")}
  {@render blog("provisionedthroughput", "GCP Provisioned Throughput pricing")}
  {@render blog("apexams", "AP exams in 2025")}
  {@render blog("meatrice", "Meat + Rice")}
  {@render blog("surfacepower", "Surface power requirements")}
  {@render blog("newsystems", "Who is New Systems")}
  {@render blog("syncobsidian", "Remotely Save - including the .obsidian folder")}
  {@render blog("austrchile", "Why do LLMs think Australians don't need visas to enter Chile?")}
  {@render blog("phi-4", "Why is Phi 4 Multimodal so cheap?")}
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
