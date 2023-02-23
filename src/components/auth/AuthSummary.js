import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import CustomChart from './CustomChart'
import { articleSummary, authorArticleShow } from '../../http/auth-apis';
import { getAccessToken } from '../../../utils';
import Image from 'next/image'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
const AuthSummary = ({ data, article }) => {
  const [token, setToken] = useState()
  const [summary, setSummary] = useState([]);
  const getSummary = async () => {
    try {
     
      const headers = {
        'Authorization': `Bearer ${token}`,
      }
      const { data:summary } = await articleSummary({},headers);
      if (summary.bool) {
        setSummary(summary.data);
      }

    } catch (err) {
      console.log("message:", err.message);
    }
  }

  const [limit,SetLimit] = useState(60)
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(10,SetLimit, limit,
    article ? article.length : 0);

  useEffect(() => {
    setToken(getAccessToken())
    getSummary();

  }, [])
console.log({summary})
 
  return (
    <>
      <section className="user-profile-section">
        <div className="scrn-container">
          <div className="user-profile-conntent">
            <div className="user-img">
              <Image height={50} width={90} alt='' src="/images/andrea.png" />
            </div>
            <div className="user-detail">
              <div className="name-address">
                <h4>{data.name}</h4>
                {/* <p>Business reporter, Kigali, Rwanda</p> */}
              </div>
              {/* <div className="user-folower">
              <p className="d-flex dp"><span>Followers</span> <b>300</b></p>
              <p>|</p>
              <p className="d-flex dp"><span>Favourites</span> <b>300</b></p>
            </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="section_Design_tools">
        <div className="scrn-container">
          <div className="section_Design_bnner">
            <h3>Total Articles</h3>
            <CustomChart datasummary={summary} />

          </div>
        </div>
      </section>

      <section className="section_Design_tools mt-3 mb-4">
        <div className="scrn-container">
          <div className="section_Design_bnner">
            <h3>Articles</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Article Names</th>
                  <th scope="col">Published</th>
                  <th scope="col">In-review</th>
                  <th scope="col">Rejected</th>
                </tr>
              </thead>
              <tbody>

                {
                  article.length != 0 && article.slice(startPageIndex,endPageIndex).map((item, key) => (
                    <tr key={key}>
                      <td>{item.title}</td>
                      <td>{item.status === "Review" ? "Yes" : '-'}</td>
                      <td>{item.status === "Published" ? "Yes" : '-'}</td>
                      <td>{item.status === "Rejected" ? "Yes" : '-'}</td>
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
      </section>


    </>
  )
}

export default AuthSummary