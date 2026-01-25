<script module>
	export const title = "How I published 165 icon sets to NPM";
	export const date = "2023-12-14";
</script>

<script>
  import xml from "svelte-highlight/languages/xml";
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
</script>

<BlogHeader {date} {title} />
<h2>Problem</h2>
<ul>
  <li>
    <p>
      Iconify is a great collection of all sorts of icon sets. It's used by all sorts of libraries.
    </p>
  </li>
  <li>
    <p>
      I love to use these icons in my apps by embedding the raw SVGs. I could do this with something
      like
    </p>
    <Snippet
      language={xml}
      code={`<${""}script>
  import iconAdd from "@iconify-icons/ic/add";
  import Icon from "$lib/Icon.svelte";
</${""}script>
<Icon icon={iconAdd} />`}
    />
    <p>
      This is the best way because it results in the smallest bundle sizes, while preventing flashes
      while the icons are loading.
    </p>
  </li>
  <li>
    <p>But recently Iconify seems to have taken a tyrade against importing raw SVGs.</p>
    <ul>
      <li>
        They say that you should use the web component instead of your framework-specific component.
        This makes it impossible to ship the icon before JS loads, requiring a flash while the icons
        are still loading.
      </li>
      <li>
        They updated the Svelte exports so that it's no longer possible to access the built in
        OfflineIcon, which bundles smaller than the Icon component.
      </li>
      <li>
        They
        <a href="https://iconify.design/docs/icons/icons">deprecated</a>
        the packages with raw SVGs, forcing you to use another method to get updated icons. This is the
        subject of today's post, because I still want to use these.
      </li>
    </ul>
  </li>
</ul>
<h2>Hiccups along the way</h2>
<p>
  The first major problem I had was that the docs for libnpmpublish are incorrect in how to pass the
  token. It doesn't help that NPM has unintuitive error codes, but I found the solution:
  <a href="https://github.com/npm/cli/issues/4250">using <code>forceAuth</code></a>.
</p>
<p>
  The next one was setting the version - some icon sets have
  <code>info.version</code>, some don't. Some have
  <code>lastUpdated</code>, some don't. I ended up 1. skipping sets with 0 icons 2. using version if
  there 3. if not, convert lastUpdated to a semver-esque version.
</p>
<h2>Solution</h2>
<a
  href="https://github.com/KTibow/to-icon-sets"
  class="p-4 bg-primary-container text-on-primary-container rounded-[1.5rem] block no-underline"
>
  <b>to-icon-sets</b><br />GitHub
</a>
<p>Use GitHub Actions to host the following process:</p>
<ul>
  <li>Download JSON icon data from Iconify</li>
  <li>Use <code>@iconify/tools</code> to convert them to packages</li>
  <li>
    Publish them on NPM as <code>@ktibow/iconset-&lt;name&gt;</code>
  </li>
</ul>
<p>
  This means that as soon as Iconify gets updates, our packages will get updates near-automatically.
</p>
<p>
  Warning: As of publication, a few sets are broken because I can't publish them for 24 hours since
  I unpublished them before. These will fix themselves soon.
</p>
