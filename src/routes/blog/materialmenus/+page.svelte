<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader title="Material menus are goofy" />
<p>
  Menus have been part of Material Design for a while. I have been using Material Design for a
  while. Both are still true in the present. But
  <a href="https://m3.material.io/components/menus/overview"> Material's menus</a>
  are goofy.
</p>
<p>
  Problem 1: The styling. Material's menus are barely rounded despite most things being
  ultra-rounded in Material 3. They're rounded to 4px. They could be rounded more - in fact as of
  writing, the Menu docs say "Medium" (12px) in one place, but that's probably just a typo as are
  common on the M3 docs.
</p>
<p>
  Problem 2: The sizing. The menus tend to be really chonky. The most likely reason is so they're
  tappable (each item must be 48px high), but cmon. You have examples of dense menus under
  Guidelines, GDocs has dense menus, why can't you add dense menus as a spec?
</p>
<p>
  Problem 3: The animation. I've never seen a good Material menu animation. Sometimes it's a
  translate-in, sometimes a scale-in, sometimes a clip-in, but it never looks good. In Chrome Mobile
  it's even worse, as there's a 1-second delay as all the items animate in. Why can't they just use
  a container transform or something?
</p>
