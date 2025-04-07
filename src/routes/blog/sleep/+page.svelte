<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import basicView from "./basic-view.png";
  import moreView from "./more-view.png";
  import myView from "./my-view.png";
</script>

<BlogHeader {bg} title="How one estimates sleep stages" />
<p>
  You sleep a lot. It's not unlikely that you also track your sleep, whether with a watch, ring, or
  mattress pad. But how do these pieces of technology <em>know</em>? How do they turn heart rate and
  movement into distinct stages? Give me some time and I'll explain.
</p>
<p>
  <em>Note:</em> I've worked with sleep data intermittently. This is just the first time I decided to
  write about it.
</p>

<h2>Gathering materials</h2>
<p>To collect training data, we can track sleep in a process called polysymnography, where:</p>
<ul>
  <li>The subject goes to a sleep clinic</li>
  <li>
    Many wires are attached to the patient, measuring many things:
    <ul>
      <li>EEG (brain waves)</li>
      <li>EOG (eye movements)</li>
      <li>EMG (muscle activity)</li>
      <li>ECG (heart rate)</li>
      <li>Respiratory effort</li>
      <li>Pulse oximetry</li>
    </ul>
  </li>
  <li>The patient sleeps</li>
  <li>A technologist watches the data and splits it into sleep stages</li>
</ul>
<p>
  Now we have stages marked by times, and we just need to predict them. For our purposes, our inputs
  will be accelerometer data, heart data, and the time.
</p>

<h2>Becoming something of a technologist myself</h2>
<p>
  I read a lot of papers but the best one was <a href="https://doi.org/10.1093/sleep/zsz180"
    >Motion and heart rate from a wrist-worn wearable and labeled sleep from polysomnography</a
  >, because it has <a href="https://physionet.org/content/sleep-accel/1.0.0/#files-panel">data</a>.
  It was collected from Apple Watches and cross referenced with polysomnography, and the data's open
  to view. Let me show you some so you can get an intuition too.
</p>
<img src={basicView} class="invert hue-rotate-180" alt="4 charts" />
<p>
  We start with a view of the sleep stages. We have sleep cycles every 90 minutes or so, or 4-6
  times a night. More info:
</p>
<table>
  <thead>
    <tr>
      <th>Sleep Stage</th>
      <th>HR</th>
      <th>HRV</th>
      <th>Movement</th>
      <th>When</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Awake (0)</td>
      <td>Higher</td>
      <td>Variable</td>
      <td>Frequent</td>
      <td>~2.5%; beginning/end of/throughout sleep</td>
    </tr>
    <tr>
      <td>Light sleep (1, N2)</td>
      <td>Moderately lower</td>
      <td>Moderate</td>
      <td>Occasional</td>
      <td>~55%; throughout the night</td>
    </tr>
    <tr>
      <td>Deep sleep (3, N3)</td>
      <td>Lowest</td>
      <td>Highest</td>
      <td>Minimal</td>
      <td>~20%; predominantly early</td>
    </tr>
    <tr>
      <td>REM sleep (5)</td>
      <td>Irregular, can spike</td>
      <td>Depends</td>
      <td>Very little except for twitches</td>
      <td>~22.5%; more frequent toward morning</td>
    </tr>
  </tbody>
</table>
<p>
  The middle panels show accelerometer data: the 10 second max ENMO (euclidian norm minus 1) and
  mean Z angle (calculated from the Z acceleration). The bottom panel displays heart data, where the
  red line has a mean filter applied.
</p>
<p>
  This is enough data to predict wake/sleep reasonably well - you can clearly see when they start
  and stop sleeping from just ENMO. However, while you could guess the specific stages using general
  knowledge, you wouldn't be very accurate. Let's look at some different data with different
  metrics.
</p>
<img src={moreView} class="invert hue-rotate-180" alt="5 charts" />
<p>This is much more interesting! You can see:</p>
<ul>
  <li>How you can predict wake from accelerometer and clock data</li>
  <li>How you can predict deep sleep from HRV and clock data</li>
  <li>How you can predict REM from HRV and clock data</li>
</ul>
<p>But you can also see how hard it is to predict things:</p>
<ul>
  <li>ENMO spikes sometimes indicate wakefulness but sometimes don't</li>
  <li>Deep sleep doesn't seem to consistently be caused by low HR or HRV</li>
  <li>Stages sometimes change before or after you would expect them to</li>
</ul>
<p>And this is a best case scenario. A lot of the other data is even more confusing.</p>

<h2>Reading my own data</h2>
<p>
  I've collected data from a custom Bangle.JS app, and it's time to figure out when I'm in light,
  deep, or REM sleep. This is my first time doing this - Sleep as Android was always inaccurate and
  I've never owned something with built in sleep tracking.
</p>
<img src={myView} class="invert hue-rotate-180" alt="2 charts" />
<p>We can see some distinct cycles. Cool! I specifically see the following ones:</p>
<ul>
  <li>Still trying to sleep until 23:00</li>
  <li>Deep sleep cycle from 0:00-0:40</li>
  <li>REM from 0:40-1:20</li>
  <li>REM from 2:00-2:40</li>
  <li>REM from 3:20-4:10</li>
  <li>REM from 4:50-6:10</li>
  <li>REM from 6:30</li>
  <li>Waking up from 6:50</li>
</ul>
<p>But I hope you've learned that it's not easy to predict sleep cycles.</p>
