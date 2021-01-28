const fetch = require('node-fetch');
const redis = require("redis");
require('dotenv').config();
const credentials = {
  port: "13869",
  url: "redis-13869.c135.eu-central-1-1.ec2.cloud.redislabs.com:13869",
  password: "T6454i7er6v09nk2IqZ4LakMPkul7dvF",
  syscall: "0.0.0.0"
}
/* const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
}); */
//let REDIS_URL = process.env.REDIS_URL;
//const client = redis.createClient(process.env.REDIS_URL);


/* const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

async function fetchGit(){
  try {
    const APIUrl = "https://jobs.github.com/positions.json";
    let page = 0;
    let numOfJobs = 0;
    const jobs = [];
      do{
        const res = await fetch(`${APIUrl}?page=${page}`);
        const data = await res.json();
        numOfJobs = data.length;
        jobs.push(...data);
        page++;
      }while(numOfJobs > 0);
  
  console.log(jobs.length);
  const success = await setAsync("jobsToStore", JSON.stringify(jobs));
  console.log({success});

    
   } catch(e) {
    console.log('Error happened while fetching the API: ', e.message)
   }
   client.on('connect', function(err, res) {
    console.log('redis is connected!');
  });
   client.on("error", function(error) {
    console.error(error.message);
  });
  
  } */
  
//fetchGit();
//module.exports = fetchGit;
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://dancan:Dancan2020@search--jobs.sp1it.mongodb.net/search--jobs?retryWrites=true&w=majority";
const client = new MongoClient(url,{ useUnifiedTopology: true });
async function fetchGit() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("search--jobs");
        const col = db.collection("jobsToStore");
        const options = { ordered: true };
        const APIUrl = "https://jobs.github.com/positions.json";
        let page = 0;
        let numOfJobs = 0;
        const jobs = [];
          do{
            const res = await fetch(`${APIUrl}?page=${page}`);
            var data = await res.json();
            numOfJobs = data.length;
            jobs.push(...data);
            page++;
          }while(numOfJobs > 0);
      
      console.log(jobs.length);
      const result = await col.insertMany(jobs, options);
      console.log(`${result.insertedCount} documents were inserted`);
      //const myDoc = await col.findOne();
      //console.log(myDoc);
        
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
fetchGit().catch(console.dir);
module.exports = fetchGit;