import { Suspense, lazy, useEffect, useState } from 'react'
import { allNews, allStory, allMustSee, AllOpinion, allPodcast, allFeatured, multipleVideo, allImage, addBanners } from './../http'

const MustSee = lazy(() => import('./../components/mustsee'))
const Podcaste = lazy(() => import('./../components/podcaste'))
const FeaturedVideo = lazy(() => import('./../components/featuredVideo'))
const FeaturedImage = lazy(() => import('./../components/featuredImage'))
const FeaturedArticle = lazy(() => import('./../components/FeaturedArticle'))
const Opinion = lazy(() => import('./../components/opinion'))
const NewsLetter = lazy(() => import('./../components/newsletter'))
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';
import { fetchAds } from '../../redux/addBannerSlice';
import dynamic from 'next/dynamic'
import News from './../components/news'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getAccessToken } from '../../utils'
import Loading from './loading'

function Home({ news, story, mustsee }) {

  const router = useRouter();
  let json_object = {
    "limit": 10
  }
  const { cu } = router.query;

  if (cu) {
    json_object['countryslug'] = cu;
  }
  const [featuredArticle, setFeaturedArticle] = useState([])
  const [allvideo, setAllvideo] = useState([])
  const [opinion, setOpinion] = useState([])
  const [podcast, setPodcast] = useState([])
  const [multipleimage, setMultipleimage] = useState([])
  const dispatch = useDispatch();

  const { data:ads } = useSelector((state) => state.ads);
  const getfeaturedArticle = async () => {

    try {
      const { data } = await allFeatured(Object.keys(json_object).length != 0 ? json_object : null);
      if (data.bool) {
        setFeaturedArticle(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getallVideo = async () => {
    try {
      const { data } = await multipleVideo(Object.keys(json_object).length != 0 ? json_object : null);
      if (data.bool) {
        setAllvideo(data )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getOpinion = async () => {
    try {
      const { data } = await AllOpinion({ "limit": 10 });
      if (data.bool) {
        setOpinion(data )
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
  const observer1 = useRef();
  const observer2 = useRef();
  const observer3 = useRef();
  const observer4 = useRef();
  const observer5 = useRef();

  useEffect(() => {
 
    dispatch(fetchAds());
    observer1.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getallVideo()
      }
      
    });
    observer2.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getfeaturedArticle()
      }
      
    });
    observer3.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getOpinion()
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

    const target1 = document.querySelector('.featuredVideo');
    const target2 = document.querySelector('.featuredArticle');
    const target3 = document.querySelector('.opinionSection');
    const target5 = document.querySelector('.featuredImage');
    const target4 = document.querySelector('.podcastSection');
 
    if (target1) observer1.current.observe(target1);
    if (target2) observer2.current.observe(target2);
    if (target3) observer3.current.observe(target3);
    if (target4) observer4.current.observe(target4);
    if (target5) observer5.current.observe(target5);

  }, [])

  return (
    <>


      <News news={news} />

      <Suspense fallback={<Loading />} >
        <MustSee mustsee={mustsee} story={story} />
      </Suspense>
      <section>
        <div className="scrn-container">
          <div className="row">
            <div className="imgex">
              <img className='mb-0 mt-4' src="images/Rectangle 2496.png" />
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<Loading />} >
        <FeaturedVideo allvideo={allvideo} />
      </Suspense>
      <Suspense fallback={<Loading  />} >
        <FeaturedArticle featuredArticle={featuredArticle} />
      </Suspense>
      <Suspense fallback={<Loading />} >
        <Opinion opinion={opinion} />
      </Suspense>
      <Suspense fallback={<Loading />} >
        <FeaturedImage multipleimage={multipleimage} />
      </Suspense>


      <section className="section-banner-in-0 my-4">
        <div className="scrn-container">
          <div className="row">
            <div className=" col-xl-12 imgex">
              <Image className='m-0'
                src={`/images/Rectangle 2496.png`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'images/Rectangle 2496.png';

                }}
                width={1200} height={250}
                alt="adds"
              />

            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={'Pleaes wait...'} >
        <Podcaste podcast={podcast} />
      </Suspense>


      <section className="section-banner-in-0">
        <div className="scrn-container">
          <div className="row">
            <div className="col-xl-12 ">
              <NewsLetter />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
export default dynamic(() => Promise.resolve(Home), { ssr: false })

export async function getServerSideProps(context) {
  const { cu, cot } = context.query;

  let data = {
    "limit": 10
  };

  if (cu) {
    data['countryslug'] = cu;
  }

  const { data: news } = await allNews(Object.keys(data).length != 0 ? data : null);
  const { data: story } = await allStory(Object.keys(data).length != 0 ? data : null);
  const { data: mustsee } = await allMustSee(Object.keys(data).length != 0 ? data : null);


  context.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600,stale-while-revalidate=59');
  return {
    props: { news, story, mustsee }
  }
}
