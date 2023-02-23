import React from 'react'
import { singleNews, allNews, allStory } from '../../http'
import SingleNews from '../../components/news/SingleNews'
import AllNews from '../../components/news/AllNews'
const NewsArticle = ({ data , lable, story = '' }) => {
  return (
    <>
     
      {lable === 'single' ? <SingleNews data={data.data} story={story} /> : <AllNews data={data} />}
    </>
  )
}

export default NewsArticle

export async function getServerSideProps(context) {
 
  

  const { slug } = context.query;
  let object = {

  };

  if (slug !== "all") {
    object['id'] = slug;
   
  }
  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  let lable = 'single'

  if (slug === 'all') {
    lable = 'all';
  }
  if (lable === 'single') {
    try {
      const { data } = await singleNews(object);
     
      const { data: story } = await allStory();
      return {
        props: { data, lable, story }
      }
    } catch (error) {
      let message = error.message;
      return {
        props: { message }
      }
    }

  } else {
   
      return {
        props: {  lable }
      }
  }

}