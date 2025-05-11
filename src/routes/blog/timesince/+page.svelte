<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.jpg";

  const now = new Date();
  const advancements = {
    "Qwen 3": new Date("April 29 2025"),
    "O3 public access": new Date("April 16 2025"),
    "GPT-4.1": new Date("April 14 2025"),
    "Llama 4": new Date("April 5 2025"),
    "Gemini 2.5 Pro": new Date("March 25 2025"),
    "QwQ full": new Date("March 6 2025"),
    "GPT-4.5": new Date("February 27 2025"),
    "Grok 3": new Date("February 19 2025"),
    "Deepseek R1": new Date("January 20 2025"),
    "Deepseek V3": new Date("December 26 2024"),
    "O3 @ Day 12 of OpenAI": new Date("December 20 2024"),
    "Gemini 2": new Date("December 11 2024"),
    "Start of 12 days of OpenAI": new Date("December 5 2024"),
    O1: new Date("September 12 2024"),
    "Claude 3.5 Sonnet": new Date("June 20 2024"),
    "Gemini 1.5 updates @ I/O 2024": new Date("May 14 2024"),
    "Llama 3": new Date("April 18 2024"),
    "Claude 3": new Date("March 4 2024"),
    "Mixtral 8x7b": new Date("December 11 2023"),
    "Llama 2": new Date("July 18 2023"),
    "Claude 2": new Date("July 11 2023"),
    "PaLM (lol) @ I/O 2023": new Date("May 10 2023"),
    "GPT-4": new Date("March 14 2023"),
    Claude: new Date("March 14 2023"),
    Llama: new Date("March 3 2023"),
    "GPT-3.5": new Date("November 30 2022"),
    "GPT-3": new Date("May 29 2020"),
    "GPT-2 public access": new Date("November 5 2019"),
    "GPT-1": new Date("June 10 2018"),
  };
</script>

<BlogHeader {bg} title="Time since major AI advancements" />
<p>
  This is a timeline of major AI advancements. It's made for myself to look back on the past and
  think about how fast AI moves, so it's rather simple and uses relative dates.
</p>
{#each Object.entries(advancements) as [name, date]}
  {@const daysSince = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))}
  <div class="flex justify-between">
    <p class="font-bold">{name}</p>
    <p class="tabular-nums">{date.toLocaleDateString()} - {daysSince} days ago</p>
  </div>
{/each}
