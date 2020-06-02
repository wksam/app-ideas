(function() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    resize();

    let pos = { x: 0, y: 0 };
    let color = '#000';
    let size = 5;

    window.addEventListener('resize', resize);
    document.querySelector('canvas').addEventListener('touchend', drawStart);
    document.querySelector('canvas').addEventListener('mousedown', drawStart);

    function drawStart(e) {
        if(e.touches !== undefined) {
            setPosition(e.touches[0].clientX, e.touches[0].clientY);
        } else {
            setPosition(e.clientX, e.clientY);
        }

        document.querySelector('canvas').addEventListener('mousemove', draw);
        document.querySelector('canvas').addEventListener('touchmove', draw);
        document.querySelector('canvas').addEventListener('mouseup', drawEnd);
        document.querySelector('canvas').addEventListener('touchend', drawEnd);
    }

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
        if((e.buttons !== undefined && e.buttons === 1) || (e.touches !== undefined && e.touches.length > 0)) {
            if(e.target.nodeName.toLowerCase() == 'canvas' && !isDragging) {
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
        } else {
            drawEnd();
        }
    }

    function drawEnd() {
        document.querySelector('canvas').removeEventListener('mouseup', drawEnd);
        document.querySelector('canvas').removeEventListener('touchend', drawEnd);
        document.querySelector('canvas').removeEventListener('mousemove', draw);
        document.querySelector('canvas').removeEventListener('touchmove', draw);
    }

    document.querySelectorAll('button.color').forEach(function(button) { button.addEventListener('click', changeColor); });
    document.querySelector('input[type=range]').addEventListener('change', changeSize);
    document.querySelector('.clear').addEventListener('click', clear);
    document.querySelector('.save').addEventListener('click', save);

    function changeColor(e) {
        color = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
    }
    
    function changeSize(e) {
        size = e.target.value;
    }
    
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function save() {
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'drawing.png';
        a.click();
    }
})();