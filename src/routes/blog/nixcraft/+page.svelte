<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
  import nixcraft1 from "./nixcraft1.png";
  import nixcraft2 from "./nixcraft2.png";
  import nixcraft3 from "./nixcraft3.png";
</script>

<BlogHeader {bg} title="Why I don't like nixCraft" />
<p>
  I should first clarify what nixCraft is. nixCraft looks like and acts like a corporation, but it's
  just one Indian guy, Vivek Gite. He calls himself nixCraft everywhere.
</p>
<p>
  He also has a big ego, as you'll quickly find if you do some research. nixCraft has many sites,
  and his
  <a href="https://www.vivekgite.com/">personal site</a>
  is braggadocious, mostly consisting of "I was around back then", "I have xxx,xxx followers", "I was
  cited in a book", etc.
</p>
<p>
  This is funny as nixCraft's content isn't very original. Let's look through what nixCraft has
  actually made.
</p>

<h2>The main site</h2>
<p>
  The site that nixCraft calls nixCraft, cyberciti.biz, actually isn't that bad. It's just low
  quality.
</p>
<p>
  It seems nixCraft finds interesting topics, does a little searching, and writes an article. This
  happens about every month but used to be much more often. These articles often have poor grammar,
  small width, and a lot of ads, but they can be useful as references.
</p>
<p><em>Do these ads comply with ad standards?</em></p>
<p>
  They barely pass Better Ads, since the pop up ads only happen after inactivity, ad density in
  content is around 20%, and sticky ads are around 12% height.
</p>
<p>
  They fail Acceptable Ads in two ways: they fade into the content and they're slightly too tall.
</p>

<h2>Skimming: Opensource Flare</h2>
<p>
  Opensource Flare is a site with members-only guides. I have no interest in giving nixCraft any
  money - I'm not that much of an investigative journalist. However, from what's public, the quality
  is dubious.
</p>
<p>
  Its subheading is "Patreon members-only guides from nixCraft", which would have you assume that
  you have to subscribe to read these articles. There's also a big box describing these guides as
  "premium". Both of these claims are arguably false, as 9 out of 11 of the articles shown are also
  available on the main site, and many of these articles have poor grammar (just like Opensource
  Flare's own name).
</p>
<p>
  In other words, on Opensource Flare you pay to read low-quality, public articles. The language
  they use to try to get you to subscribe is therefore misleading. You know what else is misleading?
</p>

<h2>The socials</h2>
<p>nixCraft toots a lot with the goal of maximizing engagement. Let me show you what I mean.</p>
<img
  src={nixcraft1}
  alt="Alright, network wizards and packet-pushing sysadmins! Feeling brave this November? I dare you, double-dog dare you, to take the No NAT November challenge! Can you handle the raw, unadulterated terror of the public internet without your trusty NAT to hide behind? Will your Linux and Unix/Windows servers survive the exposure? Will your routers spontaneously combust? Only one way to find out! Ditch the NAT, embrace the chaos, and let's see if you make it to December in one piece!"
/>
<p>
  <strong>"No NAT November"</strong> is mostly harmless but low quality. Going beyond the AI-like
  writing and poor graphic design, this post is one of those that ask you to click a link, read an
  article, do a thing instead of adding anything valuable. What if nixCraft actually did this
  challenge? You would get an
  <a href="https://blog.infected.systems/posts/2024-12-01-no-nat-november/"
    >actually interesting blog post</a
  >
  to read.
</p>
<br />
<img
  src={nixcraft2}
  alt="Update: This is not a joke, Funko just called my mom x.com/itchio/status/1866239798... Let me guess , they filed a DMCA takedown request to hosting compnay. Then, scam and fraud report to the domain registrar using some shady AI company and now calling your mom. WTF?"
/>
<p>
  <strong>"Funko just called my mom"</strong> really lets you feel what it's like to read a nixCraft
  tutorial. The post only includes a few facts, while containing a fluctuating narrator and a lot of
  grammatical errors.
</p>
<br />
<img
  src={nixcraft3}
  alt="Microsoft Connected Experiences means they collect your Word and Excel files for AI training. Why not call it AI training? Why use such words? This is an unethical practice followed by a trillion-dollar corporation. How is this even legal? I am so glad that I don't have Windows OS or MS office."
/>
<p>
  <strong>"Microsoft is training on Office data"</strong> is really misleading and actually what drove
  me to write this article. To keep it short, nixCraft radicalized one of my friends against AI. It must
  have been a very thorough transfer of belief, as both of them hate Microsoft, take social media posts
  as fact, and still love using ChatGPT.
</p>
<p>
  This claim is unlikely in the first place (people use Word to handle private data, if this was
  real stuff would get really bad). It's also just not true. Here's the big quote that disproves
  this.
</p>
<blockquote>
  <p>
    Except for certain categories of users (see below) or users who have opted out, Microsoft uses
    data from Bing, MSN, Copilot, and interactions with ads on Microsoft for AI training. This
    includes anonymous search and news data, interactions with ads, and your voice and text
    conversations with Copilot. This data will be used to improve Copilot and our other products and
    services to create a better user experience for you and others.
  </p>
</blockquote>
<p>
  This is from
  <a href="https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/"
    >"Does Microsoft use my data to train AI models?"</a
  >. Office is notably not included in the list of products used to train AI.
</p>
<p>
  Even if Microsoft did train on Office, only folks using the free version would be included. Per
  <a href="https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/"
    >"What data is excluded from model training?"</a
  >:
</p>
<blockquote>
  <p>We do not train Copilot on data from:</p>
  <ul>
    <li>
      Our commercial customers, or any data from users logged into an organizational M365/EntraID
      account
    </li>
    <li>Users logged in with M365 personal or family subscriptions</li>
    <li>...</li>
  </ul>
</blockquote>

<h2>Overall</h2>
<p>
  I don't think nixCraft is evil. I do think they're running a content farm and aren't the kind of
  guy I'd want to be around. If I were to build a system to downrank low quality posts, I would
  definitely include their toots.
</p>
