document.querySelector('.upload').addEventListener('click', upload);
document.querySelector('input[type=file]').addEventListener('change', readURL);

function upload() {
    document.querySelector('input[type=file]').click();
}

function readURL(input) {
    console.log(input.target.files)
    if(input.target.files && input.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.setAttribute('src', e.target.result);
            img.setAttribute('class', 'uploaded-image');
            document.querySelector('.panel').prepend(img);
        }

        reader.readAsDataURL(input.target.files[0]);
    }
}