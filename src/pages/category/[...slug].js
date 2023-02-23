import { useRef, lazy, useState, useEffect } from 'react'
import { allNews, allStory, allMustSee, AllOpinion, allPodcast, allFeatured, multipleVideo, allImage } from '../../http'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import MainNews from '../../components/news/MainNews'
import SecondNews from '../../components/news/SecondNews'
import ThirdNews from '../../components/news/ThirdNews'
const MustSee = lazy(() => import('../../components/mustsee/MustSeeCard'))
const MostViewedImage = dynamic(() =>
  import('../../components/featuredImage').then((mod) => mod.MostViewedImage)
)
const Article1 = dynamic(() =>
  import('../../components/FeaturedArticle').then((mod) => mod.Article1)
)
const Article2 = dynamic(() =>
  import('../../components/FeaturedArticle').then((mod) => mod.Article2)
)
const NewsLetter = dynamic(() => import('../../components/newsletter'), {
  ssr: false,
})
const Podcaste = dynamic(() => import('../../components/podcaste'), {
  ssr: false,
})
const AllPodcaste = dynamic(() => import('../../components/podcaste/AllPodcaste'), {
  ssr: false,
})
const AllNews = dynamic(() => import('./../../components/news/AllNews'), {
  ssr: false,
})



import Link from 'next/link'
import { fetchCategory } from '../../../redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image'

