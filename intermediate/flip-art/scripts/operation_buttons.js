(function() {
    const startButton = document.querySelector('.start');
    const clearButton = document.querySelector('.clear');
    let animationImages;
    let timeoutId;
    let index = 0;
    let isPlaying = false;

    startButton.addEventListener('click', startAnimation);
    clearButton.addEventListener('click', clearConfiguration);
    
    function startAnimation() {
        changeToPause();
        animationImages = document.querySelectorAll('.uploaded-image');

        if(!isPlaying)
            playAnimation();
        else
            pauseAnimation();
    }

    function playAnimation() {
        if(index < animationImages.length) {
            const speed = document.querySelector('#speed');
            isPlaying = true;
            changeImage(animationImages[index].getAttribute('src'));
            changeHighlight();
            timeoutId = setTimeout(playAnimation, speed.value);
            index++;
        } else {
            changeToStart();
            animationImages[index - 1].classList.remove('highlight');
            isPlaying = false;
            index = 0;
        }
    }

    function pauseAnimation() {
        changeToStart();
        isPlaying = false;
        clearTimeout(timeoutId);
    }
    
    function changeImage(data) {
        document.querySelector('.animation').setAttribute('src', data);
    }

    function changeHighlight() {
        animationImages[index].classList.add('highlight');
        if(index > 0) animationImages[index - 1].classList.remove('highlight');
    }
    
    function clearConfiguration() {
        document.querySelector('.timeline').textContent = '';
        document.querySelector('.animation').src = '#';
        startButton.disabled = true;
        clearButton.disabled = true;

        changeToStart();
        clearTimeout(timeoutId);
        timeoutId = 0;
        isPlaying = false;
        index = 0;
    }

    function changeToPause() {
        startButton.querySelector('.bi-play-fill').classList.add('invisible');
        startButton.querySelector('.bi-pause-fill').classList.remove('invisible');
    }

    function changeToStart() {
        startButton.querySelector('.bi-play-fill').classList.remove('invisible');
        startButton.querySelector('.bi-pause-fill').classList.add('invisible');
    }
})();