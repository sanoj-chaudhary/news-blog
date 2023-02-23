import React, { useEffect, useState } from 'react'
import { formatDate, getAccessToken } from '../../../utils'
import { authorArticleShow } from '../../http/auth-apis'
import Link from 'next/link'
import Image from 'next/image'
const Articles = ({ data = [] }) => {

  const [token, setToken] = useState()
  const [article, setArticle] = useState([])
  const getauthorarticle = async () => {
    try {
     const  headers={
        'Authorization': `Bearer ${token}` , 
      }

 
      const res = await authorArticleShow({},headers)

      if (res.data) {
        setArticle(res.data.data);
      }
    } catch (error) {
      console.log("Message : ", error.message)
    }
  }



  useEffect(() => {
    setToken(getAccessToken())
    getauthorarticle();
  }, [token])

  return (
    <>

      <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
                <h1>My Articles</h1>
              </div>

            </div>
          </div>
        </div>

      </section>
      <section className="section_Design_tools mb-4">
        <div className="scrn-container">
          <div className="section_Design_bnner">
           

              {
                article.length > 0 && article.map((item, key) => (
                  <div key={key} className="row gy-4">

                    <div className="col-md-3">
                      <div className="farme_imges-in">
                        <Image height={285} width={285} alt={''} src={item.image} />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tools-inner">
                        <div className="desing-wapper">
                          <button type="button"><a href="#">{item.category.title}</a></button>
                          <div className="content-title-in">
                            <h1>{item.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            <span> {formatDate(item.created_at)} | <span className='text-capitalize'>{item.category.title}</span></span>
                            <span className='mt-4'>Read {item.views}</span>
                          </div>
                          {
                            item.status === 'Review' &&

                            <div className="second-header-auth your-article-app mt-3">
                              <button className=" btn btn-bg">Ask for approval</button>
                             <Link className="btn btn-outline-bg"  href={`/auth/edit-post?id=${item.id}`}>Edit Post</Link>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    </div>
                ))
              }


           
          </div>
        </div>
      </section>
    </>
  )
}

export default Articles

