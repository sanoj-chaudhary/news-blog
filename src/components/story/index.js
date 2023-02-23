import React from 'react'
import { formatDate } from '../../../utils'
import SmartText from '../SmartText'
import Image from 'next/image'
import Link from 'next/link'
const index = ({ storyItem }) => {
 
  return (
    <div className="stories-menu">
      <div className="text-conter-tgooel">
        <Image height={240} width={500}  src={`${storyItem.image}/small`}  alt='' />
      </div><div className="text-tolyy">
        <div className="farme-9">

        <div className="farme-meun-toggole_12">
                <Link className='text-dark' href={`/story/${storyItem.id}`} ><h1 className='px-2'>{storyItem.title}</h1></Link>
              </div>
         
          <SmartText text={storyItem.description} />
         
        </div>
       <span> {formatDate(storyItem.created_at)} | <span className='text-capitalize'>{storyItem.category.title}</span></span>
      </div>
    </div>
  )
}

export default index