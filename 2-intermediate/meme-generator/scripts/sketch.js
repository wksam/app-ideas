let p = new p5((sketch) => {
    let imageUrl;

    let topText = '';
    let topTextColor = '#000';
    let topTextFontSize = 16;

    let bottomText = '';
    let bottomTextColor = '#000';
    let bottomTextFontSize = 16;

    let width = 0;
    let height = 0;

    let needRedraw = false;

    sketch.setImageUrl = (value) => {
        imageUrl = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setTopText = (value) => {
        topText = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setTopTextColor = (value) => {
        topTextColor = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setTopTextFontSize = (value) => {
        topTextFontSize = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setBottomText = (value) => {
        bottomText = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setBottomTextColor = (value) => {
        bottomTextColor = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setBottomTextFontSize = (value) => {
        bottomTextFontSize = value;
        needRedraw = true;
        sketch.redraw();
    }

    sketch.setup = () => {
        sketch.createCanvas(width, height);
        sketch.noLoop();
    }

    sketch.draw = () => {
        if(needRedraw) {
            if(imageUrl) {
                sketch.loadImage(imageUrl, img => {
                    sketch.resizeCanvas(img.width, img.height);
                    sketch.image(img, 0, 0);
                    width = img.width;
                    height = img.height;
                    
                    sketch.textAlign(sketch.CENTER, sketch.TOP);
                    sketch.textSize(topTextFontSize);
                    sketch.fill(topTextColor);
                    sketch.text(topText, 0, 0, width, height / 2);

                    sketch.textAlign(sketch.CENTER, sketch.BOTTOM);
                    sketch.textSize(bottomTextFontSize);
                    sketch.fill(bottomTextColor);
                    sketch.text(bottomText, 0, height / 2, width, height / 2);   
                }, err => {
                    imageUrl = null;
                    sketch.resizeCanvas(width, height);
                });
            } else {
                sketch.resizeCanvas(width, height);
            }

            needRedraw = false;
        }
    }

    sketch.save = () => {
        sketch.saveCanvas('meme', 'jpg');
    }

}, 'image-editor');