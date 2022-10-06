import React from "react";

const Pagination=({nPages,currentPage,setCurrentPage})=>{
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
  const nextPage = () => {
    if(currentPage !== nPages)
        setCurrentPage(currentPage + 1)
}
const prevPage = () => {
    if(currentPage !== 1)
        setCurrentPage(currentPage - 1)
}
  return(
    <nav >
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#" onClick={prevPage}>Previous</a></li>
    {
      pageNumbers.map((pgNumber)=>{
        return <li key={pgNumber}
                  className={`page-item ${currentPage===pgNumber?'active':''}`}
                >
                <a herf="#"
                onClick={()=>{setCurrentPage(pgNumber)}}
                className="page-link"
                >
                    {pgNumber}
                </a>
              </li>
      })
    }
    <li className="page-item"><a className="page-link" href="#" onClick={nextPage}>Next</a></li>
  </ul>
</nav>
  );
}
export default Pagination;