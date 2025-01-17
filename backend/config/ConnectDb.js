import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()
const URI = process.env.MONGO_URI;
const client = new MongoClient(URI, {
	serverApi: 
	{
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
})

const connectDb = async () => {
	try{
		await client.connect();
		console.log('Connected to the database');
	}
	catch(err){
		console.log(err);
	}
}

export { connectDb, client }