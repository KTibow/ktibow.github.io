<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import regression from "./regression.png";
</script>

<BlogHeader {bg} title="Qwenflation" />
<p>
  Qwen 3 is the latest and greatest LLM from Alibaba. It's amazing on benchmarks and has a wide
  variety of models, which is why it's very odd that it's so unoptimized. As of May 1st 2025, Qwen 3
  is a wide variety of slow models.
</p>

<h2>Small models</h2>
<p>
  There are some small models that are great for running locally, but they aren't hosted online. The
  one exception is the 14B, which is more expensive than Phi 4 ($0.07/0.24 vs $0.07/0.14) and slower
  (91 tps vs 117 tps) when it's the same size.
</p>

<h2>Medium models</h2>
<p>
  The 32B should be a direct upgrade from Qwen 2.5 32B, Qwen 2.5 Coder 32B, and QwQ 32B. It's not.
  It's at $0.1/0.3, often more expensive than QwQ ($0.15/0.2) and always more expensive than Qwen
  Coder ($0.06/0.18). It's also only running at 25-35 tps, half the previous 32B speeds.
</p>
<p>
  Surely the mixture of experts LLM, 30B A3B, will be better. Surely since it has 2B less total
  parameters and 1/10th of the active parameters it'll run extremely cheaply and fast- what? It's
  being hosted at only around 60-90 tps? Indeed, it's slower than what you would get on your own
  4090 (130 tps per Dubesor), and somehow the same price as both the dense model and another MoE
  with 3.6x the parameters (Llama 4 Scout).
</p>

<h2>Large models</h2>
<p>
  The 235B A22B is much smaller than older behemoths like Llama 405B and Deepseek V3, and the
  current price, $0.2/0.6, reflects that. But should it be lower?
</p>
<img src={regression} alt="desmos" />
<p>
  Based on this regression, the current price is about 1.4x what it should be. If you want a model
  to directly compare to, see Llama 4 Maverick, a larger (400B A17B), cheaper ($0.17/0.6), and
  faster (90 tps vs 25 tps) model.
</p>

<h2>Recap</h2>
<p>Comparing to other 14Bs, Qwen 3 14B is 171% the price and 72% the speed.</p>
<p>Comparing to other 32Bs, Qwen 3 32B is 167% the price and 46% the speed.</p>
<p>Comparing to the expected 30B MoE, Qwen 3 30B A3B is 137% the price and 60% the speed.</p>
<p>Comparing to the expected 235B MoE, Qwen 3 235B A22B is 139% the price and 28% the speed.</p>

<h2>Why?</h2>
<p>
  As I said when I started this post, it's probably just unoptimized and will get better with
  improvements to inference engines. It might also just need some disruption from DeepInfra price
  lowering, OpenRouter ad hoc GPU hosting, or Groq/Cerebras/SambaNova running. But the more cynical
  take is that since Qwen 3 reasons by default, it's subject to the
  <a href="/blog/reasoningtax/">reasoning tax</a>, and it and future generations will never see the
  same affordability as Qwen 2.5.
</p>

<hr />

<h2>2 days later</h2>
<p>Things have only gotten stupider. Now, Qwen 30B A3B is:</p>
<ul>
  <li>more expensive than the 235b version (now $0.1/0.1)</li>
  <li>more expensive than past dense versions (still $0.06/0.18)</li>
  <li>the same price as current dense versions (still $0.1/0.3)</li>
  <li>
    slower than the free host that's <a
      href="https://chutes.ai/app/chute/96b5aab1-6a45-578b-8897-6f927b3aa87f?tab=source"
      >just running sglang</a
    >
  </li>
  <li>
    slower than <a
      href="https://discord.com/channels/1091220969173028894/1366352006159269989/1367531445635121212"
      >your own 4090 running ggml (OpenRouter Discord)</a
    >
  </li>
</ul>
<p>
  I would start a company that just wraps Fly / Hyperbolic / SF Compute / some other GPU provider
  and hosts it at a better price, except I don't really want to figure out taxes and registration
  and all that.
</p>
