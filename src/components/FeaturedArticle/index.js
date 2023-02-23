import React from 'react'
import Image from 'next/image'
import { formatDate, getAccessToken } from '../../../utils'
import { allFeatured, readerAddFacArticle } from '../../http'
import { useState } from 'react'
import SmartText from './../SmartText'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCategory } from '../../../redux/categorySlice'


const Index = ({ featuredArticle }) => {

  const dispatch = useDispatch();
  const [token, setToken] = useState()
  const { data: category, status } = useSelector((state) => state.category);
  const [active, setActive] = useState(null)
  const [featArticle, setFeatArticle] = useState(featuredArticle);
  const getFeaturedArticle = async (slug) => {
    const res = await allFeatured({ "categoryslug": slug });
    if (res.data.bool) {
      setFeatArticle(res.data)
    }
  }
  useEffect(() => {
    setToken(getAccessToken())
    setFeatArticle(featuredArticle)
    dispatch(fetchCategory());
  }, []);


  return (
    <section className="section-banner-in featuredArticle">
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
                    <li className="nav-item fv-tab-li">
                      <Link href={`/article/all`} className='cursor-pointer' >All</Link>
                    </li>
                    {
                      category && category.length != 0 && category.map((cate, key) => (
                        <li key={key} className="nav-item fv-tab-li">
                          <span className={`cursor-pointer ${active === cate.slug?'border_bottom':''} `} onClick={() =>{ 
                            getFeaturedArticle(cate.slug)
                            setActive(cate.slug)
                            }}>{cate.title}</span>
                        </li>
                      ))
                    }

                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane  fade active show" id="home">

                <div className=" row farme_11_go align-items-baseline">
                  {
                    featArticle.bool && featArticle.data.length != 0 && featArticle.data.slice(0, 2).map((curlElem1, key) => {
                      return <div id={curlElem1.id} key={key} className="col-xl-6"><Article1 token={token} articleItem={curlElem1} title={''} /></div>
                    })
                  }

                </div>
                <div className=" row farme_meun_toggol_11 mt-3" >
                  {
                    featArticle.bool && featArticle.data.length != 0 && featArticle.data.slice(2, 6).map((curlElem2, key) => {
                      return <div id={curlElem2.id} key={key} className="col-xl-3"><Article2 token={token} articleItem={curlElem2} title={''} /></div>
                    })
                  }

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


export default Index

export const Article1 = ({ articleItem, token }) => {

  const addToFavorites = async (id) => {
    try {
      const data = {
       
        "articleid": id
      }
      const res = await readerAddFacArticle(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <div className="farme-meun_in_11_box">
        <div className="farme_meun_in_img featuredArticle">
          <Image src={`${articleItem.image?articleItem.image+'/small':''}`} height={210} width={283} alt='' />
          <div className='fav mt-2'>
            {
              token && <button className='btn btn-sm btn-outline-bg' onClick={() => addToFavorites(articleItem.id)}>
                Add to favorites
              </button>
            }
          </div>
        </div>
        <div className="farme_meun_11_text">
          <div className="farme_meun_conter">
            <h1 className='fw-bold'><Link href={`/article/${articleItem.id}`}>{articleItem.title.substring(0, 70)}</Link></h1>

            <SmartText text={articleItem.description} />

          </div>
          <span> {formatDate(articleItem.created_at)} | <span className='text-capitalize'>{articleItem.category.title}</span></span>
        </div>
      </div>

    </>
  )
}



export const Article2 = ({ articleItem,token }) => {
 

  return (
    <>

      <div className="farme_meun_text_12">
        <div className="farme_col_meun-_img ">
          <Image alt='' src={`${articleItem.image?articleItem.image+'/large':''}`} height={179} width={284} />
          <div className='fav mt-2'>
            {
              token && <button className='btn btn-sm btn-outline-bg' onClick={() => addToFavorites(articleItem.id)}>
                Add to favorites
              </button>
            }
          </div>
        </div>
        <div className="farme_in_meun_12">
          <div className="farme-meun-toggole_12">
            <h1 className='fw-bold'><Link href={`/article/${articleItem.id}`}>{articleItem.title.substring(0, 70)}</Link></h1>

            <SmartText text={articleItem.description} />

          </div>
          <span> {formatDate(articleItem.created_at)} | <span className='text-capitalize'>{articleItem.country.title}</span></span>


        </div>
      </div>

    </>
  )
}
