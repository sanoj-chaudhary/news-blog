import React, { useEffect, useState } from 'react'
import { getSingleArticleById, allStory, allFeatured } from '../../http'
import SingleArticle from '../../components/FeaturedArticle/SingleArticle'
import { Article2 } from '../../components/FeaturedArticle'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { useRouter } from 'next/router';
import AllArticleCard from '../../components/share/AllArticleCard'
const Article = ({ data, lable, story = '' }) => {

  const [article, setArticle] = useState([])
  const [limit, SetLimit] = useState({
    "limit": 18
  })

  const router = useRouter();
  const { slug, cu } = router.query;
  let typeofSlug = (typeof slug)
  const pathname = router.asPath.split('/');
  const getAllFeatured = async () => {

    try {
      const { data } = await allFeatured(limit);
      if (data.bool) {
        setArticle(data)
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
    limit, article.data ? article.data.length : 0);
  useEffect(() => {
    getAllFeatured()

    if (cu) {
      SetLimit({
        ...limit,
        ['countryslug']: cu
      })
    }
  }, [limit,cu])
  return (
    <>
      {lable === 'single' ? <SingleArticle datas={data.data} story={story} /> :

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
                  <div className='row row-cols-2 row-cols-lg-2 g-2 g-lg-2  felis-bt '>
                    {
                      article.bool && article.data.length > 0 && article.data.slice(startPageIndex, endPageIndex).map((item, key) => (
                        <AllArticleCard key={key} data={item} preUrl={'article'} />
                      ))
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
      }
    </>
  )
}

export default Article

export async function getServerSideProps(context) {

  const { id, article } = context.query;
  let object = {

  };


  if (article) {
    object['articleid'] = article;
  }

  let lable = 'single'

  if (article === 'all') {
    lable = 'all';
  }
  if (lable === 'single') {
    const { data } = await getSingleArticleById(object);

    const { data: story } = await allStory();
    return {
      props: { data, lable, story }
    }

  } else {

    return {
      props: { lable }
    }
  }

}