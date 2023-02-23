import React, { useEffect, useState } from 'react'
import { getAccessToken, getUserProfile } from '../../../utils'
import AuthSummary from '../../components/auth/AuthSummary'
import { authorArticleShow } from '../../http/auth-apis'
const Summary = () => {
  const [token, setToken] = useState()
  const [user, setUser] = useState(JSON.parse(getUserProfile()))
  const [article, setArticle] = useState([])
  const getauthorarticle = async () => {
    try {
    
     

      const headers = {
        'Authorization': `Bearer ${token}`,
      }
      const res = await authorArticleShow({},headers);
      if (res.data) {
        setArticle(res.data.data)
      }
    } catch (err) {
      console.log("message:", err.message);
    }
  }

  useEffect(() => {
    setToken(getAccessToken())
    setUser(JSON.parse(getUserProfile()))
    getauthorarticle();
  }, [])

  return (
    <>
      {user.role === "Author" && <AuthSummary article={article} data={user} />}
    </>
  )
}

export default Summary