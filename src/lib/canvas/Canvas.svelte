<script>
    import { onMount } from 'svelte';
    import { Renderer } from './renderer';
    import handlers from '../../utils/handlers';
    import { getContext } from 'svelte';

    export let points;
    export let map;

    let canvas; 
    let renderer;
    let width, height;
    
    const mark = getContext('mark');

    onMount(() => {
        const gl = canvas.getContext("2d");
        renderer = new Renderer(gl);
        renderer.resize(width, height);
        handlers.setOnDragListener((x, y) => renderer.translate(x, y));
        handlers.setOnClickListener((x, y) => { 
            mark.set({x: x, y: y});
            renderer.markWithCross({x, y}) 
        });
        handlers.setOnZoomListener((s, x, y) => renderer.scale(s, x, y)); 
    });

    function onResize(renderer, width, height) {
        if (renderer && width && height) { 
            console.log("Resizing renderer " + renderer + " to width " + width + " and height " + height);
            renderer.resize(width, height);
        }
    }

    function onKeyDown(event) {
        if (event.code == 'Escape' || event.code == 'KeyQ') { 
            renderer.clearMark(); 
        }
    }

    function render() {
        if (renderer) renderer.draw(points, map);
        requestAnimationFrame(render)
    }

    render()

    $: onResize(renderer, width, height);


</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} on:keydown={onKeyDown}/>

<canvas bind:this={canvas} {width} {height} 
    on:mousedown={handlers.onMouseDown} 
    on:mousemove={handlers.onMouseMove} 
    on:mouseup={handlers.onMouseUp} 
    on:wheel={handlers.onScroll}>
        Your browser is pretty fucking outdated and does not support WebGL. Kindly update and stop living under a rock.
</canvas>