import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // open the db at version 1
  const db = await openDB('jate', 1);
  // start a transaction on the db for read-write operations
  const transaction = db.transaction('jate', 'readwrite');
  // set a reference to the 'jate' object store
  const store = transaction.objectStore('jate');
  // update the db where the id is 1
  const request = store.put({ id:1, value:content });
  const result = await request;
  console.log('Data saved to database.', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // open the db at version 1
  const db = await openDB('jate', 1);
  // start a transaction on the db for read-only operations
  const transaction = db.transaction('jate', 'readonly');
  // set a reference to the 'jate' object store
  const store = transaction.objectStore('jate');
  // retrieve all data stored
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved.', result);
  // return result; // necessary?
};

initdb();
