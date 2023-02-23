import React from 'react'
import { formatDate } from '../../../utils'
import Link from 'next/link'
import Image from 'next/image'
const index = ({ podcast, url = '' }) => {

  return (

    <>

      <section className="section-banner-in-0 mb-4 podcastSection">
        <div className="scrn-container">
          <div className="banner-meun ">
            <div className="lift-side_lg">
              <div className="lift-side-text">
                Podcasts
              </div>
              <div className="right-side_lg">
                <Link href={`${url ? url : 'podcaste/all'}`} className="see-all">See All</Link>
              </div>
            </div>
            <div className="row felis-bt">

              {
                podcast.bool && podcast.data.length != 0 && podcast.data.slice(0, 4).map((podcastItem, key) => {
                  return <div key={key} className="col-md-3 farme_in_meun_12">
                    <div className="farme_col_meun-_img">

                      <Image height={210} width={390} alt={`podcast-${key}`} src={`${podcastItem.image?podcastItem.image+'/small':''}`} />
                    </div>
                    <div className="farme-meun-toggole_13">

                      <Link href={`podcaste/${podcastItem.slug}`} > <h1>{podcastItem.title}</h1></Link>

                    </div>
                    {/* <audio id="squiggle" src={podcastItem.audio} controls>
        Squiggle
      </audio> */}
                    {formatDate(podcastItem.created_at)} | <span className='text-capitalize'>{podcastItem.country.title}</span>
                  </div>
                })
              }


            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default index