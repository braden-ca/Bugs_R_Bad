import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.ATLAS_URI

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged the database. Successfully connected to MongoDB!");
  } finally {
    // Ensure the client will close when finished
    await client.close();
  }
}

export default connectToDatabase;
x