<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="Unlinking Zigbee devices (Aurora)" />
<p class="font-italic">
  This post is very specific, as to hopefully reach anyone with the exact same problem.
</p>
<h2>Problem</h2>
<p>
  I bound my Lutron Aurora to an outside light, and I can't unbind it. I've tried resetting the
  Aurora multiple times, and unbinding the light using ZHA, but it stays bound. I want to use it to
  control inside lights, not outside lights, so this makes it unusable.
</p>
<h2>Process</h2>
<p>
  Get <a href="https://github.com/mdeweerd/zha-toolkit">ZHA Toolkit</a>. It's the way to understand
  bindings and groups.
</p>
<p>Check the bindings for both the controller and the light.</p>
<p>Discover that while they aren't directly bound, they ended up in the same group!</p>
<h2>Solution</h2>
<p>
  Use <code>zha_toolkit.remove_all_groups</code> on the light. Now the Aurora no longer controls the
  outside light.
</p>
