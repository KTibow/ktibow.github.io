<script lang="ts">
  let vbHeight = $state("");
  let displayHeight = $state("");
  let density = $state(1);
  let result = $derived.by(() => {
    const vb = +vbHeight;
    const disp = +displayHeight;
    const d = density || 1;

    const pxPortion = 1 / vb;
    const pxSize = pxPortion * disp * d;

    if (!isFinite(pxSize) || !vb || !disp) return "";
    return `1 pixel svg = ${pxSize.toFixed(3)} pixels on screen
0.1 pixel svg = ${(pxSize * 0.1).toFixed(3)} pixels on screen
0.01 pixel svg = ${(pxSize * 0.01).toFixed(3)} pixels on screen
0.001 pixel svg = ${(pxSize * 0.001).toFixed(3)} pixels on screen`.trim();
  });
</script>

<div>
  <input type="number" bind:value={vbHeight} placeholder="viewbox's height" />
  <input type="number" bind:value={displayHeight} placeholder="pixel height" />
  <input type="number" bind:value={density} placeholder="density of display (default 1)" />
  <output>{result}</output>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input {
    background-color: var(--m3c-surface-container-low);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  output {
    white-space: pre-wrap;
  }
</style>
