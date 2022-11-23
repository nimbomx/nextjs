import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_STRING || '';

//TODO: Move mongo connection string to .env
export async function connectToDatabase() {
    console.time('connect')
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    await client.connect();
    console.timeEnd('connect')
  return client;
}



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://next_demo_user:<password>@nextcluster.zzkgtv7.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
