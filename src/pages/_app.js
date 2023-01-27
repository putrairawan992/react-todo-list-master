import Head from 'next/head';
import { Provider } from 'react-redux';
import SSRProvider from 'react-bootstrap/SSRProvider';
import store from '../redux/store';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#16abf8" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SSRProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
