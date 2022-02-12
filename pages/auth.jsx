import Auth from "@core/Auth";
import { supabase } from "@lib/initSupabase";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@lib/UserContext";
import tw, { styled } from "twin.macro";

const auth = () => {
  const [authView, setAuthView] = useState("magic_link");
  const { user, session } = useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthPage>
      {!user && (
        <Auth
          supabaseClient={supabase}
          authView={authView}
          setAuthView={setAuthView}
        />
      )}
    </AuthPage>
  );
};

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default auth;

const AuthPage = tw.div`mt-24 w-11/12 ml-auto mr-auto`;
