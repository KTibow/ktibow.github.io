<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import pleasureseeker from "./pleasureseeker.mp3";
  import pastamasta from "./pastamasta.opus";
  import loafboiRaw from "./loafboi_raw.wav";
  import loafboiEdit1 from "./loafboi_edit1.wav";
  import loafboiEdit2 from "./loafboi_edit2.wav";
  import notbehdRaw from "./notbehd_raw.mp3";
  import notbehdEdit from "./notbehd_edit.wav";
  import gliitchakeRawest from "./gliitchake_rawest.wav";
  import gliitchakeRaw1 from "./gliitchake_raw1.wav";
  import gliitchakeRaw2 from "./gliitchake_raw2.wav";
  import gliitchakeEdit from "./gliitchake_edit.wav";
</script>

<BlogHeader title="Listen to the raw vocals from Phantasmagoria" />
<p>
  Mr. Bill messes a lot with the vocals in Phantasmagoria. Here you can hear the raw ones, so you
  can remember them for what they are.
</p>
<p>
  <em
    >Sorry for paying nothing for the project files Mr. Bill, don't have that much cash to spare
    unfortunately.</em
  >
</p>
<h2>Pleasure Seeker</h2>
<p>
  Turns out this samples <a href="https://www.youtube.com/watch?v=7ZXeCNUb75U"
    >R. Kelly - Number One</a
  >; fitting. "Come First" is around 2:48 in YouTube and 2:01 in the version used here.
</p>
<audio src={pleasureseeker} controls></audio>

<div class="bar">
  <h2>Too Complicated</h2>
  <p>Lots of "too complicated" - no project file though :(</p>
</div>

<h2>Pasta Masta</h2>
<p>
  The sample is called "Freeze Reggae Vox". I can't understand what's being said - if you can, DM me
  and I'll add it.
</p>
<audio src={pastamasta} controls></audio>

<div class="bar">
  <h2>Useless & Nasty</h2>
  <p>Lots of "useless and" - no project file though :(</p>
</div>

<div class="bar">
  <h2>Slaptivism</h2>
  <p>This one is really good - sucks that there's no project file :(</p>
</div>

<h2>Loaf Boi</h2>
<p>
  This one got stuck in my head and is the reason this all started. The vocal's from
  <a
    href="https://splice.com/sounds/sample/6401c4807dcd06f61dfb8019a26e4a7c8a6b64786170a6bdb4fdc6d350b033c7/audentity-rnb-vocals-female-dry-rnb-sample"
    >Splice</a
  >.
</p>
<p>Raw:</p>
<audio src={loafboiRaw} controls></audio>
<p>Edited (second one came 8 months after the first one):</p>
<audio src={loafboiEdit1} controls></audio>
<audio src={loafboiEdit2} controls></audio>

<div class="bar">
  <h2>2020</h2>
  <p>This one is really good - sucks that there's no project file :(</p>
</div>

<h2>Not Behd</h2>
<p>
  To refine the incorrect "not bad, good voice" into the more accurate "not bad, good size", you
  need to turn audio to an image to video to a meme to a human being.
  <a
    href="https://www.vice.com/en/article/not-behd-good-size-went-viral-a-year-ago-mick-merhi-explains-how-his-life-has-changed/"
    >Further reading is here.</a
  >
</p>
<p>Raw:</p>
<audio src={notbehdRaw} controls></audio>
<p>Edited:</p>
<audio src={notbehdEdit} controls></audio>

<h2>Gliitchake</h2>
<p>Rawest:</p>
<audio src={gliitchakeRawest} controls></audio>
<p>Raw:</p>
<audio src={gliitchakeRaw1} controls></audio>
<audio src={gliitchakeRaw2} controls></audio>
<p>Edited/frozen:</p>
<audio src={gliitchakeEdit} controls></audio>

<style>
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
    > * {
      margin: 0;
      color: inherit;
      font-weight: inherit;
      font-size: inherit;
      opacity: 0.5;
    }
  }
</style>
