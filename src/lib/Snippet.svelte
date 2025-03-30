<script>
  import Highlight from "svelte-highlight";
  import "./snippetStyles.css";

  let { language, code } = $props();
</script>

<Highlight {language} {code} />
