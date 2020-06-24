(function() {
    document.querySelector('#image-url').addEventListener('input', onChangeUrl);
    function onChangeUrl() {
        imageUrl = this.value;
        redraw();
    }

    document.querySelector('#top-text').addEventListener('input', onChangeTopText);
    function onChangeTopText() {
        topText = this.value;
        redraw();
    }

    document.querySelector('#bottom-text').addEventListener('input', onChangeBottomText);
    function onChangeBottomText() {
        bottomText = this.value;
        redraw();
    }
})();