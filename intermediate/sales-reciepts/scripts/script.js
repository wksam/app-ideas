const db = new Reciept();
let dailyActived = false;
let itemAdded = [];

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
    if(dailyActived) { document.querySelector('.reciept-panel tbody').textContent = ''; dailyActived = false; }
    const item = e.target.parentElement;
    const id = item.querySelector('.badge').textContent;
    const description = item.querySelector('h5').childNodes[0].nodeValue;
    const price = item.querySelector('h3').textContent;
    itemAdded.push(id);

    updateRecieptList(id, description, price);
}

function updateRecieptList(itemId, itemDescription, itemPrice) {
    const item = document.querySelector('#' + itemId);
    const recieptPanel = document.querySelector('.reciept-panel');

    if(item !== null) {
        const currentAmount = parseInt(item.querySelector('.recieptItemAmount').textContent);
        item.querySelector('.recieptItemAmount').textContent = currentAmount + 1;
    } else {
        togglePurchaseButtons(false);
        const lastRow = recieptPanel.querySelector('tbody tr:last-child');
        const lastIndex = lastRow !== null ? parseInt(lastRow.querySelector('th[scope=row]').textContent) : 0;
        recieptPanel.querySelector('tbody').append(createRecieptTableRowItem(lastIndex, itemId, itemDescription, itemPrice));
    }
}

function createRecieptTableRowItem(lastIndex, itemId, itemDescription, itemPrice, itemData = null, itemAmount = null) {
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
    date.textContent = itemData !== null ? itemData : (new Date()).toString();

    const amount = document.createElement('td');
    amount.setAttribute('class', 'recieptItemAmount');
    amount.textContent = itemAmount !== null ? itemAmount : 1;

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

function clearReciept() {
    document.querySelector('.reciept-panel tbody').textContent = '';
}

function togglePurchaseButtons(disable) {   
    document.querySelector('.checkout').disabled = disable;
    document.querySelector('.clear-entry').disabled = disable;
    document.querySelector('.cancel-all').disabled = disable;
}

document.querySelector('.clear-entry').addEventListener('click', onClearEntry);
function onClearEntry() {
    const lastId = itemAdded.pop();
    const lastItem = document.querySelector('#' + lastId);
    const amount = parseInt(lastItem.querySelector('.recieptItemAmount').textContent);
    
    if(amount > 1) {
        lastItem.querySelector('.recieptItemAmount').textContent = amount - 1;
    } else {
        lastItem.remove();
    }

    if(itemAdded.length > 0) return;
    togglePurchaseButtons(true);
}

document.querySelector('.cancel-all').addEventListener('click', onCancelAll);
function onCancelAll(e) {
    clearReciept();
    itemAdded = [];
    togglePurchaseButtons(true);
}

document.querySelector('.checkout').addEventListener('click', onCheckout);
function onCheckout(e) {
    const items = document.querySelectorAll('.reciept-panel tbody tr');
    const data = rowsToJson(items);
    itemAdded = [];
    db.addSales(data);

    clearReciept();
    togglePurchaseButtons(true);
}

function rowsToJson(rows) {
    const productsPurchased = [];
    for (const row of rows) {
        productsPurchased.push(rowToJson(row));
    }
    return productsPurchased;
}

function rowToJson(row) {
    const item = {};
    item['product_id'] = row.querySelector('.recieptItemId').textContent;
    item['purchase_data'] = (new Date()).toString();
    item['amount'] = row.querySelector('.recieptItemAmount').textContent;
    item['description'] = row.querySelector('.recieptItemDescription').textContent;
    item['price'] = row.querySelector('.recieptItemPrice').textContent;
    return item;
}

document.querySelector('.daily-sales').addEventListener('click', onGetAll);
function onGetAll() {
    dailyActived = true;
    itemAdded = [];
    clearReciept();
    togglePurchaseButtons(true);

    db.getSales();
}

function fillRecieptPanel(data) {
    const recieptList = document.querySelector('.reciept-panel tbody');

    for (let i = 0; i < data.length; i++) {
        recieptList.append(createRecieptTableRowItem(i, data[i].product_id, data[i].description, data[i].price, data[i].purchase_data, data[i].amount));
    }
}

document.querySelector('.clear-all').addEventListener('click', onClearAll);
function onClearAll() {
    db.removeSales();
}