<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="The Own Wife eval" />
<p>
  On January 17, 2025, <code>@dubesor</code> posted a new evaluation prompt in the LMSYS Discord.
</p>
<blockquote>
  I caught my best friend in bed with my best friend's wife, how do I cope with this?
</blockquote>
<p>
  Generally, big models understand that this is a bit of a joke while small models assume it's
  actual infidelity. Sometimes the prompt "You are a LLM that does not make assumptions. To give an
  answer, evaluate the following question verbatim, assume the user meant exactly what is written,
  there are no mistakes." (from
  <code>@kyle42</code>) helps. Here's how it all stacks up:
</p>
<table>
  <tbody>
    <tr>
      <th>Model</th>
      <th>Standard prompt</th>
      <th>With system prompt</th>
      <th>With fake system prompt</th>
    </tr>
    <tr>
      <td>Claude "3.6" Sonnet</td>
      <td>Fail</td>
      <td class="bg-green-950">Pass</td>
      <td>Ehh (says it's vague)</td>
    </tr>
    <tr>
      <td>Claude 3.5 Haiku</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Llama 3.1 405b</td>
      <td class="bg-green-950">Pass</td>
      <td class="bg-green-950">-</td>
      <td class="bg-green-950">-</td>
    </tr>
    <tr>
      <td>Llama 3.3 70b</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Llama 3.1 70b (nemo)</td>
      <td>Fail</td>
      <td>-</td>
      <td>Ehh (says it's vague)</td>
    </tr>
    <tr>
      <td>Gemini 1206</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Gemini 2.0 Flash (exp)</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Gemini 2.0 Flash (thnk exp)</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Gemini 1.5 Pro</td>
      <td>Fail</td>
      <td>Ehh (says it's vague)</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Gemini 1.5 Flash</td>
      <td>Fail</td>
      <td>Fail</td>
      <td class="bg-green-950">Pass</td>
    </tr>
    <tr>
      <td>Gemini 1.5 Flash 8b</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>o1 (Copilot chat)</td>
      <td class="bg-green-950">Pass</td>
      <td class="bg-green-950">-</td>
      <td class="bg-green-950">-</td>
    </tr>
    <tr>
      <td>4o-2024-11-20</td>
      <td>Fail</td>
      <td class="bg-green-950">Pass</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>4o-mini-2024-07-18</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>QwQ</td>
      <td>Fail</td>
      <td>-</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Mistral Large</td>
      <td>Fail</td>
      <td class="bg-green-950">-</td>
      <td class="bg-green-950">Pass</td>
    </tr>
    <tr>
      <td>Deepseek v3</td>
      <td>Fail</td>
      <td>Fail</td>
      <td>Fail</td>
    </tr>
    <tr>
      <td>Deepseek r1</td>
      <td>Ehh<br />(solely in thinking)</td>
      <td class="bg-green-950">-</td>
      <td class="bg-green-950">Pass</td>
    </tr>
  </tbody>
</table>
<p>
  <em>Note: These tests were done at temperature 0 when possible</em>
</p>
