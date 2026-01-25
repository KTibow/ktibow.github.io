<script module>
	export const title = "Why is Phi 4 Multimodal so cheap?";
	export const date = "2025-03-26";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} {title} />
<p>Phi 4 Multimodal is the current cheapest transcription model, as this table shows:</p>
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>Inputs</th>
      <th>Outputs</th>
      <th>Pricing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GPT 4o transcribe</td>
      <td>$6/mtok, ~750/min</td>
      <td>$10/mtok</td>
      <td>~$0.36/hour</td>
    </tr>
    <tr>
      <td>GPT 4o mini transcribe</td>
      <td>$3/mtok, ~750/min</td>
      <td>$5/mtok</td>
      <td>~$0.18/hour</td>
    </tr>
    <tr>
      <td>Whisper Large (OpenAI)</td>
      <td rowspan="3">6000 frames/min pre-conv, 3000/min post-conv</td>
      <td rowspan="3">-</td>
      <td>$0.36/hour</td>
    </tr>
    <tr>
      <td>Whisper Large (DeepInfra)</td>
      <td>$0.027/hour</td>
    </tr>
    <tr>
      <td>Whisper Large Turbo (DeepInfra)</td>
      <td>$0.012/hour</td>
    </tr>
    <tr>
      <td>Gemini 2.0 Flash Lite</td>
      <td>$0.075/mtok, 1920/min</td>
      <td>$0.3/mtok</td>
      <td>$0.011/hour</td>
    </tr>
    <tr>
      <td>Phi 4 Multimodal</td>
      <td>$0.05/mtok, 750/min</td>
      <td>$0.1/mtok</td>
      <td>$0.003/hour</td>
    </tr>
  </tbody>
</table>
<p>* <em>Assuming 150 output tokens/minute</em></p>
<p>Why?</p>
<ul>
  <li>Phi 4 uses few tokens to represent speech.</li>
  <li>
    Phi 4 has a low price per token, because DeepInfra can host it, because it's an open model.
  </li>
</ul>
<p>
  If Phi 4 used the same token rate as Whisper (3000), their prices would almost be the same: 3000 *
  60 * 0.05/1000000 + 150 * 60 * 0.1/1000000 = around $0.01/hour
</p>
<p>
  If GPT 4o mini transcribe used the same pricing as plain GPT 4o mini, it would be much closer to
  DeepInfra's: 750 * 60 * 0.3/1000000 + 150 * 60 * 0.6/1000000 = around $0.019/hour
</p>
<p>
  This means that the primary factor it's cheap is its efficient tokenization, but it wouldn't be
  possible without a few other factors.
</p>
