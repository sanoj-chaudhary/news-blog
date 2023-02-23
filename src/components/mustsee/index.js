import React from 'react'


import MustSeeCard from './MustSeeCard'
import Story from './../story'
import Link from 'next/link'
const index = ({ mustsee, story }) => {

  return (

    <section className="section-banner-in mustSee">
      <div className="scrn-container">
        <div className="banner-menu-bg">
          <div className="row">
            <div className="col-xl-7">
              <div className="meun-bar">
                <div className="lift-side-text">Must See</div>
                <div className="right-side-text-10"><Link href={`/mustsee/all`} className="see-all">See All</Link></div>
              </div>
              <div className="farme-tltle">
                {
                  mustsee.bool && mustsee.data.length != 0 && mustsee.data.slice(0, 3).map((mustItem, key) => {
                    return <MustSeeCard key={key} mustItem={mustItem} title={mustItem.seo_title} />
                  })
                }
              </div>
            </div>
            <div className="col-xl-5">
              <div className="farme-meun-right-tilte">
                <div className="meun-bar">
                  <div className="lift-side-text">Top Stories</div>
                  <div className="right-side-text-10"><Link href={`/story/all`} className="see-all">See All</Link></div>
                </div>
                <div className="farme-meun10">
                  {
                    story.bool && story.data.length != 0 && story.data.slice(0, 2).map((storyItem, key) => {
                      return <Story key={key} storyItem={storyItem} title={storyItem.seo_title} />
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default index





