<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

{#snippet link(url: string)}
  <a href={url} target="_blank" rel="nofollow">
    <code>{url}</code>
  </a>
{/snippet}

<BlogHeader {bg} title="Using FlashAlert's API" />
<p>
  The tricky thing with FlashAlert's API is that it doesn't document how to switch which area the
  feed that provides newswire information is for. Turns out you can use the <code>RegionID</code> option
  for this:
</p>
<ul>
  <li>
    Portland/Vancouver/Salem: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=1",
    )} or just {@render link("https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php")}
  </li>
  <li>
    Eugene/Springfield/Roseburg/Albany/Corvalis: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=2",
    )}
  </li>
  <li>
    Colorado Springs/Rocky Mountain Area: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=5",
    )}
  </li>
  <li>
    Spokane/Eastern Washington/Northern Idaho: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=7",
    )}
  </li>
  <li>
    Bend/Central Oregon/Eastern Oregon: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=10",
    )}
  </li>
  <li>
    Seattle/Western Washington: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=12",
    )}
  </li>
  <li>
    Columbia/Tri Cities/Pendleton/Yakima: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=13",
    )}
  </li>
  <li>
    Boise/Southern Idaho: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=15",
    )}
  </li>
  <li>
    Medford/Klamath Falls/Grants Pass: {@render link(
      "https://www.flashalertnewswire.net/IIN/reportsX/flashnews_xml2.php?RegionID=25",
    )}
  </li>
</ul>
