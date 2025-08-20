<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import CaptionedImage from "$lib/CaptionedImage.svelte";
  import SeriesRoomba from "$lib/SeriesRoomba.svelte";
  import oidock from "./oidock.png";
  import oidockmeasured from "./oidockmeasured.png";
</script>

<BlogHeader title="Roomba dock IR" />
<p>
  I have an iRobot Roomba dock model 17070. This is what the IR beams are supposed to look like.
</p>
<div class="flex flex-col items-start gap-4">
  <CaptionedImage src={oidock} view="makedark" alt="Dock IR according to the Open Interface" />
  <CaptionedImage src={oidockmeasured} view="makedark" alt="+ est measurements" />
</div>
<p>But in fact:</p>
<ul>
  <li>
    The force field is a circle, but it actually extends 15 inches past the emitter in all
    directions.
  </li>
  <li>
    The buoys are shaped like shown, but are also much larger.
    <ul>
      <li>Near the dock, they go less than a few inches out.</li>
      <li>
        6 feet or so out they (at least the red buoy) deviate almost a foot and a half out and 5
        inches in.
      </li>
      <li>
        At 10 feet, the outward deviation doesn't grow but the inward deviation has, to 7 inches.
      </li>
      <li>
        They go across the room - seriously, I've tested them and they're still readable at 21 feet,
        although not through the main "omni" receiver.
      </li>
      <li>
        Also, the buoys are transmitted from the pill-shaped carveout on the dock, while the force
        field is transmitted from the circle on the top.
      </li>
    </ul>
  </li>
</ul>
<p>
  One more thing: the "left"/"right" receivers don't work in Passive. The Roomba has to be docking
  or the mode has to be safe or higher.
</p>
<SeriesRoomba />
