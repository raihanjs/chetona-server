const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// ========================Middlewares========================
app.use(cors());
app.use(express.json());
require("dotenv").config();
// ========================Middlewares========================
app.get("/", (req, res) => {
  res.send("Welcome to ChetonaProkashon Server");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // ==========================Promotions==========================
    // add a promotion
    app.post("/promotions", async (req, res) => {
      const promotion = req.body;
      const result = await promotions.insertOne(promotion);
      res.send(result);
    });
    // update a promotion
    app.patch("/promotions/:id", async (req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      delete req.body._id;
      const result = await promotions.updateOne(id, { $set: req.body });
      res.send(result);
    });
    // get all promotions
    app.get("/promotions", async (req, res) => {
      const result = await promotions.find().toArray();
      res.send(result);
    });
    // get single promotion by id
    app.get("/promotions/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await promotions.findOne(query);
      res.send(result);
    });
    // delete a promotion by id
    app.delete("/promotions/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await promotions.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

console.log(process.env.DB_USER);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
