<script module>
  export const date = "2024-11-21";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {bg} title="What I think of Zed" />
<p>I've had a few phases with Zed:</p>
<ul>
  <li>When it first came to Linux, I built it and tried it out</li>
  <li>When it got simpler to download, I tried it out again</li>
  <li>Then it became a working product, and I've been using it since</li>
</ul>
<p>
  It's been nice enough to keep using, although it lacks a few features. Here's what my experience
  has been like, grouped by sentiment.
</p>
<h2>The good</h2>
<p>
  Opening and closing Zed is <em>really</em> fast. Editing is fast too, and is a little smarter. For
  example, I don't have to hit F2 to update both sides of a XML-like tag.
</p>
<p>
  Zed connects to GitHub Copilot for autocomplete. Plus, Zed, GitHub Copilot, Anthropic, Gemini,
  OpenAI, Ollama, and any other OpenAI compatible server provide AI you can chat with in the
  sidebar.
</p>
<p>
  Zed also doesn't get blurry with fractional scaling or require a workaround I have to apply every
  time it updates.
</p>
<h2>The soon to come</h2>
<p>
  A Git/GitHub integration is coming soon. Since I can't be bothered to configure Git at a system
  level, right now, most of Git only works in Code. That means I have to open Code just to make a
  commit and push. The Code experience (where you need a bloaty extension to see and edit commit
  history) could definitely be improved on though.
</p>
<p>
  A Windows port is also coming soon. I don't use Windows at home, but I do at school, and I'd be
  happy to use Zed there.
</p>
<p>
  I like Codeium, an AI tool, but it doesn't work in Zed. I'm not sure if this is a Zed problem or a
  Codeium problem, but I hope it gets implemented soon. It's definitely faster than GitHub Copilot.
</p>
<p>
  Typo detection is another field where Zed could improve upon the Code experience. In Code, most of
  the extensions are a bit slow and have false positives. Spell checking could be a core feature.
</p>
<p>If you want to view <code>avif</code> files in Zed, you're out of luck (for now).</p>
<h2>And the bad</h2>
<ul>
  <li>Hotkeys: Zed uses ctrl+alt+o instead of ctrl+r</li>
  <li>Hotkeys: With ctrl+tab, Zed defaults to most recently used instead of left/right</li>
  <li>Svelte: auto imports are sometimes doubled up</li>
  <li>Svelte: quotes are doubled up even in plain text</li>
  <li>XML-like: while automatically updating tag names is nice, it can sometimes break things</li>
</ul>
