import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL;

export const connectToDatabase = async () => {
    try {
        const client = new MongoClient( url );
        await client.connect();
        return client.db( 'test' );
    } catch ( error ) {
        console.error( "Error connecting to database:", error );
        throw error;
    }
}
