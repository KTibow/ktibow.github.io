<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="Why is Gemini Flash so popular?" />
<p>
  Gemini 2.0 Flash definitely has its virtues. It's a fast, low-latency model that has high quality
  for its price. If you look at one API gateway, OpenRouter, it processes around 321B tokens a week
  or 46B tokens a day. The question is what those tokens are doing.
</p>
<h2>Apps</h2>
<p>
  Unfortunately, apps only explain a small portion of the usage. The sum of the top 15 consumers
  makes 21.65 out of the 321 billion tokens used weekly.
</p>
<h2>Categories</h2>
<p>You can tally up the weekly usage across categories:</p>
<ul>
  <li>Roleplay: 0.794B</li>
  <li>Programming: 2.32B</li>
  <li>Marketing: 0.169B</li>
  <li>Marketing/SEO: 0.021B</li>
  <li>Technology: 0.781B</li>
  <li>Science: 1.66B</li>
  <li>Translation: 0.589B</li>
  <li>Legal: 0.204B</li>
  <li>Finance: 0.173B</li>
  <li>Health: 0.771B</li>
  <li>Trivia: 0.008B</li>
  <li>Academia: 1.28B</li>
  <li>Total: 8.77B</li>
</ul>
<p>
  This is weird - why doesn't it sum to 321B (total per week) or 3.21B (1%, categorized prompts)?
  The most likely explanation is that OR's categorizer sometimes outputs multiple categories.
</p>
<h2>Conclusion</h2>
<p>
  One more thing to consider is that for every 1 token Gemini outputs, it reads through 10 input
  tokens. This verifies that Gemini 2.0 Flash users are working with long contexts, typical of uses
  like programming, search, and scientific summarization. Those are the majority even though there
  are a few other uses.
</p>
