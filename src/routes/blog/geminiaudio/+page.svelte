<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="Gemini may be > Whisper" />
<p>
  Audio transcription has been getting a lot better recently. In 2022, OpenAI's Whisper shocked the
  space with actually accurate transcription. From there, it's been getting cheaper and cheaper,
  with distilled versions like <code>whisper-large-v3-turbo</code> and batching making it 10,000x cheaper
  than a human.
</p>
<p>
  But surprisingly, the cheapest transcriber isn't a model designed for that task. It's the
  multimodal language model Gemini. Let me show you.
</p>
<br />
<p>
  Deepinfra runs Whisper Turbo at a price of $0.0002/minute, which equates to the rather respectable
  price of $0.012/hour.
</p>
<p>
  Finding the Gemini price is not as easy. Let me break it down in a table, using the Flash version
  (other versions are too expensive or too crappy).
</p>
<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Tokens</th>
      <th>Pricing</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Input</td>
      <td>115,329/hour</td>
      <td>$0.075/million (with Flash)</td>
      <td>$0.0086/hour</td>
    </tr>
    <tr>
      <td>Output</td>
      <td>~1000/hour</td>
      <td>$0.3/million (with Flash)</td>
      <td>$0.0003/hour</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>-</td>
      <td>-</td>
      <td>$0.0089/hour</td>
    </tr>
  </tbody>
</table>
<br />
<p>
  75% of the price. This could be a real business, especially if you use Gemini's batching feature.
  If you do make some money from this, let me know, contacts are on the <a href="/">home page</a>.
</p>
<br />
<p>
  <em>2025 update:</em> Phi 4 Multimodal is out, and it's even cheaper! $0.004/hour. (Some say that Whisper
  actually just costs $0.001/hour to run, but I haven't checked this.)
</p>
