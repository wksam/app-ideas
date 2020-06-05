(function() {
    const startButton = document.querySelector('.start');
    const clearButton = document.querySelector('.clear');
    const downloadButton = document.querySelector('.download');

    startButton.addEventListener('click', startAnimation);
    clearButton.addEventListener('click', clearConfiguration);
    downloadButton.addEventListener('click', download);
    
    let animationImages;
    let timeoutId;
    let index = 0;
    let isPlaying = false;
    let isLoop = false;
    
    function startAnimation() {
        changeToPause();
        animationImages = document.querySelectorAll('.uploaded-image');

        if(!isPlaying)
            playAnimation();
        else
            pauseAnimation();
    }

    function playAnimation() {
        const speed = document.querySelector('#speed');
        clearButton.disabled = true;
        downloadButton.disabled = true;
        if(index < animationImages.length) {
            isPlaying = true;
            changeImage(animationImages[index].getAttribute('src'));
            changeHighlight();
            timeoutId = setTimeout(playAnimation, speed.value);
            index++;
        } else {
            animationImages[animationImages.length - 1].classList.remove('highlight');
            index = 0;
            if(!isLoop) {
                pauseAnimation();
            } else {
                timeoutId = setTimeout(playAnimation, speed.value);
            }
        }
    }

    function pauseAnimation() {
        clearButton.disabled = false;
        if(gifshot.isSupported()) downloadButton.disabled = false;
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
        downloadButton.disabled = true;

        changeToStart();
        clearTimeout(timeoutId);
        timeoutId = 0;
        isPlaying = false;
        index = 0;
        
        console.log('clear')
    }

    function changeToPause() {
        startButton.querySelector('.bi-play-fill').classList.add('invisible');
        startButton.querySelector('.bi-pause-fill').classList.remove('invisible');
    }

    function changeToStart() {
        startButton.querySelector('.bi-play-fill').classList.remove('invisible');
        startButton.querySelector('.bi-pause-fill').classList.add('invisible');
    }

    document.querySelector('#loop').addEventListener('change', changeLoop);
    function changeLoop(e) {
        isLoop = e.target.checked;
    }

    function download() {
        gifshot.createGIF({
            images: Array.from(document.querySelectorAll('.uploaded-image')).map(image => image.src),
            interval: document.querySelector('#speed').value / 1000,
            numWorkers: 2
        },function(obj) {
            if(!obj.error) {
                const image = obj.image,
                animatedImage = document.createElement('a');
                animatedImage.href = image;
                animatedImage.download = 'animation.gif'
                animatedImage.click();
            }
        });
    }
})();