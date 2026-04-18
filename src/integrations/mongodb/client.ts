import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || import.meta.env.VITE_MONGODB_URI;
const DB_NAME = 'neha_didi_portfolio';

if (!MONGODB_URI) {
  throw new Error(
    'Missing MongoDB URI. Ensure MONGODB_URI (or VITE_MONGODB_URI for client-side) is set in your .env file.'
  );
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    cachedClient = client;
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export async function getDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  return connectToDatabase();
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log('✅ MongoDB connection closed');
  }
}

// Export for server-side usage
export const mongodb = {
  connect: connectToDatabase,
  getDb: getDatabase,
  close: closeDatabase,
};
