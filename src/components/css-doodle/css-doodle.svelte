<script lang="ts">
  import { onMount } from 'svelte';
  import 'css-doodle';
  import { updateDoodle, initDoodle } from './css-doodle-computed';

  let doodle: HTMLDivElement | null = null;

  const handleClick = () => {
    if (doodle) updateDoodle(doodle);
  };

  onMount(() => {
    if (doodle) {
      initDoodle(doodle);
    }
  });
</script>

<css-doodle bind:this={doodle} on:click={handleClick} />
