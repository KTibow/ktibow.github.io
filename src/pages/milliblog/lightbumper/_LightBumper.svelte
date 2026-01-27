<script lang="ts">
  import { bumpers, type Bumper } from "./_bumpers";

  const angles = Object.values(bumpers);

  let hoveredBumper: Bumper | undefined = $state();
  let { angleToLeft, angleToRight, angleToCenter } = $derived.by(() => {
    let angleToLeft = 0;
    let angleToRight = 0;
    let angleToCenter = 0;
    if (hoveredBumper) {
      angleToCenter = bumpers[hoveredBumper];
      // Left bumper is the next higher angle (more positive, counterclockwise)
      const maybeAngleToLeft = angles.find((angle) => angle > angleToCenter);
      // Right bumper is the next lower angle (more negative, clockwise)
      const maybeAngleToRight = angles.findLast((angle) => angle < angleToCenter);
      if (maybeAngleToLeft !== undefined) {
        angleToLeft = Math.abs(angleToCenter - maybeAngleToLeft);
      }
      if (maybeAngleToRight !== undefined) {
        angleToRight = Math.abs(angleToCenter - maybeAngleToRight);
      }
    }
    return { angleToLeft, angleToRight, angleToCenter };
  });
</script>

<svg viewBox="0 0 100 50">
  <path d="M 0 50 A 50 50 0 0 1 100 50" fill="var(--m3c-primary-container)" />
  {#each Object.entries(bumpers) as [name, angle]}
    {@const x1 = 50 + 45 * Math.cos((-angle * Math.PI) / 180 - Math.PI * 0.5)}
    {@const x2 = 50 + 49 * Math.cos((-angle * Math.PI) / 180 - Math.PI * 0.5)}
    {@const y1 = 50 + 45 * Math.sin((-angle * Math.PI) / 180 - Math.PI * 0.5)}
    {@const y2 = 50 + 49 * Math.sin((-angle * Math.PI) / 180 - Math.PI * 0.5)}
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <line
      {x1}
      {x2}
      {y1}
      {y2}
      stroke="var(--m3c-on-primary-container)"
      stroke-width="2"
      stroke-linecap="round"
      onmouseover={() => (hoveredBumper = name as Bumper)}
    />
  {/each}
</svg>
<div class="info not-prose">
  <h2>{hoveredBumper ? hoveredBumper : "Hover over one"}</h2>
  <p>{angleToCenter}°</p>
  <p>{angleToLeft}° to left one, {angleToRight}° to right one</p>
</div>

<style>
  .info {
    display: flex;
    flex-direction: column;
    background-color: var(--m3c-primary-container);
    color: var(--m3c-on-primary-container);
    padding: 1rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }
  h2 {
    @apply --m3-headline-small;
  }
</style>
