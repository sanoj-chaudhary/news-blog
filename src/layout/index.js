import Header from "./Header"

import 'bootstrap/dist/css/bootstrap.css'
import { Suspense,lazy } from 'react'
import FirstNavbar from "./FirstNavbar"
import dynamic from 'next/dynamic'
const Footer = lazy(() => import('./Footer'))
 function Layout(props) {

  return (<>

  
    <Header { ...props } >
    
    </Header>
    <FirstNavbar />

    { props.children }
    <Suspense >
      <Footer /> 
    </Suspense>
    
  </>
  )
}

export default dynamic(()=>Promise.resolve(Layout),{ssr:false})