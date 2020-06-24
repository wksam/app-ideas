let imageUrl;
let textTop;
let textBottom;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('image-editor');
}

function draw() {
    if(imageUrl) {
        loadImage(imageUrl, img => {
            resizeCanvas(img.width, img.height);
            image(img, 0, 0);
        });
        imageUrl = null;
    }

    // if(textTop) {
    //     console.log('top')
    // }

    // if(textBottom) {
    //     console.log('bottom')
    // }
}