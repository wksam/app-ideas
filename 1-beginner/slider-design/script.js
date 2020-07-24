document.querySelector('.previous').addEventListener('click', previous);
document.querySelector('.next').addEventListener('click', next);

const duration = 5000;

function next() {
    clearTimeout(timeoutId);
    try {
        document.querySelectorAll('.item').forEach(function(elem, index, list) {
            if(elem.classList.contains('active')) {
                elem.classList.remove('active');
                const previous = index < (list.length - 1) ? (index + 1) : 0;
                list[previous].classList.add('active');
                throw 'return';
            }
        });
    } catch(e) { }
    timeoutId = setTimeout(next, duration);
}

function previous() {
    clearTimeout(timeoutId);
    try {
        document.querySelectorAll('.item').forEach(function(elem, index, list) {
            if(elem.classList.contains('active')) {
                elem.classList.remove('active');
                const previous = index > 0 ? (index - 1) : (list.length - 1);
                list[previous].classList.add('active');
                throw 'return';
            }
        });
    } catch(e) { }
    timeoutId = setTimeout(next, duration);
}

let timeoutId;
let timeout3dId;
function init() {
    timeoutId = setTimeout(next, duration);
    timeout3dId = setTimeout(next3d, duration);
}
init();



// Carousel 3D

let canvas = document.querySelector('.image-container-3d');
let images = document.querySelectorAll('.item-3d');
let canvasWidth = canvas.offsetWidth;
let selectedIndex = 0;
const radius = Math.round((canvasWidth / 2) / Math.tan(Math.PI / 5));

document.querySelector('.previous-3d').addEventListener('click', previous3d);
document.querySelector('.next-3d').addEventListener('click', next3d);

function next3d() {
    clearTimeout(timeout3dId);
    selectedIndex++;
    rotate3d();
    timeout3dId = setTimeout(next3d, duration);
}

function previous3d() {
    clearTimeout(timeout3dId);
    selectedIndex--;
    rotate3d();
    timeout3dId = setTimeout(next3d, duration);
}

function rotate3d() {
    const angle = (360 / 5) * selectedIndex * -1;
    canvas.style.transform = 'translateZ(' + -radius + 'px) rotateY(' + angle + 'deg)';
}