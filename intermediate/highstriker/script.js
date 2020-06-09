(function() {
    document.querySelector('.platform').addEventListener('click', startGame);
    
    let isPlaying = false;
    let isAnimating = false;

    let attempts = 0;
    let struck = 0;

    function startGame() {
        if(!isAnimating) {
            if(!isPlaying) {
                startStrengthBar();
                changeText(document.querySelector('.platform>h2'), 'Strike!');
            } else {
                attempts++;
                updateAttempts();
                pauseStrengthBar();
                changeText(document.querySelector('.platform>h2'), 'Play');
                setTimeout(() => { puckAnimationUp((getStrengthPercent() * 500) - 25) }, 50);
            }
            isPlaying = !isPlaying;
        }
    }
    
    function getStrengthPercent() {
        return parseFloat(getComputedStyle(document.querySelector('.progress-strength')).getPropertyValue('height').replace('px', '')) / 250;
    }
    
    function pauseStrengthBar() {
        document.querySelector('.progress-strength').classList.add('bar-pause');
    }
    
    function startStrengthBar() {
        document.querySelector('.progress-strength').classList.remove('bar-pause');
    }

    function changeText(elem, text) {
        elem.textContent = text;
    }

    function puckAnimationUp(height) {
        isAnimating = true;
        const puck = document.querySelector('.puck');
        let puckHeight = puck.style.bottom !== '' ? parseInt(puck.style.bottom.replace('px', '')) : -25;
        if(puckHeight < height) {
            puckHeight += 5;
            puck.style.bottom = puckHeight + 'px';
            setTimeout(() => { puckAnimationUp(height); }, 5);
        } else {
            if(puckHeight > 460) {
                struck++;
                updateStruck();
                playSound();
            }
            setTimeout(() => { puckAnimationDown(); }, 5);
        }
    }

    function puckAnimationDown() {
        const puck = document.querySelector('.puck');
        let puckHeight = parseInt(puck.style.bottom);
        if(puckHeight > -25) {
            puckHeight -= 5;
            puck.style.bottom = puckHeight + 'px';
            setTimeout(() => { puckAnimationDown(); }, 5);
        } else {
            isAnimating = false;
        }
    }

    function playSound() {
        document.querySelector('audio').play();
    }

    function updateAttempts() {
        document.querySelector('.attempts').textContent = attempts;
    }

    function updateStruck() {
        document.querySelector('.struck').textContent = struck;
    }

    document.querySelector('.clear').addEventListener('click', clear);
    function clear() {
        attempts = 0;
        struck = 0;
        updateAttempts();
        updateStruck();
    }
})();