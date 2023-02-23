import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDate } from '../../../utils'
import { usePagination } from '../../hooks/Pagination'
import Pagination from "@mui/material/Pagination";
import { allNews } from '../../http';
import { useState,useEffect } from 'react';

const AllNews = ({ data }) => {
  const router = useRouter();
  const {slug, cu} = router.query;
  const pathname = router.asPath.split('/');
  const [news, setNews] = useState([])
  const [limit,SetLimit] = useState({
    "limit":30
  })

  let typeofSlug =( typeof slug)

  const getAllNews = async () => {

    try {
      const { data } = await allNews(limit);
      if (data.bool) {
        setNews(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, //eslint-disable-line
    displayPage,
  ] = usePagination(21, SetLimit,
    limit, news.data? news.data.length:0);
useEffect(() => {
  getAllNews()

  if(cu){
    SetLimit({
      ...limit,
      ['countryslug']:cu
    })
  }
}, [cu,limit.limit])

  return (

    <>
    
    <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
              <h2 className='text-capitalize mb-0'>{(typeofSlug == 'object' && slug.length ==3) ? slug[0]:pathname[1] } {cu?'| '+cu:''} </h2>
              <div className='text-capitalize ps-1'>{ (typeofSlug == 'object' && slug.length ==3)?slug[1]: '' }</div>
              </div>

            </div>
          </div>
        </div>

      </section>
      <section className="section-banner-in-0 mt-1">
      <div className="container ">
        <div className="row felis-bt">
          {
            news.bool && news.data.length != 0 && news.data.slice(startPageIndex,endPageIndex).map((item, key) => {
              return <div key={key} className="col-md-3 farme_in_meun_12 mb-4 banner-meun">
                <div className="farme_col_meun-_img">
                  <img alt='' src={item.urltoimage} height={179} width={284} loading="lazy" />
                </div>
                <div className="farme-meun-toggole_13">

                  <Link href={`/news/${item.id}`} className="text-decoration-none cursor-pointer text-default"><h1>{item.title.substring(0,60)}</h1></Link>

                </div>
                {formatDate(item.publishedAt)} | <span className='text-capitalize'>News</span>
              </div>
            })
          }
        </div>
      </div>

     <div className='paginationWrapper'>
     <Pagination
        color="primary"
        count={totalPages}
       
        variant="outlined" shape="rounded"
        onChange={(event, value) => {
          displayPage(value) 
      
        }}
      />
     </div>
     
    </section>
      </>
   
  )
}

export default AllNews