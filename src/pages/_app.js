
import Layout from '../layout'
import AuthLayout from '../authLayout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken } from '../../utils';
import { Provider } from 'react-redux'
import store from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Loader from '../components/Loader';
export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    setTimeout(() => setLoading(false), 1000);

    if (typeof window !== 'undefined') {
      const loader = document.getElementById('preloader');
      if (loader)
        loader.style.display = 'none';
    }
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const history = useRouter();


  const pathname = history.pathname.split('/');

  if (pathname[1] === 'auth') {
    if (!getAccessToken()) {
      history.push('/');
    }
    return (
      <>
        {!loading ? (
          <Provider store={store}>

            <style jsx global>{`
            body {
              background: #f8f8f8};
            }
          `}</style>
            <AuthLayout {...Component}>
              <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Component {...pageProps} />
            </AuthLayout>

          </Provider>
        )
          :
          (<Loader />)
        }
      </>
    )
  } else {
    return (
      <>
        {!loading ? (
          <Provider store={store}>
            <style jsx global>{`
  body {
    background: #f8f8f8};
  }
`}</style>
            <Layout {...Component}>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Component {...pageProps} />
            </Layout>

          </Provider>
        )
          :
          (
            <Loader />
          )
        }
      </>
    );


  }



}
