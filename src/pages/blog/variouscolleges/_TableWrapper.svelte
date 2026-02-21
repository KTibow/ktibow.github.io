<script lang="ts">
  import Table from './_Table.svelte';

  let field = $state('Engineering & Technology');
</script>

<label>
  <p>Field</p>
  <select bind:value={field}>
    <option>Agriculture & Ecology</option>
    <option>Arts & Design</option>
    <option>Business & Management</option>
    <option>Communications & Media</option>
    <option>Education & Teaching</option>
    <option>Engineering & Technology</option>
    <option>Healthcare & Medicine</option>
    <option>Human Services & Community Work</option>
    <option>Law & Legal Studies</option>
    <option>Science & Research</option>
  </select>
</label>
<Table {field} />

<style>
  label {
    display: grid;
    position: relative;
    background-color: var(--m3c-surface-container-low);
    border-radius: 0.5rem;
    align-self: start;
    margin-block: 1rem;
  }
  p {
    @apply --m3-body-small;
    position: absolute;
    left: 0.5rem;
    top: 0.125rem;
  }
  select {
    @apply --m3-body-large;
    display: flex;
    align-items: center;
    border: none;
    padding-block: 1rem 0;
    padding-inline: 0.5rem;
  }
</style>
