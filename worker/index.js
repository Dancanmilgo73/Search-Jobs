var cron = require('node-cron');
const fetchGit = require('./fetchTask/fetchJobs');
 
cron.schedule('* * * * *', () => {
    fetchGit();
  //console.log('running a task every minute');
});