// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// console.log(urlParams.get('id'));
(function() {
    let product;

    init();
    function init() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        product = productList.find(value => value.id === urlParams.get('id'));
        fillProduct(product);
        
        if (localStorage.getItem('shopping-cart') === null)
            localStorage.setItem('shopping-cart', JSON.stringify([]));
        updateCartCount();
    }

    function fillProduct(product) {
        document.querySelector('#thumbnail').src = product.thumbnail;
        document.querySelector('#id').textContent = product.id;
        document.querySelector('#name').textContent = product.name;
        document.querySelector('#description').textContent = product.long_description;
        document.querySelector('#price').textContent = formatCurrency(product.price);
    }

    function updateCartCount() {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
        document.querySelector('.cart-count').textContent = '(' + shoppingCart.map(item => item.quantity).reduce((sum, current) => sum + current) + ')';
    }

    document.querySelector('#cart').addEventListener('click', onAddCart);
    function onAddCart(e) {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
        const hasItem = shoppingCart.find(item => item.id === product.id);

        if(!hasItem) {
            product['quantity'] = 1;
            shoppingCart.push(product);
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
            alert(product.name + ' Added to Cart');
        } else {
            alert(product.name + ' Already in Cart');
        }
    }
})();