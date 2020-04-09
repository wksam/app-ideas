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
            changeNotificationMessage('removeAllRows - Database error: ' + event.target.error.code + 
                ' - ' + event.target.error.message, MessageType.fail);
        };
  
        request.onsuccess = (event) => {
            changeNotificationMessage('Deleting all customers...');
            const db = event.target.result;
            clearData(db);
        }

        function clearData(db) {
            var transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed: all rows removed.');
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error: ' + event.target.error.code + 
                    ' - ' + event.target.error.message, MessageType.fail);
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
            changeNotificationMessage('initialLoad - Database error: ' + event.target.error.code +
                ' - ' + event.target.error.message, MessageType.fail);
        };

        request.onsuccess = (event) => {
            changeNotificationMessage('Database initialised.', MessageType.success);

            const db = event.target.result;
            addData(db);
        }
  
        request.onupgradeneeded = (event) => {
            changeNotificationMessage('Populating customers...');

            const db = event.target.result;
            const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
            objectStore.onerror = (event) => {
                changeNotificationMessage('initialLoad - objectStore error: ' + event.target.error.code +
                    ' - ' + event.target.error.message, MessageType.fail);
            };
  
            // Create an index to search customers by name and email
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
        };

        function addData(db) {
            const transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed.');
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error. Duplicate items not allowed.');
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
            changeNotificationMessage('retrieveAllRows - Database error:' + event.target.error.code +
                ' - ' + event.target.error.message, MessageType.fail);
        }

        request.onsuccess = (event) => {
            changeNotificationMessage('Retriving customers...');
            const db = event.target.result;
            getAllData(db);
        }

        function getAllData(db) {
            const transaction = db.transaction(['customers'], 'readwrite');
            transaction.oncomplete = (event) => {
                changeNotificationMessage('Transaction completed.');
            };
            transaction.onerror = (event) => {
                changeNotificationMessage('Transaction not opened due to error. Duplicate items not allowed.');
            };

            const objectStore = transaction.objectStore('customers');
            const objectStoreRequest = objectStore.getAll();

            objectStoreRequest.onsuccess = (event) => {
                changeNotificationMessage('Request successful.');
                if(event.target.result.length > 0) {
                    event.target.result.forEach(function(row) {
                        fillTableRow(row.userid, row.name, row.email);
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
    changeNotificationMessage('Delete all rows from the Customers database');
    let customer = new Customer(DBNAME);
    customer.removeAllRows();
}
  
/**
 * Add customer data to the database
 */
const loadDB = () => {
    changeNotificationMessage('Load the Customers database');
  
    // Customers to add to initially populate the database with
    const customerData = [
        { userid: '444', name: 'Bill', email: 'bill@company.com' },
        { userid: '555', name: 'Donna', email: 'donna@home.org' }
    ];
    let customer = new Customer(DBNAME);
    customer.initialLoad(customerData);
}

/**
 * Get all customer data from the database
 */
const retrieveDB = () => {
    changeNotificationMessage('Load the Customers database');

    let customer = new Customer(DBNAME);
    customer.retrieveAllRows();
}