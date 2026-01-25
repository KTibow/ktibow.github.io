<script lang="ts">
  import { page } from "$app/state";
  import ErrorBackground from "./ErrorBackground.svelte";
</script>

<ErrorBackground />
<div class="grid grid-cols-2 grid-rows-[1fr_auto] gap-2 prose m-auto">
  <img
    src="https://http.cat/{page.status}"
    width="750"
    height="600"
    alt="The {page.status} cat"
    class="mb-0 row-span-2"
  />
  <div>
    <h1>Apologies</h1>
    <p>
      I hope {page.status == 404 ? "my spring cleaning" : "this error"} didn't interrupt your workflow.
    </p>
  </div>
  <a
    href="/"
    class="row-2 col-2 flex relative p-2 rounded-2xl items-center bg-surface-container-low no-underline layer"
  >
    Go home
  </a>
</div>
