<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader title="Where's the modulepreloads in my SvelteKit app?" />
<p>
  They're in the headers. They're only forced into HTML if you're using <code
    >@sveltejs/adapter-static</code
  >
  - otherwise they ride in the <code>Link</code> header.
</p>
