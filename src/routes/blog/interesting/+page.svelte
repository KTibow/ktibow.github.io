<script module>
  export const date = "2025-03-07";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {bg} title="Almost 32% of 2FA codes are interesting" />
<p>
  Today on HN, <a
    href="https://blog.jacobstechtavern.com/p/building-a-2fa-app-that-detects-patterns"
    >a post by Jacob Bartlett</a
  > came up. He made an app that lets you know if your 2FA codes have interesting patterns, like repeated
  numbers or digits, resembling well known numbers, or being palindromic. This made me wonder how many
  more you could count by using a larger list of interesting numbers.
</p>
<p>
  My data source was <a href="https://oeis.org">OEIS</a>, a catalog of 381k different sequences of
  integers. Combined, they include 16.8m numbers (1.9m unique). It's worth noting that you shouldn't
  check whether each individual number is in the set - it's much more efficient to filter the list.
</p>
<p>
  It turns out there are 319318 unique interesting numbers from 000000 to 999999. On average, each
  one is interesting in 4.5 ways (excluding numbers under 10).
</p>
<p>Let me know if you build something with this.</p>
