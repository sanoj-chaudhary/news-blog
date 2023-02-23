import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { logoutUser,getUserProfile } from '../../utils'
import Image from 'next/image'
const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState()
useEffect(()=>{
setUser(JSON.parse(getUserProfile()))
},[])

  return (
    <header className="auto-header">
      <div className="scrn-container">
        <div className="second-header">
          <Link href="/" className="logo"><Image height={50} width={110} src="/images/logo.svg" alt='logo' /></Link>
          <div className="second-header-auth">
          
            <a href="#" className="notification"><Image height={20} width={20} alt='notification' src="/images/social-icon/Notification.svg" /></a>
            <div className="dropdown second-header-auth-dropdown">
              <button className="btn btn-secondary dropdown-toggle second-header-auth-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image  height={20} width={20} src="/images/social-icon/Profile.svg" /><small>{user && user.name}</small>
              </button>
              <ul className="dropdown-menu second-header-auth-menu">

                { user && user.role === 'Author' && <>
                
                <li><Link className="dropdown-item second-header-auth-item" href="/auth/articles">My Articles</Link></li>
                <li><Link className="dropdown-item second-header-auth-item" href="/auth/profile">Profile</Link></li>
                <li><Link className="dropdown-item second-header-a☻uth-item" href="/auth/summary">Article Summary</Link></li>
                </>}

                { user && user.role === 'Editor' && <>
                
                <li><Link className="dropdown-item second-header-auth-item" href="/auth/authors-article">Articles</Link></li>
                <li><Link className="dropdown-item second-header-auth-item" href="/auth/authors">All Authors</Link></li>
             
                </>}
               
              
                <li><button className="dropdown-item second-header-auth-item" onClick={logoutUser}>Logout</button></li>
              </ul>
            </div>

           
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar