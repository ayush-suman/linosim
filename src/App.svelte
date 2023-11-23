<script>
  import { onMount } from 'svelte';
  import Canvas from './lib/canvas/Canvas.svelte';
  import { moveRover, saveMap, subscribe } from './lib/ros';
  import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

  /// NOTE: when adding more pages to the application, 
  /// this screen should be moved to some other .svelte file 
  /// and router should be used in this page

  let points;
  let map;

  function onPointData(p) {
    points = p;
  }

  function onMapData(d) {
    map = d;
    console.log(d);
  }

  const mark= writable();
  setContext('mark', mark)

  onMount(() => {
    subscribe(onPointData, onMapData);
  });
</script>

<main>
  <p id='welcome'>Welcome to Linosim</p>
  <button id='save' on:click={saveMap}>Save Map</button>
  <button id='move' on:click={()=>moveRover(mark)}>Move to marked location</button>
  <Canvas {points} {map}/>
</main>

<style>
  
</style>
