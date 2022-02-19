import GlobalStyles from "../styles/global";
import Layout from "@core/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
