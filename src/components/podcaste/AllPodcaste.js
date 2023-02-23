import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDate } from '../../../utils'
import Image from 'next/image'
import { allPodcast } from '../../http'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { useRouter } from 'next/router';
import AllArticleCard from '../share/AllArticleCard'

const AllPodcaste = () => {

  const [podcast, setPodcaste] = useState([])
  const [limit, SetLimit] = useState({
   
  })
  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');

  const getAllPodcaste = async () => {

    try {
      const { data } = await allPodcast(limit);
      if (data.bool) {
        setPodcaste(data)
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
  ] = usePagination(9, SetLimit,
    limit, podcast.data ? podcast.data.length : 0);

  useEffect(() => {
    getAllPodcaste()
   
    if (cu) {
      SetLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
  }, [router.query])
  
  return (


    <section className="section-banner-in-0 mb-4 podcastSection my-4">
      <div className="scrn-container">
        <div className="banner-meun ">
          <div className="lift-side_lg">
            <div className="lift-side-text">
              <h4 className='text-capitalize mb-0'>{(typeofSlug == 'object' && slug.length == 3) ? slug[0] : pathname[1]} {(typeofSlug == 'object' && slug.length == 3) ? '| '+slug[1] : ''} </h4>
              {/* <small className='text-capitalize ps-1'>{(typeofSlug == 'object' && slug.length == 3) ? slug[1] : ''}</small> */}
            </div>
           
          </div>
          <div className="container ">

            <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-2  felis-bt">

              {
                podcast.bool && podcast.data.length != 0 && podcast.data.slice(startPageIndex, endPageIndex).map((podcastItem, key) => {
                  return <AllArticleCard key={key} data={podcastItem} preUrl={'podcaste'} />
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


  )

}

export default AllPodcaste