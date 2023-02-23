import Head from "next/head"
import Navbar from './../authLayout/Navbar'
import Footer from "./../layout/Footer"
import Header from './../layout/Header'
import 'bootstrap/dist/css/bootstrap.css'
import dynamic from 'next/dynamic'
 function AuthLayout(props) {

  return (<>
    <Header { ...props } >

      
    </Header>
    <Navbar />
    { props.children }
     <Footer /> 
  </>
  )
}

export default dynamic(()=>Promise.resolve(AuthLayout),{ssr:false})