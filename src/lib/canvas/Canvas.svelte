<script>
    import {onMount} from 'svelte';
    import {Renderer} from './renderer';
    import handlers from '../utils/handlers';

    let canvas; 
    let renderer;
    
    export let width, height;
    export let points;

    onMount(() => {
        var gl = canvas.getContext("2d");
        renderer = new Renderer(gl);
        renderer.resize(width, height);
        handlers.setOnDragListener((x, y) => renderer.translate(x, y));
        handlers.setOnZoomListener((s, x, y) => renderer.scale(s, x, y)); 
    });

    function onResize(renderer, width, height) {
        if (renderer && width && height) { 
            console.log("Resizing renderer " + renderer + " to width " + width + " and height " + height);
            renderer.resize(width, height);
        }
    }

    function render() {
        if (renderer && points) renderer.drawPoints(points);
        requestAnimationFrame(render)
    }

    render()

    $: onResize(renderer, width, height);


</script>

<canvas bind:this={canvas} {width} {height} 
    on:mousedown={handlers.onMouseDown} 
    on:mousemove={handlers.onMouseMove} 
    on:mouseup={handlers.onMouseUp} 
    on:scroll={handlers.onScroll}>
        Your browser is pretty fucking outdated and does not support WebGL. Kindly update and stop living under a rock.
</canvas>