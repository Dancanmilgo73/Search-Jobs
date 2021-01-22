
import './App.css';
import { useEffect, useState } from 'react';
import JobsList from "./components/JobsList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";





function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(18);
  async function getJobs(){
    setLoading(true);
    const res = await fetch('http://localhost:3001/jobs');
    const jobs = await res.json();
    //console.log(jobs.length);
    setJobs(jobs);
    setLoading(false);
  }
  const [jobList, setJobs] = useState([])
  
  useEffect(() => {
    getJobs();
  }, []);
  //console.log(typeof jobList);
  //Getting the current posts
  const indexOfLastJobs = currentPage*jobsPerPage;
  const indexOfPrevJobs = indexOfLastJobs - jobsPerPage;
  const currentJobs = jobList.slice(indexOfPrevJobs, indexOfLastJobs);

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  return (
    <div className="App">
      <div className="page-top">
          <h1>Github Jobs</h1>
      </div>
      <JobsList jobs = {currentJobs} loading = {loading} />
      <div className="page-number"><Pagination jobsPerPage = {jobsPerPage} totalJobs = {jobList.length} paginate = {paginate} /></div>
       
     
    </div>
  
  );
}

export default App;
