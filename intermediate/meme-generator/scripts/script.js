(function() {
    document.querySelector('image-url').addEventListener('input', onChangeUrl);
    function onChangeUrl() {
        imageUrl = this.value;
    }
})();