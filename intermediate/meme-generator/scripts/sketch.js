let imageUrl;
let topText;
let bottomText;

let width = 400;
let height = 400;

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent('image-editor');

    textSize(32);
    noLoop();
}

function draw() {
    if(imageUrl) {
        loadImage(imageUrl, img => {
            resizeCanvas(img.width, img.height);
            image(img, 0, 0);
            width = img.width;
            height = img.height;
        }, err => {
            imageUrl = null;
            resizeCanvas(width, height);
        });
    } else {
        resizeCanvas(width, height);
    }

    textAlign(CENTER, TOP);
    text(topText, 0, 0, width, height / 2);

    textAlign(CENTER, BOTTOM);
    text(bottomText, 0, height / 2, width, height / 2);
}