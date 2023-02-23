import React, { useEffect, useState } from 'react'
import { allMustSee, allStory, getSingleArticleById } from '../../http'
import Link from 'next/link'
import { formatDate } from '../../../utils'
import SmartText from '../../components/SmartText'
import Image from 'next/image'
import SingleArticle from '../../components/FeaturedArticle/SingleArticle'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { useRouter } from 'next/router'
import AllArticleCard from '../../components/share/AllArticleCard'
const MustSee = ({ data, story, lable }) => {

  const router = useRouter();
  const { slug, cu } = router.query;

  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');
  const [mustsee, setMustsee] = useState([])
  const [limit, setLimit] = useState({

  })

  const getMustSeeImage = async () => {

    try {
      const { data } = await allMustSee(limit);
      if (data.bool) {
        setMustsee(data)
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
  ] = usePagination(21, setLimit,
    limit, mustsee.data ? mustsee.data.length : 0);
  useEffect(() => {
 

    if (cu) {
      setLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
  }, [])
  useEffect(() => {
    getMustSeeImage()

   
  }, [])
  return (
    <>

      {
        lable === 'single' ? <SingleArticle datas={data.data} story={story} />
          :
      
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
                        mustsee.bool && mustsee.data.length != 0 && mustsee.data.slice(startPageIndex, endPageIndex).map((item, key) => {
                          return <AllArticleCard key={key} data={item} preUrl={'mustsee'} />
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
            
        
      }

          </>
  )
}

      export default MustSee

      export async function getServerSideProps(context) {

  const {slug} = context.query;
      let object = {
      };

      if (slug) {
        object['articleid'] = slug;
  }

      let lable = 'single'
      context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
      if (slug === 'all') {
        lable = 'all';
  }
      if (lable === 'single') {
    const {data} = await getSingleArticleById(object);
      const {data: story } = await allStory();
      return {
        props: {data, lable, story}
    }

  } else {

    return {
        props: {lable}
    }
  }

}