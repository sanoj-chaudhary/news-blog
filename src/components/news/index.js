import React from 'react'
import MainNews from './MainNews'
import SecondNews from './SecondNews'
import ThirdNews from './ThirdNews'
import Link from 'next/link'
const index = ({ news }) => {
  return (
    <div className="section-banner">
      <div className="scrn-container">
        <div className="banner-meun">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-menu-top">
                <div className="lift-side-text">
                  Latest News
                </div>
                <div className="right-side-text-10">
                  <Link href={`news/all`} className="see-all ">See All</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="Unock-text-in row">
            <div className="col-xl-7">
              <div className="farme-meun-in-all-9">
                {
                  news.bool && news.data.length != 0 && news.data.slice(0, 3).map((newsItem, key) => {
                    if (key == 0) {
                      return <MainNews key={key} newsItem={newsItem} title={''} />
                    } else if (key == 1 || key == 2) {
                      return <SecondNews key={key} newsItem={newsItem} title={''} />
                    }
                  })
                }

              </div>
            </div>
            <div className="col-xl-5">
              <div className="right-side-menu row">

                {
                  news.bool && news.data.length != 0 && news.data.slice(3, 8).map((newsItem, key) => {

                    return <ThirdNews key={key} newsItem={newsItem} title={''} />

                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index