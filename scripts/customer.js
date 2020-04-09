class Customer {
    constructor(dbName) {
        this.dbName = dbName;
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. \
                Such and such feature will not be available.");
        }
    }
  
    /**
     * Remove all rows from the database
     * @memberof Customer
     */
    removeAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onerror = (event) => {
            changeNotificationMessage('Database initialize error', MessageType.fail);
        };
  
        request.onsuccess = (event) => {
            changeNotificationMessage('Database initialized.', MessageType.success);
            changeNotificationMessage('Starting deleting all customers.');
            const db = event.target.result;
            clearData(db);
        }

        function clearData(db) {
            var transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed.', MessageType.success);
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error. Duplicate items not allowed.', MessageType.fail);
            };

            const objectStore = transaction.objectStore('customers');
            const objectStoreRequest = objectStore.clear();
            objectStoreRequest.onsuccess = (event) => {
                changeNotificationMessage('Request successful.')
            }
        }
    }
  
    /**
     * Populate the Customer database with an initial set of customer data
     * @param {[object]} customerData Data to add
     * @memberof Customer
     */
    initialLoad = (customerData) => {
        const request = indexedDB.open(this.dbName);

        request.onerror = (event) => {
            changeNotificationMessage('Database initialize error', MessageType.fail);
        };

        request.onsuccess = (event) => {
            changeNotificationMessage('Database initialized.', MessageType.success);
            changeNotificationMessage('Starting adding data.');

            const db = event.target.result;
            addData(db);
        }
  
        request.onupgradeneeded = (event) => {
            changeNotificationMessage('Creating/updating database.');

            const db = event.target.result;
            db.onerror = (event) => {
                changeNotificationMessage("Error loading database.", MessageType.fail)
            };

            const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
            objectStore.onerror = (event) => {
                changeNotificationMessage('Error loading object store.', MessageType.fail);
            };
  
            // Create an index to search customers by name and email
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('lastorder', 'lastorder', { unique: false });
            objectStore.createIndex('totalsale', 'totalsale', { unique: false });

            changeNotificationMessage('Object store created.');
        };

        function addData(db) {
            const transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed.', MessageType.success);
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error. Duplicate items not allowed.', MessageType.fail);
            };

            const objectStore = transaction.objectStore('customers');

            // Populate the database with the initial set of rows
            customerData.forEach(function(customer) {
                objectStore.put(customer);
            });
        }
    }

    /**
     * Retrieve all rows from the database
     */
    retrieveAllRows = () => {
        const request = indexedDB.open(this.dbName, 1);

        request.onerror = (event) => {
            changeNotificationMessage('Database initialize error', MessageType.fail);
        }

        request.onsuccess = (event) => {
            changeNotificationMessage('Database initialized.', MessageType.success);
            changeNotificationMessage('Retriving all customers.');

            const db = event.target.result;
            getAllData(db);
        }

        function getAllData(db) {
            const transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed.', MessageType.success);
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error. Duplicate items not allowed.', MessageType.fail);
            };

            const objectStore = transaction.objectStore('customers');
            const objectStoreRequest = objectStore.getAll();

            objectStoreRequest.onsuccess = (event) => {
                changeNotificationMessage('Request successful.', MessageType.success);
                if(event.target.result.length > 0) {
                    event.target.result.forEach(function(row) {
                        addTableRow(row);
                    });
                } else {
                    changeNotificationMessage('No rows to display.');
                }
            }
        }
    }
}
  
// Web page event handlers
const DBNAME = 'customer_db';
  
/**
 * Clear all customer data from the database
 */
const clearDB = () => {
    changeNotificationMessage('Starting data removal process.');
    let customer = new Customer(DBNAME);
    customer.removeAllRows();
}
  
/**
 * Add customer data to the database
 */
const loadDB = () => {
    changeNotificationMessage('Starting load database process.');
  
    // Customers to add to initially populate the database with
    const customerData = [
        { userid: '444', name: 'Bill', email: 'bill@company.com', lastorder: '12/03/2020', totalsale: '1253' },
        { userid: '555', name: 'Donna', email: 'donna@home.org', lastorder: '09/04/2020', totalsale: '5354' }
    ];
    let customer = new Customer(DBNAME);
    customer.initialLoad(customerData);
}

/**
 * Get all customer data from the database
 */
const retrieveDB = () => {
    changeNotificationMessage('Starting data retrieval process.');

    let customer = new Customer(DBNAME);
    customer.retrieveAllRows();
}