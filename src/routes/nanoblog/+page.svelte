<script lang="ts">
  import SeriesBlog from "$lib/SeriesBlog.svelte";
  import statuses from "./statuses.json";

  const now = new Date();
  const relativeTimeFormatter = new Intl.RelativeTimeFormat();
  const formatDate = (date: Date) => {
    const msAgo = now.getTime() - date.getTime();
    const secondsAgo = Math.floor(msAgo / 1000);
    if (secondsAgo < 60) {
      return relativeTimeFormatter.format(-secondsAgo, "second");
    } else if (secondsAgo < 3600) {
      return relativeTimeFormatter.format(-Math.floor(secondsAgo / 60), "minute");
    } else if (secondsAgo < 86400) {
      return relativeTimeFormatter.format(-Math.floor(secondsAgo / 3600), "hour");
    }
    return date.toLocaleDateString();
  };
</script>

<svelte:head>
  <title>Nanoblog</title>
</svelte:head>

<SeriesBlog />
<div class="prose sm:w-full m-6">
  {#each statuses as { content, timestamp }}
    {@const date = new Date(timestamp)}
    <p class="flex justify-between">
      <span>{content}</span>
      <span>{formatDate(date)}</span>
    </p>
  {/each}
</div>
