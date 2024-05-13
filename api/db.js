import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://123:123@cluster0.cu1zpcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDatabase = async () => {
    try {
        console.log("2");
        const client = new MongoClient( uri );
        console.log("3");
        await client.connect();
        console.log( "Connected to MongoDB Atlas!" );
        return client.db( 'test' );
    } catch ( error ) {
        console.error( "Error connecting to database:", error );
        throw error;
    }
}
