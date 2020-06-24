let imageUrl;

let topText = '';
let topTextColor = '#000';
let topTextFontSize = 16;

let bottomText = '';
let bottomTextColor = '#000';
let bottomTextFontSize = 16;

let width = 400;
let height = 400;

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent('image-editor');
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
    textSize(topTextFontSize);
    fill(topTextColor);
    text(topText, 0, 0, width, height / 2);

    textAlign(CENTER, BOTTOM);
    textSize(bottomTextFontSize);
    fill(bottomTextColor);
    text(bottomText, 0, height / 2, width, height / 2);
}