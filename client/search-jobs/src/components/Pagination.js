import React from 'react'

const Pagination = ({jobsPerPage, totalJobs, paginate}) => {
    const pages = [];
    for(let i = 1; i <= Math.ceil(totalJobs/jobsPerPage); i++) {
        pages.push(i);
    }
    return(
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page}className="page-item">
                        <a href="!#" className="page-link" onClick={() => paginate(page)}>{page}</a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}


export default Pagination; 