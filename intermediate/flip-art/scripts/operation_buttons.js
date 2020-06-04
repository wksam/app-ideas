document.querySelector('.start').addEventListener('click', startAnimation);
document.querySelector('.clear').addEventListener('click', clearConfiguration);

function startAnimation() {
    const images = document.querySelectorAll('.uploaded-image');
    for (let i = 0; i < images.length; i++) {
        setTimeout(function() { changeImage(images[i].getAttribute('src')); }, 50 * i);
    }
}

function changeImage(data) {
    document.querySelector('.animation').setAttribute('src', data);
}

function clearConfiguration() {
    document.querySelector('.timeline').textContent = '';
}