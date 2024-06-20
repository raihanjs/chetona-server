const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// ========================Middlewares========================
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Welcome to ChetonaProkashon Server");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rjtfnh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("chetona");
    const promotions = database.collection("promotions");
  } finally {
  }
}
run().catch(console.dir);

console.log(process.env.DB_USER);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
