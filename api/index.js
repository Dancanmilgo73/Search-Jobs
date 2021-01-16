const express = require('express')
const app = express()
const port = 3001
const redis = require("redis");
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
  const jobs = await getAsync("jobsToStore"); 
  console.log(JSON.parse(jobs).length); 
  res.send(jobs)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})