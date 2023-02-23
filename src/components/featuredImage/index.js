import React,{ useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import CustomPagination from './../../hooks/CustomPagination'
import { formatDate } from '../../../utils';
const Index = ({ multipleimage }) => {
  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const [videoStep, setVideoStep] = useState(1)
  return (
    <section className="section-banner-box featuredImage mb-4">
      <div className="scrn-container">

        <div className="row top-minu">
          <div className="col-xl-6">
            <div className="section-menu-top  farme-meun-line">
              <div className="lift-side-text">
                Featured Images
              </div>
              <div className="right-side-text-10">
                <Link href={`/image/all`} className="see-all">See All</Link>
              </div>
            </div>

            {
              multipleimage.bool && multipleimage.data.length != 0 && multipleimage.data.slice(0, 1).map((imageItem1, key) => {
                return <FeaturedImage key={key} imageItem1={imageItem1} title={''} />
              })
            }

          </div>
          <div className="col-xl-6">
            <div className="right-side-0_bg farme-meun-line">
              <div className="more-in">More Like These</div>
              <div className="right-side-text-10">
              <CustomPagination
                  showPerPage={showPerPage}
                  onPaginationChange={onPaginationChange}
                  total={multipleimage.data?multipleimage.data.length:0}
                />
              
              </div>
            </div>
            <div className="farme-meun_32">

              {
                multipleimage.bool && multipleimage.data.length != 0 && multipleimage.data.slice(pagination.start, pagination.end).map((imageItem2, key) => {
                  return <LikeImage key={key} imageItem2={imageItem2} title={''} />
                })
              }
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
export default Index


export const FeaturedImage = ({ imageItem1 }) => {

  return (
    <div className="carousel-item active">
      <div className="claim-text">
        <div className="imex-lift">
        <Image src={`${imageItem1.image?imageItem1.image+'/small':''}`}  height={500} width={500} alt='' />
       
        </div>
        <div className="farme_31">
          <div className="farme_30_0">
            <Link href={`/image/${imageItem1.id}`} > <h1>{imageItem1.title}</h1></Link>

            <p>{imageItem1.short_desc}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export const LikeImage = ({ imageItem2 }) => {

  return (
    <div className="carousel-item active">
      <div className="farme-meun_32">
        <div className="farme-meun_30-in">
          <div className="farme-lift-side-imges">
            <Image src={`${imageItem2.image?imageItem2.image+'/small':''}`}  height={160} width={300} alt='' />
            
          </div>
          <div className="farme-meun_right-text">
            <Link href={`image/${imageItem2.id}`} > <h1>{imageItem2.title}</h1></Link>
            <p>{imageItem2.short_desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MostViewedImage = ({ multipleimage }) => {

  return (
    <div className="farme_meun_text_12 banner-meun">
      {
        multipleimage.bool && multipleimage.data.length != 0 && multipleimage.data.slice(0, 2).map((elem, key) =>

        (
          <div key={key}>
            <div className="farme_col_meun ">
              <Image width={1300} height={300} alt='' className='mostviewedimage' src={`${multipleimage.image?multipleimage.image+'/small':''}`} />
            </div>
            <div className="farme_in_meun_12">
              <div className="farme-meun-toggole_12">
                <Link href={`/image/${elem.id}`} ><h1 className='px-2'>{elem.title}</h1></Link>
              </div>

              <span> {formatDate(elem.created_at)}</span>
              
            </div>
          </div>
        )
        )
      }

    </div>
  )
}
