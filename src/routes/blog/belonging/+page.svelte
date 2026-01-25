<script module>
  export const date = "2025-12-10";
</script>

<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.svg";
</script>

<BlogHeader {date} {bg} title="On belonging" />
<div class="relative">
  <aside
    class="p-6 rounded-2xl border-current/50 border xl:absolute xl:ml-2 xl:left-full xl:w-[min(65ch,calc(50dvw-33ch))]"
  >
    <h2 class="mt-0">Flawed methodology?</h2>
    <p>
      Take a student whose belonging gets better and better, or a student who has exactly one year
      where they really feel what it's like to belong. Looking back, they might say that they didn't
      really belong back then. The opposite, a really bad year, can also have an impact (that's why
      I'm writing this). But the nature of the binary, singular question "do you feel like you
      belong?" that Alvin uses doesn't capture this at all.
    </p>
    <p class="mb-0">
      The definition of belonging might change from year to year or student to student too. Does it
      mean that you identify with your school? You feel like you have a place? Your peers treat you
      with respect? Your teachers like you?
    </p>
  </aside>
</div>
<p>
  I recently read Alvin Chang's article <a href="https://pudding.cool/2025/02/middle-school/"
    >The Middle Ages</a
  >. I strongly agree that your sense of belonging depends on your environment, but I believe
  there's nothing <em>inherently</em> bad about middle schools. Not all models are bad for belonging!
  Some from other countries have stable cohorts, some even pinning the teacher! I personally went to
  a school that had a gifted program (which I'll refer to as acceleration), which had a side effect of
  giving me a mostly stable cohort.
</p>

<table class="data-table">
  <colgroup>
    <col style="width: 15%" />
    <col style="width: 42.5%" />
    <col style="width: 42.5%" />
  </colgroup>
  <thead>
    <tr>
      <th></th>
      <th># people I see</th>
      <th># people I spend 3+ hours with</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5th</td>
      <td>21</td>
      <td>20</td>
    </tr>
    <tr>
      <td>6th</td>
      <td colspan="2"><em>No data</em></td>
    </tr>
    <tr>
      <td>7th</td>
      <td>270</td>
      <td>55</td>
    </tr>
    <tr>
      <td>8th</td>
      <td>123</td>
      <td>15</td>
    </tr>
  </tbody>
</table>

<p>
  I would definitely say that I had fun in middle school and that I belonged. In my cohort, I could
  settle down, get to really know people, have fun before and after school, and have some of my best
  years.
</p>

<h2>High school, on the other hand</h2>
<table class="data-table">
  <colgroup>
    <col style="width: 15%" />
    <col style="width: 42.5%" />
    <col style="width: 42.5%" />
  </colgroup>
  <tbody>
    <tr>
      <td>9th</td>
      <td>181</td>
      <td>2</td>
    </tr>
    <tr>
      <td>10th</td>
      <td>223</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

<br />

<p>Wait but why? It's multifaceted. Let's pull up a Sankey to analyze the people aspect.</p>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="200 0 1000 1000" fill="white">
  <g fill="none">
    <path
      stroke="#9e9e9e"
      stroke-width="133.9918"
      d="M265 553.4568c435 0 435-169.5062 870-169.5062"
      opacity=".4"
    />
    <path
      stroke="#4caf50"
      stroke-width="128.5597"
      d="M265 179.3827c435 0 435-20.8642 870-20.8642"
      opacity=".4"
    />
    <path
      stroke="#9e9e9e"
      stroke-width="123.1276"
      d="M265 682.0165c435 0 435 30.6172 870 30.6172"
      opacity=".4"
    />
    <path
      stroke="#ff9800"
      stroke-width="119.5062"
      d="M265 896.6255c435 0 435-62.6749 870-62.6749"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="90.535"
      d="M265 431.1934c435 0 435 174.609 870 174.609"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="90.535"
      d="M265 340.6584c435 0 435-68.9712 870-68.9712"
      opacity=".4"
    />
    <path stroke="#81c784" stroke-width="74.2387" d="M265 57.1193h870" opacity=".4" />
    <path
      stroke="#ff9800"
      stroke-width="74.2387"
      d="M265 799.753c435 0 435-311.6872 870-311.6872"
      opacity=".4"
    />
    <path
      stroke="#4caf50"
      stroke-width="14.4856"
      d="M265 250.9053c435 0 435 302.3869 870 302.3869"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="10.8642"
      d="M265 99.6708c435 0 435 440.9465 870 440.9465"
      opacity=".4"
    />
    <path
      stroke="#9e9e9e"
      stroke-width="9.0535"
      d="M265 748.107c435 0 435 167.3663 870 167.3663"
      opacity=".4"
    />
    <path
      stroke="#4caf50"
      stroke-width="3.6214"
      d="M265 259.9588c435 0 435 649.177 870 649.177"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="1.8107"
      d="M265 272.6749c435 0 435-48.9712 870-48.9712"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="1.8107"
      d="M265 979.0947c435 0 435-82.675 870-82.675"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="1.8107"
      d="M265 967.284c435 0 435-72.675 870-72.675"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="1.8107"
      d="M265 284.4856c435 0 435-58.9712 870-58.9712"
      opacity=".4"
    />
  </g>
  <path fill="#2196f3" d="M1135 20h15v505.1852h-15z" />
  <path fill="#81c784" d="M250 20h15v85.1029h-15z" />
  <path fill="#81c784" d="M250 966.3786h15v1.8107h-15z" />
  <path fill="#4caf50" d="M250 115.1029h15v146.6667h-15z" />
  <path fill="#64b5f6" d="M1135 907.3251h15V920h-15z" />
  <path fill="#2196f3" d="M1135 535.1852h15v362.1399h-15z" />
  <path fill="#e0e0e0" d="M250 283.5802h15v1.8107h-15z" />
  <path fill="#e0e0e0" d="M250 295.3909h15v181.07h-15z" />
  <path fill="#e0e0e0" d="M250 978.1893h15V980h-15z" />
  <path fill="#e0e0e0" d="M250 271.7695h15v1.8107h-15z" />
  <path fill="#9e9e9e" d="M250 486.4609h15v266.1728h-15z" />
  <path fill="#ff9800" d="M250 762.6337h15v193.7449h-15z" />
  <g font-family="sans-serif" font-size="11">
    <text x="271" y="62.5514" dy=".35em"
      >Accel - MS 1<tspan fill-opacity=".7">&nbsp;(47)</tspan></text
    >
    <text x="271" y="188.4362" dy=".35em"
      >Accel - My MS<tspan fill-opacity=".7">&nbsp;(81)</tspan></text
    >
    <text x="271" y="272.6749" dy=".35em"
      >Non-accel - MS 2<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="271" y="284.4856" dy=".35em"
      >Non-accel - MS 3<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="271" y="385.9259" dy=".35em"
      >Non-accel - MS 1<tspan fill-opacity=".7">&nbsp;(100)</tspan></text
    >
    <text x="271" y="619.5473" dy=".35em"
      >Non-accel - My MS<tspan fill-opacity=".7">&nbsp;(147)</tspan></text
    >
    <text x="271" y="967.284" dy=".35em"
      >Accel - MS 4<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="271" y="979.0947" dy=".35em"
      >Non-accel - MS 4<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="1129" y="272.5926" dy=".35em" text-anchor="end"
      >AP - My HS<tspan fill-opacity=".7">&nbsp;(279)</tspan></text
    >
    <text x="1129" y="716.2551" dy=".35em" text-anchor="end"
      >Non-AP - My HS<tspan fill-opacity=".7">&nbsp;(200)</tspan></text
    >
    <text x="1129" y="913.6626" dy=".35em" text-anchor="end"
      >Non-AP - Other HS<tspan fill-opacity=".7">&nbsp;(7)</tspan></text
    >
    <text x="271" y="859.5062" dy=".35em"
      >Unknown/Transfer<tspan fill-opacity=".7">&nbsp;(107)</tspan></text
    >
  </g>
</svg>
<p>
  Going to high school clearly removed some of and diluted the rest of the friends I had in
  acceleration. This graph isn't even showing those who left the school system instead of going to
  high school, who the system still believes to be attending middle school.
</p>

<br />

<p>
  What about more systemic things, like the number of different classes, and the number of teachers
  and sections per class? Can these explain why I don't share many classes with anyone? Well, the
  ways these change from <span
    class="inline-flex items-center gap-1 text-[color-mix(in_oklab,var(--m3c-primary),var(--m3c-primary-container-subtle)_20%)]"
  >
    <span class="w-3 h-3 rounded-full bg-primary-container-subtle"></span>
    middle school
  </span>
  to
  <span class="inline-flex items-center gap-1 text-primary">
    <span class="w-3 h-3 rounded-full bg-primary"></span>
    high school
  </span>
  literally inhibit <a href="https://en.wikipedia.org/wiki/Homophily">homophily</a>: two people who
  both want to take a similar class might end up in different classes taught by different teachers
  at different times of the day.
</p>
{#snippet bars(one: number, two: number)}
  {@const max = Math.max(one, two)}
  <div class="flex h-32 gap-2 items-end">
    <div style:height="{(one / max) * 100}%" class="bar one">{one}</div>
    <div style:height="{(two / max) * 100}%" class="bar two">{two}</div>
  </div>
{/snippet}
<div class="grid gap-4 grid-cols-4 not-prose leading-5">
  <div class="flex flex-col gap-2">
    {@render bars(43, 184)}
    <p class="text-center">Class options</p>
  </div>
  <div class="flex flex-col gap-2">
    {@render bars(3, 12)}
    <p class="text-center">Math teachers (est)</p>
  </div>
  <div class="flex flex-col gap-2">
    {@render bars(2, 10)}
    <p class="text-center">Sections for one English class</p>
  </div>
  <div class="flex flex-col gap-2">
    {@render bars(53, 50)}
    <p class="text-center">Length of a class</p>
  </div>
</div>

<br />

<p>
  I would definitely not say that I had fun in high school and that I belonged. These were some of
  my worst years.
</p>
<p>
  To riff on Alvin's "complaints from middle schoolers": Humans are social animals, and when you go
  to a megaschool there's a whole domino effect that makes you lose your sense of order and
  belonging. But the architecture is also a little hostile, peers are a little toxic, and we don't
  <em>do things</em> or <em>care</em> in the same way we did in middle school.
</p>

<style>
  .data-table {
    table-layout: fixed;
    width: 100%;
  }
  .bar {
    display: flex;
    flex-grow: 1;
    align-items: start;
    justify-content: center;
    border-radius: 0.5rem;
    &.one {
      background-color: var(--m3c-primary-container-subtle);
      color: var(--m3c-on-primary-container-subtle);
    }
    &.two {
      background-color: var(--m3c-primary);
      color: var(--m3c-on-primary);
    }
  }
</style>
