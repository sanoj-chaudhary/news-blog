import Image from "next/image" 
import Link from "next/link"
const MoreLikeVideo = ({videoItem,title=''}) => {
  
  return (
    <div className="farme-meun_30-in">
      <div className="farme-lift-side-imges">
        <Image height={160} width={330} alt='' className=' likevideoImg' src={`${videoItem.image}/small`} />
      </div>
      <div className="farme-meun_right-text">
      <Link href={`/video/${videoItem.id}`} > <h1>{videoItem.title}</h1></Link>
        
        <p>{(videoItem.short_desc) ? videoItem.short_desc.substring(0, 150)+'...' : ''}</p>
      </div>
    </div>
  )
}

export default MoreLikeVideo