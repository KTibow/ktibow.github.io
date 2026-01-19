<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="A world where private keys caught on" />
<p>
  <em
    >Disclaimer: I only have a surface level understanding of cryptography, and some of it came from
    LLMs. What I believe is possible might be incorrect.</em
  >
</p>
<p>
  You go to google.com. It asks for you to sign in, and you say yes, but it doesn't ask for an email
  or password. Instead, you get a permission prompt, as if it were trying to use your camera. You
  hit confirm again. From this point on, every request on google.com is signed with a key derived
  from a persona key derived from from your main private key (stored in a separate chip that only
  talks with devices it trusts), with the text "google.com".
</p>
<p>
  You don't have Gmail, but you have Gstr, Google's Nostr relay and client combo. Gstr's default
  message intelligence features are more private than you might expect. They figured out how to do
  most classification and chatting locally, but they try to switch you to the option where the
  embeddings are sent to Google and where you use Gemini instead of Gemma.
</p>
<p>
  Instead of each website setting up SPF/DKIM/DMARC and its own email servers, linking a persona to
  a website works like how you link a website to a social media account: just place a file or DNS
  record listing the IDs of all linked personas.
</p>
<p>
  What about cross device key sync? Every hardware module can broadcast a public key that was signed
  by its maker, so hardware modules can directly talk and transfer personas even over untrusted
  connections.
</p>
<p>
  What about cross device data sync? If you're uploading data to Google Drive, it's automatically
  encrypted with your "drive.google.com" key. Same goes for any other app, or even whole operating
  systems.
</p>
<h2>Do passkeys solve this?</h2>
<p>
  Only the encryption part. Something called PRF exists - sites could derive a new key based on your
  passkey every time you log in. But this means a compromised browser extension could steal all your
  keys if the derived key is cached, and the identity/syncing part of it is underdeveloped. Not to
  mention that email is going to be stuck in the past forever.
</p>
