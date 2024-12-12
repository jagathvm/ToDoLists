import { MongoClient } from "mongodb";

let db;
const client = new MongoClient(process.env.MONGO_URI);

const connectToDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db(process.env.MONGO_DBNAME);
      console.log("Connected to the database");
    } catch (error) {
      console.log(`Error connecting to the database: ${error?.message}`);
      throw error;
    }
  }
  return db;
};

export const getToDosCollection = async () => {
  const db = await connectToDB();
  return db.collection("todos");
};
