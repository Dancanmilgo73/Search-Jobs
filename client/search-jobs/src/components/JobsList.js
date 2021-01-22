import React from 'react'
import SingleJob from "./SingleJob.js";
import Spinner from "./Spinner.js";
import SearchBar from "./SearchBar.js";
import { useState, useEffect } from 'react';

const initialValues = {
  titleInput: "",
  locationInput: ""
};

function JobsList({jobs, loading}) {
  const [values, setValues]= useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
  };

  if(values.locationInput.length>0){
    jobs = jobs.filter(job => {return job.location.toLowerCase().match(values.locationInput)}); 
};
if(jobs.length < 1){
  alert("No jobs found!");
}

  if(loading){
    return (<div>
      <Spinner />
    </div>);
}
  
console.log(typeof jobs);
  return (
    <div className="outer">
    <form>
        <input className="search-bar" type="text" placeholder="Filter by company,title,expertise..." name="titleInput" onChange={handleChange} />
        {values.titleInput}
        <input className="search-bar" id="plocate"  type="text" placeholder="Filter by location..." name="locationInput"  onChange={handleChange} />
        <div className="search-bar"><button className="btn btn-success" type="submit">Search</button></div>
    </form>
    <div className="JobsList">
        {jobs.map(job => <SingleJob job = {job} />)};
    </div>
    </div>
  
  );
}

export default JobsList;
/* {jobs.map(job => <SingleJob job = {job} />)}; */