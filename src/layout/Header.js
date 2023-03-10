import Head from "next/head"
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'
 function Header(children) {
  const router = useRouter();

  
  return (
    <>
        <Head>
        <title>Asian Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href={'/css/style.css'} rel={'stylesheet'} />
        <link href={'/css/custom.css'} rel={'stylesheet'} />
        <link href={'/css/new.css'} rel={'stylesheet'} />
        <link href={'/css/article.css'} rel={'stylesheet'} />
        <link href={'/css/navbar.css'} rel={'stylesheet'} />
        
      </Head>
     
    
    </>
  )
}

export default dynamic(()=>Promise.resolve(Header),{ssr:false})
