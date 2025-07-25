<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="CrofAI updated my worldview" />
<p>
  <a href="https://ai.nahcrof.com/home">CrofAI</a> is an AI inference provider I learned about a few
  days ago. I used to think inference was fast OR cheap - all providers were either mid, cheap but slow
  or unreliable, or fast but expensive. CrofAI is both fast and cheap.
</p>
<p>
  Numbers show this best. Let's say you're using AI, specifically Kimi K2, to clone a set of
  calculators. Across 100 calls, you used 10K input tokens and 100K output tokens. How slow and
  expensive would this be on your favorite provider?
</p>
<table>
  <tbody>
    <tr>
      <th>Please consult the table</th>
      <th>Avg time</th>
      <th>Total cost (~)</th>
    </tr>
    <tr>
      <td>Groq (OR's fastest)</td>
      <td>6.32s</td>
      <td>$0.31</td>
    </tr>
    <tr>
      <td>CrofAI Turbo</td>
      <td>4.67s</td>
      <td>$0.21</td>
    </tr>
    <tr>
      <td>DeepInfra (OR's cheapest)</td>
      <td>14.99s</td>
      <td>$0.23</td>
    </tr>
    <tr>
      <td>Chutes (OR's cheapest)</td>
      <td>15.73s</td>
      <td>$0.05</td>
    </tr>
    <tr>
      <td>CrofAI non-turbo</td>
      <td>29.5s</td>
      <td>$0.04</td>
    </tr>
  </tbody>
</table>
<p>Almost certainly, your favorite provider is beat by CrofAI.</p>
<p>
  Gemma 3n is also on CrofAI, which raises an interesting point: <em>if</em>
  <code>input_audio</code>
  blocks worked, we could transcribe at the price of
  <abbr title="(1/(160ms)) * ($0.03/million) + (150/minute) * ($0.05/million) in $/hour"
    >$0.001/hour</abbr
  >, dethroning <a href="/blog/humanresearch/phi-4/">Phi 4 Multimodal</a>
  and transcribing a whole year of audio (including night) for just $9.86. This is what "the price of
  intelligence [going] to zero" looks like.
</p>
<p>
  CrofAI is a story about markets in a sense. They're performing arbitrage: there are a lot of cheap
  3090s and 4090s out there, but nobody went to the effort of finding the cheapest ones, manually
  optimizing inference, and selling it as a service with a little markup. Doing this is how they
  become better than any other choice and prove themselves to costumers, and eventually get into
  OpenRouter (OR please add CrofAI thanks).
</p>
<p>
  Who's the closest to catching up to CrofAI? Arguably Chutes or another entity on Bittensor. Their
  prices are already decent, and if there's an incentive for making kernels faster, they could go
  down even more and kill CrofAI in the process. However, I doubt this is soon: Chutes moves slow,
  and CrofAI has already acknowledged Chutes as competition, planning even more price cuts to K2 and
  other models within the next week.
</p>
