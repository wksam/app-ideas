(function() {
    document.querySelector('.upload').addEventListener('click', upload);
    document.querySelector('input[type=file]').addEventListener('change', readURL);
    
    function upload() {
        document.querySelector('input[type=file]').click();
    }
    
    function readURL(input) {
        if(input.target.files) {
            document.querySelector('.start').disabled = false;
            document.querySelector('.clear').disabled = false;
            if(gifshot.isSupported()) document.querySelector('.download').disabled = false;
            for (const file of input.target.files) {
                const reader = new FileReader();
                reader.addEventListener('load', onLoadImage);
                reader.readAsDataURL(file);
            }
            input.target.value = '';
        }
    }
    
    function onLoadImage(e) {
        createImage(e.target.result);
    }
    
    function createImage(imgData) {
        const timeline = document.querySelector('.timeline');

        const imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'img-container');
        imgContainer.addEventListener('click', removeImage);
    
        const img = document.createElement('img');
        img.setAttribute('src', imgData);
        img.setAttribute('class', 'uploaded-image');
        
        imgContainer.append(img);
        timeline.append(imgContainer);
        timeline.scrollLeft += 100;
    }
    
    function removeImage(e) {
        e.target.remove();
        if(document.querySelectorAll('.uploaded-image').length === 0) {
            document.querySelector('.start').disabled = true;
            document.querySelector('.clear').disabled = true;
            document.querySelector('.download').disabled = true;
        }
    }

    document.querySelector('#speed').addEventListener('input', updateSpeedValue);
    function updateSpeedValue(e) {
        document.querySelector('.speed-output').textContent = e.target.value + 'ms';
    }
})();