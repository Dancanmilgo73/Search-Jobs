//const REDIS_URL = "redis://:pdb365798c135c083b093000aaf1105282694eb5a2f7c210fbbb3d3d667c56418@ec2-54-75-41-243.eu-west-1.compute.amazonaws.com:9529"
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://dancan:Dancan2020@search--jobs.sp1it.mongodb.net/search--jobs?retryWrites=true&w=majority";
const client = new MongoClient(url,{ useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("search--jobs");
    const collection = database.collection("jobsToStore");
  const cursor = collection.find({});  
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // get jobs
    app.get('/jobs', async (req, res) => {
       const jobs = await cursor.toArray();
       res.header("Access-Control-Allow-Origin", "http://localhost:3000");
       //console.log(JSON.parse(jobs).length); 
       res.send(jobs);//.replace(/(<([^>]+)>)/gi, ""))
     })
    
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})