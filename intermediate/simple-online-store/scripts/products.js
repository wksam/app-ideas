(function() {
    init();
    function init() {
        const productContainer = document.querySelector('.products');
        productContainer.textContent = '';

        for (const product of productList) {
            productContainer.append(createProductCard(product));
        }
    }

    function createProductCard(product) {
        const container = document.createElement('div');
        container.setAttribute('class', 'col mb-4');

        const card = document.createElement('div');
        card.setAttribute('class', 'product card h-100');
        card.setAttribute('data-id', product.id);
        card.addEventListener('click', onClickProduct);

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
        cardPrice.textContent = product.price;

        container.append(card);
        card.append(img);
        card.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(cardDescription);
        cardBody.append(cardPrice);

        return container;
    }

    function onClickProduct(e) {
        const id = e.currentTarget.dataset.id;
        const url = 'product.html?id=' + id;
        window.location.replace(url);
    }
})();