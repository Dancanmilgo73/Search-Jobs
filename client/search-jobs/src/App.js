
import './App.css';
import { useEffect } from 'react';

async function getJobs(){
  const res = await fetch('http://localhost:3001/jobs');
  const jobs = await res.json();
  console.log(jobs.length);
}
function App() {
  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="App">
      <h1>Github jobs</h1>
      <div>jobs.title</div>
    </div>
  );
}

export default App;
