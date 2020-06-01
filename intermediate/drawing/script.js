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
    if(e.target.nodeName.toLowerCase() == 'canvas') {
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
}

function changeColor(e) {
    color = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
}

function changeSize(e) {
    size = e.target.value;
}

document.querySelector('.clear').addEventListener('click', clear);

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

dragElement(document.querySelector(".menu"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(".bar")) {
    /* if present, the header is where you move the DIV from:*/
    document.querySelector(".bar").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}