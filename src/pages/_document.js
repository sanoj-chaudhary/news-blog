import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <link href={'/css/custom.css'} rel={'stylesheet'} />
      </Head>
      <body>
       

        <div id="preloader">
        <div id="loader"></div>
      </div>
      <Main />
        <NextScript />
      </body>
    </Html>
  )
}
