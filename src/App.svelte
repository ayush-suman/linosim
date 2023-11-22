<script>
  import { onMount } from 'svelte';
  import Canvas from './lib/canvas/Canvas.svelte';
  import { subscribe } from './lib/ros';
  
  let points;
  let map;

  function onPointData(p) {
    points = p;
  }

  function onMapData(d) {
    map = d;
    console.log(d);
  }

  onMount(() => {
    subscribe(onPointData, onMapData);
    //points = [[ 1, 0.1 ], [ 2, 0.1 ], [ 3, 0.1 ], [ 4, 0.1 ], [ 5, 0.1 ], [ 6, 0.1 ]];
  });
</script>

<main>
  <p id='welcome'>Welcome to Linosim</p>
  <Canvas {points} {map}/>
</main>

<style>
  
</style>
