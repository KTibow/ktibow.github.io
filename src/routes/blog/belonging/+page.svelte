<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.svg";
</script>

<BlogHeader {bg} title="On belonging" />
<p>
  I recently read Alvin Chang's article <a href="https://pudding.cool/2025/02/middle-school/"
    >The Middle Ages</a
  >. I strongly agree that your sense of belonging depends on your environment, but I believe
  there's nothing inherently bad about middle schools.
</p>

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
      belong?" that Panorama asked doesn't capture this at all.
    </p>
    <p class="mb-0">
      The definition of belonging might change from year to year or student to student too. Does it
      mean that you identify with your school? You feel like you have a place? Your peers treat you
      with respect? Your teachers like you?
    </p>
  </aside>
</div>
<p>
  There are a few models of middle schools, and not all are bad for belonging. Some from other
  countries have stable cohorts, some even pinning the teacher! I personally went to a school that
  had a gifted program (which I'll refer to as acceleration), which had a side effect of giving me a
  mostly stable cohort.
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
      stroke="#4caf50"
      stroke-width="254.5473"
      d="M265 425.4835c435 0 435-115.2263 870-115.2263"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="161.1523"
      d="M265 112.4074c435 0 435-10 870-10"
      opacity=".4"
    />
    <path
      stroke="#ff9800"
      stroke-width="120.8642"
      d="M265 836.461c435 0 435-24.5063 870-24.5063"
      opacity=".4"
    />
    <path
      stroke="#4caf50"
      stroke-width="115.3704"
      d="M265 610.4424c435 0 435 83.395 870 83.395"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="95.2263"
      d="M265 240.5967c435 0 435 347.9424 870 347.9424"
      opacity=".4"
    />
    <path
      stroke="#ff9800"
      stroke-width="75.0823"
      d="M265 738.4877c435 0 435-261.5844 870-261.5844"
      opacity=".4"
    />
    <path
      stroke="#9e9e9e"
      stroke-width="23.8066"
      d="M265 952.6029c435 0 435-60.9877 870-60.9877"
      opacity=".4"
    />
    <path
      stroke="#9e9e9e"
      stroke-width="10.9877"
      d="M265 935.2058c435 0 435-409.7737 870-409.7737"
      opacity=".4"
    />
    <path
      stroke="#4caf50"
      stroke-width="10.9877"
      d="M265 673.6214c435 0 435 249.0535 870 249.0535"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="7.3251"
      d="M265 916.0494c435 0 435-40 870-40"
      opacity=".4"
    />
    <path
      stroke="#e0e0e0"
      stroke-width="5.4938"
      d="M265 909.64c435 0 435-392.4486 870-392.4486"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="3.6626"
      d="M265 978.1687c435 0 435-72.819 870-72.819"
      opacity=".4"
    />
    <path
      stroke="#9e9e9e"
      stroke-width="1.8313"
      d="M265 965.4218c435 0 435-36.3374 870-36.3374"
      opacity=".4"
    />
    <path
      stroke="#81c784"
      stroke-width="1.8313"
      d="M265 690.0309c435 0 435-251.5844 870-251.5844"
      opacity=".4"
    />
    <path stroke="#81c784" stroke-width="1.8313" d="M265 20.9156h870" opacity=".4" />
  </g>
  <path fill="#2196f3" d="M1135 20h15v510.9259h-15z" />
  <path fill="#81c784" d="M250 20h15v1.8313h-15z" />
  <path fill="#81c784" d="M250 31.8313h15v256.3786h-15z" />
  <path fill="#81c784" d="M250 976.3374h15V980h-15z" />
  <path fill="#81c784" d="M250 689.1152h15v1.8313h-15z" />
  <path fill="#4caf50" d="M250 298.2099h15v380.9053h-15z" />
  <path fill="#64b5f6" d="M1135 917.1811h15V930h-15z" />
  <path fill="#2196f3" d="M1135 540.9259h15V907.181h-15z" />
  <path fill="#e0e0e0" d="M250 906.893h15v12.8189h-15z" />
  <path fill="#9e9e9e" d="M250 929.7119h15v36.6255h-15z" />
  <path fill="#ff9800" d="M250 700.9465h15V896.893h-15z" />
  <g font-family="sans-serif" font-size="11">
    <text x="271" y="20.9156" dy=".35em"
      >Accel - MS 1<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="271" y="160.0206" dy=".35em"
      >Accel - MS 2<tspan fill-opacity=".7">&nbsp;(140)</tspan></text
    >
    <text x="271" y="488.6626" dy=".35em"
      >Accel - My MS<tspan fill-opacity=".7">&nbsp;(208)</tspan></text
    >
    <text x="271" y="690.0309" dy=".35em"
      >Accel - MS 3<tspan fill-opacity=".7">&nbsp;(1)</tspan></text
    >
    <text x="271" y="798.9198" dy=".35em"
      >Unknown/Transfer<tspan fill-opacity=".7">&nbsp;(107)</tspan></text
    >
    <text x="271" y="913.3025" dy=".35em"
      >Non-accel - MS 2<tspan fill-opacity=".7">&nbsp;(7)</tspan></text
    >
    <text x="271" y="948.0247" dy=".35em"
      >Non-accel - My MS<tspan fill-opacity=".7">&nbsp;(20)</tspan></text
    >
    <text x="271" y="978.1687" dy=".35em"
      >Accel - MS 4<tspan fill-opacity=".7">&nbsp;(2)</tspan></text
    >
    <text x="1129" y="275.463" dy=".35em" text-anchor="end"
      >AP - My HS<tspan fill-opacity=".7">&nbsp;(279)</tspan></text
    >
    <text x="1129" y="724.0535" dy=".35em" text-anchor="end"
      >Non-AP - My HS<tspan fill-opacity=".7">&nbsp;(200)</tspan></text
    >
    <text x="1129" y="923.5905" dy=".35em" text-anchor="end"
      >Non-AP - Other HS<tspan fill-opacity=".7">&nbsp;(7)</tspan></text
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
  and sections per class? The ways these change from <span
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
