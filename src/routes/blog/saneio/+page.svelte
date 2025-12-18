<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
  import { json } from "svelte-highlight/languages";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="A sane IO format" />
<p>
  These days everyone is making their own API format for AI IO. OpenAI Chat Completions, OpenAI
  Responses, Anthropic Messages, Google Generate Content, Google Interactions, etc. Everything has
  to support more use cases. Some even <a
    href="https://www.reddit.com/r/homeassistant/comments/1ibwney/comment/m9o4tab/"
    >want to add WebSockets to the mix</a
  >. But all of these are overly complicated, bloating packet sizes (like 521 kB for 2k tokens!) and
  confusing developers. This is a proposal for a saner format.
  <em>It's not an exact schema (yet).</em>
</p>

<h2>Input schema</h2>
<p>
  Everybody has more or less decided on the same input schema, and it's really not worth reinventing
  the wheel. The simple use case is:
</p>
<Snippet
  code={`{
  "model": "MODEL",
  "input": "Hi!"
}`}
  language={json}
/>
<p>Or, multiturn:</p>
<Snippet
  code={`{
  "model": "MODEL",
  "input": [
    {"role":"user","content":"Hi!"},
    {"role":"assistant","content":"Hello! How can I help you today?"}
  ]
}`}
  language={json}
/>
<p>But what if we want to use a stateful API, or add files, or modify sampling? Then:</p>
<Snippet
  code={`{
  "model": "MODEL",
  "input": [
    {"conversation":"aeeea000-7848-424a-b4a7-3e346b25a1cf"},
    {"role":"user","content":"![attachment image/png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...) yup checks out"}
  ],
  "sampling": {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 512
  }
}`}
  language={json}
/>
<p>
  Conversations are included in the input array because they're just sets of messages. Files go in
  as Markdown because they're just tokens inside of messages to the model. Sampling parameters are
  grouped together for clarity. But all of that is optional - it would be evil to force you to set a
  max tokens limit or to store all your conversations.
</p>

<h2>Output schema</h2>
<p>
  This is where it gets interesting. SSE may repeat the same scaffold, OpenRouter may send debugging
  metadata with every request, and Responses may send the same data thrice over, but we use direct <strong
    >streaming JSON</strong
  >.
</p>
<p>What this means for servers:</p>
<ul>
  <li>You'll need a streaming serialization library</li>
  <li>You'll need to commit to your output (can't go back and edit things)</li>
  <li>Pros: you'll send less data and gain the ability to send comments and obfuscation*</li>
</ul>
<p>What this means for clients:</p>
<ul>
  <li>You'll need a streaming JSON parser</li>
  <li>
    It needs to be able to handle comments, obfuscation*, and newlines in the middle of strings
  </li>
  <li>
    Pros: you'll receive less data, and understanding output (both during dev and debugging) will be
    much easier
  </li>
</ul>
<p>
  <em
    >* Servers will be able to send invalid bytes in the middle of strings to prevent attacks where
    you can infer a response by looking at the size of its responses's packets.</em
  >
</p>
<p>
  We also send reasoning <strong>inside of assistant messages</strong>. This forces all reasoning to
  be represented as strings, making it much harder to mishandle it. It also means there's no need
  for "enable/disable reasoning" switches - most clients will render Markdown and/or use an SDK that
  handles this for them. As for structure: plain text is plain text, <code>summary:</code> is user
  facing only, and <code>encrypted:</code> is model facing only.
</p>
<p>
  And like with user content, assistant content can contain references to images or other content.
</p>
<p>An example of how one provider (perhaps a router) might respond:</p>
<Snippet
  code={`/* model = moonshotai/kimi-k2-instruct-0905, provider = Groq, fingerprint = abc123 */
{
"output":[
{"role":"assistant","content":"<!-- reasoning
I need to calculate the sum of 2 and 3.

First, I identify the numbers: 2 and 3.

Next, I perform the addition: 2 + 3 = 5.

Therefore, the sum of 2 and 3 is 5.
-->
The sum of 2 and 3 is 5."}
],
"usage":{"prompt_tokens":10,"completion_tokens":15,"total_tokens":25}
}`}
  language={json}
/>
<p>And for another (perhaps a big lab):</p>
<Snippet
  code={`/* generation_id = gen_9k2mxp7q, latency_ms = 1247 */
{
"output":[
{"role":"assistant","content":"Let me search for that information.<!-- reasoning
The user is asking about current weather. I need to use the weather tool.
encrypted: U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIIwB0K1Y96Qs
-->"},
{"type":"tool_use","id":"call_wx1","name":"get_weather","input":{"location":"Seattle"}},
/* tool_execution_latency_ms = 342 */
{"type":"tool_result","tool_use_id":"call_wx1","content":"Temperature: 52°F, Cloudy"},
{"role":"assistant","content":"<!-- reasoning
summary: The tool returned weather data for Seattle showing 52°F and cloudy conditions.
encrypted: U2FsdGVkX19QlMxzKp8YE0hL+6vLHnRpVXmIYPj5C8xNz7Qf2pWRvKmL0dYxC3tE4HqM9wXZ
encrypted: uLBvN2kS8fTyPqA1rGvJ6eUcYhX+mKzNwDsIbFpQx3vN8mKLpYqW2dRxT9fZcHbE1sGpV4uJ
encrypted: 7xCwM6lQrK3eNhI0tYfS8aDbOzP5vLjT2nGxF9kWmUcH4qZsE1yRvBpN6wXoA8dKg
-->
The current weather in Seattle is 52°F and cloudy."}
],
"conversation_id":"aeeea000-7848-424a-b4a7-3e346b25a1cf",
"usage":{"prompt_tokens":45,"completion_tokens":42,"reasoning_tokens":87,"total_tokens":132}
}`}
  language={json}
/>
