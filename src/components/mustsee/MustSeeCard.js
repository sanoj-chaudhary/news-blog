import React from 'react'
import SmartText from '../SmartText'
import { formatDate } from './../../../utils'
import Image from 'next/image'
import Link from 'next/link'
const MustSeeCard = ({ mustItem }) => {
  return (
    <div className="farme-meun-toggole mb-4">
      <div className="farme-meun-9">

        <Image height={241} width={215} alt='mustsee' src={`${mustItem.image?mustItem.image+'/small':""}`} />
      </div>
      <div className="farme-meun10">
        <div className="farme-meun-in">
         <Link className="text-dark" href={`./mustsee/${mustItem.id}`}> <h1 >{(mustItem.title) ? mustItem.title.substring(0, 50) : ''}</h1></Link>
          <SmartText text={mustItem.description} length={170} />

        </div>
        <span>{formatDate(mustItem.created_at)} | <span className='text-capitalize'>{mustItem.category.title}</span></span>
      </div>
    </div>

  )
}

export default MustSeeCard