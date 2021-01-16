
const fetch = require('node-fetch');

var redis = require('redis');
var client = redis.createClient();



async function fetchGit(){
  
  const APIUrl = "https://jobs.github.com/positions.json";
  let page = 0;
  let numOfJobs = 0;
  const jobs = [];
do{
  const res = await fetch(`${APIUrl}?page=${page}`);
  const data = await res.json();
  numOfJobs = data.length;
  jobs.push(...data);
  //console.log(data.length);
  page++;

}while(numOfJobs > 0);

client.on("connect", function() {
  console.log("You are now connected");
});

//console.log(jobs.length);
}
module.exports = fetchGit;