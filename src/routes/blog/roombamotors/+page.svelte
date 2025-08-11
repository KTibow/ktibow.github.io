<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import SeriesRoomba from "$lib/SeriesRoomba.svelte";
  import bg from "./bg.avif";
  const listFormatter = new Intl.ListFormat("en");
</script>

<BlogHeader {bg} title="Roombas, motors, and noise" />
<p>
  I have a Create 2. I can drive it in 3 ways, going from most direct to least. All of them have
  some limits; today we're looking into them.
</p>
<ul>
  <li>Drive PWM: -255 to 255</li>
  <li>Drive Direct: -500 to 500 mm/s</li>
  <li>Drive: with velocity and radius</li>
</ul>
<h2>Minimum speed</h2>
<p>
  If you use mm/s, you have a minimum speed of 11 mm/s; anything from -10 to 10 mm/s will result in
  no movement.
</p>
<p>
  But what if you don't? Then it depends on the surface. PWM with as little as 21/21 works on my
  hard floors, but carpets require 40/40 or more. Your Roomba may behave differently.
</p>
<h2>I → O</h2>
<p>
  If you use mm/s, functional speed increments every 28.5 mm/s after 10. That's to say that you
  could predict speed thresholds at {listFormatter.format(
    Array.from({ length: 18 }, (_, i) => (11 + 28.5 * i).toFixed(0)),
  )}; that makes ~18 or so real speeds. For example, no matter where you drive in [11, {(
    11 + 28.5
  ).toFixed(0)}) you round up to actually driving at 39 mm/s. The mm/s you drive also closely
  correlates with the mm/s you're going for.
</p>
<p>
  If you're using PWM, you can achieve much smoother speeds, and 21 to 255 will more or less map
  linearly to the full range. However, you'll lose the assurance provided by the speed controller.
</p>
<h2>I ↛ O</h2>
<p>
  This is the "noise" part, the part that kills dead reckoning. The robot won't go exactly where you
  want it to go. It might face friction or slippage. The robot won't measure where it went either -
  for example, encoders also suffer from slippage.
</p>
<p>
  My Roomba has no way to fix this. Others do, though: The newest Roombas use LIDAR or cameras to
  absolutely locate themselves. The i series fuses sensors that are individually problematic, like
  drifting optical sensors and gyroscopes, and calibrates and combines them to get a good enough
  location.
</p>
<h2>How bad is it?</h2>
<p>Let's look at some real-world data. Each row here is the result of 3 10 second experiments.</p>
<table>
  <thead>
    <tr>
      <th>Drive Mode</th>
      <th>Surface</th>
      <th>Requested</th>
      <th>Actual</th>
      <th>Measured (Encoders)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Raw PWM</td>
      <td>Carpet</td>
      <td>50</td>
      <td>294-331 mm</td>
      <td>329-357 mm</td>
    </tr>
    <tr>
      <td>Raw PWM</td>
      <td>Tile</td>
      <td>50</td>
      <td>724 mm</td>
      <td>721-735 mm</td>
    </tr>
    <tr>
      <td>Controlled</td>
      <td>Carpet</td>
      <td>67 mm/s</td>
      <td>698-735 mm</td>
      <td>763-805 mm</td>
    </tr>
    <tr>
      <td>Controlled</td>
      <td>Tile</td>
      <td>67 mm/s</td>
      <td>582-600 mm</td>
      <td>601-604 mm</td>
    </tr>
  </tbody>
</table>
<p>
  As you can see, raw PWM is predictably unpredictable. On carpet, it alternated between veering
  left and right, and ranged from going 294 mm to 331 mm (89-94% of the distance the encoders
  measured). On tile, things were more stable, consistently going 724 mm, veering to the left (too
  much power on the right wheel), and measuring the slightly off 721-735 mm (split as 675/779).
</p>
<p>
  Controlled driving is only an ideal. On carpet, it still alternates between veering left and
  right, and goes over the requested 670 mm: 719 mm on average (92% of the measured 784 mm). This is
  perplexing: why is it going over the requested speed on a surface with wheel slippage? And why,
  when on tile, does it go a much shorter 590 mm (98% of measured) and veer less to the left? We may
  never know.
</p>

<SeriesRoomba />
