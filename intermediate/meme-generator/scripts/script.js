(function() {
    document.querySelector('#image-url').addEventListener('input', onChangeUrl);
    function onChangeUrl() {
        imageUrl = this.value;
    }

    document.querySelector('#top-text').addEventListener('input', onChangeTopText);
    function onChangeTopText() {
        topText = this.value;
    }

    document.querySelector('#top-text-color').addEventListener('input', onChangeTopTextColor);
    function onChangeTopTextColor() {
        topTextColor = this.value;
    }

    document.querySelector('#top-text-font-size').addEventListener('input', onChangeTopTextFontSize);
    function onChangeTopTextFontSize() {
        topTextFontSize = parseInt(this.value);
    }

    document.querySelector('#bottom-text').addEventListener('input', onChangeBottomText);
    function onChangeBottomText() {
        bottomText = this.value;
    }

    document.querySelector('#bottom-text-color').addEventListener('input', onChangeBottomTextColor);
    function onChangeBottomTextColor() {
        bottomTextColor = this.value;
    }

    document.querySelector('#bottom-text-font-size').addEventListener('input', onChangeBottomTextFontSize);
    function onChangeBottomTextFontSize() {
        bottomTextFontSize = parseInt(this.value);
    }
})();