
import { useEffect, useState } from 'react';
import { authorsSummary } from '../../http/auth-apis';
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { getAccessToken } from '../../../utils';
const Authors = ({ data = [] }) => {

  const [token, setToken] = useState()
  const [authors, setAuthors] = useState([])
  const [limit,SetLimit] = useState({limit:10})
  const getAllAuthors = async () => {



try {
  const  headers={
    'Authorization': `Bearer ${token}` , 
  }
  const { data } = await authorsSummary({},headers);
  if (data.bool) {
    setAuthors(data)
  }
} catch (error) {
  console.log(error)
}


  
  }


  useEffect(() => {
    setToken(getAccessToken())
    getAllAuthors()
  }, [])

  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(10,SetLimit, limit,
    authors.data ? authors.data.length : 0);
  return (
    <>

      <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
                <h1>Authors</h1>
              </div>

            </div>
          </div>
        </div>

      </section>
      <section className="section_Design_tools mb-5">
        <div className="scrn-container">
          <div className="section_Design_bnner px-4">
            <div className="row">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Author Name</th>
                    <th scope="col">Total Articles</th>
                    <th scope="col">Published</th>
                    <th scope="col">In-review</th>
                    <th scope="col">Rejected</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    authors.bool && authors.data.length > 0 && authors.data.slice(startPageIndex,endPageIndex).map((item, key) => (
                      <tr key={key}>
                        <td>{item.name}</td>
                        <td>{item.articles_count}</td>
                        <td>{item.article_approved_count}</td>
                        <td>{item.article_review_count}</td>
                        <td>{item.article_rejected_count}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className='d-flex justify-content-end'>
              <Pagination
                color="primary"
                count={totalPages}

                variant="outlined" shape="rounded"
                onChange={(event, value) => {
                  displayPage(value)

                }}
              />
            </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Authors

