import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDate } from '../../../utils'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { allNews } from '../../http';
import { useState, useEffect } from 'react';
import ThirdNews from './ThirdNews';

const AllNews = ({ data }) => {
  const router = useRouter();
  const { slug, cu } = router.query;
  const pathname = router.asPath.split('/');
  const [news, setNews] = useState([])

  const [limit, SetLimit] = useState({
    "limit": 18
  })

 
  let typeofSlug = (typeof slug)

  const getAllNews = async () => {

    try {
      const { data } = await allNews(limit);
      if (data.bool) {
        setNews(data)
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
    limit, news.data ? news.data.length : 0);


  useEffect(() => {

    if (cu) {
      SetLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
    getAllNews()
  
  }, [router, endPageIndex])

  return (

    <>
      <section className="section-banner-in-0 my-4 ">
        <div className="scrn-container">
          <div className="banner-meun ">
            <div className="lift-side_lg">
              <div className="lift-side-text">
                <h5 className='text-capitalize mb-0'>{(typeofSlug == 'object' && slug.length == 3) ? slug[0] : pathname[1]} {cu ? '| ' + cu : ''} </h5>

              </div>

              <small className='text-capitalize ps-1'>{(typeofSlug == 'object' && slug.length == 3) ? slug[1] : ''}</small>

            </div>
            <div className=" ">
              <div className="row row row-cols-2 row-cols-lg-2 gx-5 g-2 g-lg-2  felis-bt">
                {
                  news.bool && news.data.length != 0 && news.data.slice(startPageIndex, endPageIndex).map((item, key) => {
                    return <div key={key} className="col mb-3">
                      <div className='farme_in_meun_12  '>
                        <ThirdNews newsItem={item} />
                      </div>
                    </div>
                  })
                }
              </div>
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

export default AllNews