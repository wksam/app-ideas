(function() {
    init();
    function init() {
        const productContainer = document.querySelector('.products');
        productContainer.textContent = '';

        for (const product of productList) {
            productContainer.append(createProductCard(product));
        }
        updateCart();
    }

    function createProductCard(product) {
        const container = document.createElement('div');
        container.setAttribute('class', 'col mb-4');

        const card = document.createElement('div');
        card.setAttribute('class', 'product card h-100');

        const img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', product.thumbnail);
        img.setAttribute('alt', 'Product Image');

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title text-primary');
        cardTitle.textContent = product.name;

        const cardDescription = document.createElement('p');
        cardDescription.setAttribute('class', 'card-text text-black-50');
        cardDescription.textContent = product.short_description;

        const cardPrice = document.createElement('h4');
        cardPrice.setAttribute('class', 'card-text text-secondary');
        cardPrice.textContent = '$' + product.price;

        const link = document.createElement('a');
        link.setAttribute('href', 'product.html?id=' + product.id);
        link.setAttribute('class', 'float-right')
        link.textContent = 'See More';

        container.append(card);
        card.append(img);
        card.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardDescription);
        cardBody.append(cardPrice);
        cardBody.append(link);

        return container;
    }

    function updateCart() {
        document.querySelector('.cart').textContent = '(' + shoppingCard.length + ')';
    }
})();