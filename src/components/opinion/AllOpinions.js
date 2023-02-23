
import { formatDate } from '../../../utils';
import { usePagination } from '../../hooks/Pagination';
import Pagination from "@mui/material/Pagination";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { AllOpinion } from '../../http';
import { useEffect, useState } from 'react';
import AllArticleCard from '../share/AllArticleCard';
const AllOpinions = () => {
  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');

  const [opinion, setOpinion] = useState([])
  const [limit, setLimit] = useState({
  
  })


  const getAllOpinion = async () => {

    try {
      const { data } = await AllOpinion(limit);
      if (data.bool) {
        setOpinion(data)
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
    limit, opinion.data ? opinion.data.length : 0);
  useEffect(() => {





  }, []);
  useEffect(() => {
    getAllOpinion()
    if (cu) {
      setLimit({
        ...limit,
        ['countryslug']: cu
      })
    }

  }, [endPageIndex, cu])



  return (
    <>

      <section className="section-banner-in-0 my-4 ">
        <div className="scrn-container">
          <div className="banner-meun ">
            <div className="lift-side_lg">
              <div className=" Articles-content lift-side-text">
                <h2 className='text-capitalize mb-0'>{(typeofSlug == 'object' && slug.length == 3) ? slug[0] : pathname[1]} {cu ? '| ' + cu : ''} </h2>
                <div className='text-capitalize ps-1'>{(typeofSlug == 'object' && slug.length == 3) ? slug[1] : ''}</div>
              </div>

            </div>
            <div className="container ">

              <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-2  felis-bt">

                {
                  opinion.bool && opinion.data.length != 0 && opinion.data.slice(startPageIndex, endPageIndex).map((opinion, key) => {
                    return <AllArticleCard key={key} data={opinion} preUrl={'opinion'} />
                  })
                }


              </div>

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
      </section>




    </>
  )
}

export default AllOpinions