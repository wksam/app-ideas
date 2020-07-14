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
            moveTo: { x: random(0, canvas.width), y: random(0, canvas.height) },
            lineTo: { x: random(0, canvas.width), y: random(0, canvas.height) },
            color: { r: random(0, 255), g: random(0, 255), b: random(0, 255), a: 1 },
            direction: { moveTo: { x: random(-25, 25, 0), y: random(-25, 25, 0) }, lineTo: { x: random(-25, 25, 0), y: random(-25, 25, 0) }}
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

        const lastLine = lines[lines.length - 1];
        const newLine = {
            moveTo: Object.assign({}, lastLine.moveTo),
            lineTo: Object.assign({}, lastLine.lineTo),
            color: { r: random(0, 255), g: random(0, 255), b: random(0, 255), a: 1 },
            direction: Object.assign({}, lastLine.direction)
        }

        if (lastLine.direction.moveTo.x > 0 && lastLine.moveTo.x > canvas.width) {
            newLine.direction.moveTo.x = random(-25, -1);
        } else if (lastLine.direction.moveTo.x < 0 && lastLine.moveTo.x < 0) {
            newLine.direction.moveTo.x = random(1, 25);
        }

        if (lastLine.direction.moveTo.y > 0 && lastLine.moveTo.y > canvas.height) {
            newLine.direction.moveTo.y = random(-25, -1);
        } else if (lastLine.direction.moveTo.y < 0 && lastLine.moveTo.y < 0) {
            newLine.direction.moveTo.y = random(1, 25);
        }

        if (lastLine.direction.lineTo.x > 0 && lastLine.lineTo.x > canvas.width) {
            newLine.direction.lineTo.x = random(-25, -1);
        } else if (lastLine.direction.lineTo.x < 0 && lastLine.lineTo.x < 0) {
            newLine.direction.lineTo.x = random(1, 25);
        }

        if (lastLine.direction.lineTo.y > 0 && lastLine.lineTo.y > canvas.height) {
            newLine.direction.lineTo.y = random(-25, -1);
        } else if (lastLine.direction.lineTo.y < 0 && lastLine.lineTo.y < 0) {
            newLine.direction.lineTo.y = random(1, 25);
        }

        newLine.moveTo.x += newLine.direction.moveTo.x;
        newLine.moveTo.y += newLine.direction.moveTo.y;
        newLine.lineTo.x += newLine.direction.lineTo.x;
        newLine.lineTo.y += newLine.direction.lineTo.y;

        lines.push(newLine);

        if(lines.length > 20)
            lines.shift();

        fixAlpha();
    }

    function random(min, max, exclude) {
        let n;
        do {
            n = Math.random() * (max - min) + min;
        } while (n === exclude);
        return n;
    }

    function fixAlpha() {
        let alpha = 1;
        for (let i = lines.length - 1; i >= 0; i--) {
            lines[i].color.a = alpha;
            alpha -= 0.05;
        }
    }
})();