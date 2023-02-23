import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { formatDate } from '../../../utils';
import { useRouter } from 'next/router'
import { multipleVideo } from '../../http';
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import SmartText from '../SmartText';
const AllVideo = ({ data }) => {
  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');
  const [video, setVideo] = useState([])
  const [limit, SetLimit] = useState({
   
  })


  const getAllVideo = async () => {

    try {
      const { data } = await multipleVideo(limit);
      if (data.bool) {
        setVideo(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    displayPage,
  ] = usePagination(21, SetLimit,
    limit, video.data ? video.data.length : 0,);
  useEffect(() => {
    if (cu) {
      SetLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
    getAllVideo()

   
  }, [cu,endPageIndex])
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
                  video.bool && video.data.length != 0 && video.data.slice(startPageIndex, endPageIndex).map((item, key) => {
                    return <>
                      <div className="col mb-3">
                        <div className='farme_in_meun_12 '>
                          <div className={`direction-column right-side-text`}>
                            <div className='left-img'>
                              <video
                                height={179} width={200}
                                controls
                                poster={`${item.image}/small`}>
                                <source src={item.video} />
                              </video>
                            </div>
                            <div className="right-side-text-in">
                              <div className="text-conter-0">

                                <Link href={`/video/${item.slug}`} className='text-dark'>  <h5>{item.title}</h5></Link>
                                <SmartText text={(item.short_desc) ? item.short_desc.substring(0, 270) : ''} />


                              </div>
                              <span>{formatDate(item.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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

export default AllVideo