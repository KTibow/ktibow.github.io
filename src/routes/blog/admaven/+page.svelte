<script module>
  export const title = "We probably shouldn't use AdMaven";
  export const date = "2024-02-03";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {title} {bg} />
<p>
  <strong
    >All opinions here are my own. Please contact me if there are any factually incorrect
    statements.</strong
  >
</p>
<p>
  AdMaven has been asking the ReVanced team if they would like to integrate their solution into
  <a href="https://revanced.app">revanced.app</a> for a long time now. It seems easy enough in theory
  - let the users see some ads before downloading and get some thousands of dollars monthly.
</p>
<p>But due to a couple factors, I don't think we should implement it. Here's why.</p>
<h2>1. It doesn't comply with Better Ads</h2>
<p>
  You might've heard of the
  <a href="https://www.betterads.org/standards/">Better Ads</a> standard. It's separate from the
  Acceptable Ads standard - Acceptable Ads is used by some adblockers, Better Ads is used by Chrome.
  Yup, Chrome <a href="https://support.google.com/chrome/answer/7632919">blocks intrusive ads</a>,
  and websites with intrusive ads get downranked on Google Search.
</p>
<p>
  So just what types of ads does AdMaven show? According to
  <a href="https://ad-maven.com/advertisers/">them</a>:
</p>
<ul>
  <li>Push notifications</li>
  <li>New tab popups</li>
  <li>Interstitials</li>
  <li>Banners</li>
</ul>
<p>
  But AdMaven says they have a ✨ <em>special</em> ✨ type of ad for download sites. They say we can
  check it out on MCPEDL. So of course, I investigate.
</p>
<ol>
  <li>Hitting download requires you to wait 5 seconds.</li>
  <li>Clicking "open link" the first time opens a random link.</li>
  <li>
    Click "open link" the second time and it works. Now you're on download page 2, electric
    boogaloo, with another 10 second countdown.
  </li>
  <li>Clicking "download" the first time opens another random link.</li>
  <li>
    Clicking "download" the second time opens the actual content, but it also opens a random link at
    the same time.
  </li>
</ol>
<p>
  Plus, some of the random links say "human verification". (Yes, the "set up notifications so we can
  spam you" type human verification.) In fact, on top.gg the entire ad system is called "human
  verification". In none of these cases does it actually help verify the user.
</p>
<p>
  Overall, this doesn't particularly seem like it complies with the Better Ads standard. At
  ReVanced, we have enough to worry with SEO already with many spam sites competing with us, and we
  don't need to be downranked for adding ads.
</p>
<h2>2. It's just a bad user experience</h2>
<p>
  Some simple math shows that we get around 10,000 downloads every day. If we change the current
  download system to take as long as MCPEDL's, that's 18 seconds * 10000 = 50 hours of wasted time
  every day. Every dollar we make from ads, we waste around an hour of people's time.
</p>
<p>
  This isn't a good idea because a. it's not ethical and b. it lowers our reputation to have a bad
  user experience.
</p>
<p>
  In fact, aside from the intentional waiting, using AdMaven means adding some big chunks of JS,
  which makes our pages take longer to load.
</p>
<h2>3. Most of our users use ad blockers anyway</h2>
<p>
  Given the audience of ReVanced, many people use ad blockers, so the amount of funding we get isn't
  going to be large.
</p>
<p>
  You might say "aren't most people on phones where ad blocking isn't as easy?", and that's a valid
  point, but it's not hard for people to change their DNS to one that blocks ads, or to use one of
  the many alternative browsers that can block ads.
</p>
<p>Overall, the money from AdMaven doesn't outweigh the problems it causes.</p>
