/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bsmelser:Taskmanager12@taskmanager.hjmwfrc.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
 serverApi: {
   version: ServerApiVersion.v1,
   strict: true,
   deprecationErrors: true,
 }
});


async function run() {
 try {
   // Connect the client to the server	(optional starting in v4.7)
   await client.connect();
   // Send a ping to confirm a successful connection
   await client.db("admin").command({ ping: 1 });
   console.log("Pinged your deployment. You successfully connected to MongoDB!");
 } finally {
   // Ensures that the client will close when you finish/error
   await client.close();
 }
}
run().catch(console.dir);
*/
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
