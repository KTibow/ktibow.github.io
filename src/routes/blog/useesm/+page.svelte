<script module>
  export const date = "2024-11-08";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {bg} title="Rant: Why aren't you using ESM" />

<p>
  I'll start this post by saying that I know there are alternatives, like Deno. They're great, and I
  use Deno for one project since it's more convenient to than not. However, I'm really used to Node,
  and switching is hard (no <code>package.json</code> to publish with, some packages like Vite don't
  work, and I have to pass allow flags to run code).
</p>
<p>
  The thing is that a lot of people and tools default to non-ESM syntax and it's really annoying.
</p>
<p>
  Every time I create a new project, I have to set
  <code>&lbrace; "type": "module" &rbrace;</code> in <code>package.json</code>. Sometimes I have to
  then reload my IDE for it to give ESM-style recommendations.
</p>
<p>
  If I'm compiling my code with <code>esbuild</code> (awesome tool), I have to also explicitly tell it
  to use ESM syntax.
</p>
<p>
  Okay. I set up everything to use ESM. Am I done? No. A lot of LLMs and other help resources use <code
    >require</code
  > in their code and I have to manually fix it.
</p>
<p>
  Plus, there are some places where I can't even use ESM, like (IIRC) Khan Academy, any old
  codebase, or many other places that have stupid configurations.
</p>
<br />
<p>
  Everything that isn't ESM is really old and has no reason to exist in this day and age. If I
  could, I would purge it from all of the past and present world.
</p>
<p>
  <em
    >Also see: ranting about
    <a href="/blog/hafrontend/">how the Home Assistant frontend uses Gulp and 100 NPM packages</a
    ></em
  >
</p>
