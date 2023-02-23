import React from 'react'
import {formatDate} from './../../../utils'
import Link from 'next/link'

const SecondNews = ({newsItem, title=''}) => {
 

  return (
    <div className="farme-meun">
      <div className="farme-meun-in-9">
        <div className="imgex-in">
        <img src={newsItem.urltoimage?newsItem.urltoimage:''} alt="" loading="lazy" />
          <div className="farme-meun-9">
            <div className="farme-meun-in-all">
              <div className="farme-meun-in">
             
              <Link href={`/news/${newsItem.id}`} className="text-decoration-none cursor-pointer text-default">
                <h1>{(newsItem.title) ? newsItem.title.substring(0, 90): ''}</h1></Link>
                <p>{(newsItem.description) ? newsItem.description.substring(0, 80): ''}</p>
              </div>
              <span>{formatDate(newsItem.publishedAt)} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="top-line"></div>
    </div>
  )
}

export default SecondNews