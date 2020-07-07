(function() {
    init();
    function init() {
        updateCart();
    }

    function updateCart() {
        document.querySelector('.cart').textContent = '(' + shoppingCard.length + ')';
    }
})();