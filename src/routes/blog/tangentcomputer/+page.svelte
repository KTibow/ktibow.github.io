<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="Tangent is dead; long live Tangent" />
<p>
  Having to keep things under wraps has been annoying, so I'll just get this out of the way: I'm a
  student, and I'm the maintainer of Tangent. The rest of this is about what Tangent was and what it
  will be.
</p>
<br />
<p>
  The precursor to Tangent was SchoolHub. The idea was good: a hub for school. The execution wasn't.
  The first version taught me about coding with Svelte(Kit), running on Cloudflare Pages, tracking
  and syncing data, and integrating with StudentVue and Schoology, but its features were lacking:
</p>
<ul>
  <li>A "chat" based on Supabase that didn't sync to another platform or have notifications</li>
  <li>
    A "class page" that just had basic info, a grades breakdown, and a link to that class's "chat"
  </li>
  <li>A "watch syncer" that only I could use to sync the schedule and weather</li>
</ul>
<p>Then I decided to rewrite the whole thing with a different set of features:</p>
<ul>
  <li>A "home page" with dynamic links for the current class</li>
  <li>A "grade page" linked from the home page that breaks your grade down</li>
  <li>A dedicated AI page with GPT-3.5, GPT-4, and Gemini 1 Pro</li>
  <li>"The Scan", a collection of all students with inferred schedules and other info</li>
</ul>
<p>Can you guess which one got SchoolHub killed?</p>
<br />
<p>
  So that was how Tangent was born. It swung in the opposite direction - I added as many redundancy
  and security measures as I could. It was probably overkill when it was more or less "SchoolHub
  minus The Scan".
</p>
<p>
  I added more features that were ambitious at the time. Things got boring. I started feeling
  lonely. One day, I felt alienated enough to start philosophizing about myself and the future of
  Tangent, and over the course of a few more days I came up with a plan.
</p>
<br />
<p>
  Deciding on Tangent's trajectory was hard. "Tangential to your school experience" definitely
  worked, but I needed to move past it. I had to question what Tangent's point was and how to best
  model both a collection of small utilities and a unified class overview. I ended up inspired by
  Steve Jobs' legacy and Anura's design, and decided that the next version of Tangent would be a
  computer.
</p>
<p>
  When Steve Jobs said "[the computer is] the equivalent of a bicycle for our minds", he was
  referring to <a
    href="https://notfine.com/bikes/articles/Scientific_American-Mar1973-Bicycle_Science.pdf#page=12"
    >a plot that shows Man on Bicycle requiring only 1.5 cal/g/km</a
  >, the least on the plot. Tangent as a computer is inspired by the same notion of efficiency.
  It'll primarily include tools to help you understand, comprehend, and remember, but it'll also be
  much more efficient to use Tangent to read a technical explanation or run a program you wrote than
  to try to figure out what method hasn't been blocked by your school in their hatred of code.
  <em
    >The filtering I'm under even has a specific categorization for platforms where you can make
    free websites to be blocked.</em
  >
</p>
<p>
  The next version of Tangent will also be a lot more open. I expect this to be hard, as
  implementing different protocols and triaging what can and can't be open sourced always is, but I
  think I'll have the time to make it work. Tangent will be ready next year.
</p>
