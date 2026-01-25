<script module>
	export const title = "Gemini 3 thinks Spherical Embedding Compression is a sham";
	export const date = "2026-01-23";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import pareto from "./pareto.avif";
  import paretoAlt from "./pareto_alt.avif";
  import ratios from "./ratios.avif";
  import code from "./code.py?url";
</script>

<BlogHeader {date} {title} />

<p>
  The following blog post was written by Gemini 3 based on my questions about Jina's Spherical
  Embedding Compression. It includes relevant graphs and code.
</p>

<hr />

<p>
  The core premise of their research is that high-dimensional unit vectors naturally cluster their
  angles around π/2. By converting Cartesian coordinates to spherical coordinates, the values become
  predictable, their IEEE 754 exponents align, and compressors like Zstd can shrink the data by
  ~1.5x.
</p>

<p>
  The hypothesis tested was simple: <strong
    >If the compression gains come solely from aligning floating-point exponents, do we actually
    need expensive trigonometry?</strong
  >
</p>

<p>Can’t we just add a number?</p>

<p>
  I ran an experiment comparing Jina's Spherical Transform against a "dumb" linear sweep: y = mx +
  b. I generated 2,000 normalized vectors (1024d) and measured the trade-off between compression
  ratio and reconstruction error.
</p>

<h3>The Evidence</h3>

<p>The results confirmed the hypothesis.</p>

<img src={pareto} alt="Pareto Frontier" />

<ul>
  <li><strong>Green Triangle:</strong> The Spherical Transform (the geometric approach).</li>
  <li><strong>Blue Star:</strong> A linear shift (Bias ≈ 1.57).</li>
</ul>

<p>
  As you can see, the linear shift lands directly on top of the Spherical transform. It achieves the <strong
    >same compression ratio (~1.55x)</strong
  >
  with <strong>negligible error difference</strong> (both remain below float32 machine epsilon).
</p>

<img src={ratios} alt="Compression Ratio Heatmap" />

<p>
  The heatmap above illustrates why. As you move towards the bottom right, compression spikes. This
  isn't geometric magic; it is simply the bias (b) pushing the floating-point values into a specific
  range where their exponent bits become identical, making them easy for Zstd to compress.
</p>

<p>
  Multiplicands were tested, and they help with further compression, but they can be done without.
  The pareto plot from earlier with a constant m of 1:
</p>

<img src={paretoAlt} alt="Pareto Frontier" />

<h3>Credits</h3>

<p>
  Jina AI deserves credit for identifying that exponent alignment is the key to compressing
  embeddings (you can view their <a href="https://github.com/jina-ai/jzip-compressor"
    >implementation here</a
  >). My contribution was isolating that mechanism and stripping away the complexity.
</p>

<p>
  <a href={code}>Analysis code used here.</a>
</p>

<h3>Conclusion</h3>

<p>Spherical geometry is bloat.</p>

<p>
  You do not need to calculate <code>arccos</code> and <code>arctan</code> to compress your
  embeddings. You only need to add <code>1.57</code>. It yields the exact same compression ratio,
  indistinguishable error, and burns significantly fewer CPU cycles. Stop calculating angles and
  just shift the data.
</p>
