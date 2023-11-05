<script>
  import { onMount } from 'svelte';
  import Canvas from './lib/canvas/Canvas.svelte';
  // import { subscribe } from './lib/scan/scan';
  
  let width, height;
  let points;

  onMount(() => {
    //subscribe(p => this.points = p)
    points=[[1, 0], [2, 0], [3, 0]];
  });
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width}/>

<main>
  <Canvas {width} {height} {points}/>
</main>

<style>
  
</style>
