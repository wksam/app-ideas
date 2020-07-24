class Reciept {
    constructor() {
        this.dbName = 'reciepts_db';
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }
    }

    initDatabase = () => {
        const request = indexedDB.open(this.dbName);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('sales', { autoIncrement: true });
            objectStore.createIndex('data', 'data', { unique: false });
            objectStore.createIndex('description', 'description', { unique: false });
            objectStore.createIndex('user_id', 'user_id', { unique: false });
            objectStore.createIndex('product_id', 'product_id', { unique: false });
            objectStore.createIndex('customer_name', 'customer_name', { unique: false });
        }
    };

    addSales = (salesData) => {
        const request = indexedDB.open(this.dbName);
        request.onsuccess = (event) => {
            const db = event.target.result;

            for (const saleData of salesData) {
                this.addSale(saleData);
            }
        }
    }

    addSale = (saleData, db) => {
        if(db != null) {
            const transaction = db.transaction(['sales'], 'readwrite');
            add(saleData, transaction);
        } else {
            const request = indexedDB.open(this.dbName);
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['sales'], 'readwrite');
                add(saleData, transaction);
            }
        }

        function add(data, transaction) {    
            const objectStore = transaction.objectStore('sales');
            objectStore.put(data);
        }
    }

    getSales = () => {
        const request = indexedDB.open(this.dbName);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['sales'], 'readonly');
            const objectStore = transaction.objectStore('sales');
            
            const objectStoreRequest = objectStore.getAll();
            objectStoreRequest.onsuccess = (event) => {
                fillRecieptPanel(event.target.result);
            }
        }
    }

    removeSales = () => {
        const request = indexedDB.open(this.dbName);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['sales'], 'readwrite');
            const objectStore = transaction.objectStore('sales');
            const objectStoreRequest = objectStore.clear();
        }
    }
}