const Cotegory = ({ news, story, mustsee, leble, categoryType }) => {

  const dispatch = useDispatch();
  const { data: category, status } = useSelector((state) => state.category);
  const router = useRouter();
  const [featArticle, setFeatArticle] = useState();
  const getFeaturedArticles = async (slug) => {
    const res = await allFeatured({ "categoryslug": slug });
    if (res.data.bool) {
      setFeatArticle(res.data)
    }
  }


  let json_object = {
    "limit": 10
  }



  const { cu, slug } = router.query;

  if (slug) {
    json_object['categoryslug'] = slug[0];
  }
  if (cu) {
    json_object['countryslug'] = cu;
  }



  const [podcast, setPodcast] = useState([])
  const [multipleimage, setMultipleimage] = useState([])

 
  const getfeaturedArticle = async () => {

    try {
      const { data } = await allFeatured(Object.keys(json_object).length != 0 ? json_object : null);
      if (data.bool) {
        setFeatArticle(data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getAllPodcast = async () => {
    try {
      const { data } = await allPodcast(Object.keys(json_object).length != 0 ? json_object : null);
      if (data.bool) {

        setPodcast(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getImage = async () => {
    try {
      const { data } = await allImage({ "limit": 10 });
      if (data.bool) {
        setMultipleimage(data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const observer2 = useRef();

  const observer4 = useRef();
  const observer5 = useRef();
  useEffect(() => {

    dispatch(fetchCategory());

    observer2.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getfeaturedArticle()
     
      }

    });

    observer4.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {

        getAllPodcast()

      }

    });
    observer5.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getImage()
      }

    });


    const target2 = document.querySelector('.featuredArticle');
    const target5 = document.querySelector('.featuredImage');
    const target4 = document.querySelector('.podcasteSeciontCategory');

    if (target2) observer2.current.observe(target2);
    if (target4) observer4.current.observe(target4);
    if (target5) observer5.current.observe(target5);

  }, [])

  return (
    <>
      {
        leble === 'all' && categoryType === 'news' && <AllNews data={news} />
      }
      {
        leble === 'all' && categoryType === 'podcaste' && <AllPodcaste data={podcast} />
      }
      {
        leble === 'all' && categoryType === 'article' && <div className="container">
          <div className='row gy-3  mt-5 felis-bt '>
            {
              featArticle && featArticle.bool && featArticle.data.length > 0 && featArticle.data.map((item, key) => (
                <div key={key} className='col-md-3 farme_in_meun_12 mb-4 banner-meun '>
                  <Article2 articleItem={item} />
                </div>
              ))
            }
          </div>
        </div>
      }


      {
        categoryType == '' && <>

          <div className="section-banner">
            <div className="scrn-container">
              <div className="banner-meun">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="section-menu-top">
                      <div className={`lift-side-text text-capitalize category-title ${router.query.slug =='business' && 'category-title-b'} ${router.query.slug =='entertainment' && 'category-title-e'}`}>
                        {router.query.slug}
                      </div>
                      <div className="right-side-text-10">
                        <Link className='see-all' href={`/category/${router.query.slug[0]}/news/all${cu ? '?cu=' + cu : ''}`}>See All</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Unock-text-in row">
                  <div className="col-xl-12">
                    <div className="farme-meun-in-all-9">
                      {
                        news.bool && news.data.length != 0 && news.data.slice(0, 1).map((newsItem, key) => {
                          if (key == 0) {
                            return <MainNews key={key} newsItem={newsItem} title={router.query.slug} />
                          } else if (key == 1 || key == 2) {
                            return <SecondNews key={key} newsItem={newsItem} title={router.query.slug} />
                          }
                        })
                      }

                    </div>
                  </div>

                  {
                    news.bool && news.data.length != 0 && news.data.slice(1, 4).map((newsItem, key) => {

                      return <div key={key} className="col-xl-4">
                        <div className="right-side-menu"> <ThirdNews newsItem={newsItem} />
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>



          <section className="section-banner-in ">
            <div className="scrn-container">

              <div className="row mx-0">
                <div className="col-xl-7 banner-meun">
                  <div className=" meun-bar">
                    <div className="lift-side-text">Important Articles</div>
                 
                  </div>
                  <div className="farme-tltle">

                    {
                     mustsee &&  mustsee.bool && mustsee.data.length != 0 && story.data.slice(0, 3).map((mustItem, key) => {
                        return <MustSee key={key} mustItem={mustItem} />
                      })
                    }

                  </div>
                </div>
                <div className="col-xl-5  featuredImage">
                  <div className="imgex">
                    <Image height={270} width={100} alt='ads' className='mt-0 h-270' src="/images/Rectangle 2496.png" />
                  </div>
                  <MostViewedImage multipleimage={multipleimage} />

                </div>
              </div>

            </div>
          </section>
          <section className="section-banner-in featuredArticle mb-4">
            <div className="scrn-container">
              <div className="section-scrn_banner">
                <div className="row meun-bar-lo">
                  <div className="col-xl-12">
                    <div className="lift-side_lg">
                      <div className="lift-side-text">
                        Featured Articles
                      </div>
                      <div className="right-side-all_text">
                        <ul className="nav nav-tabs">
                          <Link href={`/category/${router.query.slug[0]}/article/all${cu ? '?cu=' + cu : ''}`} className='cursor-pointer' >All</Link>
                          {
                           category && category.length != 0 && category.map((cate, key) => (
                              <li key={key} className="nav-item fv-tab-li">
                                <span className='cursor-pointer' onClick={() => getFeaturedArticles(cate.slug)}>{cate.title}</span>
                              </li>
                            ))
                          }

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane  fade active show" id="home">

                      <div className=" row gx-3 ">
                        {
                          featArticle && featArticle.bool && featArticle.data.length != 0 && featArticle.data.slice(0, 1).map((curlElem1, key) => {
                            return <div key={key} className="col-xl-6"><Article2 articleItem={curlElem1} title={''} /></div>
                          })
                        }


                        <div className="col-xl-6">
                          <div className='row '>
                            {


                              (featArticle && featArticle.bool && featArticle.data.length > 0) ? featArticle.data.slice(1, 3).map((curlElem2, key) => {
                                return <div key={key} className="col-xl-12 mb-3"><Article1 articleItem={curlElem2} title={''} /></div>
                              }) : <div>Not Found</div>
                            }
                          </div>
                        </div>


                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
          <section className=" pt-4" >
            <div className="container ">
              <div className="row">

                <div className='col-md-7'>
                  <NewsLetter />
                </div>
                <div className='col-md-5'>
                  <div className="imgex mt-4">
                    <Image height={270} width={100} alt='ads' className='mt-0 h-270' src="/images/Rectangle 2496.png" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className='podcasteSeciontCategory'>
          <Podcaste podcast={podcast} url={`/category/${router.query.slug[0]}/podcaste/all${cu ? '?cu=' + cu : ''}`} />

          </div>


        </>
      }


    </>
  )
}

export default Cotegory

export async function getServerSideProps(context) {

  const { cu, slug } = context.query;
  let json_object = {};
  let categoryType = ''
  let leble = '';
  if (cu) {
    json_object['countryslug'] = cu;
  }

  if (slug) {

    json_object = { ...json_object, categoryslug: slug[0] };
    // json_object.categoryslug = slug;
  }

  if (slug.length === 3) {
    leble = 'all';
    json_object['limit'] = 60;
    categoryType = slug[1]
  }

  const { data: news } = await allNews(json_object);
  const { data: story } = await allStory(json_object);
  const { data: mustsee } = await allMustSee(json_object);


  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  return {
    props: { news, story, mustsee, leble, categoryType }
  }
}