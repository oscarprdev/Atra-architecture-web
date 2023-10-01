import { MongoClient, ServerApiVersion } from 'mongodb';
import { DB_URL } from '../constants/database-url.js';

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect({ db, collection }) {
  try {
    await client.connect();
    const database = client.db(db);
    return database.collection(collection);
  } catch (error) {
    console.error('Error connecting to the database');
    console.error(error);
    await client.close();
  }
}
