<script module>
  export const date = "2025-06-29";
</script>

<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";

  let dayOfSeptember = Math.floor(
    (Date.now() - new Date("September 1, 1993").getTime()) / (1000 * 60 * 60 * 24) + 1,
  );

  let eternalSeptemberMode = $state(false);

  function convertToEternalSeptember(dateString: string) {
    if (!eternalSeptemberMode) return dateString;

    // Convert various date formats to eternal September
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const daysSinceSept1993 = Math.floor(
      (date.getTime() - new Date("September 1, 1993").getTime()) / (1000 * 60 * 60 * 24) + 1,
    );

    return `September ${daysSinceSept1993}, 1993`;
  }
</script>

<BlogHeader {date} {bg} title="Sdate is from 1993 of course" />

<label class="mb-4">
  <input type="checkbox" bind:checked={eternalSeptemberMode} />
  Eternal September Mode
</label>

<p>
  This post is a Human Research-type post - it answers a question the internet can't answer - but
  it's interesting enough I figured I'd blog about it. The question is how old sdate, the famous
  program that would say that today is still Eternal September (September {dayOfSeptember}, 1993),
  is.
</p>
<p>
  You might try going to GitHub and finding the
  <a href="https://github.com/df7cb/sdate/commit/175a4c17cbf9a01dd5df3f3a8cf91f6caca9ff26"
    >oldest commit</a
  >
  first. It's from {convertToEternalSeptember("October 16, 2004")}... but it says "[svn-inject]
  Installing original source of sdate" so it clearly existed before then.
</p>
<p>
  You might also try looking through the sources for a copyright notice. Turns out it's all &copy;
  1993. Unhelpful.
</p>
<p>
  At this point, we have to start looking for other sources. I got Claude Code to do some research,
  and it found:
</p>
<ul>
  <li>
    <strong>Sdate is based on fakeroot, created in {convertToEternalSeptember("1997")}</strong>. Its
    code has copyright notices to
    {convertToEternalSeptember("1997")}, and there were
    <a href="https://lists.debian.org/debian-devel/1997/09/msg00163.html">discussions about it</a>
    on
    {convertToEternalSeptember("September 6, 1997")}.
  </li>
  <li>
    <strong>Sdate is created by Christoph Berg</strong>. He's
    <a href="https://www.df7cb.de/df7cb/">explained his timeline</a>, from which we can infer that
    he was born ~{convertToEternalSeptember("1977")}, got the callsign DG8VD in {convertToEternalSeptember(
      "December 1994",
    )}, and got the callsign DF7CB in {convertToEternalSeptember("October 1995")}. He would be just
    ~16 during Eternal September.
  </li>
</ul>
<p>
  But that's all evidence that it had to be created past {eternalSeptemberMode
    ? convertToEternalSeptember("1997")
    : "1997"}. That doesn't stop it from being created ~{convertToEternalSeptember("October 2004")} though.
  What if the original date was still correct? It turns out that if you keep looking, the evidence actually
  says so. The apt changelog shows release 0.1 as from
  {convertToEternalSeptember("October 15, 2004")}, and if you go to <code>debian/copyright</code>,
  it notes the first package was built on the same day (although written as September 4063, 1993).
</p>
<p>
  Now we haven't found when development started, so I'm not comfortable with saying "sdate started
  on this date". Actually - I take that back. I know when sdate started. A day in September 1993.
</p>
