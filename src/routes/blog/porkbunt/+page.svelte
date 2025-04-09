<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="porkbunt" />

<p>
  You probably already know that GoDaddy isn't the most wholesome company. There's a <a
    href="https://en.wikipedia.org/wiki/Controversies_surrounding_GoDaddy">Wikipedia page</a
  > about it. But today I learned they went so far as to make a phishing website.
</p>
<p>
  I'm talking about the one and only Porkbunt.com, designed to trick clients of the domain registrar
  Porkbun. I checked, and anyone who makes one of these typos will be phished:
</p>
<ul>
  <li>porknun.com</li>
  <li>pokrbun.com</li>
  <li>porkubn.com</li>
  <li>porkbnu.com</li>
  <li>porkbbun.com</li>
  <li>porkbunn.com</li>
  <li>porbun.com</li>
</ul>

<p>
  <em>Inspiration: <a href="https://x.com/thdxr/status/1909657328099426496">@thdxr tweet</a></em>
</p>

<p>
  <em>An alternate perspective:</em> While this is decieving, it's incorrect to describe it as
  phishing, as it has you create an account separate from Porkbun. It's just independently ran
  (ab)use of GoDaddy's <a href="https://www.godaddy.com/reseller-program">white label</a> program.
</p>
