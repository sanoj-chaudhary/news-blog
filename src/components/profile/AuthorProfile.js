import React from 'react'
import { formatDate } from '../../../utils'
import Link from 'next/link'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import Image from 'next/image'
import { useState } from 'react';
const AuthorProfile = ({ data }) => {
  const [limit,SetLimit] = useState(60)
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(10,SetLimit, limit,
 data ? data.length : 0);
 
  return (
    <>

      <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
                <h1>My Articles</h1>
              </div>
              <div id="navbarSupportedContent">
                <ul className="navbar-nav ">
                  <li className="nav-item"><a href="#" className="nav-link">Status:</a></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Published
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href='/auth/add-article' className='btn btn-outline-bg'> + &nbsp; Add Article</Link>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="section_Design_tools mb-4">
        <div className="scrn-container">
          <div className="section_Design_bnner">
            <div className="row gy-4">

              {
                data.length != 0 && data.slice(startPageIndex,endPageIndex).map((item, key) => (
                  <>
                    <div className="col-md-3">
                      <div className="farme_imges-in">
                        <Image height={200} width={200} alt='' src="/images/Rectangle_img.png" />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tools-inner">
                        <div className="desing-wapper">
                          <button type="button"><a href="#">{item.category.title}</a></button>
                          <div className="content-title-in">
                            <h1>{data.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                            <span>{formatDate(item.created_at)} | <span className='text-capitalize'>{item.category.title}</span></span>

                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              }
            </div>
            <div className='paginationWrapper'>
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

export default AuthorProfile