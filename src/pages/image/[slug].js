
import SingleArticle from '../../components/FeaturedArticle/SingleArticle'
import AllImage from '../../components/featuredImage/AllImage'
import { singleImage } from '../../http'
const SingleImageArticle = ({ data, lable }) => {


  return (
    <>
      {lable === 'single' ? <SingleArticle  data={data} /> :
        <AllImage />
      }
    </>
  )
}

export default SingleImageArticle

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let object = {};
  let lable = 'single'
  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  if (slug) {
    object['slug'] = slug;
  }

  if (slug) {
    object['slug'] = slug;
  }
  if (slug === 'all') {
    lable = 'all';
  }
  if (lable === 'single') {
    const { data } = await singleImage(object);
    return {
      props: { data, lable }
    }
  } else {
    return {
      props: { lable }
    }
  }
}