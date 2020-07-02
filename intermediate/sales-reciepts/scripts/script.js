(function() {
    const db = new Reciept();
    init();

    function init() {
        db.initDatabase();

        const recieptPanel = document.querySelector('.reciept-panel');
        recieptPanel.querySelector('tbody').textContent = '';

        const purchaseItems = document.querySelector('.purchase-items');
        purchaseItems.textContent = '';
        
        addProducts(purchaseItems, productsData);
    }

    function addProducts(parent, products) {
        for (const product of products) {
            parent.append(createProductItem(product));
        }
    }

    function createProductItem(product) {
        const item = document.createElement('li');
        item.setAttribute('class', 'list-group-item');

        const description = document.createElement('h5');
        const id = document.createElement('span');
        id.setAttribute('class', 'badge badge-secondary float-right');
        id.setAttribute('style', 'opacity: 50%');
        id.textContent = product.id;
        description.append(product.description);
        description.append(id);

        const price = document.createElement('h3');
        price.setAttribute('class', 'float-left');
        price.textContent = product.price + ' G';

        const purchase = document.createElement('button');
        purchase.setAttribute('type', 'button');
        purchase.setAttribute('class', 'btn btn-primary float-right');
        purchase.textContent = 'Purchase';

        item.append(description);
        item.append(price);
        item.append(purchase);

        return item;
    }
})();