<script module>
  export const date = "2025-10-25";
</script>

<script>
  import dock from "./dock.png";
  import roomba from "./roomba.png";
  import dockIr from "./dock ir.png";
  import buoy from "./1 buoy.png";
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Series from "$lib/Series.svelte";
</script>

<BlogHeader {date} title="Roomba dock IR, illustrated" />
<img src={dock} alt="Roomba dock" />
<img src={roomba} alt="Roomba" />
<img src={dockIr} alt="Roomba dock IR" />
<img src={buoy} alt="Roomba dock buoy" />
<Series />
