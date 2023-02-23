import React from 'react'
import { getSingleArticleById } from '../../http'
import AllStory from '../../components/story/AllStory'
import SingleArticle from '../../components/FeaturedArticle/SingleArticle'
const Story = ({ data, lable }) => {

  
  return (
    <>
      {lable === 'single' ? <SingleArticle datas={data.data} />
        :
        <AllStory />
      }
    </>

  )
}

export default Story

export async function getServerSideProps(context) {

  const { slug } = context.query;
  let object = {};

  if (slug) {
    object['articleid'] = slug;
  }
  let lable = 'single'
  if(slug === 'all'){
    lable = 'all';
  }
  if (lable === 'all') {
    
    return {
      props: { lable }
    }
  } else {
    const { data } = await getSingleArticleById(object);
    return {
      props: { data, lable }
    }
  }
}
