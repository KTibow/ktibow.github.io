<script module>
  export const date = "2025-07-13";
</script>

<script lang="ts">
  import BlogHeader from "$lib/BlogHeader.svelte";
  import PieChart from "./PieChart.svelte";
  import bg from "./bg.avif";
  import kaloimg from "./kaloimg.png";
  import _users from "./user_data.json";
  const users = _users as Record<string, { name: string; orgs: string[]; affiliation?: string }>;

  const listFormatter = new Intl.ListFormat();

  const orgs = {
    "ft-hf-o-c": {
      name: "yofo",
      traits: "Non-Profit",
      paidFor: "Team",
    },
    llhf: {
      name: "LLHF",
      traits: "Community",
    },
    sllhf: {
      name: "SLLHF",
      traits: "Community",
    },
    nltpt: {
      traits: "",
      paidFor: "Enterprise",
    },
    blhf: {
      traits: "Community",
    },
    hsramall: {
      traits: "Company",
    },
    "ll-re": {
      name: "wut?",
      traits: "",
      paidFor: "Team",
    },
    lbhf: {
      traits: "Community",
      paidFor: "Enterprise",
    },
    "yet-another-org-whynot": {
      name: "yorgllre",
      traits: "",
    },
    "gg-hf-gm": {
      traits: "Community",
    },
    "gg-hf-g": {
      traits: "Community",
    },
    "gg-tt": {
      traits: "Company",
    },
    "gv-hf": {
      name: "kotol",
      traits: "Company",
    },
    "gg-hf": {
      traits: "",
      paidFor: "Enterprise",
    },
  };
  const orgNames = Object.keys(orgs);
  const coOccurrenceMatrix = Array.from(orgNames, (orgA) =>
    Array.from(orgNames, (orgB) => {
      if (orgA === orgB) return 0;
      const union = Object.values(users).filter(
        (user) => user.orgs.includes(orgA) || user.orgs.includes(orgB),
      );
      const intersection = Object.values(users).filter(
        (user) => user.orgs.includes(orgA) && user.orgs.includes(orgB),
      );
      return intersection.length / union.length;
    }),
  );
  const peopleInManyOrgs = listFormatter.format(
    Object.entries(users)
      .sort(([, a], [, b]) => b.orgs.length - a.orgs.length)
      .slice(0, 4)
      .map(([k, v]) => `${k} from ${v.affiliation} (in ${v.orgs.length}/${orgNames.length} orgs)`),
  );
  let orgVisualized = $state(orgNames[0]);
  let orgVisualization = $derived.by(() => {
    const affiliationCounts = Object.values(users)
      .filter((user) => user.orgs.includes(orgVisualized))
      .reduce(
        (acc, user) => {
          const affiliation = user.affiliation || "Unknown";
          acc[affiliation] = (acc[affiliation] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    // Make an "other" section
    const totalCount = Object.values(affiliationCounts).reduce((sum, count) => sum + count, 0);
    let otherCount = 0;
    for (const [affiliation, count] of Object.entries(affiliationCounts)) {
      if (count < totalCount * 0.02) {
        otherCount += count;
        delete affiliationCounts[affiliation];
      }
    }

    const unknownCount = affiliationCounts["Unknown"] || 0;
    delete affiliationCounts["Unknown"];

    const output = Object.entries(affiliationCounts);
    output.sort(([, a], [, b]) => b - a);
    if (unknownCount > 0) {
      output.unshift(["Unknown", unknownCount]);
    }
    if (otherCount > 0) {
      output.push(["Other", otherCount]);
    }
    return output;
  });
</script>

<BlogHeader {date} {bg} title="Hugging Face Conspiracies" />
<p>
  Imagine this. You're scrolling X and you come across <a
    href="https://x.com/kalomaze/status/1943843818887163989">a post by kalomaze</a
  > quoting Sam Altman's delay of the OpenAI open source LLM.
</p>
<blockquote>
  <p>sorry but</p>
  <p>
    i'd bet money that he's only saying this because he really, really doesn't want you to realize
    that Kimi K2 exists now (and is the new king of open weights, by a disgusting margin)
  </p>
  <div class="h-px"></div>
  <p>gonna be brutal here but</p>
  <p>
    if this was about "safety", that weirdly named hf org with like ~50 people from various smaller
    companies wouldn't already have it, because it would be incredibly easy (and non traceable) for
    any of them to leak it
  </p>
  <div class="h-px"></div>
  <p>
    (it is my current running assumption that the org in question is in fact the one they are using
    for the open weights project, given that ollama + openAI people both show up in its list)
  </p>
  <img src={kaloimg} alt="someone from openai also in the mystery org" width="307" height="124" />
</blockquote>
<p>
  It piques your interest, so you investigate. You hop on <a href="https://huggingface.co/openai"
    >huggingface.co/openai</a
  >
  and click around until you find someone in the mystery org. It's called "ft-hf-o-c", and you reply
  with a <a href="https://huggingface.co/ft-hf-o-c">link to it</a>, earning you a follow from
  kalomaze.
</p>
<p>
  But as you keep clicking and investigating who the org's made of, you start seeing some more
  mysterious orgs. "llhf"? "gg-hf-g"? What are those? Today we find out.
</p>
<br />
<p>Let's start with what we know for sure. We can speculate later.</p>
<table>
  <tbody>
    {#each Object.entries(orgs) as [k, v]}
      {@const descParts = [
        "name" in v ? `"${v.name}"` : null,
        "paidFor" in v ? `who's paid for ${v.paidFor}` : null,
        v.traits ? `a ${v.traits}` : null,
      ].filter(Boolean)}
      <tr>
        <td><a href="https://huggingface.co/{k}">{k}</a></td>
        <td>
          {descParts.join(", ")}
        </td>
        <td>has {Object.values(users).filter((x) => x.orgs.includes(k)).length} members</td>
      </tr>
    {/each}
  </tbody>
</table>
<p>For each of these, let's chart similarity to each other one:</p>
<table>
  <tbody>
    <tr>
      <td></td>
      {#each orgNames as orgName}
        <td>{orgName}</td>
      {/each}
    </tr>
    {#each orgNames as orgA, i}
      <tr>
        <td>{orgA}</td>
        {#each coOccurrenceMatrix[i] as value}
          {@const redColor = value * 1.5}
          <td style:background-color="rgb(255 0 0 / {redColor})">
            {#if value != 0}
              {value.toFixed(2)}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
<p>None of these are 0. All have a little co-occurrence, thanks to {peopleInManyOrgs}.</p>
<br />
<p>
  So that's the big picture. Now, let's look at the people in each org, which should tell us
  something about them.
</p>
<select bind:value={orgVisualized}>
  {#each orgNames as orgName}
    <option value={orgName}>{orgName}</option>
  {/each}
</select>
<PieChart data={orgVisualization} />
<p>Okay, that's enough to speculate.</p>
<p>
  <strong>ft-hf-o-c.</strong> The likely home of the open weights model, might stand for Fine-Tuning
  Hugging Face OpenAI Community. "yofo" might be a nod to You Only Look Once (itself a nod to You Only
  Live Once)... perhaps, given the "ft" earlier, You Only Finetune Once? Very interesting, and very speculable
  on.
</p>
<p><strong>llhf.</strong> This is simple: Llama Hugging Face.</p>
<p>
  <strong>sllhf.</strong>
  {`{Small, Scaling, Specialized} Llama Hugging Face`} could all work. Once contained Llama 405B.
</p>
<p>
  <strong>blhf.</strong> Honestly, no idea on this one (aside from the Llama and Hugging Face parts).
</p>
<p>
  <strong>nltpt.</strong> This one's unclear. It could be Next Llama Transformer Pretrain Team or Next
  Llama Training PyTorch. It used to host Llama 3B.
</p>
<p>
  <strong>hsramall.</strong> Had to laugh once I saw this one decoded: Llama backwards is "amall". Not
  sure about the hsr/rsh part though. It once hosted placeholders for Llama 3.
</p>
<p>
  <strong>ll-re.</strong> Boring backronym is Llama Research and Engineering, funner one is Llama Lab:
  Research Edition.
</p>
<p>
  <strong>lbhf.</strong> This one is just made of Meta and Hugging Face, and likely stands for Llama
  Builders Hugging Face.
</p>
<p>
  <strong>yet-another-org-whynot/"yorgllre".</strong> This is a more interesting and larger
  continuation of <a href="https://huggingface.co/yet-another-org">yet-another-org/"yorg"</a>. The
  friendly name might stand for "Yet another org Llama Research Edition".
</p>
<p>
  <strong>gg-hf-gm and gg-hf-g.</strong> The difference is unclear. Both could be Google Hugging Face
  Gemma or Google Hugging Face Gemini. Only one that once had models was gg-hf-gm, with a N series Gemma
  model.
</p>
<p><strong>gg-tt.</strong> Maybe Google Transformer Toolkit? Or perhaps Google Testing Team?</p>
<p>
  <strong>gv-hf.</strong> LLMs say this starts with Google Vertex, but it's more likely Google Vision:
  they hosted Paligemma and OWL-ViT models.
</p>
<p>
  <strong>gg-hf.</strong> Ending simple: Google Hugging Face. Hosted the first versions of Gemma.
</p>
