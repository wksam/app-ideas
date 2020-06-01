const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
resize();

let pos = { x: 0, y: 0 };
let color = '#000';
let size = 5;

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

document.addEventListener('touchmove', draw);
document.addEventListener('touchend', setPosition);
document.addEventListener('touchstart', setPosition);

document.querySelectorAll('button.color').forEach(function(button) {
    button.addEventListener('click', changeColor);
});

document.querySelector('input[type=range]').addEventListener('change', changeSize);

function setPosition(x, y) {
    pos.x = x;
    pos.y = y;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.canvas.width = canvas.width;
    context.canvas.height = canvas.height;
}

function draw(e) {
    context.beginPath();

    context.lineWidth = size;
    context.lineCap = 'round';
    context.strokeStyle = color;

    context.moveTo(pos.x, pos.y);
    if(e.buttons !== undefined && e.buttons === 1)
        setPosition(e.clientX, e.clientY);
    else if(e.touches !== undefined && e.touches.length > 0)
        setPosition(e.touches[0].clientX, e.touches[0].clientY);
    else
        return;
    context.lineTo(pos.x, pos.y);

    context.stroke();
}

function changeColor(e) {
    color = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
}

function changeSize(e) {
    size = e.target.value;
}