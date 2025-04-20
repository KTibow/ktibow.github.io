<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="The X Elite experience" />
<p>
  I got a new X Elite laptop recently, specifically the Lenovo Yoga Slim 7x. This is the obligatory
  blog post about running Linux on it.
</p>
<br />
<p>Setting it up took a bit. Here are my tips:</p>
<ul>
  <li>
    From the UEFI, remember to turn off Secure Boot and set the boot priority. It'll give you a
    weird error if you don't.
  </li>
  <li>
    Don't remove the Windows partition - you'll need it for firmware. Instead, turn off BitLocker so
    you can resize it.
  </li>
  <li>
    Don't use Fedora 42 - while GRUB will load, it'll black out and reboot once you pick any option.
  </li>
</ul>
<p>I eventually got Ubuntu 25.04 running! But there were still some problems:</p>
<ul>
  <li>Audio input/output doesn't work.</li>
  <li>Video input/output to external displays doesn't work.</li>
  <li>HDR and Night Light don't work.</li>
  <li>Some things aren't fully accelerated.</li>
</ul>
<p>
  Right now, this is actually <em>less</em> feature support than my janky Surface Pro 7. Things are
  rapidly getting implemented though - follow along at
  <a href="https://bugs.launchpad.net/ubuntu-concept/+bug/2084191">bug 2084191</a>.
</p>
