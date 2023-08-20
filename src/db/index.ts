import mongodb, { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONN || '');

const connectDb = async () => {
    await client.connect();
};

const closeDb = async () => {
    if (client) {
        await client.close();
    }
};

const db = client.db(process.env.DB_NAME || '');

export { closeDb, connectDb, db };