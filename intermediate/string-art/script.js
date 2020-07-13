(function(){
    let count = 0;
    let invert = false;
    let intervalId;

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    init();
    function init() {
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
        
        context.lineWidth = 3;

        clearInterval(intervalId);
        intervalId = setInterval(draw, 20);
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath();
        context.moveTo(count, 0);
        context.lineTo(count, canvas.height);
        context.stroke();

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
            count++;
        else
            count--;
    }
})();