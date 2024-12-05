const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2cmkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // user db
    const userCollection = client.db("equisports").collection("users");

    // get all users
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // create a user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // products db
    const productsCollection = client.db("equisports").collection("products");

    // get all products
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });
    // get a single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    // create a product
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    // update a product
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const product = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          image: product.image,
          itemName: product.itemName,
          categoryName: product.categoryName,
          description: product.description,
          price: product.price,
          rating: product.rating,
          customization: product.customization,
          processingTime: product.processingTime,
          stockStatus: product.stockStatus,
        },
      };
      const result = await productsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    // delete a product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // Get all unique categories
    app.get("/categories", async (req, res) => {
      try {
        const categories = await productsCollection.aggregate([
          { $group: { _id: "$categoryName" } },
          { $project: { _id: 0, categoryName: "$_id" } },
        ]).toArray();
    
        res.send(categories.map(item => item.categoryName));
      } catch (error) {
        res.status(500).send({ message: "Error fetching categories", error });
      }
    });
    

    // get products by category
    app.get("/products/category/:category", async (req, res) => {
      const category = req.params.category.toLowerCase();
      const query = {
        categoryName: { $regex: new RegExp(`^${category}$`, "i") },
      }; // Case-insensitive regex
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`The app listening on port ${port}`);
});
