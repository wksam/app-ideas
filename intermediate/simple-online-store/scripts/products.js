(function() {
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('click', onSelectProduct);
    });
    
    function onSelectProduct(e) {
        console.log(e.currentTarget);
    }
})();