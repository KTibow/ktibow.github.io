<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    alt,
    dark = false,
  }: { children: Snippet; alt: string; dark?: boolean } = $props();
</script>

<div class="parent">
  {@render children()}
  <div class="absolute bottom-0 left-0 w-full p-4">
    <div class="blurrer absolute inset-0 pointer-events-none">
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="gradient" class:light={!dark}></div>
    </div>
    <p class="relative z-20 m-0! text-sm {dark ? 'text-white' : 'text-black'}">
      {alt}
    </p>
  </div>
</div>

<style>
  .parent {
    display: flex;
    border-radius: 1rem;
    overflow: hidden;

    position: relative;
  }

  .parent > :global(*) {
    max-height: 50dvh;
    margin: 0 !important;
  }

  .blurrer > * {
    position: absolute;
    inset: 0;
  }

  .blur-filter:nth-child(1) {
    backdrop-filter: blur(1px);
    mask: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 0) 40%
    );
  }

  .blur-filter:nth-child(2) {
    backdrop-filter: blur(2px);
    mask: linear-gradient(
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0) 50%
    );
  }

  .blur-filter:nth-child(3) {
    backdrop-filter: blur(4px);
    mask: linear-gradient(
      rgba(0, 0, 0, 0) 15%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) 60%
    );
  }

  .blur-filter:nth-child(4) {
    backdrop-filter: blur(8px);
    mask: linear-gradient(
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 70%
    );
  }

  .blur-filter:nth-child(5) {
    backdrop-filter: blur(16px);
    mask: linear-gradient(
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 90%
    );
  }

  .blur-filter:nth-child(6) {
    backdrop-filter: blur(32px);
    mask: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%);
  }

  .blur-filter:nth-child(7) {
    z-index: 10;
    backdrop-filter: blur(64px);
    mask: linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%);
  }

  .gradient {
    background: linear-gradient(transparent, rgb(var(--m3-scheme-surface-container-low) / 0.8));
    &.light {
      background: linear-gradient(transparent, rgb(var(--m3-scheme-inverse-surface) / 0.8));
    }
  }
</style>
