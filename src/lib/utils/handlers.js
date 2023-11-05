let lastOffset;
let offset;
let downAtPoint;
let isDown = false;

let onDragListener;
let onZoonListener;

const onMouseDown = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    isDown = true;
    downAtPoint = {x: event.clientX, y: event.clientY};
    if (!lastOffset) {
        lastOffset = {x: 0, y: 0};
    }
    console.log(downAtPoint);
}

const onMouseMove = function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isDown) {
        console.log(event);
        console.log(event.clientX - downAtPoint.x);
        console.log(event.clientY - downAtPoint.y);
        offset = {x: event.clientX - downAtPoint.x, y: event.clientY - downAtPoint.y};
        onDragListener(lastOffset.x + offset.x, lastOffset.y + offset.y);
    }
}

const onMouseUp = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    isDown = false;
    lastOffset = {x: offset.x + lastOffset.x, y: offset.y + lastOffset.y};
    downAtPoint = undefined;
}

function setOnDragListener(onDrag) {
    onDragListener = onDrag;
};


const onScroll = function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
}

function setOnZoomListener(onZoom) {
    onZoonListener = onZoom;
}

export default {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    setOnDragListener,
    onScroll,
    setOnZoomListener
};