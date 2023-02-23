
import AllArticleCard from '../share/AllArticleCard';
import { useRouter } from 'next/router';
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { allStory } from '../../http';
import { useState } from 'react';
import { useEffect } from 'react';
const AllStory = () => {
  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');
  const [story, seStory] = useState([])
  const [limit, SetLimit] = useState({
    "limit": 18
  })

  const getAllStory = async () => {

    try {
      const { data } = await allStory(limit);
      if (data.bool) {
        seStory(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllStory()

    if (cu) {
      SetLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
  }, [limit, cu])

  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(9, SetLimit,
    limit, story.data ? story.data.length : 0);
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
              <div className="row  row-cols-2 row-cols-lg-2 g-2 g-lg-2  felis-bt">
                {
                  story.bool && story.data.length != 0 && story.data.slice(startPageIndex, endPageIndex).map((item, key) => {
                    return <AllArticleCard key={key} data={item} preUrl={'story'} />
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

export default AllStory