<script>
  import js from "svelte-highlight/languages/javascript";
  import Snippet from "$lib/Snippet.svelte";
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="Simply match curly brackets" />
<p>
  Making LLMs output JSON is a common problem, and making them
  <em>only</em> output the JSON is a surprisingly large part of it. While some commercial LLMs were
  trained on the task, others will say "Here's the output in JSON format:" regardless of your
  prompt, sabotaging your efforts to <code>JSON.parse</code> the output.
</p>
<p>
  The most complicated solution is structured outputs. You could also just use a <code
    >&lbrace;</code
  > prefill to get most of the structured outputs effect. But a simpler solution is something like
</p>
<Snippet
  language={js}
  code={`const jsonText = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);`}
/>
<p>
  This has the benefit of letting the LLM think before responding, since it matches an object <em
    >anywhere</em
  >. Of course, you can adapt this to work with array responses by using <code>[</code> and
  <code>]</code> instead of curly brackets, and you can rewrite this to port it to a different language.
</p>
<p>That's the post. Sorry if you expected something longer.</p>
