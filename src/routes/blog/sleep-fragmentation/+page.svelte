<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import hypnogramFigure from "./claude-hypnogram-figure.svg";
  import n3Lengths from "./n3-lengths.png";
  import appleView from "./apple_view.avif";
  import withingsView from "./withings_view.avif";
  import nothingView from "./nothing_view.avif";
  import ouraView from "./oura_view.avif";
  import changeCount from "./change-count.png";
  import transitionProbabilities from "./transition-probabilities.png";
  import hypnogram8000685 from "./hypnogram-8000685.png";
</script>

<BlogHeader title="Fragmentation and statistics in sleep" {bg} />
<div class="grid">
  <img src={appleView} alt="Apple Watch hypnogram" />
  <img src={withingsView} alt="Withings hypnogram" class="invert hue-rotate-180 object-cover" />
  <img src={nothingView} alt="CMF watch hypnogram" class="invert hue-rotate-180" />
  <img src={ouraView} alt="Oura hypnogram" class="object-cover" />
</div>
<p>
  You almost certainly recognize these timelines. They're officially called hypnograms and represent
  the sleep stages of one night.
</p>
<p>
  But if I download hypnograms from the internet (Sleep EDFX/ISRUC) and analyze them, even phases
  you would expect to be very long mostly occur in one or two epochs:
</p>
<img src={n3Lengths} alt="A histogram of N3 lengths" class="invert hue-rotate-180" />
<p>And individual hypnograms look more like this:</p>
<img src={hypnogramFigure} alt="A hypnogram" class="invert hue-rotate-180" />
<p>What is this? Sleep fragmentation.</p>
<br />

<p>
  Hypnograms that your sleep tracker show you are rough approximations. We don't actually have rigid
  cycles where each one is just 3 stages - we drift through the different stages of sleep throughout
  the night. In fact, these open hypnograms typically have over 100 different stage changes in one
  night:
</p>
<img
  src={changeCount}
  alt="A histogram of number of stage transitions per night"
  class="invert hue-rotate-180"
/>
<p>But to understand sleep fragmentation, you need to understand N1.</p>
<br />

<p>
  N1 is an abbreviation of NREM 1, which is an abbreviation of Non REM 1, which is a special kind of
  sleep. It's typically grouped into light sleep, but it's actually lighter than light sleep. You
  almost always start with N1 before going into any other sleep stage for the night.
</p>
<img
  src={transitionProbabilities}
  alt="A transition probability matrix"
  class="invert hue-rotate-180"
/>
<p>
  You can see from this matrix (Metzner) that you always start with N1, and most of the time start
  with N1 after being disturbed while sleeping. It also tells a different story though: one of N1 as
  a transitive phase.
</p>
<p>
  In fact, the hypnograms say that you typically have 40 distinct N1 stages every night (around 30%
  of the average distinct stage count), even though N1 is typically just one or two minutes and only
  makes up around 10% of your sleep. (No distribution graphs since this blog has enough images as
  is.)
</p>
<p>Maybe looking at some more hypnograms will help you understand the place of N1.</p>
<img src={hypnogram8000685} alt="A hypnogram" class="invert hue-rotate-180" />
<p>
  This hypnogram captures how humans sometimes randomly flip into N1. While sometimes it's related
  to falling back into sleep, other times it's just in the middle of light sleep.
</p>
<p>
  I honestly don't know why we have N1 throughout the night. (Send me a message if you know,
  contacts are on the <a href="/">homepage</a>.) But what I do know is that it breaks up your sleep
  in a way that sleep trackers don't tell you.
</p>
<br />

<p>
  From the perspective of a sleep tracking company, it makes sense to ignore N1. It would have you
  believe that most REM and deep stages are under 10 minutes (my data did!), and fragments your data
  and models in other ways. And the amount of N1 sleep you get isn't something people track.
</p>
<p>
  It doesn't quite sit right with me though. Your actual sleep is much more fragmented than your
  intuition or any sleep tracker would tell you, and you should know that.
</p>
<br />

<p>
  Further reading: <a href="/blog/sleep/">how it's hard to even guess hypnograms at a high level</a>
</p>
<p>
  Citing: Metzner, Claus & Schilling, Achim & Traxdorf, Maximilian & Schulze, Holger & Krauss,
  Patrick. (2021). Sleep as a random walk: a super-statistical analysis of EEG data across sleep
  stages. Communications Biology. 4. 1385. 10.1038/s42003-021-02912-6.
</p>

<style>
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .grid > img {
    margin: 0;
    width: 100%;
    max-height: 12rem;
    object-fit: cover;
  }
</style>
