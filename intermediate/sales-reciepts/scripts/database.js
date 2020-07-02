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
            objectStore.createObjectStore('data', 'data', { unique: false });
            objectStore.createObjectStore('description', 'description', { unique: false });
            objectStore.createObjectStore('user_id', 'user_id', { unique: false });
            objectStore.createObjectStore('product_id', 'product_id', { unique: false });
        }
    };

    addSales = (salesData) => {
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
                // Add function update UI
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
            objectStoreRequest.onsuccess = (event) => {
                // Add function update UI
            }
        }
    }
}