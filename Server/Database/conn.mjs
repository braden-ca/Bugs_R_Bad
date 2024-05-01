/*import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;

console.log(uri); 

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged the database. Successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export default connectToDatabase;
*/

/*import mongoose from "mongoose";

export default async function connect(){
   await mongoose.connect(process.env.ATLAS_URI)
   console.log("Database Connected")
}
*/

// conn.mjs
import { MongoClient, ServerApiVersion } from 'mongodb';
console.log(process.env.ATLAS_URI);
// MongoDB connection URI
const uri = process.env.ATLAS_URI;

// Create a new instance of MongoClient with specified options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Async function to establish the connection
async function connectToDatabase() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    // Handle connection errors
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Export the connectToDatabase function
export default connectToDatabase;
