import React from 'react'
import { multipleVideo, singleVideoById } from '../../http'
import AllVideo from '../../components/featuredVideo/AllVideo'
import SingleArticle from '../../components/FeaturedArticle/SingleArticle'
const Video = ({ data,lable }) => {

  return (
    <>
     {lable === 'single'?<SingleArticle datas={data.data} classes={'d-none'} />
    :
    <AllVideo />
    }
    </>

  )
}

export default Video

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let object = {
  };
  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  if (slug) {
    object['id'] = slug;
  }

  let lable = 'single'

if(slug === 'all'){
  lable = 'all';
}
  if(lable === 'single'){
    const { data } = await singleVideoById(object);
    return {
      props: { data,lable }
    }
  }else{

    
    

    return {
      props: { lable }
    }
  }
 
}
