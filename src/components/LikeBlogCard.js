import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import SmartText from './SmartText'
const LikeBlogCard = ({ imgSrc, tittle, description }) => {
  return (
    <>
      <div className=' text-white LikeBlogCard mb-4'>
        <div className='leftSide'>
          <Image src={`${imgSrc}/small`} width={150} height={100} alt="" />
        </div>
        <div className='rightSide '>
          <h6 className=''>{tittle}</h6>


          <SmartText text={description} length={100} />
         
        </div>
      </div>    </>
  )
}

export default LikeBlogCard