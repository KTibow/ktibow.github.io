<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="What Do You Do When Cloudflare Pages Gets Blocked?" />
<p>
  Cloudflare Pages is an absolutely awesome platform. Thanks to Cloudflare's customers, it's
  completely subsidized, and provides generous static and dynamic hosting. I host almost all my
  SvelteKit projects on it, and when combined with SvelteKit's prefetching, it is incredibly fast.
</p>
<p>
  However, recently my district blocked Cloudflare Pages for being a "games" site. At the same time,
  other static hosting sites are unblocked. This is unjust: "bad actors" (kids who want to play
  games) can simply make more GitHub Pages while I have to find new hosting platforms. I've tried to
  argue this point to no avail, so it's time to make sure I can access my projects from school.
</p>
<h2>What Other Platforms Can I Use?</h2>
<ul>
  <li>GitHub Pages (limited to static stuff)</li>
  <li>Fly</li>
  <li>Azure App Service</li>
  <li>Azure Functions (limited to dynamic stuff)</li>
  <li><span style="font-family: Redacted Script">Rti</span> (limited to dynamic stuff)</li>
  <li>
    <span style="font-family: Redacted Script">Cmersio</span> (possibly used as
    <span style="font-family: Redacted Script">blotyr</span>)
  </li>
</ul>
<h2>How Will My Public-Ish Dynamic-Ish Projects Work?</h2>
<p>
  After an awful lot of ideating, I've decided to move certain, more useful projects to my GitHub
  Pages. They'll make cross origin calls to servers to load data when needed. This is the fastest,
  cheapest, and most sustainable option.
</p>
<p>
  I decided to use Azure Functions, which has the drawback of having terrible logging. If you're
  ever in my shoes, things will be a lot easier if you use the CLI directly and include the word
  "pnpm" in your queries about why functions aren't showing up.
</p>
<h2>How Will My Private Projects Work?</h2>
<p>You won't know.</p>
<h2>2025 update</h2>
<p>GitHub Pages got blocked too :/</p>
<p>I've switched to another static hosting provider. It actually wasn't in my original list.</p>
