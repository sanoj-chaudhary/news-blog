import React from 'react'
import { formatDate } from '../../../utils'
import { useRouter } from 'next/router'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import AllArticleCard from '../share/AllArticleCard'
import { allImage } from '../../http'
import { useState } from 'react';
import { useEffect } from 'react';
const AllImage = () => {
  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');


  const [image, setImage] = useState([])
  const [limit, setLimit] = useState({})


  const getAllImage = async () => {

    try {
      const { data } = await allImage(limit);
      if (data.bool) {
        setImage(data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(9, setLimit,
    limit, image.data ? image.data.length : 0);

    useEffect(() => {
      getAllImage()
  
      if (cu) {
        setLimit({
          ...limit,
          ['countryslug']: cu
        })
      }
    }, [endPageIndex,cu])
  return (

    <>
      <section className="section-banner-in-0 my-4">
        <div className="scrn-container">
          <div className="banner-meun ">
            <div className="lift-side_lg">
              <div className="lift-side-text">
                <h2 className='text-capitalize mb-0'>{(typeofSlug == 'object' && slug.length == 3) ? slug[0] : pathname[1]} {cu ? '| ' + cu : ''} </h2>
                <div className='text-capitalize ps-1'>{(typeofSlug == 'object' && slug.length == 3) ? slug[1] : ''}</div>
              </div>

            </div>
            <div className="container ">
              <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-2  felis-bt">
                {
                  image.bool && image.data.length != 0 && image.data.slice(startPageIndex, endPageIndex).map((item, key) => {
                    return <AllArticleCard data={item} key={key} preUrl={'image'} />
                  })
                }
              </div>
              <div className='paginationWrapper'>
                <Pagination
                  color="primary"
                  count={totalPages}

                  variant="outlined" shape="rounded"
                  onChange={(event, value) => displayPage(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default AllImage