let downAtPoint;
let isDown = false;
let moved = false;

let onDragListener;
let onClickListener;
let onZoomListener;

const onMouseDown = function(event) {
    if (event.buttons == 1) {
        event.preventDefault();
        event.stopPropagation();
        isDown = true;
        downAtPoint = {x: event.clientX, y: event.clientY};
        moved = false;
    }
}

const onMouseMove = function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isDown) {
        onDragListener(event.clientX - downAtPoint.x, event.clientY - downAtPoint.y);
        downAtPoint = {x: event.clientX, y: event.clientY};
        moved = true;
    }
}

const onMouseUp = function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isDown && !moved) {
        onClickListener(downAtPoint.x, downAtPoint.y);
        moved = false;
    }
    isDown = false;
    downAtPoint = undefined;
}

function setOnDragListener(onDrag) {
    onDragListener = onDrag;
};

function setOnClickListener(onClick) {
    onClickListener = onClick;
}


const onScroll = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    const scale = event.wheelDelta > 0 ? 1.1 : 1/1.1;
    onZoomListener(scale, event.clientX, event.clientY);
}

function setOnZoomListener(onZoom) {
    onZoomListener = onZoom;
}

export default {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    setOnDragListener,
    setOnClickListener,
    onScroll,
    setOnZoomListener,
};