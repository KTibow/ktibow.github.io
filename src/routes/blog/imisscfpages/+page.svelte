<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";

  const colors: Record<string, [string, string]> = {
    vps: [
      "rgb(var(--m3-scheme-primary-container-subtle))",
      "rgb(var(--m3-scheme-on-primary-container-subtle))",
    ],
    container: [
      "rgb(var(--m3-scheme-primary-container))",
      "rgb(var(--m3-scheme-on-primary-container))",
    ],
    serverless: ["rgb(var(--m3-scheme-primary))", "rgb(var(--m3-scheme-on-primary))"],
    "serverless blocked": [
      "rgb(var(--m3-scheme-inverse-surface))",
      "rgb(var(--m3-scheme-inverse-on-surface) / 0.5)",
    ],
  };
  const barChart: [string, number, [string, string]][] = [
    ["GCP VM", (40 + 50) / 2, colors.vps],
    ["Fly", (40 + 60) / 2, colors.container],
    ["GCP CRF", (60 + 80) / 2, colors.serverless],
    ["Fastly", (60 + 100 + 50) / 3, colors.serverless],
    ["Cloudflare Workers", (80 + 100) / 2, colors["serverless blocked"]],
    ["Vercel", (150 + 170) / 2, colors["serverless blocked"]],
    ["Deno Deploy", 200, colors.serverless],
    ["Azure Functions", (100 + 500) / 2, colors.container],
    ["Val Town", (270 + 400) / 2, colors.serverless],
  ];
  const maxLatency = Math.max(...barChart.map(([, latency]) => latency));
</script>

<BlogHeader {bg} title="A Cloudflare-Shaped Hole" />
<p>
  It's been almost a year since <a href="/blog/farewellcfpages"
    >Cloudflare Pages and Workers were blocked for me</a
  >. I thought I was fine, but it turned out that all the alternatives lacked speed, which I really
  care about. So today we're going to test many Workers alternatives and hopefully find a good one.
  Methodology: time to serve "hi" (NOT STATIC) from the nearest free server to my home network.
</p>
<p>
  Why is Cloudflare Pages blocked? Because it became a common place to host "games", so now I have
  to find more niche places.
</p>
<p>Why do I need servers?</p>
<ul>
  <li>
    I can't trust the client. I can't give it my API keys or assume that it hasn't been tampered
    with.
  </li>
  <li>CORS. Many APIs <em>need</em> the server.</li>
</ul>

<h2>Classical cloud (VM/containers)</h2>
<h3>GCP</h3>
<p>It's a bit legacy but I can work with it.</p>
<p>
  <strong>Latency to running VM</strong> is 40-50ms (e2-micro in us-west1).
</p>
<p>
  <strong>Latency to code (Cloud Run Function)</strong> is higher, like 60-80ms. When cold it gets as
  high as 2.2 seconds, although this might be better than a VM. Still us-west1.
</p>
<p>
  I won't be using Cloud Run since it requires building the container on device and using someone
  else's container registry (👎), but the demo container (serves more than <code>hi</code>) is also
  60-80ms.
</p>
<h3>Azure</h3>
<p>Surely the company from Redmond will be friendly and fast. Surely.</p>
<p>
  Well, I've used Azure before, but it seems I can't anymore. My school Azure account errors with
  "you might be signing in from a browser, app, or location that is restricted by your admin", and
  when I tried to verify my personal account (in case they now want you to use personal accounts for
  student benefits?) the benefits never came and trying again just errored.
</p>
<p>
  I can tell you this, from the services I deployed there already, though: the latency is also bad.
  On <strong>Functions</strong>, a wrapper around a 500ms API call takes 2 seconds cold and 600-1000
  ms warm. That's 100-500ms of latency.
</p>
<h3>Amazon</h3>
<p>I accidentally racked up a $100 AWS bill when I was 10. Never again.</p>

<h2>Containers-based</h2>
<h3>Fly</h3>
<p>Fly is the most lovable cloud company there is, and the latency is great: 40ms-60ms.</p>

<h2>Code-based</h2>
<h3>Deno Deploy</h3>
<p>Drawbacks: in California and serverless. Means ~200ms latency.</p>
<h3>Val Town</h3>
<p>Drawbacks: in Ohio and serverless. Means 270-400ms latency.</p>
<h3>Fastly</h3>
<p>
  Fastly has a thing where if you make requests in quick succession, they take 10-20ms. In JS, this
  happens often, although when it doesn't it takes 500ms or so to run. With WASM, it's more of a
  consistent 60-100ms.
</p>

<h2>Baselines (currently blocked)</h2>
<h3>Vercel</h3>
<p>
  Vercel's the fastest... just for static assets? Their home page is 3x faster than Cloudflare's,
  but their <strong>Functions</strong> take 160-180 ms by default and 150-170ms when the region is manually
  configured.
</p>
<h3>Cloudflare Workers</h3>
<p>80-100ms.</p>

<h2>Conclusion</h2>
<p>
  VMs and containers mean complicated off/on management, containers mean complicated abstractions,
  and serverless can mean taking a penalty for every request. But I'm walking away with a plan.
</p>
<div class="flex flex-col">
  {#each barChart as [source, latency, [bg, fg]]}
    <div
      style:background-color={bg}
      style:color={fg}
      style:width="{(latency / maxLatency) * 100}%"
      class="h-12 flex items-center pl-2 rounded-lg overflow-ellipsis whitespace-nowrap overflow-hidden"
    >
      {source}
    </div>
  {/each}
</div>
<div class="flex gap-1 flex-wrap mt-1">
  {#each Object.entries(colors) as [name, [bg, fg]]}
    <div
      style:background-color={bg}
      style:color={fg}
      class="flex h-6 items-center px-2 rounded-full"
    >
      {name}
    </div>
  {/each}
</div>
<p>
  This is a bar chart of the latency of each service I tested. It shows 4 services with
  better-than-Workers latency, all unblocked, all free, and diverse in function. I'm excited to use
  them.
</p>
