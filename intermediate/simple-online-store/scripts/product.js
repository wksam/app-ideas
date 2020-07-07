// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// console.log(urlParams.get('id'));
(function() {
    init();
    function init() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product = productList.find(value => value.id === urlParams.get('id'));
        fillProduct(product);
        updateCart();
    }

    function fillProduct(product) {
        document.querySelector('#thumbnail').src = product.thumbnail;
        document.querySelector('#id').textContent = product.id;
        document.querySelector('#name').textContent = product.name;
        document.querySelector('#description').textContent = product.long_description;
        document.querySelector('#price').textContent = '$' + product.price;
    }

    function updateCart() {
        document.querySelector('.cart').textContent = '(' + shoppingCard.length + ')';
    }
})();