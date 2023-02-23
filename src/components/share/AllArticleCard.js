import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatDate } from '../../../utils'
import SmartText from '../SmartText'

const AllArticleCard = ({ data,preUrl }) => {
  return (


    <div className="col mb-3">
      <div className='farme_in_meun_12 '>
        <div className={`direction-column right-side-text`}>
          <div className='left-img'><Image src={`${data.image?data.image+'/small':''}`} alt={`podcast-${data.id}`} height={179} width={284} />
          </div>
          <div className="right-side-text-in">
            <div className="text-conter-0">

              <Link href={`/${preUrl}/${data.id}`} className="text-decoration-none cursor-pointer text-default"><h1><SmartText text={(data.title) ? data.title.substring(0, 60) : ''} /></h1></Link>
              <SmartText text={(data.description) ? data.description.substring(0, 270) : ''} />


            </div>
            <span>{formatDate(data.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllArticleCard