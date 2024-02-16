import { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../../LoadStrip';
import Layout from '@/component/layout';

const stripePromise = getStripe();
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <Toaster
        position='top-right'
        toastOptions={{
          // Define default options

          style: {
            background: '#363636',
            color: '#fff',
            padding: '30px !important',
            marginLeft: '80px ',
          },
        }}
      />
      <PersistGate persistor={persistor}>
        <Elements stripe={stripePromise}>
          <Layout>
            {' '}
            <Component {...pageProps} />
          </Layout>
        </Elements>
      </PersistGate>
    </Provider>
  );
}
