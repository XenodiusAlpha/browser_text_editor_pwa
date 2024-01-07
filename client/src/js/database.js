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
  // Creates a connection to the jate database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Creates a new transaction and specifies the jate database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Opens up the desired object store.
  const store = tx.objectStore('jate');
  // Updates given record or inserts a new record if given content does not already exist
  const request = store.put({ value: content });
  // Confirmation of the request
  const result = await request;
  console.log('Data updated to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Creates a connection to the jate database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Creates a new transaction and specifies the jate database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Used to get all data in the database.
  const request = store.getAll();
   // Get confirmation of the request.
  const result = await request;
  console.log('Data retreived from the database', result);
  return result.value;
};

initdb();
