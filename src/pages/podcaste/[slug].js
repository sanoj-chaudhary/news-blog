import React from 'react'
import { singlePodcast,allPodcast } from '../../http'
import AllPodcaste from '../../components/podcaste/AllPodcaste'
import SingleArticle from './../../components/FeaturedArticle/SingleArticle'
const PodcateSingle = ({ data,lable }) => {

  return (
  <>
  {lable === 'single'?<SingleArticle datas={data.data} classes={'d-none'} />:<AllPodcaste />}
  </>
  
  )
}

export default PodcateSingle

export async function getServerSideProps(context) {

  const { slug } = context.query;
  let object = {};
  let lable = 'single'
  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  if (slug) {
    object['slug'] = slug;
  }
if(slug === 'all'){
  lable = 'all';
}
  if(lable === 'single'){
    const { data } = await singlePodcast(object);
    return {
      props: { data,lable }
    }
  }else{
    
    return {
      props: { lable }
    }
  }

  
}