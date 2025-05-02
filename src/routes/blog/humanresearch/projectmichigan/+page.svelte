<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import warning from "./warning.jpeg";
</script>

<BlogHeader title="What was Apple's Project Michigan" />
<p>
  It was Apple's internal codename for its compliance efforts relating to the Epic Games v. Apple
  court injunction. So this was about allowing purchase links in apps. The drama is that they put
  this big warning screen up:
</p>
<img
  src={warning}
  alt="You're about to leave the app and go to an external website. Apple is not responsible for the privacy or security of purchases made on the web."
/>
<p>
  Sources: <a
    href="https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf"
    >Epic Games v. Apple Order Enforcing Injunction</a
  >, <a href="https://x.com/TimSweeneyEpic/status/1747408148799881390">Tim Sweeney tweet</a>
</p>
