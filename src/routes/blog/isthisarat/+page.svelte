<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader title="Is This A Rat has problems" />
<p class="font-bold">Background</p>
<ul>
  <li>
    <a href="https://isthisarat.com/">Is This A Rat</a> is a site made by Vytal where you can check
    if a jar is a rat using AI
  </li>
  <li>
    A rat refers to a Skyblock mod that lets the attacker log on to your Minecraft account,
    <a href="https://hypixel.net/threads/all-about-skyblock-account-stealing-part-ii.5231557/">
      see Angry's post for details
    </a>
  </li>
</ul>
<p>
  Problem 1: Is This A Rat uses AI. Actually the site has a hash database, but falls back to AI. We
  don't know what this AI does, but it has plenty of false positives and false negatives. Recently I
  asked him about it, and his approach seems to be security by obscurity, as all he would tell me is
  that it's an ensemble model.
</p>
<p>
  Problem 2: The UI. It had a old design until I made a PR with a new version. Then they messed with
  the UI again, adding hover styling where there shouldn't be, editing auto-generated code, and
  hiding the AI's confidence. There are some other confusing parts, like how it shows regex that
  match the jar (what does that mean? does it affect the score?) and how it once accepted discord
  servers for the Discord Link box.
</p>
<p>
  Problem 3: The community. Is This A Rat has a Discord where users can get files checked or just
  chat. If you lurk here you will find users confused by the AI and UI. Also a fair bit of drama
  happens. For example, take the story of the user Gute Nacht. They were once made malicious mods,
  then decided to go against ratting, and got the File Checker role. Then once they had some
  criticism about it they got banned. That's Vytal for you.
</p>
<p>
  Overall, the biggest problem is that Is This A Rat's AI can give incorrect results. This could
  lead to false accusations, or people getting their account stolen. Instead you should get manual
  checks (whether in IsThisARat's Discord or Vanta).
</p>
<p>
  You can also use tools that show you possible flags like
  <a href="https://ktibow.github.io/RatRater/">RatRater</a>
  <a href="https://ktibow.github.io/RatRater2/"> (or 2, which has less flags but better browsing)</a
  >. Compared to the other options, RatRater is not definitive. It gives you a list of possible
  flags to investigate. Whatever you do, just stay safe out there.
</p>
