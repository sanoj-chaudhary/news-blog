import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountry } from './../../../redux/countrySlice';
import { formatDate } from '../../../utils'
import AddComment from '../AddComment'
import { allStory } from '../../http';
import Newsletter from './../newsletter'
import Image from 'next/image'
const SingleNews = ({ data, story }) => {
  const dispatch = useDispatch();
  const [storys, setStorys] = useState(story);
  
  const [label, setLabel] = useState('All countries')
  const { data: country } = useSelector((state) => state.country);

  const getStory = async (data) =>{
    if(data === 'All Countries'){
      setStorys(story)
     
    }

    
    setLabel(data)
    try {
      const res = await allStory({"countryslug":data,"limit":3})
      if(res.data.bool){
        setStorys(res.data);
      }
    } catch (error) {
      console.log("Message : ",error.message);
    }
   
  }


  useEffect(() => {
    dispatch(fetchCountry());
  }, []);
  

  return (
    <>

      <section className="main-sectoion">
        <div className="scrn-container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-content argentina-content">
                <h3 className="argentina-title category-title">{data.title}</h3>
                <div className="argentina-date-box">
                  <p className="date-box">{formatDate(data.publishedAt)}</p>
                </div>
                <div className="ar-banner">
                  <img src={data.urltoimage} loading="lazy" alt='' />
                </div>
                <div className="ar-share-box">
                  <div className="share-title">
                    <p><b>By {data.author}</b> </p>

                  </div>
                  <div className="social-share">
                    <a href="#">Share : </a>
                    <a href="#" target="_blank"><Image width={20} alt='' height={20} src="/images/face.svg" /></a>
                    <a href="#" target="_blank"><Image width={20} alt='' height={20} src="/images/twiter.svg" /></a>
                    <a href="#" target="_blank"><Image width={20} alt='' height={20} src="/images/instagram.svg" /></a>
                    <a href="#" target="_blank"><Image width={20} alt='' height={20} src="/images/share.svg" /></a>
                  </div>
                </div>
                <div className="ar-content-box">
                  <p>
                    {data.description}
                  </p>
                  <div className="ar-images-box">
                    <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                  </div>
                  <div className=''><AddComment articleid={data.id} /></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ar-right-side">
                
                <div className="ar-right-side-content-side">
                  <div className="right-title">
                    <h3>Top Stories</h3>
                    <div className="dropdown right-drop-down" >
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span>{label}</span>
                      </button>
                      <ul className="dropdown-menu right-dropdown-menu">
                      <li><span className="dropdown-item text-capitalize  " onClick={()=>{getStory('All Countries')}} >All Countries</span></li>
                        {
                          country && country.length !== 0 && country.map((item,key)=>(
                            <li key={key}><span className="dropdown-item cursor-pointer"  onClick={()=>{getStory(item.slug)}} >{item.title}</span></li>
                          ))
                        }
                       
                      </ul>
                    </div>
                  </div>


                  <div className="right-cont-box">
                    <div className="ar-right-city-list">

                      {
                        storys.bool && storys.data.length != 0 && storys.data.slice(0, 3).map((curlElem1, key) => {
                          return <div key={key} className="city-card">

                            <img src={curlElem1.image} />
                            <div className="city-card-content">
                              <a className="btn btn-city mt-2">{curlElem1.country.title}</a>
                              <h3>{curlElem1.title}
                              </h3>
                              <div className="city-date">
                                <p>{formatDate(curlElem1.created_at)} | {curlElem1.category.title}</p>
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </div>
                </div>
                <img src="/images/ar-.png" className="ar-right-image mt-4" />
                {/* <img src="/images/city-big.png" className="city-big" /> */}
              </div>
            </div>
          </div>
        </div>


      </section>

      

      <div className='container'><Newsletter /></div>
    </>
  )
}

export default SingleNews