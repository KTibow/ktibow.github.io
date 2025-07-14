<script lang="ts">
  import * as d3 from "d3";

  let { data }: { data: [string, number][] } = $props();

  // Specify the chart's dimensions.
  const width = 512;
  const height = 512;

  const getColor = (name: string) => {
    const normalizeColor = (hex: string) => {
      const hsl = d3.hsl(hex);
      return d3.hsl(hsl.h, 0.8, 0.3).toString();
    };
    const colors: Record<string, string> = {
      "AI Singapore": normalizeColor("#ae2514"),
      "AI Sweden": normalizeColor("#fecb00"),
      "Exploration Lab": normalizeColor("#0000ff"),
      "Hugging Face": normalizeColor("#FFD21E"),
      "Kaggle (Google)": normalizeColor("#20beff"),
      "LM Studio": normalizeColor("#4338ca"),
      "NTT Data": normalizeColor("#070f26"),
      "Red Hat": normalizeColor("#ee0000"),
      "Sarvam AI": normalizeColor("#cb5534"),
      "Scale AI": normalizeColor("#E151FF"),
      "Together AI": normalizeColor("#0262f2"),
      AMD: normalizeColor("#FF0000"),
      AWS: normalizeColor("#ff9900"),
      Cerebras: normalizeColor("#f45d2c"),
      Cloudflare: normalizeColor("#f88101"),
      Databricks: normalizeColor("#FF5F46"),
      Dell: normalizeColor("#0672cb"),
      Docker: normalizeColor("#1D63ED"),
      Doubleword: normalizeColor("#ff6767"),
      Fireworks: normalizeColor("#6720FF"),
      Giskard: normalizeColor("#91f7c0"),
      Google: normalizeColor("#4285f4"),
      GDE: normalizeColor("#4285f4"),
      Groq: normalizeColor("#F55036"),
      IBM: normalizeColor("#0043ce"),
      Independent: normalizeColor("#8800FF"),
      Intel: normalizeColor("#0068B5"),
      Meta: normalizeColor("#0082FB"),
      Microsoft: normalizeColor("#00a3ee"),
      Miko: normalizeColor("#0b3533"),
      Nous: normalizeColor("#0071A9"),
      NVIDIA: normalizeColor("#76b900"),
      Ollama: "#222222",
      OpenAI: "#000000",
      Other: normalizeColor("#FF0088"),
      SambaNova: normalizeColor("#4e226b"),
      Snowflake: normalizeColor("#249edc"),
      vLLM: normalizeColor("#30a2ff"),
    };
    return colors[name] || "#000000";
  };

  // Create the pie layout and arc generator.
  const pie = d3
    .pie<[string, number]>()
    .sort(null)
    .value((d) => d[1]);

  const outerRadius = Math.min(width, height) / 2 - 1;
  const arcPath = d3
    .arc<d3.PieArcDatum<[string, number]>>()
    // control the style of the pie slices;
    // try changing the inner radius to 100 to see what happens
    .innerRadius(0)
    .outerRadius(outerRadius);

  // A separate arc generator for labels.
  const arcLabel = d3
    .arc<d3.PieArcDatum<[string, number]>>()
    .innerRadius(outerRadius * 0.9)
    .outerRadius(outerRadius * 0.9);

  const arcs = $derived(pie(data));
</script>

<svg {width} {height} viewBox="{-width / 2}, {-height / 2}, {width}, {height}">
  <g class="data">
    <!-- Loop through the data-slices. -->
    {#each arcs as slice}
      <!-- Add each pie-slice. -->
      <path d={arcPath(slice)} fill={getColor(slice.data[0])} stroke="white" />

      <text transform="translate({arcLabel.centroid(slice)})" text-anchor="middle">
        {slice.data[0]}
      </text>

      <!-- {#if slice.endAngle - slice.startAngle > 0.25} -->
      <text
        text-anchor="middle"
        transform="translate({[arcLabel.centroid(slice)[0], arcLabel.centroid(slice)[1] + 10]})"
      >
        {slice.data[1].toLocaleString()}
      </text>
      <!-- {/if} -->
    {/each}
  </g>
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
    font-size: 0.75rem;
    font-weight: bold;
  }
  text {
    fill: white;
  }
</style>
