import { MongoClient } from 'mongodb';

//TODO: Move mongo connection string to .env
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://next_demo_user:8nOcWTGs7skOQpUr@nextcluster.zzkgtv7.mongodb.net/?retryWrites=true&w=majority'
  );

  return client;
}
