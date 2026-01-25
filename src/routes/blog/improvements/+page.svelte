<script module>
	export const title = "Life improvements I've done";
	export const date = "2023-08-11";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} {title} />
<p>Note: I wrote this on a plane because I got bored. I didn't have internet.</p>
<p>
  This is somewhat inspired by me coming onto some guy's blog (while researching adaptive-lighting)
  where he talks about how he did a project where he spent some time improving his life.
  <a href="https://socraticowl.com/post/kaizen-experiment/"> (link) </a>
</p>
<div class="grid grid-cols-2 gap-2 *:px-6 *:py-4 *:rounded-2xl **:mt-0">
  <div class="bg-cyan-300/30 text-cyan-100">
    <p class="font-bold">Home Assistant</p>
    <p>Manages lights and tracks data throughout the day.</p>
  </div>
  <div class="bg-teal-300/30 text-teal-100">
    <p class="font-bold">Automatic watch syncer</p>
    <p>Syncs the time, weather, and schedule to my Bangle.js daily at 6AM.</p>
  </div>
  <div class="bg-red-300/30 text-red-100">
    <p class="font-bold">Better keyboards</p>
    <p>Colemak on personal/school computers, and Microsoft SwiftKey on phones.</p>
  </div>
  <div class="bg-green-300/30 text-green-100">
    <p class="font-bold">Custom school websites</p>
    <p>
      Utilities I coded to view recently posted assignments, connect to the web filters, use GPT,
      chat (direct, unblockable), etc.
    </p>
  </div>
  <div class="bg-indigo-300/30 text-indigo-100">
    <p class="font-bold">More soon?</p>
    <p>
      At the time of writing, I actually can't think of that many - but I have plans for other stuff
      already.
    </p>
  </div>
  <div class="bg-orange-300/30 text-orange-100">
    <p class="font-bold">Alert system (HA)</p>
    <p>This is a plan</p>
  </div>
  <div class="bg-blue-300/30 text-blue-100">
    <p class="font-bold">Sleep automations</p>
    <p>This is a plan</p>
  </div>
  <div class="bg-yellow-300/30 text-yellow-100">
    <p class="font-bold">Apps</p>
    <p>email systems, google voice, books, etc. does this even count?</p>
  </div>
</div>
