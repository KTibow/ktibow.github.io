<script lang="ts">
  import SeriesBlog from "$lib/SeriesBlog.svelte";
  import year2025 from "./2025.png";
  import year2024 from "./2024.png";
  import year2023 from "./2023.png";
  import year2022 from "./2022.png";
  import year2021 from "./2021.png";
  import year2020 from "./2020.png";
</script>

<svelte:head>
  <title>Past Work @KTibow</title>
  <meta name="description" content="KTibow's resume - projects and past work" />
</svelte:head>

<SeriesBlog />
<article class="prose m-6">
  <h2>School arc</h2>
  <p>
    Sep 2025-now: Something new (backed by <a href="https://github.com/KTibow/monoserve"
      >Monoserve</a
    >,
    <a href="https://github.com/KTibow/monoidentity">Monoidentity</a>, and
    <a href="https://github.com/KTibow/school-districts">school-districts</a>).
  </p>
  <p>
    Sep 2025: <a href="https://github.com/KTibow/schoology-docs-md">schoology-docs-md</a>, the
    Schoology docs converted to Markdown.
  </p>
  <p>
    June 2025-August 2025: A failed attempt to rewrite Tangent (I learned that it makes sense to
    keep apps separate)
  </p>
  <p>
    September 2024: <a href="https://github.com/KTibow/practiceyeet">PracticeYeet</a>, a copy of
    PracticeIt but the graders are inferred by AI that was going swimmingly until I accidentally
    <code>DELETE</code>d too much.
  </p>
  <p>October 2024: Pln, a website for planning schedules with a modern UI.</p>
  <p>
    June 2024: <a href="https://github.com/KTibow/message"
      >a minimal connect-to-Google Messages demo</a
    >, an artifact from developing the Google Messages integration in Tangent.
  </p>
  <p>
    June 2024: <a href="https://github.com/KTibow/1984">1984</a>, a search engine that drops results
    blocked for me.
  </p>
  <p>June 2024: Stereotype, an experiment with text-image search.</p>
  <p>
    March 2024-June 2025: Tangent, a collection of utilities. Tangent was one of my most ambitious
    projects, and I had to learn many different patterns across deployment, backend logic, and
    frontend logic. However, after a number of bad days (with ~nobody coming to my help), I was so
    tired I had to shut it down.
  </p>
  <p>
    May 2023-February 2024: SchoolHub (new), a collection of utilities. This was the first time I
    experimented with growth, and it worked! Until it got shut down.
  </p>
  <p>
    May 2023: I made something where you could make GPT-3.5 instances self-rap battle or generate
    stupid "what if"s. It was fun.
  </p>
  <p>
    March 2023-February 2024: Sussable. The first chat app that experienced growth, based on web
    notifications.
  </p>
  <p>January 2023: I tried to make BeReal but for school. I lost motivation.</p>
  <p>
    August 2022-December 2022: SchoolHub (old), an experiment with connecting to school APIs. This
    was where today's connectors that cope with yesterday's XML and OAuth were written.
  </p>
