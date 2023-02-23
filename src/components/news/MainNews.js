import React from 'react'
import { formatDate } from './../../../utils'
import Link from 'next/link';
import { useRouter } from 'next/router';
import SmartText from '../SmartText';

const MainNews = ({ newsItem, title = '' }) => {

    const router = useRouter();
    return (
        <div className="farme-meun-box">
            <div className="sideber-menu">
                <div className="sideber-menu-text">
                    <img className='h-347' height={300} src={newsItem.urltoimage && newsItem.urltoimage} alt='news' loading="lazy" />
                    <div className="text-conter">
                        <Link href={`/news/${newsItem.id}`} className="text-decoration-none cursor-pointer text-default"><h1>{(newsItem.title) ? newsItem.title.substring(0, 150) : ''}</h1></Link>

                        <p>{(newsItem.description) ? newsItem.description.substring(0, 70) : ''}</p>
                        <SmartText text={newsItem.content} length={100} />
                        <span className='pt-5'>{formatDate(newsItem.publishedAt)} </span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MainNews