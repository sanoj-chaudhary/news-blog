import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
const Preview = ({ values }) => {
  const [imgSrc, setSrc] = useState(values.image?URL.createObjectURL(values.image):'');



  // URL.createObjectURL(event.target.files[0])
  console.log(values,"values")
  return (
    <section className="priview-sectiond">
      <div className="scrn-container">
        <div className="preview-container">
          <div className="row prev-row">
            <div className="col-lg-8">
              <div className="main-content argentina-content">
                <h3 className="argentina-title">{values.title}</h3>
                {/* <div className="argentina-date-box">
                  <p className="date-box">December 22, 2022 | Politics | 2hrs</p>

                </div> */}
                <div className="ar-banner">
                  <Image width={800} height={456} src={`${imgSrc}`} alt="banner" />
                </div>

                <div className="ar-content-box">
                <div dangerouslySetInnerHTML={{ __html: values.description }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview