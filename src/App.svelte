<script>
  import { onMount } from 'svelte';
  import Canvas from './lib/canvas/Canvas.svelte';
  import { subscribe } from './lib/scan/scan';
  
  let width, height;
  let points;

  function onPointData(p) {
    points = p;
  }

  onMount(() => {
    subscribe(onPointData);
    //points = [[ 1, 0.1 ], [ 2, 0.1 ], [ 3, 0.1 ], [ 4, 0.1 ], [ 5, 0.1 ], [ 6, 0.1 ]];
  });
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width}/>

<main>
  <p id='welcome'>Welcome to Linosim</p>
  <Canvas {width} {height} {points}/>
</main>

<style>
  
</style>
