
import "./SingleJob.css";

function SingleJob({job}) {
    return (
      <div className="card" style={{width: "18rem"}}>
      <img src={job.company_logo} className="card-img-top" alt="..." />
      <div className="card-top text-muted">
      <>{job.created_at}</>
      <>{job.type}</>
      </div>
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text text-muted">{job.company}</p>
        <p className="text-primary">{job.location}</p>
        <a href={job.url} className=" btn btn-primary" target="_blank">Apply</a>
      </div>
    </div>
 
    );
  }
  
  export default SingleJob;
   {/* <div className="job">
        <div className="img"><img src={job.company_logo} alt="logo" /></div>
        <p>{job.created_at}</p>
        <p>{job.type}</p>
        <h6>{job.title}</h6>
        <p>{job.company}</p>
        <h6>{job.location}</h6>
          
      </div> */}