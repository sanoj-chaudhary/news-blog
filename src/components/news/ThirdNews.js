import React from 'react'
import { formatDate } from './../../../utils'
import Link from 'next/link'
const ThirdNews = ({ newsItem, title = '', classes='' }) => {


  
  return (

 
    <div className={`${ classes !=''?'direction-column':'right-side-text'}`}>
      <div className='left-img'><img src={newsItem.urltoimage} loading="lazy" alt='' height={250}   />
      </div>
      <div className="right-side-text-in">
        <div className="text-conter-0">

          <Link href={`/news/${newsItem.id}`} className="text-decoration-none cursor-pointer text-default"><h1>{(newsItem.title) ? newsItem.title.substring(0, 70) : ''}</h1></Link>
          <p>{(newsItem.description) ? newsItem.description.substring(0, 50)+'...' : ''}</p>

        </div>
        <span>{formatDate(newsItem.publishedAt)}</span>
      </div>
    </div>
  )
}

export default ThirdNews