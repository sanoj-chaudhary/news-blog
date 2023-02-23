import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

  const AuthUser = () =>{
 
    const getToken = () =>{

      if (typeof window !== 'undefined') {
        const tokenString = window.localStorage.getItem('digitoken');
        const userToken = JSON.parse(tokenString);
        return userToken;
      }
      return true
     
    }

    const getUser = () =>{
      if (typeof window !== 'undefined') {

        const tokenString = window.localStorage.getItem('digiUser');
        const userString = JSON.parse(tokenString);
        const user_detail = JSON.parse(userString);
        return user_detail;
        
      }
      return true
       
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (token) =>{

      if (typeof window !== 'undefined') {
        localStorage.setItem("digitoken", JSON.stringify(token));
      }



        setToken(token);
        setUser(user);
        return true
    }
   const logoutUser = () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem("digitoken");
        window.localStorage.removeItem("digiUser");
    
      }
      Router.push('/');
      return true
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logoutUser
    }
}

export default AuthUser