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
        purchase.addEventListener('click', onPurchase);

        item.append(description);
        item.append(price);
        item.append(purchase);

        return item;
    }

    function onPurchase(e) {
        const item = e.target.parentElement;
        const id = item.querySelector('.badge').textContent;
        const description = item.querySelector('h5').childNodes[0].nodeValue;
        const price = item.querySelector('h3').textContent;

        updateRecieptList(id, description, price);
    }

    function updateRecieptList(itemId, itemDescription, itemPrice) {
        const item = document.querySelector('#' + itemId);
        const recieptPanel = document.querySelector('.reciept-panel');

        if(item !== null) {
            const currentAmount = parseInt(item.querySelector('.recieptItemAmount').textContent);
            item.querySelector('.recieptItemAmount').textContent = currentAmount + 1;
        } else {
            const lastRow = recieptPanel.querySelector('tbody tr:last-child');
            const lastIndex = lastRow !== null ? parseInt(lastRow.querySelector('th[scope=row]').textContent) : 0;
            recieptPanel.querySelector('tbody').append(createRecieptTableRowItem(lastIndex, itemId, itemDescription, itemPrice));
        }
    }

    function createRecieptTableRowItem(lastIndex, itemId, itemDescription, itemPrice) {
        const row = document.createElement('tr');
        row.setAttribute('id', itemId);

        const index = document.createElement('th');
        index.setAttribute('scope', 'row');
        index.textContent = lastIndex + 1;

        const id = document.createElement('td');
        id.setAttribute('class', 'recieptItemId')
        id.textContent = itemId;

        const date = document.createElement('td');
        date.setAttribute('class', 'recieptItemDate')
        date.textContent = (new Date()).toString();

        const amount = document.createElement('td');
        amount.setAttribute('class', 'recieptItemAmount');
        amount.textContent = 1;

        const description = document.createElement('td');
        description.setAttribute('class', 'recieptItemDescription')
        description.textContent = itemDescription;

        const price = document.createElement('td');
        price.setAttribute('class', 'recieptItemPrice');
        price.textContent = itemPrice;

        row.append(index);
        row.append(id);
        row.append(date);
        row.append(amount);
        row.append(description);
        row.append(price);

        return row;
    }
})();