</article>
<article class="prose mt-0 m-6">
  <h2>Non-school arc</h2>
  <h3>2025</h3>
  <img src={year2025} alt="2025 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/vite-plugin-functions-mixins">vite-plugin-functions-mixins</a
    >
    and
    <a href="https://github.com/KTibow/vite-plugin-token-shaker">vite-plugin-token-shaker</a>.
  </p>
  <p>
    <a href="https://github.com/KTibow/tinyentities">tinyentities</a>, a minimal HTML entity
    encoder/decoder.
  </p>
  <p>
    <a href="https://github.com/KTibow/does-pi-have-the-best-price">does-pi-have-the-best-price</a>,
    a small site for comparing Prime Intellect's GPU prices to others.
  </p>
  <p>
    <a href="https://github.com/KTibow/kreations">kreations</a>, some funky loaders I manually wrote
    in SVG (and a component).
  </p>
  <p>
    <a href="https://github.com/KTibow/synthetitastic">synthetitastic</a>, an accelerationist set of
    synthetic data.
  </p>
  <p>
    Setting up Excalifont in LaTeX: a <a href="https://ktibow.github.io/blog/texihi/">blog</a> and a
    <a href="https://github.com/KTibow/excalimath">modified font</a>.
  </p>
  <p>Contributions to Rolldown/OXC (you can search them on GitHub).</p>
  <p>Some frontend work for CrofAI (unreleased as of writing).</p>
  <h3>2024</h3>
  <img src={year2024} alt="2024 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/aoc2024">Advent of code 2024 solutions</a>, which are
    mediocre but exist (and I got on one of the leaderboards!)
  </p>
  <p>
    <a href="https://github.com/KTibow/lmb">LMB</a>, Language Model Board, a better way to view the
    LM Arena results.
  </p>
  <p>
    <a href="https://github.com/KTibow/groq-bot">groq-bot</a>, a bot that uses Groq to answer
    questions about Groq.
  </p>
  <p>
    <a href="https://github.com/KTibow/bam">bam</a>, a site that lets you use Groq in the Firefox AI
    sidebar.
  </p>
  <p>
    <a href="https://github.com/KTibow/pres">Excalidraw slides</a>, a simple vibe-coded app.
  </p>
  <p>
    <a href="https://github.com/KTibow/surprisingly-simple-embeddings"
      >surprisingly-simple-embeddings</a
    >, an artifact from a (closed) PR to add AI-ish search to ESPHome.
  </p>
  <p>
    <a href="https://github.com/KTibow/magic">magic</a>, a (too early) Magic deck generator.
  </p>
  <p>
    <a href="https://github.com/KTibow/skygpt">SkyGPT</a>, a RAG-based Hypixel Skyblock chatbot
    described as "more helpful than a majority of forumers".
  </p>
  <p>Vigorous contributions to Lawnicons and SVGO (you can search them on GitHub).</p>
  <p>Some frontend work for ReVanced, although didn't get far due to politics.</p>
  <h3>2023</h3>
  <img src={year2023} alt="2023 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/home-gpt">HomeGPT</a>, an experiment in tool use (in Home
    Assistant) before tool use was a thing.
  </p>
  <p>
    <a href="https://github.com/KTibow/flipsml">Flips v2</a>, a new take on an old chain (Bazaar
    Money -&gt; Skyblock Money -&gt; Flips -&gt; Flips v2).
  </p>
  <p>
    <a href="https://github.com/KTibow/to-icon-sets">to-icon-sets</a>, a project that fills a hole
    Iconify left.
  </p>
  <p>
    <a href="https://github.com/KTibow/RatRater2">RatRater2</a>, the second version of RatRater,
    with better UI and a dedicated analysis tab.
  </p>
  <p>
    <a href="https://github.com/KTibow/home-assistant-theme">home-assistant-theme</a>, a site that
    generates Material 3-style themes for HA.
  </p>
  <p>
    <a href="/billnye/">bill nye</a>
  </p>
  <p>Some frontend work for IsThisARat.</p>
  <h3>2022</h3>
  <img src={year2022} alt="2022 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/m3-svelte">M3 Svelte</a>, a Svelte library for Material
    3/You.
  </p>
  <p>
    <a href="https://github.com/KTibow/RatRater">RatRater</a>, an app that statically analyses a
    Forge mod for malware.
  </p>
  <p>
    <a href="https://github.com/KTibow/2vFiomba">2vFiomba</a>, a server that connects a Roomba to
    Home Assistant, the successor to 2020's <a href="https://github.com/KTibow/fiomba">Fiomba</a>.
  </p>
  <p>
    <a href="https://github.com/KTibow/arcane_control">Arcane control</a>, a HA addon that uses
    basic UI for basic control from basic devices.
  </p>
  <p>
    <em>Why was this year so quiet by projects?</em> I started to work on SkyClient and SchoolHub more.
    I also started games and projects with friends in school and online.
  </p>
  <h3>2021</h3>
  <img src={year2021} alt="2021 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/SBQuery">SBQuery</a>, an experiment in bringing Skyblock data
    to GraphQL.
  </p>
  <p>
    <a href="https://github.com/KTibow/BetterChat">BetterChat</a>/<a
      href="https://chattriggers.com/modules/v/Unspam">Unspam</a
    >, a surprisingly effective naive Bayes-based spam filter for Skyblock. I'm still proud of this
    one. Some functionality was ported to Chatting!
  </p>
  <p>
    <a href="https://github.com/KTibow/fridge">Leftunder</a>, an experiment in both hardware
    &lt;--&gt; Grocy and in making a serial console from JS.
  </p>
  <p>
    <a href="https://github.com/KTibow/lobe-home-assistant">Lobe HA</a>, an integration to add
    Lobe's AI vision to Home Assistant.
  </p>
  <p>
    <a href="https://github.com/KTibow/tunt">Tank Scorecard / Tunt</a>, an exercise to make an
    online game for/with some of my relatives (unfortunately never got finished).
  </p>
  <p>
    <a href="https://github.com/KTibow/thumbs-up">👍</a>, a (unfinished) Chrome extension to
    streamline school from home.
  </p>
  <p>
    <a href="https://github.com/KTibow/birdcam-ai">Birdcam AI</a>, which is how I made
    <a href="https://www.youtube.com/watch?v=83BGlKipdC0">this video</a>
  </p>
  <p>
    <em>Why was this year so quiet by contributions?</em> I was working on a lot of Skyblock stuff (Bazaar
    Money / Skyblock Money) and I used Replit for it.
  </p>
  <h3>2020</h3>
  <img src={year2020} alt="2020 projects timeline" class="rounded-lg" />
  <p>
    <a href="https://github.com/KTibow/ha-zoom-forwarder">ha-zoom-forwarder</a>, an unfinished
    project I'm only including here because it's so funny that I bothered with a I'm not a robot box
    and a &gt;13 years old box instead of actually working on it.
  </p>
  <p>
    <a href="https://github.com/KTibow/requireit">requireit</a>, a program to install packages when
    imported (now we just use <code>uv</code>).
  </p>
  <p>
    <a href="https://github.com/KTibow/infinity-mirror">infinity-mirror</a>, a guide to an infinity
    mirror setup that I wouldn't recommend today (use ESPHome instead).
  </p>
  <p>
    <a href="https://github.com/KTibow/pi-DriveUp">pi-DriveUp</a>, a primitive rPI backup solution.
  </p>
  <p>
    <a href="https://github.com/KTibow/neotrellis-ha-controller">neotrellis-ha-controller</a>, a
    controller for HA on a really funny board.
  </p>
  <p>
    <a href="https://github.com/KTibow/ha-blueprint">ha-blueprint</a>, a GitHub Action with what I
    thought were HA best practices that I infamously pushed for in any custom integration trying to
    be added to HACS (I had nothing better to do).
  </p>
  <p>
    Neumorphism bender: <a href="https://github.com/qiz-li/lovelace-soft-ui">lovelace-soft-ui</a>
    contributions,
    <a href="https://github.com/KTibow/lovelace-light-soft-ui-theme">lovelace-light-soft-ui-theme</a
    >,
    <a href="https://github.com/KTibow/lovelace-dark-soft-ui-theme">lovelace-dark-soft-ui-theme</a>,
    <a href="https://github.com/KTibow/lovelace-soft-theme">lovelace-soft-theme</a>.
  </p>
  <p>
    <a href="https://github.com/KTibow/fullscreen-card">fullscreen-card</a>, a Home Assistant card
    that allows toggling fullscreen mode.
  </p>
  <p>
    <a href="https://github.com/KTibow/simple-zoom-joiner">simple-zoom-joiner</a>, the simpler
    version of Zoom Improved (and one of my earliest reverse engineering projects)
  </p>
  <p>GoCallMe stuff, which doesn't seem to be on the internet anymore.</p>
  <p>Contributions to Home Assistant (you can search them on GitHub).</p>
</article>
<article class="prose mt-0 m-6">
  <h2>SkyClient arc</h2>
  <p>
    <a href="https://skyclient.co/">SkyClient</a>, even if a little weird (I wish I found X earlier
    to counterbalance), was a nice place to dump my thoughts and my time into 2022-2024. I built 2
    bots, an installer (arguably 2 or 3), a website, and a number of edits. I acted with too high
    agency and too low EQ/self consciousness a few times, but overall I'm glad for it.
  </p>
</article>
