import { UserContextProvider } from "../lib/UserContext";
import { supabase } from "../lib/initSupabase";
import GlobalStyles from "../styles/global";
import Layout from "../components/core/Layout";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [playing, setPlaying] = useState({
    playing: "",
    name: "Britney",
    img: "/temp.jpg",
  });

  return (
    <UserContextProvider supabaseClient={supabase}>
      <GlobalStyles />
      <Layout playing={playing}>
        <Component {...pageProps} playing={setPlaying} />
      </Layout>
    </UserContextProvider>
  );
}
