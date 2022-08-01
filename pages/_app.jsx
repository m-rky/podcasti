import GlobalStyles from '../styles/global';
import Layout from '../components/core/Layout';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [playing, setPlaying] = useState({
    playing: '',
    name: 'Britney',
    img: '/temp.jpg',
  });

  return (
    <>
      <GlobalStyles />
      <Layout playing={playing}>
        <Component {...pageProps} playing={setPlaying} />
      </Layout>
    </>
  );
}
