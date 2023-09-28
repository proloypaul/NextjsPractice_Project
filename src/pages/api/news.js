const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/?retryWrites=true&w=majority`;
// console.log("URI ", uri)
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(req, res) {
  try {
    // Connect the client to the server
    await client.connect();

    // res.send({message: "successfully connected to MongoDB!"});    
    const newsDatabase = await client.db("newsPortalPractice")
    const newsCollection = newsDatabase.collection("news")
    const postedNewsCollection = newsDatabase.collection("postedNews")

    if(req.method == "GET"){
        const news = await newsCollection.find({}).toArray()
        const postedNews = await postedNewsCollection.find({}).toArray()

        res.send({message: "success", status: 200, data: news, postedData: postedNews})

    }

    if(req.method == "POST"){
        const newsData = req.body;
        console.log("newsData come from client", newsData)
        const result = await postedNewsCollection.insertOne(newsData)

        res.json(result)
    }

    
    
  } finally {
    // await client.close();
  }
}
export default run;
