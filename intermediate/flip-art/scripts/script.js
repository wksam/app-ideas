document.querySelector('.upload').addEventListener('click', upload);
document.querySelector('input[type=file]').addEventListener('change', readURL);

function upload() {
    document.querySelector('input[type=file]').click();
}

function readURL(input) {
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
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'img-container');
    imgContainer.addEventListener('click', removeImage);

    const img = document.createElement('img');
    img.setAttribute('src', imgData);
    img.setAttribute('class', 'uploaded-image');
    
    imgContainer.append(img);
    document.querySelector('.panel').prepend(imgContainer);
}

function removeImage(e) {
    e.target.remove();
}