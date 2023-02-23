
import Link from 'next/link'
import { formatDate } from '../../../utils'
import NewsLetter from './../newsletter'
import Image from 'next/image'
const index = ({ opinion }) => {
  return (
    <section className="section-banner-in opinionSection">
      <div className="scrn-container">
        <div className="row farme-meun_scen">
          <div className="col-lg-6">
            <div className="card-fluid-1 section-scrn_banner">
              <div className="title-box lift-side_lg">
                <div className="lift-side-text">
                  Opinion
                </div>
                <div className="right-side-text">
                  <Link href={`/opinion/all`} className="see-all">See All</Link>
                </div>
              </div>

              {
                opinion.bool && opinion.data.length != 0 && opinion.data.slice(0, 2).map((opinionItem, key) => {
                  return <OpinionComponent key={key} opinionItem={opinionItem} title={''} />
                })
              }
            </div>
          </div>
          <div className="col-lg-6">
            <NewsLetter />
          </div>
        </div>
      </div>
    </section>
  )
}

export default index



export const OpinionComponent = ({ opinionItem }) => {


  return (
    <div className="farme-meun_in_11_box card-new ">
      <div className="farme_meun_in_img">

        <Image height={200} width={283} alt={`opinion-${opinionItem.id}`} className='opinionImg' src={`${opinionItem.image?opinionItem.image+'/small':''}`} />
      </div>
      <div className="farme_meun_11_text">
        <div className="farme_meun_conter">
          <Link href={`opinion/${opinionItem.slug}`} ><h1>{opinionItem.title}</h1></Link>
          <p>{(opinionItem.short_desc) ? opinionItem.short_desc.substring(0, 200) + '...' : ''}</p>

        </div>
        <div>{formatDate(opinionItem.created_at)} | <span className='text-capitalize'>{opinionItem.country.title}</span></div>
      </div>
    </div>
  )
}

