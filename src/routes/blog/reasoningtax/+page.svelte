<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";

  import screenshot1 from "./Screenshot From 2025-02-07 18-34-12.png";
  import screenshot2 from "./Screenshot From 2025-02-07 18-34-51.png";
</script>

<BlogHeader {bg} title="I invented a new term" />
<p>I think I invented the term "reasoning tax". Let me explain.</p>

<h2>Context</h2>
<p>
  OpenAI introduced o1 in September 2024, which instantly became the best LLM. Since it was trained
  with RL, it was much better at problems requiring reasoning than simple chain of thought. Many
  open source clones followed, which pressured OpenAI into releasing o3-mini. The interesting thing
  is that these reasoning LLMs are overpriced.
</p>
<p class="italic">
  Throughout this article, I'll use the $X.XX/Y.YY syntax to mean "$X.XX per million input tokens
  and $Y.YY per million output tokens." I'll also be referring to QwQ, R1, and o1/o3, which are
  reasoning models from Qwen, DeepSeek, and OpenAI.
</p>

<h2>The data</h2>
<p>
  8B models: are an outlier. Only one provider on OpenRouter (NovitaAI) is hosting R1 8B, and they
  host it at $0.04/0.04. This is
  <em>less</em> than their price for standard Llama 3.1 8B, $0.05/0.05. The only explanation I have is
  that R1 8B is in less demand.
</p>
<p>
  32B models: DeepInfra is the cheapest host for all 32B models. Yet they host QwQ 32B and R1 32B at
  $0.12/0.18, while hosting Qwen Coder at $0.07/0.16. Admittedly, it's a small difference, but there
  shouldn't be a difference at all.
</p>
<p>
  70B models: Consistently, DeepInfra is the cheapest choice yet takes a reasoning tax. Llama 3.3
  70B is only $0.12/0.3, while R1 70B costs $0.23/0.69. That's 2.3x the output price!
</p>
<p class="italic">
  Interlude: This isn't DeepInfra specific. In fact, the tax is larger with other providers. You'll
  see more soon, but to compare the reasoning tax on 70B output prices: Novita's R1 cost is 2.05x
  normal, Together's cost is 2.27x normal, and Groq's cost varies from 1.25x to 6.3x.
</p>
<p>
  600B models: are where it gets interesting. I'm specifically referring to DeepSeek's v3 series
  which includes R1, a model of the exact same price. There are enough providers serving this model
  that it's worth a table:
</p>
<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>v3 price</th>
      <th>R1 price</th>
      <th>Price increase</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DeepInfra</td>
      <td>$0.49/0.89</td>
      <td>$0.75/2.4</td>
      <td>2.7x</td>
    </tr>
    <tr>
      <td>NovitaAI</td>
      <td>$0.89/0.89</td>
      <td>$4/4</td>
      <td>4.49x</td>
    </tr>
    <tr>
      <td>Fireworks *</td>
      <td>$0.9/0.9</td>
      <td>$3/8</td>
      <td>8.89x</td>
    </tr>
    <tr>
      <td>Together *</td>
      <td>$1.25/1.25</td>
      <td>$7/7</td>
      <td>5.6x</td>
    </tr>
    <tr>
      <td>DeepSeek</td>
      <td>$0.27/1.1</td>
      <td>$0.55/2.19</td>
      <td>1.99x</td>
    </tr>
    <tr>
      <td>Nebius AI</td>
      <td>$0.5/1.5</td>
      <td>$0.8/2.4</td>
      <td>1.6x</td>
    </tr>
  </tbody>
</table>
<p>
  * These (and kluster) are the only preferred providers on OpenRouter! This brings up the average
  cost.
</p>
<p>
  And finally, closed models: are worse. If you assume o1 is based on 4o and o3-mini is based on
  4o-mini, OpenAI has a 6x (o1) to 7.33x (o3-mini) reasoning tax.
</p>

<h2>Why?</h2>
<p>
  These prices seem a bit counterintuitive since reasoning models take more time to reason anyway.
  Reasoning tokens multiply your profit, so you shouldn't need to charge more, right?
</p>
<p>
  Perhaps not, but it does make sense from an economic perspective. Reasoning models need separate
  infrastructure and more RAM (thinking means more tokens means quadratic scaling) while being the
  hot new thing, so per supply and demand, prices will be high.
</p>
<p>
  Things might change. Things might not. But in the meantime, you can call it the reasoning tax.
</p>
<img
  src={screenshot1}
  alt="The first time I called it the reasoning tax"
  title="The first time I called it the reasoning tax"
  width="414"
  height="114"
/>
<img
  src={screenshot2}
  alt="Another user calling it that"
  title="Another user calling it that"
  width="414"
  height="173"
/>
