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
function init() {
    timeoutId = setTimeout(next, duration);
}
init();