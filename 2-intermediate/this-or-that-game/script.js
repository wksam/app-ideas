(function() {
    let selectedImages = [];

    const categoriesUrl = {
        dog: { 
            url: 'https://dog.ceo/api/breeds/image/random',
            imgKey: 'message',
            isArray: false
        },
        cat: { 
            url: 'https://api.thecatapi.com/v1/images/search', 
            imgKey: 'url',
            isArray: true
        }
    };

    start();
    function start() {
        selectedImages = [];
        document.querySelector('.selected').textContent = '';
        
        fetchImage(document.querySelector('#category').value, 'this');
        fetchImage(document.querySelector('#category').value, 'that');
    }

    function next() {
        fetchImage(document.querySelector('#category').value, 'this');
        fetchImage(document.querySelector('#category').value, 'that');
    }

    document.querySelector('#category').addEventListener('change', search);
    function search(e) {
        selectedImages = [];
        document.querySelector('.selected').textContent = '';

        fetchImage(e.target.value, 'this');
        fetchImage(e.target.value, 'that');
    }
    
    function fetchImage(category, which) {
        const url = categoriesUrl[category].url;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                if(!categoriesUrl[category].isArray)
                    setImageUI(result[categoriesUrl[category].imgKey], which);
                else
                    setImageUI(result[0][categoriesUrl[category].imgKey], which);
            });
    }

    function setImageUI(imageUrl, which) {
        document.querySelector(`#${which}`).src = imageUrl;
    }

    document.querySelector('#this').addEventListener('click', select);
    document.querySelector('#that').addEventListener('click', select);
    function select(e) {
        const imgUrl = e.currentTarget.src;
        const index = selectedImages.findIndex(item => item.url === imgUrl);

        if(index !== -1) {
            selectedImages[index].count++;
        } else {
            selectedImages.push({ url: imgUrl, count: 1 });
            addImage(imgUrl);
        }
        next();
    }

    function addImage(imgUrl) {
        const selectedContainer = document.querySelector('.selected');
        selectedContainer.prepend(createSelectedImage(imgUrl));
    }

    function createSelectedImage(imgUrl) {
        const image = document.createElement('img');
        image.src = imgUrl;
        image.setAttribute('class', 'm-1 img-thumbnail order-1');
        image.setAttribute('alt', 'Selected Image');
        return image;
    }
})();