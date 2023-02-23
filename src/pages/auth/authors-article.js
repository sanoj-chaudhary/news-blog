import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { formatDate, getAccessToken } from '../../../utils';
import SmartText from '../../components/SmartText';
import { allAuthorsArticle, updateArticleStatusByEditor } from '../../http/auth-apis';

const AuthorsArticle = () => {
  const [token, setToken] = useState()
  const [allArticles, setAllArticles] = useState([])
  const [remark, setRemark] = useState('');
  const [review, setReview] = useState();

  const getAllAuthorsArticles = async () => {
try {
  
  const headers = {
    'Authorization': `Bearer ${token}`,
  }

  if(token){
    const { data } = await allAuthorsArticle({}, headers);
    if (data.bool) {
      setAllArticles(data)
    }
  }
 
} catch (error) {
  console.log("Authors-article",error)
}

  }

  const UpdateReviewStatus = async (articleid) => {


    try {
      const json_data = {
        articleid, remark
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      }

     
      const res = await updateArticleStatusByEditor(json_data,headers);
      if (res.data.bool) {
        setRemark('')
        getAllAuthorsArticles()
        toast.success(`Send for review successfully`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
    }

  }

  const UpdateStatus = async (status, articleid) => {

    try {

      const jsonData = {
        status, articleid, remark
      }
      const header = {
        'Authorization': `Bearer ${token}`,
      }

    
      const res = await updateArticleStatusByEditor(jsonData,header);
      if (res.data.bool) {
        getAllAuthorsArticles()
        toast.success(`Update status successfully`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    setToken(getAccessToken())
    getAllAuthorsArticles()
  }, [token])
  return (
    <>

      <section className="section- Articles">
        <div className="scrn-container">
          <div className="row">
            <div className="col-md-12 section- Articles_banner">
              <div className=" Articles-content">
                <h1>Articles</h1>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="section_Design_tools mb-4">
        <div className="scrn-container">
          <div className="section_Design_bnner">

            {

              allArticles.bool && allArticles.data.length > 0 && allArticles.data.map((item, key) => (
                <div key={key} className="row">
                  <div className="col-md-3">
                    <div className="farme_imges-in">
                      <img src={`${item.image}`} />

                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="tools-inner">
                      <div className="desing-wapper">
                        <button type="button"><a href="#">{item.country.title}</a></button>
                        <div className="content-title-in">
                          <h1 className='my-2'>{item.title}</h1>
                          <SmartText text={item.description} />

                          <span className='my-2'>{formatDate(item.created_at)} <span > | {item.category.title}</span></span>

                        </div>

                        {item.id === review ? <><input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} placeholder='Remark' style={{ 'width': 285 }} rows={1} className="outline-none px-2"></input> <button className='btn btn-sm btn-outline-primary' onClick={() => { UpdateReviewStatus(item.id) }}>Send</button></> : ''}

                        <div className="second-header-auth your-article-app">

                          {item.status === 'Review' &&
                            <>
                              <button className=" btn btn-bg" onClick={() => { UpdateStatus('Approved', item.id) }}>approved</button>
                              <button className="btn btn-outline-bg" onClick={() => { UpdateStatus('Rejected', item.id) }} >Rejected</button>
                              <button className="btn btn-outline-bg" onClick={() => setReview(item.id)} >Review</button>
                            </>

                          }

                          {
                            // item.status === 'Review' && <button className=" btn btn-bg" >Review</button>
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }



          </div>
        </div>
      </section>
    </>
  )
}

export default AuthorsArticle