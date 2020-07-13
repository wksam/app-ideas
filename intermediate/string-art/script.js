(function(){
    let count = 0;
    let invert = false;
    let intervalId;
    const lines = [];

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    init();
    function init() {
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
        
        context.lineWidth = 3;
        const line = {
            moveTo: { x: 0, y: 0 },
            lineTo: { x: 0, y: canvas.height },
            color: { r: 0, g: 255, b: 255, a: 1 }
        }
        lines.push(line);

        clearInterval(intervalId);
        intervalId = setInterval(draw, 20);
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const line of lines) {
            context.beginPath();
            context.moveTo(line.moveTo.x, line.moveTo.y);
            context.lineTo(line.lineTo.x, line.lineTo.y);
            context.strokeStyle = `rgba(${line.color.r}, ${line.color.g}, ${line.color.b}, ${line.color.a})`;
            context.stroke();
        }

        if(!invert) {
            if(count > canvas.width) {
                invert = true;
            }
        } else {
            if(count < 0) {
                invert = false;
            }
        }

        if(!invert)
            count += 5;
        else
            count -= 5;

        const line = {
            moveTo: { x: count, y: 0 },
            lineTo: { x: count, y: canvas.height },
            color: { r: 0, g: 0, b: 0, a: 1 }
        }
        lines.push(line);

        if(lines.length > 20)
            lines.shift();

        let alpha = 1;
        for (let i = lines.length - 1; i >= 0; i--) {
            lines[i].color.a = alpha;
            alpha -= 0.05;
        }
    }
})();