import React from 'react'
import { singleOpinion, AllOpinion } from '../../http'
import AllOpinions from '../../components/opinion/AllOpinions'
import SingleArticle from './../../components/FeaturedArticle/SingleArticle'
const OpinionArticle = ({ data, lable }) => {

  return (
    <>
      {lable === 'single' ? <SingleArticle datas={data.data} classes={'d-none'} /> : <AllOpinions data={data} />}
    </>
  )
}

export default OpinionArticle

export async function getServerSideProps(context) {

  const { slug } = context.query;
  let object = {
  };

  if (slug) {
    object['slug'] = slug;
  }

  let lable = 'single'
  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  if (slug === 'all') {
    lable = 'all';
  }
  if (lable === 'single') {
    const { data } = await singleOpinion(object);
    return {
      props: { data, lable }
    }
  } else {
    const { data } = await AllOpinion();

    return {
      props: { data, lable }
    }
  }

}