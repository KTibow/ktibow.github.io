<script lang="ts">
  let platform = "All";

  const prevProjects = [
    {
      name: "Synthetitastic",
      desc: "An accelerationist set of synthetic data.",
      category: ["LLMs", "Synthetic data", "RL"],
      platform: ["JavaScript"],
      text: "View code",
      url: "https://github.com/KTibow/synthetitastic",
    },
    {
      name: "Kreations",
      desc: "A very small library of Svelte components and loaders that I'd like to share.",
      category: ["Svelte", "UI", "SVG", "Animation"],
      platform: ["Web", "JavaScript"],
      text: "View code",
      url: "https://github.com/KTibow/kreations",
    },
    {
      name: "Groq Bot",
      desc: "A Discord bot that answers user questions. It works without both types of servers: it's a serverless user app.",
      category: ["Serverless", "Docs", "AI"],
      platform: ["Web", "JavaScript"],
      text: "View code",
      url: "https://github.com/KTibow/groq-bot",
    },
    {
      name: "LMB",
      desc: "Language Model Board, a better way to view the LM Arena results.",
      category: ["Svelte", "Reverse engineering", "Made with AI"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/lmb/",
    },
    {
      name: "Excalidraw slides",
      desc: "A wrapper around Excalidraw to create slideshows.",
      category: ["Library usage", "Made with AI", "Wrapper"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/pres/",
    },
    {
      name: "Bam",
      desc: "Goes in Firefox's AI sidebar to let you quickly interact with AI using the selected text.",
      category: ["APIs", "Efficiency"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/bam/",
    },
    {
      name: "Home Assistant theme",
      desc: "Site that takes a color and turns it into a full theme.",
      category: ["Svelte", "Library usage", "UI", "CSS"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/home-assistant-theme/",
    },
    {
      name: "M3 Svelte",
      desc: "A Svelte component library that implements Material Design 3 (Material You).",
      category: ["Svelte", "UI"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/m3-svelte/",
    },
    {
      name: "🤫",
      desc: "A web app for planning next year's schedule.",
      category: ["APIs", "Data ingestion", "AI"],
      platform: ["Web", "JavaScript"],
    },
    {
      name: "🤫",
      desc: "It's school related.",
      category: ["Svelte", "API integration", "Resourcefulness", "UX"],
      platform: ["Web", "JavaScript"],
    },
    {
      name: "🤫",
      desc: "It's school related.",
      category: ["Compression", "Images", "Image embeddings"],
      platform: ["Web", "JavaScript"],
    },
    {
      name: "🤫",
      desc: "The backbone of two projects I use for school.",
      category: ["APIs", "Reverse engineering"],
      platform: ["Web", "JavaScript"],
    },
    {
      name: "SchoolHub",
      desc: "One website that used to get stuff I need and useful utilities in one place.",
      category: ["Svelte", "API integration", "UX", "UI"],
      platform: ["Web", "JavaScript"],
    },
    {
      name: "AOC 2024",
      desc: "I did Advent of Code in 2024. It was fun yet my solutions were mediocre.",
      category: ["Speed", "Dynamic programming"],
      platform: ["JavaScript"],
      text: "View code",
      url: "https://github.com/KTibow/aoc2024",
    },
    {
      name: "Flips",
      desc: "A collection of calculators for the game Hypixel Skyblock.",
      category: ["HTML", "Modern web APIs", "CSS", "JavaScript"],
      platform: ["Web", "JavaScript"],
      text: "View latest version",
      url: "https://flipsml.pages.dev",
    },
    {
      name: "SkyGPT",
      desc: "RAG bot for Hypixel Skyblock, only uses Cloudflare AI",
      category: ["JS", "Serverless", "AI", "RAG/Scraping"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "https://skygpt.pages.dev/",
    },
    {
      name: "RatRater 2",
      desc: "The second version of RatRater, improved in a bunch of ways.",
      category: ["Svelte", "Regex", "Hosting platforms"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/RatRater2/",
    },
    {
      name: "RatRater",
      desc: "An app that detects if a Forge mod (written in Java) is malicious or not by searching the class files for signals.",
      category: ["Java", "Regex", "Reverse engineering"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "/RatRater/",
    },
    {
      name: "Surprisingly Simple Embeddings",
      desc: "Client-side embedding search, designed to be used for ESPHome docs.",
      category: ["Embeddings", "Compression"],
      platform: ["JavaScript"],
      text: "View code",
      url: "https://github.com/KTibow/surprisingly-simple-embeddings",
    },
    {
      name: "Skyclient: Mart",
      desc: "A web-based version of SkyClient.",
      category: ["HTML", "Modern web APIs", "CSS", "JavaScript"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "https://mart.skyclient.co/",
    },
    {
      name: "Skyclient: Mod work",
      desc: "I've worked on some mods that are part of the Skyclient Minecraft mod installer, whether Skyclient-exclusive or not.",
      category: ["Java", "Forge mod loader"],
    },
    {
      name: "Skyclient: Website work",
      desc: "I made a website for the Skyclient Minecraft mod installer.",
      category: ["HTML", "Modern web APIs", "CSS", "JavaScript"],
      platform: ["Web", "JavaScript"],
      text: "View site",
      url: "https://skyclient.co",
    },
    {
      name: "Unspam",
      desc: "A Minecraft module that uses a Naive Bayes-based classifier to detect spam.",
      category: ["JavaScript", "Artificial intelligence", "Naive Bayes"],
      platform: ["JavaScript"],
      text: "View info",
      url: "https://hypixel.net/threads/forge-chattriggers-unspam-v2-2-0-dynamically-hide-spam-messages.4720941/",
    },
    {
      name: "Home Assistant PRs",
      desc: "Home Assistant is an automation platform that I've made multiple contributions to.",
      category: ["Lit", "Async Python"],
      platform: ["Python", "Web", "JavaScript"],
      text: "List PRs",
      url: "https://github.com/search?q=org%3Ahome-assistant+is%3Amerged+author%3AKTibow&type=pullrequests",
    },
    {
      name: "Fiomba",
      desc: "A project about controlling an old type of Roomba remotely.",
      category: ["Raspberry Pi", "MQTT", "Serial"],
      platform: ["Python", "Hardware"],
      text: "Read docs",
      url: "/blog/2vFiomba/",
    },
    {
      name: "Leftunder",
      desc: "A project using the Adafruit MagTag, which led to making a web serial console and a OTA system.",
      category: ["Modern web APIs", "Grocy", "E-Paper"],
      platform: ["Web", "JavaScript", "Hardware", "Python"],
      text: "View site",
      url: "/fridge/",
    },
    {
      name: "Tank Scorecard / Tunt",
      desc: "An exercise to make an online game for/with some of my relatives. Ultimately never got finished.",
      category: ["Flask", "Multiplayer", "GitHub Actions"],
      platform: ["Python", "JavaScript", "Web"],
      text: "View website code",
      url: "https://github.com/KTibow/scorecard",
    },
    {
      name: "👍",
      desc: "A cancelled browser extension to streamline my school workflow.",
      category: ["Browser extension", "JavaScript", "Reverse engineering"],
      platform: ["JavaScript", "Web"],
      text: "View code",
      url: "https://github.com/KTibow/thumbs-up",
    },
    {
      name: "Requireit",
      desc: "A convenience library to install Python packages on run.",
      category: ["Python module", "Minfification", "Low-level python"],
      platform: ["Python"],
      text: "View code",
      url: "https://github.com/KTibow/requireit",
    },
    {
      name: "GoCallMe",
      desc: "A site you could use to make URLs to open the tel: protocol.",
      category: ["Backendless", "Web APIs", "Media queries"],
      platform: ["JavaScript", "Web"],
      text: "View website code",
      url: "https://github.com/KTibow/ktibow.github.io/tree/oldish-master/gocallme",
    },
    {
      name: "Infinity Mirror",
      desc: "A tutorial for hooking up an infinity mirror with a custom LED strip to Home Assistant.",
      category: ["Arduino", "Hardware", "Data grinding"],
      platform: ["Hardware"],
      text: "View docs",
      url: "https://github.com/KTibow/infinity-mirror",
    },
    {
      name: "Zoom Improved",
      desc: "A web service to launch Zoom meetings with a better, customizable interface.",
      category: ["Backendless", "Web APIs", "Reverse engineering"],
      platform: ["JavaScript", "Web"],
      text: "View website code",
      url: "https://github.com/KTibow/ktibow.github.io/tree/oldish-master/zoom",
    },
    {
      name: "Simple Zoom Joiner",
      desc: "A very tiny server to launch a variety of meetings with a custom experience.",
      category: ["Minfification", "Customizable", "Reverse engineering"],
      platform: ["Python", "JavaScript", "Web"],
      text: "View code",
      url: "https://github.com/KTibow/simple-zoom-joiner/blob/main/app.py",
    },
  ];
</script>

<svelte:head>
  <title>Past Work @KTibow</title>
  <meta name="description" content="KTibow's resume - links to past work" />
</svelte:head>

<article class="prose self-center pt-6">
  <h1 class="flex justify-between">
    Past Work
    <select class="px-4 rounded-full bg-surface-container text-base" bind:value={platform}>
      <option value="All">All</option>
      <option value="Web">Web</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Python">Python</option>
      <option value="Hardware">Hardware</option>
    </select>
  </h1>
  <p>
    This is a list of a bunch of my projects. I've gotten better over time, but I always tried to
    make these good quality.
  </p>
</article>
<div class="flex flex-wrap gap-2 p-6">
  {#each prevProjects.filter( (project) => (platform == "All" ? true : (project.platform || []).includes(platform)), ) as { name, desc, category, text, url }}
    <div class="relative flex-1 min-w-64 bg-surface-container-low rounded-2xl p-2">
      <h2 class="text-2xl font-bold">{name}</h2>
      <p>{desc}</p>
      <div class="flex flex-wrap gap-2">
        {#each category as c}
          <li
            class="inline-flex h-8 items-center list-none rounded-lg bg-surface-container-high px-2"
          >
            {c}
          </li>
        {/each}
      </div>
      <br />
      <br />
      <span class="absolute bottom-2">
        {#if url}
          <a href={url} class="text-primary">{text}</a>
        {:else}
          Not available on the web
        {/if}
      </span>
    </div>
  {/each}
</div>
