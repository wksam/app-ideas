(function() {
    document.querySelector('#image-url').addEventListener('input', onChangeUrl);
    function onChangeUrl() {
        p.setImageUrl(this.value);
    }

    document.querySelector('#top-text').addEventListener('input', onChangeTopText);
    function onChangeTopText() {
        p.setTopText(this.value);
    }

    document.querySelector('#top-text-color').addEventListener('input', onChangeTopTextColor);
    function onChangeTopTextColor() {
        p.setTopTextColor(this.value);
    }

    document.querySelector('#top-text-font-size').addEventListener('input', onChangeTopTextFontSize);
    function onChangeTopTextFontSize() {
        p.setTopTextFontSize(parseInt(this.value));
    }

    document.querySelector('#bottom-text').addEventListener('input', onChangeBottomText);
    function onChangeBottomText() {
        p.setBottomText(this.value);
    }

    document.querySelector('#bottom-text-color').addEventListener('input', onChangeBottomTextColor);
    function onChangeBottomTextColor() {
        p.setBottomTextColor(this.value);
    }

    document.querySelector('#bottom-text-font-size').addEventListener('input', onChangeBottomTextFontSize);
    function onChangeBottomTextFontSize() {
        p.setBottomTextFontSize(parseInt(this.value));
    }

    document.querySelector('#save').addEventListener('click', onSave);
    function onSave() {
        p.save();
    }
})();