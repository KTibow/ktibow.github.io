<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import logo from "./logo.svg";
</script>

<BlogHeader title="2vFiomba" />
<img src={logo} alt="2vFiomba" class="w-full" />
<h2>Background</h2>
<p>
  When I was little, I saved up my money ($300-ish), and bought a iRobot Create. I found out about
  it when I was playing in ScratchX, and I was hooked.
</p>
<p>
  It's an old type of Roomba, but iRobot refurbishes them, and they published documentation on how
  to control it.
</p>
<p>
  Some while later, I found out about Home Assistant. It's basically a home automation platform, and
  it supports all sorts of things. Given that the iRobot Create was an old Roomba and didn't have
  WiFi capability, I decided to code an adapter for it.
</p>
<p>I called it Fiomba. It took a while, but eventually I made it.</p>
<h2>What came next</h2>
<p>
  After a while, I stopped using the Roomba. My Home Assistant config also became convoluted
  multiple times, so I reset my config.
</p>
<p>
  But eventually, I decided I wanted to start working on it again. I had learned a fair bit about
  Python since then, and I wanted to make a more optimized version of Fiomba.
</p>
<p>
  (FYI 2vFiomba just means Fiomba Version 2, except that it shows up first in the file manager.)
</p>
<h2>What went on during coding</h2>
<p>
  Well first, I realized I needed to set up MQTT again (protocol for real-time data) in Home
  Assistant. I waited for HA to update, then I set up the plugin + integration.
</p>
<p>Then I had to fix the outside lights, which took forever, given that they're made by Tuya.</p>
<p>
  Knowing that I wanted to make it more documented, I wanted to use constants for each opcode.
  However, you can't add documentation to a constant easily, but I eventually found
  <a href="https://stackoverflow.com/questions/8820276/docstring-for-variable">this answer</a>
  .
</p>
<p>
  Next, I waited for
  <code>sudo apt full-upgrade</code>
  to finish. After that, I installed oh-my-posh on the pi (that was mounted to the Roomba) just because
  fancy prompts look nice.
</p>
<p>
  I found out that those annotations didn't actually show in VS Code, so I
  <a href="https://github.com/microsoft/vscode-python/issues/18551">made an issue</a>
  . For the meantime, I'm just using a docstring after each line, which VS Code supports.
</p>
<p>
  Then I started coding. I got an example that gets the sensors status, but apparently my version of
  Python was old. So I built Python 3.11 (for the sake of speed).
</p>
<p>
  Then I messed everything up, so I took a backup of
  <code>/home/pi</code>
  (for the memories), and flashed the SD card with the latest Raspbian Lite image.
</p>
<p>
  After that, I just speedran coding, and after some bug patching it worked. Check the
  <a href="https://github.com/KTibow/2vFiomba">source</a>
  and feel free to look at the commits.
</p>
