<script module>
	export const title = "Why does Home Assistant run on port 8123";
	export const date = "2025-06-19";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} {title} />
<p>To be "less common" than port 8080.</p>
<p>As for the etymology... it's 8, then 123.</p>
<p>
  Source:
  <a href="https://github.com/home-assistant/core/commit/645513b6aef1e973306911d69c539b8d90587b93"
    >645513b</a
  >
</p>
