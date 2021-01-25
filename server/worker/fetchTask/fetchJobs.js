const fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

const { promisify } = require("util");
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
   
   client.on("error", function(error) {
    console.error(error);
  });
  
  }
//fetchGit();
module.exports = fetchGit;