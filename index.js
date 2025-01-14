require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pnnn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const bistroDB = client.db("bistroDB")
    const menuCollection = bistroDB.collection("menu")
    const reviewsCollection = bistroDB.collection("review")

    app.get('/menu' , async(req , res) => {
        const query = menuCollection.find()
        const result = await query.toArray()
        res.send(result)
    })
    app.get('/review' , async(req , res) => {
        const query = reviewsCollection.find()
        const result = await query.toArray()
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello Boss Bistro')
})

app.listen(port, () => {
  console.log(`Boss Bistro server is sitting on port ${port}`)
})