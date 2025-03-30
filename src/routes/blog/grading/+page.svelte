<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import graph from "./desmos-graph.svg";
</script>

<BlogHeader {bg} title="Grade math" />
<p>
  For a bit now I've been experimenting with grade math. That is, recalculating your grade,
  sometimes under different circumstances. Some of this got programmed into an internal app that
  analyzes your grades; today we're covering what didn't, or what's just interesting.
</p>
<h2>StudentVue has inaccurate percents</h2>
<p>
  StudentVue has odd and inconsistent rounding. Sometimes it rounds in your favor (eg 94.86% is
  shown as 95% and 93.63% is shown as 94%); but I've observed it rounding down for no good reason
  before.
</p>
<h2>StudentVue's "TOTAL" points are wrong (or at least misleading)</h2>
<p>
  In a class that uses weighted grading, StudentVue will let you view a grid. In the class we'll
  reference in this post, it looks something like this:
</p>
<table>
  <thead>
    <tr>
      <th>Assignment Type</th>
      <th>Weight</th>
      <th>Points</th>
      <th>Points Possible</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Assignments</td>
      <td>40%</td>
      <td>86.00</td>
      <td>86.00</td>
    </tr>
    <tr>
      <td>Projects</td>
      <td>60%</td>
      <td>96.00</td>
      <td>105.00</td>
    </tr>
    <tr>
      <td>TOTAL</td>
      <td>100%</td>
      <td>182.00</td>
      <td>191.00</td>
    </tr>
  </tbody>
</table>
<p>
  This gives you enough information to properly calculate your grade, like
  <math>
    <mn>0.4</mn>
    <mo>(</mo>
    <mfrac><mn>86</mn><mn>86</mn></mfrac>
    <mo>)</mo>
    <mo>+</mo>
    <mn>0.6</mn>
    <mo>(</mo>
    <mfrac><mn>96</mn><mn>105</mn></mfrac>
    <mo>)</mo>
  </math>. Note that this is not 182/191, as the TOTAL section would make you think. No, the TOTAL
  section is unweighted, and you need to weight the categories properly.
</p>
<h2>There is an objectively best place to put an assignment</h2>
<p>
  If you ever get the opportunity to choose which category an assignment goes in, whether it's extra
  credit or not, know that it shouldn't just go in your lowest category.
</p>
<p>
  You should instead find which category has the most % value per point. For example, in my
  reference class, one assignment point is worth
  <math>
    <mfrac><mn>1</mn><mn>86</mn></mfrac>
    <mo>*</mo>
    <mn>40%</mn>
  </math>, or <math><mn>0.47%</mn></math>, while one project point is <math><mn>0.57%</mn></math>.
  So in this class, extra credit should go in the projects category.
</p>
<p class="italic">
  If the assignment isn't extra credit, you should add the number of points to the category's
  possible points.
</p>
<h2>A point regained is an assignment earned</h2>
<img src={graph} alt="" />
<p>
  This is a graph showing the impact of points added on my grade. It's clear that red is linear and
  more efficient at increasing my grade, while blue shows a reciprocal relationship.
</p>
<h3>a point regained</h3>
<p>
  When you revise or turn in an existing assignment, or get extra credit, you directly increase your
  grade. This is linear, and reflected as the
  <span class="text-red-300">red</span> line in the graph.
</p>
<h3>an assignment earned</h3>
<p>
  When a new assignment goes in your grade, it squishes out other assignments in its category. This
  can be shown using bars.
</p>
<p>My grade:</p>
<div class="flex h-4 bg-neutral-800 rounded-full">
  <div class="bg-green-500 rounded-full" style="width: 94.86%"></div>
</div>
<div class="flex items-center gap-2">
  <div class="bg-green-500 w-4 h-4 rounded-full"></div>
  Points earned
  <div class="bg-neutral-800 w-4 h-4 rounded-full"></div>
  Points lost
</div>
<p>My grade, with a 40 point assignment:</p>
<div class="flex h-4 bg-neutral-800 rounded-full">
  <div class="bg-green-500 rounded-full" style="width: 79.72%"></div>
  <div class="bg-blue-500 rounded-full" style="width: 16.55%"></div>
</div>
<div class="flex items-center gap-2">
  <div class="bg-green-500 w-4 h-4 rounded-full"></div>
  Points earned
  <div class="bg-blue-500 w-4 h-4 rounded-full"></div>
  Assignment
  <div class="bg-neutral-800 w-4 h-4 rounded-full"></div>
  Points lost
</div>
<p>
  As you can see, the only reason it increases my grade is it squishing out points I lost. This is a
  reciprocal relationship, has diminishing returns, and is reflected as the
  <span class="text-blue-300">blue</span> line.
</p>
<p>
  Due to this, regaining points has much more of an effect on grades than adding assignments. To get
  my grade to 96%, you could either add 2 points, or add an assignment that is 30/30 points.
</p>
