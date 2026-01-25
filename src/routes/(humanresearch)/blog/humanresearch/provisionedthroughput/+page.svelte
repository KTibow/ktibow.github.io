<script module>
  export const date = "2025-04-26";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} title="GCP Provisioned Throughput pricing" />
<p>
  As of writing, 1 GSU is $2700/month. GSUs represent something close to compute, which makes them
  hard to comprehend, so let's convert them to other units. (Note: You can't buy fractional GSUs and
  you can get duration discounts)
</p>
<p>You could use a common unit, like TPS, to compare them:</p>
<ul>
  <li>100 input TPS on Gemini 2.5 Pro is $500/mo</li>
  <li>100 input TPS on Gemini 2.0 Flash is $80/mo</li>
  <li>100 input TPS on Gemini 2.0 Flash Lite is $40/mo</li>
  <li>100 output TPS on Gemini 2.5 Pro is $4030/mo</li>
  <li>100 output TPS on Gemini 2.0 Flash is $320/mo</li>
  <li>100 output TPS on Gemini 2.0 Flash Lite is $160/mo</li>
</ul>
<p>You could also use $/mtok as the unit and compare to the non-provisioned price:</p>
<ul>
  <li>For 2.5 Pro, this is 1.55x the normal price</li>
  <li>For 2.0 Flash, this is 2.06x the normal price and 4.13x the batch price</li>
  <li>For 2.0 Flash Lite, this is 2.06x the normal price and 4.13x the batch price</li>
</ul>
