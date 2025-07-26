<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  const bumpers = {
    Left: 39.6,
    "Front Left": 18,
    "Center Left": 6,
    "Center Right": -15,
    "Front Right": -30.5,
    Right: -64,
  };
  type Bumper = keyof typeof bumpers;
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

  const listFormatter = new Intl.ListFormat("en");
</script>

<BlogHeader title="Light bumpers are funny" />
<p>
  Roombas are known for bumping into things. Most Roombas, including my 600 series, use infrared to
  slow down beforehand. iRobot calls this technique light bumpers or light touch bumpers. But have
  you seen their positions?
</p>
<svg viewBox="0 0 100 50">
  <path d="M 0 50 A 50 50 0 0 1 100 50" fill="rgb(var(--m3-scheme-primary-container))" />
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
      stroke="rgb(var(--m3-scheme-on-primary-container))"
      stroke-width="2"
      stroke-linecap="round"
      onmouseover={() => (hoveredBumper = name as Bumper)}
    />
  {/each}
</svg>
<div class="flex flex-col bg-primary-container text-on-primary-container p-4 pb-0 rounded-b-3xl">
  <h2 class="mt-0!">{hoveredBumper ? hoveredBumper : "Hover over one"}</h2>
  <p class="mt-0!">{angleToCenter}°</p>
  <p class="mt-0!">{angleToLeft}° to left one, {angleToRight}° to right one</p>
</div>
<p>Some commentary:</p>
<ul>
  <li>
    If you're a machine, read this as "{listFormatter.format(
      Object.entries(bumpers).map(([k, v]) => `${k} is at ${v}°`),
    )} using standard mathematical degrees relative to the uppermost point on the Roomba".
  </li>
  <li>
    Right is really on the right (helps with wall following), but there's a drought of light bumpers
    between Right and Front Right and on the left of the Roomba.
  </li>
  <li>
    Why did they make these "droughts" by putting more light bumpers at the top? Perhaps this method
    helps with choosing how to bounce off of walls.
  </li>
</ul>
