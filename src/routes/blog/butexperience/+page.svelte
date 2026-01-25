<script module>
	export const title = "But you haven't matched the experience";
	export const date = "2025-08-31";
</script>

<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Series from "$lib/Series.svelte";

  const workaroundDescriptions = {
    monoliths: {
      title: "Monoliths",
      description:
        "Combine services and apps into one, so you only need to deploy it once. If a free tier only lets you deploy one app or gives you terrible cold starts, a monolith would easily offset them. (Needs to be combined with another domain provider to reseparate.)",
    },
    useStaticHost: {
      title: "Use another static host",
      description:
        "Then you can stop caring about how the compute provider charges for bandwidth or how they name their subdomains.",
    },
    useFreeDomain: {
      title: "Use a free domain",
      description: "This means playing a lot of feeble games, but it could work; not sure.",
    },
    usePaidDomain: {
      title: "Use a paid domain",
      description:
        "If you can pay for it and get it unblocked, you now own a part of the internet where you don't need to worry about the free default subdomains. You can even get back to Cloudflare.",
    },
    getOffFreeTier: {
      title: "Get off the free tier",
      description:
        "This one is really just for Fly, but you could start separating apps and disabling scale to 0 and tank the cost.",
    },
  } as const;
  type WorkaroundID = keyof typeof workaroundDescriptions;

  interface Provider {
    name: string;
    hostname: string;
    speed: string;
    freeTier: string;
    workarounds: WorkaroundID[];
  }
  const workaroundArchetypes = {
    // ONLY a compute provider and extremely limited
    computeOnlyLimited: ["monoliths", "useStaticHost"],
    // ONLY a compute provider
    computeOnly: ["useStaticHost"],
    // On free tier:
    //   compute provider works (monolith + static host)
    //   standalone works (monolith that's dynamic based on domain)
    // On paid tier, standalone works
    fly: ["monoliths", "useStaticHost", "useFreeDomain", "usePaidDomain", "getOffFreeTier"],
    // Works as soon as you change the domain, no monolith needed
    justUnblock: ["usePaidDomain"],
  } as Record<string, WorkaroundID[]>;
  const providers: Provider[] = [
    {
      name: "GCP VM",
      hostname: "⚠️",
      speed: "✅",
      freeTier: "❌",
      workarounds: workaroundArchetypes.computeOnlyLimited,
    },
    {
      name: "Fly container",
      hostname: "✅",
      speed: "✅",
      freeTier: "⚠️",
      workarounds: workaroundArchetypes.fly,
    },
    {
      name: "GCP CR Serverless",
      hostname: "⚠️",
      speed: "⚠️",
      freeTier: "✅",
      workarounds: workaroundArchetypes.computeOnlyLimited,
    },
    {
      name: "Fastly Serverless",
      hostname: "⚠️",
      speed: "✅",
      freeTier: "✅",
      workarounds: workaroundArchetypes.computeOnlyLimited,
    },
    {
      name: "Cloudflare Workers",
      hostname: "❌ (blocked)",
      speed: "✅",
      freeTier: "✅",
      workarounds: workaroundArchetypes.justUnblock,
    },
    {
      name: "Vercel Serverless",
      hostname: "❌ (blocked)",
      speed: "✅",
      freeTier: "❌",
      workarounds: workaroundArchetypes.justUnblock,
    },
    {
      name: "Deno Serverless",
      hostname: "✅",
      speed: "❌",
      freeTier: "✅",
      workarounds: workaroundArchetypes.computeOnly,
    },
    {
      name: "Azure Functions Containers",
      hostname: "⚠️",
      speed: "❌",
      freeTier: "✅",
      workarounds: workaroundArchetypes.computeOnly,
    },
    {
      name: "Val (Serverless)",
      hostname: "✅",
      speed: "❌",
      freeTier: "✅",
      workarounds: workaroundArchetypes.computeOnly,
    },
  ];
  let selectedProvider: Provider | undefined = $state(undefined);

  function selectProvider(provider: Provider) {
    selectedProvider = selectedProvider?.name == provider.name ? undefined : provider;
  }
