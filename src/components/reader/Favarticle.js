import React from 'react'
import Image from 'next/image'
import { formatDate } from '../../../utils'
const Favarticle = ({ data }) => {

  return (
    <>

      <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
                <h1>My Favourite Articles</h1>
              </div>
              
            </div>
          </div>
        </div>

      </section>
      <section className="section_Design_tools">
        <div className="scrn-container">
          <div className="section_Design_bnner">
            <div className="row">

              {
                data && data.length != 0 && data?.map((item, key) => (
                  <>
                    <div className="col-md-3">
                      <div className="farme_imges-in">
                        <Image height={179} width={284} alt='' src="/images/Rectangle_img.png" />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tools-inner">
                        <div className="desing-wapper">
                          {/* <button type="button"><a href="#">{item.category.title}</a></button> */}
                          <div className="content-title-in">
                            <h1>{data.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                            <span >  {formatDate(item.publishedAt)} </span>

                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              }
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Favarticle