<script module>
  export const title = "I can't go faster than static platforms";
  export const date = "2025-08-31";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Series from "$lib/Series.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {title} {bg} />
<p>At least that's what I think. Do I have too low self confidence? Let's find out.</p>
<p>
  "I" is 40-60ms here, the speed that GCP/Fly VMs/containers can serve the text "hi". So the
  question is how good a speed that is.
</p>

<h2>Unblocked</h2>
<h3>GitHub Pages</h3>
<p>github.io, a familiar sight. It's a consistent 38-50ms.</p>
<h3>Firebase Hosting</h3>
<p>Basically the same, 38-50ms.</p>
<h3>IPFS</h3>
<p>Are you surprised that it takes 60-90ms?</p>

<h2>Blocked</h2>
<h3>Cloudflare (built in static)</h3>
<p>Surprising variance from 50 to 150ms.</p>
<h3>Vercel</h3>
<p>70 to 90ms most of the time, but sometimes varies up to 190-200.</p>

<h2>Conclusion</h2>
<p>
  I can go ~the same speed as static platforms! If loading static and dynamic data are correlated, I
  might as well use a server for both. I just have to not overshoot the bandwidth limits (1GB/month
  for Google, 0.02 * GB &lt; $5/mo for Fly).
</p>

<Series />
