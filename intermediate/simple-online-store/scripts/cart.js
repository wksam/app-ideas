(function() {
    init();
    function init() {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
        if (localStorage.getItem('shopping-cart') === null)
            localStorage.setItem('shopping-cart', JSON.stringify([]));
        updateCartCount(shoppingCart);
        updateCart(shoppingCart);
    }

    function updateCartCount(shoppingCart) {
        document.querySelector('.cart-count').textContent = '(' + shoppingCart.length + ')';
    }

    function updateCart(shoppingCart) {
        const cart = document.querySelector('.cart');
        cart.textContent = '';
        for (const item of shoppingCart) {
            cart.append(createListItem(item));
        }

        const total = shoppingCart.map(item => item.price * item.quantity).reduce((sum, price) => sum + price);
        cart.append(createTotalItem(total));
    }

    function createListItem(product) {
        const list = document.createElement('li');
        list.setAttribute('class', 'list-group-item');

        const container = document.createElement('div');
        container.setAttribute('class', 'd-flex justify-content-between');

        const leftSide = document.createElement('div');
        leftSide.setAttribute('class', 'flex-column');

        const id = document.createElement('small');
        id.setAttribute('class', 'id text-muted');
        id.textContent = product.id;

        const name = document.createElement('h5');
        name.setAttribute('class', 'name m-0');
        name.textContent = product.name;

        leftSide.append(id);
        leftSide.append(name);

        const rightSide = document.createElement('div');
        rightSide.setAttribute('class', 'd-flex flex-row align-items-center');

        const buttonLeft = document.createElement('button');
        buttonLeft.setAttribute('type', 'button');
        buttonLeft.setAttribute('class', 'btn btn-sm btn-outline-primary');
        buttonLeft.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>';

        const quantity = document.createElement('span');
        quantity.setAttribute('class', 'quantity mx-3');
        quantity.textContent = product.quantity;

        const buttonRight = document.createElement('button');
        buttonRight.setAttribute('type', 'button');
        buttonRight.setAttribute('class', 'btn btn-sm btn-outline-primary');
        buttonRight.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>';

        const price = document.createElement('h5');
        price.setAttribute('class', 'price ml-4 m-0');
        price.textContent = formatCurrency(product.price * product.quantity);

        rightSide.append(buttonLeft);
        rightSide.append(quantity)
        rightSide.append(buttonRight);
        rightSide.append(price);

        container.append(leftSide);
        container.append(rightSide);

        list.append(container);

        return list;
    }

    function createTotalItem(total) {
        const list = document.createElement('li');
        list.setAttribute('class', 'list-group-item');

        const result = document.createElement('h5');
        result.setAttribute('class', 'float-right');
        result.innerHTML = 'Total: <span class="total">' + formatCurrency(total) + '</span>';

        list.append(result);
        return list;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(value);
    }
})();