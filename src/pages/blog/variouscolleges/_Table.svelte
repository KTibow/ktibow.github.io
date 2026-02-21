<script lang="ts">
  import reqs from './tables.json';

  const { field }: { field: string } = $props();

  let columns = $derived((reqs as Record<string, { columns: string[] }>)[field].columns);
  let selectivenessFilter = $state<'off' | 'top' | 'bottom'>('off');
  let rows = $derived(
    (reqs as Record<string, { rows: string[][] }>)[field].rows.filter((row) =>
      selectivenessFilter == 'top'
        ? ['10/10', '9/10'].includes(row[1])
        : selectivenessFilter == 'bottom'
          ? ['4/10', '5/10', '6/10'].includes(row[1])
          : true,
    ),
  );
  const isYearBox = (box: string) => /^[0-9.+-]+ [a-z]+[ ,:;]/i.test(processYearBox(box));
  const processYearBox = (box: string) => {
    return box
      .replaceAll('At least ', '')
      .replaceAll(' or more', '+')
      .replaceAll(' full-year courses', ' years')
      .replaceAll(' full-year lab courses', ' years of lab courses')
      .replace(/^([0-9-]+) \(/, '$1 years (')
      .replace(/Recommended: (\d+) sequential world language courses/, '$1 years recommended')
      .replace(/(\d+) sequential units in a single world language/, '$1 years');
  };
  const isSplitBox = (box: string) =>
    /^[0-9a-z%. \/-]+; [\0-9a-z%. \/-]+; [\0-9a-z%. \/-]+$/.test(box);
  const processGPA = (part: string) => {
    return part.replace('.00', '.0');
  };
  const processOtherBox = (box: string) => {
    return box
      .replace('Public Research University', 'Public research university')
      .replace('Research University', 'Research university')
      .replace(' and to fulfill core competencies', '')
      .replace(/^\?$/, '-')
      .replace(/^N\/A$/, '-');
  };
</script>

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        {#each columns as column}
          <th
            onclick={() => {
              if (column == 'Selectiveness') {
                if (selectivenessFilter == 'off') {
                  selectivenessFilter = 'top';
                } else if (selectivenessFilter == 'top') {
                  selectivenessFilter = 'bottom';
                } else {
                  selectivenessFilter = 'off';
                }
              }
            }}
            style:cursor={column == 'Selectiveness' ? 'pointer' : 'auto'}>{column}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as box, i}
            <td class:name={i == 0} style:letter-spacing={i == 0 ? `-${box.length * 0.001}em` : ''}>
              {#if box == '-'}
                -
              {:else if /^\d+\/\d+$/.test(box)}
                {@const [filled, total] = box.split('/')}
                <div class="bar">
                  <div class="filled" style:width="{((+filled - 3) / (+total - 3)) * 100}%"></div>
                </div>
              {:else if /^([0-9.+-]+)$/.test(box)}
                {box} years
              {:else if isYearBox(box)}
                {@const [, first, rest] = processYearBox(box).match(/^([0-9.+-]+ [a-z]+)(.*)$/)!}
                <span title={rest}>{first}</span>
              {:else if isSplitBox(box)}
                {@const [first, second, third] = box.split('; ')}
                <div class="split">
                  <span>{processGPA(first)}</span>
                  <span>{processGPA(second)}</span>
                  <span>{processGPA(third)}</span>
                </div>
              {:else}
                {processOtherBox(box)}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    height: calc(100dvh - 25rem);
    overflow: auto;
    background-color: var(--m3c-surface-container-low);
  }
  table {
    position: relative;

    border-collapse: collapse;
    white-space: nowrap;
    width: 100%;
    padding: 0 1rem;
  }
  thead th {
    position: sticky;
    top: 0;
    background-color: var(--m3c-primary-container-subtle);
    z-index: 1;
  }
  th,
  td {
    text-align: left;
    padding-right: 1rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-feature-settings: 'tnum' 1;
  }
  :is(th, td):first-child {
    padding-left: 1rem;
  }
  td.name {
    position: sticky;
    left: 0;
    background-color: var(--m3c-primary-container-subtle);
  }
  td .bar {
    width: 7rem;
    height: 0.5rem;
    background-color: var(--m3c-primary-container);
    border-radius: 0.25rem;
  }
  td .filled {
    height: 0.5rem;
    background-color: var(--m3c-primary);
    border-radius: 0.25rem;
  }
  td [title] {
    cursor: help;
  }
  td .split {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