</script>

<BlogHeader {date} {title} />
<p>The hierarchy of needs for a website might look like</p>
<svg viewBox="0 0 1000 1000">
  <style>
    .tier-text {
      font-weight: 600;
      dominant-baseline: middle;
      text-anchor: middle;
      pointer-events: none;
    }
  </style>
  <g class="font-sans" transform="translate(0,0)">
    <!-- Coordinates:
 Apex: (500,0)
 Base left: (0,1000) Base right: (1000,1000)
 Horizontal cuts at y =0,200,400,600,800,1000
 -->
    <g data-tier="5">
      <polygon class="fill-primary" points="500,0 600,200 400,200" />
      <text class="tier-text fill-on-primary" x="500" y="120" font-size="20">Invisibility</text>
    </g>
    <g data-tier="4">
      <polygon class="fill-primary-container" points="400,200 600,200 700,400 300,400" />
      <text class="tier-text fill-on-primary-container" x="500" y="300" font-size="28"
        >Scalability</text
      >
    </g>
    <g data-tier="3">
      <polygon class="fill-primary-container/80" points="300,400 700,400 800,600 200,600" />
      <text class="tier-text fill-on-primary-container" x="500" y="500" font-size="28"
        >Functionality</text
      >
    </g>
    <g data-tier="2">
      <polygon class="fill-primary-container-subtle" points="200,600 800,600 900,800 100,800" />
      <text class="tier-text fill-on-primary-container-subtle" x="500" y="700" font-size="28"
        >Usability</text
      >
    </g>
    <g data-tier="1">
      <polygon class="fill-surface-container" points="100,800 900,800 1000,1000 0,1000" />
      <text class="tier-text fill-on-surface" x="500" y="900" font-size="28">Accessibility</text>
    </g>
    <!-- Outline of the whole triangle for clarity -->
    <polygon
      fill="none"
      stroke="var(--color-outline)"
      stroke-width="3"
      points="500,0 1000,1000 0,1000"
    />
  </g>
</svg>
<p>
  and we have accessibility (many unblocked platforms) and usability (decently fast), but we don't
  have any of the others. We don't have functionality - nothing's easy to use and deploy to yet. We
  don't have scalability - it's hard to support multiple apps. And we definitely don't have
  invisiblity - we're a while from the platform disappearing into the background.
</p>
<p>The annoying thing is we're almost there</p>
<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Usable hostname</th>
      <th>Speed</th>
      <th>Good free tier</th>
    </tr>
    {#each providers as provider}
      <tr
        class:unselected-row={selectedProvider?.name != provider.name}
        class:selected-row={selectedProvider?.name == provider.name}
        class="transition-colors"
        onclick={() => selectProvider(provider)}
      >
        <td>{provider.name}</td>
        <td>{provider.hostname}</td>
        <td>{provider.speed}</td>
        <td>{provider.freeTier}</td>
      </tr>
    {/each}
  </tbody>
</table>
<p>but we haven't matched the experience quite yet.</p>

{#if selectedProvider}
  <p>For <strong>{selectedProvider.name}</strong>, here are the applicable workarounds:</p>
{:else}
  <p>So at this point there are 5 workarounds we can deploy:</p>
{/if}

<ul>
  {#each Object.entries(workaroundDescriptions) as [key, workaround]}
    {#if !selectedProvider || selectedProvider.workarounds.includes(key as WorkaroundID)}
      <li
        class:opacity-100={!selectedProvider ||
          selectedProvider.workarounds.includes(key as WorkaroundID)}
      >
        <strong>{workaround.title}.</strong>
        {workaround.description}
      </li>
    {/if}
  {/each}
</ul>

<p>
  At this point, I know what to do (click on each provider to see which workarounds I might use),
  and I think I'm ready to match the experience.
</p>

<Series />

<style>
  .unselected-row {
    cursor: pointer;
    &:hover {
      background-color: rgb(from currentColor r g b / 0.1);
    }
  }
  .selected-row {
    background-color: rgb(from currentColor r g b / 0.1);
    > td:first-child {
      font-weight: 500;
    }
  }
</style>
