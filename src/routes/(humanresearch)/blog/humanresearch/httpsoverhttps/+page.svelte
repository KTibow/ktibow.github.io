<script module>
	export const title = "HTTPS over HTTP(S) is not possible";
	export const date = "2025-09-14";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} {title} />
<p>
  Say you want to make a CORS proxy that can't see what it's passing through. It seems the norm is
  to use Wisp or similar over WebSockets, but that seems bloated. In the woke year of 2025, surely
  we can proxy a request without WebSockets or complicated transports? Surely <code>fetch</code> can
  do the trick?
</p>
<p>
  Unfortunately, no - WebSockets aren't only for minimizing overhead. HTTP requires you to send the
  full request before getting a response (what they call half duplexing). No full duplexing means no
  TLS means no HTTPS. This is even true for HTTP 2 and 3 if you're in a browser, because <a
    href="https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests"
    >as Jake Archibald notes,</a
  > "receiving the response while you're still sending the request [...] isn't supported by any browser."
</p>
