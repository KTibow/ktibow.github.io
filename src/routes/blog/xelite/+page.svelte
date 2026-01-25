<script module>
  export const title = "The X Elite experience";
  export const date = "2025-04-19";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {title} {bg} />
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

<h2>Apr 20 2025 update</h2>
<p>
  I built Jens Glathe's device tree, and external displays now work. The steps I took were something
  like
</p>
<ul>
  <li>
    Clone <code>https://github.com/jglathe/linux_ms_dev_kit</code> and switch to
    <code>jg/ubuntu-qcom-x1e-6.15rc</code>
  </li>
  <li>Make sure all necessary packages are installed</li>
  <li>
    Run <code
      >cpp -nostdinc -I. -Iinclude -undef -x assembler-with-cpp
      arch/arm64/boot/dts/qcom/x1e80100-lenovo-yoga-slim7x.dts > usable.dts</code
    >
  </li>
  <li>Run <code>dtc -I dts -O dtb -o compiled.dtb usable.dts</code></li>
  <li>
    Back up your current device tree with <code
      >sudo cp /boot/dtbs/6.14.0-15-generic/qcom/x1e80100-lenovo-yoga-slim7x.dtb
      /boot/dtbs/6.14.0-15-generic/qcom/x1e80100-lenovo-yoga-slim7x.dtb.bak</code
    >, and copy in the new one with
    <code
      >sudo cp ./compiled.dtb /boot/dtbs/6.14.0-15-generic/qcom/x1e80100-lenovo-yoga-slim7x.dtb</code
    >
  </li>
  <li>Reboot and there you go</li>
</ul>
<p>Oddly, I can't turn off the internal display without it crashing on me yet.</p>
