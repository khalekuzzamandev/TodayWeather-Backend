import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Client
const client = new MongoClient(process.env.MONGO_DB_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Connect MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});


// Database & Collections
const db = client.db("burmuda_shop");
const productsCollection = db.collection("products");





// Local Development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}

export default app;