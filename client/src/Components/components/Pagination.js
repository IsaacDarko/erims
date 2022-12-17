import React from 'react'

const Pagination = ({postPerPage,totalPosts,paginate}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
        
    }


    return (
        <nav aria-label="Page navigation example ">
            <ul className="pagination text-center justify-content-center">
                
                {
                 pageNumbers.map((number) => (
                     <li key={number} className="page-item">
                         <a className="page-link" href="#" onClick={() => paginate(number)}>{number}</a>
                     </li>
                 ))

                }
                
               
            </ul>
            </nav>
    )
}

export default Pagination
