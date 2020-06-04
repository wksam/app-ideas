document.querySelector('.upload').addEventListener('click', upload);
document.querySelector('input[type=file]').addEventListener('change', readURL);

function upload() {
    document.querySelector('input[type=file]').click();
}

function readURL(input) {
    console.log(input.target.files)
    if(input.target.files) {
        for (const file of input.target.files) {
            const reader = new FileReader();
            reader.addEventListener('load', onLoadImage);
            reader.readAsDataURL(file);
        }
    }
}

function onLoadImage(e) {
    createImage(e.target.result)
}

function createImage(imgData) {
    const img = document.createElement('img');
    img.setAttribute('src', imgData);
    img.setAttribute('class', 'uploaded-image');
    document.querySelector('.panel').prepend(img);
}