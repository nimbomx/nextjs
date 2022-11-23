import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_STRING || '';

export async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    await client.connect();
  return client;
}
