import React from 'react'
import Link from 'next/link'
import { formatDate, getAccessToken, getUserProfile } from '../../../utils'
import { authorArticleShow, readerFacArticle } from '../../http/auth-apis'
import { useState } from 'react'
import { useEffect } from 'react'
import AuthorProfile from '../../components/profile/AuthorProfile'
import Account from './../../components/profile/Account'
import Favarticle from '../../components/reader/Favarticle'
import { data } from 'jquery'
const Profile = () => {

  const [token, setToken] = useState(null)
  const [user, setUser] = useState(JSON.parse(getUserProfile()))
  const [article, setArticle] = useState([])
  const getauthorarticle = async (api) => {
    try {

      const  headers={
        'Authorization': `Bearer ${token}` , 
      }
      const res = await api({},headers)
    
      if (res.data.bool) {
  
        setArticle(res.data.data);
      }
    } catch (error) {
      console.log("Message : ", error.message)
    }
  }

  useEffect(() => {
    setToken(getAccessToken())
    if (user.role === "Author") {
      getauthorarticle(authorArticleShow);
    }
    if (user.role === "Reader") {
      getauthorarticle(readerFacArticle);
    }
 
  }, [token])


  return (

    <>
      <section className="user-profile-section">
        <div className="scrn-container">
          <div className="user-profile-conntent">

            <div className="user-detail">
              <div className="name-address">
                <Account />
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        user && user.role === "Author" && <AuthorProfile data={article} />
      }
      {
        user && user.role === "Reader" && <Favarticle data={article} />
      }
    </>
  )
}

export default Profile