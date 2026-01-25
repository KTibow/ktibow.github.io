<script module>
  export const title = "A stream of thoughts on compression";
  export const date = "2024-04-27";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} {title} {bg} />
<p>It's a stream about compression. Get it? Compression stream? Ha ha.</p>
<h2>Zip would be better if compression was cross-file</h2>
<p>
  Throughout my experiments, I've found that ZIP was generally worse than other methods, mainly
  because each file gets its own stream. This means that the file name is stored in plain text, and
  data shared across files is treated as separate. This makes it just larger, as demonstrated in the
  FSR breakdown.
</p>
<h2>NEU breakdown</h2>
<p>
  NEU is a large Java Archive, so I've been trying to figure out effective ways to reduce its size
  for a while now. I recently tried making tarballs organized by file type and using xz compression
  - here's what that yielded.
</p>
<table>
  <tbody>
    <tr>
      <td>Type</td>
      <td>.tar</td>
      <td>.tar.xz</td>
    </tr>
    <tr>
      <td>Archives</td>
      <td>12.380 MB</td>
      <td>10.302 MB</td>
    </tr>
    <tr>
      <td>Images</td>
      <td>13.486 MB</td>
      <td>12.476 MB</td>
    </tr>
    <tr>
      <td>Class files</td>
      <td>12.667 MB</td>
      <td>2.135 MB</td>
    </tr>
    <tr>
      <td>Other files</td>
      <td>2.999 MB</td>
      <td>0.346 MB</td>
    </tr>
    <tr>
      <td>Sum</td>
      <td>41.5 MB</td>
      <td>25.3 MB</td>
    </tr>
  </tbody>
</table>
<p>For context: The original zip was 29.1 MB and the original sum of file contents were 37.8 MB.</p>
<h3>After optimizing images (with zopflipng)</h3>
<table>
  <tbody>
    <tr>
      <td>Type</td>
      <td>.tar</td>
      <td>.tar.xz</td>
    </tr>
    <tr>
      <td>Images</td>
      <td>11.940 MB</td>
      <td>11.187 MB</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>40.0 MB</td>
      <td>24.0 MB</td>
    </tr>
  </tbody>
</table>
<p>
  <em
    >Yes, this means that just using zopflipng and using xz could subtract 5 MB from the archive.
    That doesn't mean that's practical, but it's interesting to look at.</em
  >
</p>
<h2>FSR breakdown</h2>
<p>
  FSR is a large texture pack using PNGs and ZIP, and my endeavors have shown that the archive
  format can make as much a difference as the file format.
</p>
<p>
  "Compressed": zopflipng (with <code>--lossy_transparent -m</code>) and rewritten JSON
</p>
<table>
  <tbody>
    <tr>
      <td>Format</td>
      <td>Base size</td>
      <td>Compressed size</td>
    </tr>
    <tr>
      <td>Folder</td>
      <td>4.4 MB</td>
      <td>2.1 MB</td>
    </tr>
    <tr>
      <td>.zip</td>
      <td>4.5 MB - 4.9 MB</td>
      <td>3.3 MB</td>
    </tr>
    <tr>
      <td>.tar.gz</td>
      <td>1.9 - 2.0 MB</td>
      <td>885 - 957 kB</td>
    </tr>
    <tr>
      <td>.tar.xz</td>
      <td>1.7 MB</td>
      <td>704 kB</td>
    </tr>
  </tbody>
  <!-- <tr>
          <td>Base</td>
          <td>.zip (og)</td>
          <td>4.9 MB</td>
        </tr>
        <tr>
          <td>Base</td>
          <td>.zip (7z)</td>
          <td>4.5 MB</td>
        </tr>
        <tr>
          <td>Base</td>
          <td>.tar.xz</td>
          <td>1.7 MB</td>
        </tr>
        <tr>
          <td>Compressed</td>
          <td>folder</td>
          <td>2.1 MB</td>
        </tr>
        <tr>
          <td>Compressed</td>
          <td>.zip (7z)</td>
          <td>3.3 MB</td>
        </tr>
        <tr>
          <td>Compressed</td>
          <td>.tar.gz (zlib)</td>
          <td>957 kB</td>
        </tr>
        <tr>
          <td>Compressed</td>
          <td>.tar.gz (zopf)</td>
          <td>704 kB</td>
        </tr>
        <tr>
          <td>Compressed</td>
          <td>.tar.xz</td>
          <td>704 kB</td>
        </tr> -->
</table>
