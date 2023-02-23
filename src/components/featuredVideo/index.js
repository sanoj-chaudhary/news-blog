import MoreLikeVideo from './MoreLikeVideo'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import CustomPagination from './../../hooks/CustomPagination'
const Index = ({ allvideo }) => {


  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  return (
    <section className="section-banner-box featuredVideo" >
      <div className="scrn-container">

        <div className="row top-minu">
          <div className="col-xl-6">
            <div className="section-menu-top  farme-meun-line">
              <div className="lift-side-text">
                Featured Video
              </div>
              <div className="right-side-text-10">
                <Link href={`video/all`} className="see-all">See All</Link>
              </div>
            </div>

            {
              allvideo.bool && allvideo.data.length != 0 && allvideo.data.slice(0, 1).map((videoItem, key) => {
                return <FeaturedVideo key={key} videoItem={videoItem} title={''} />
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
                  total={allvideo.data?allvideo.data.length:0}
                />
          
              </div>
            </div>


            <div className="farme-meun_32">

              {
                allvideo.bool && allvideo.data.length != 0 && allvideo.data.slice(pagination.start, pagination.end).map((videoItem, key) => {
                  return <MoreLikeVideo key={key} videoItem={videoItem} title={''} />
                })
              }
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Index;


export const FeaturedVideo = ({ videoItem, title = '' }) => {

  return (
    <div className="claim-text ">
      <div className="imex-lift">
        <Image width={500} height={500} alt='' className='img-fluid featuredImg' src={`${videoItem.image?videoItem.image+'/small':''}`} />
      </div>
      <div className="farme_31">
        <div className="farme_30_0">
          <Link href={`/video/${videoItem.slug}`}> <h1>{videoItem.title}</h1></Link>
          <p>{(videoItem.short_desc) ? videoItem.short_desc.substring(0, 50) + '...' : ''}</p>
        </div>
        <div className="right-side-imges">
          <ima src={videoItem.image} />
        </div>
      </div>
    </div>
  )
}

