<script>
    import { onMount } from 'svelte';
    import { MapLayer, Renderer } from './renderer';
    import handlers from '../../utils/handlers';
    import { getContext } from 'svelte';

    export let points;
    export let map;

    let canvas; 
    let renderer;
    let map_layer;
    let width, height;
    
    const mark = getContext('mark');

    onMount(() => {
        const gl = canvas.getContext("2d");
        renderer = new Renderer(gl);
        handlers.setOnDragListener((x, y) => renderer.translate(x, y));
        handlers.setOnClickListener((x, y) => { 
            mark.set({x: x, y: y});
            renderer.markWithCross({x, y}) 
        });
        handlers.setOnZoomListener((s, x, y) => renderer.scale(s, x, y)); 

        let map_canvas = document.createElement('canvas');
        map_layer = new MapLayer(map_canvas);

        renderer.addLayer(map_layer);
        renderer.resize(width, height);
    });

    function onResize(width, height) {
        if (renderer && width && height) renderer.resize(width, height);
    }

    function onKeyDown(event) {
        if (event.code == 'Escape' || event.code == 'KeyQ') { 
            renderer.clearMark(); 
        }
    }

    function render() {
        if (renderer) renderer.draw(points);
        if (map_layer)  map_layer.draw(map); 
        requestAnimationFrame(render)
    }

    render()

    $: onResize(width, height);

</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} on:keydown={onKeyDown}/>

<canvas bind:this={canvas} {width} {height} 
    on:mousedown={handlers.onMouseDown} 
    on:mousemove={handlers.onMouseMove} 
    on:mouseup={handlers.onMouseUp} 
    on:wheel={handlers.onScroll}>
        Your browser is pretty fucking outdated and does not support WebGL. Kindly update and stop living under a rock.
</canvas>