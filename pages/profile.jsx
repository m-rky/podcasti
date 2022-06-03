import { useState, useEffect } from "react";
import { supabase } from "@lib/initSupabase";
import Grid from "@comp/Grid";
import Result from "@comp/Result";

export default function Profile() {
  const [content, setContent] = useState(null);

  const user = supabase.auth.user();

  useEffect(() => {
    console.log(user);
    async function fetchData() {
      if (user) {
        const { data, error } = await supabase
          .from("subs")
          .select("showlist")
          .match({ user: user.id });
        console.log(data || error);
        if (data.length >= 1) {
          console.log("setting content...");
          setContent(data[0].showlist);
        }
      }
    }
    fetchData();
  }, []);

  if (user && content && content.length >= 1) {
    return (
      <>
        <Grid>
          {content !== null &&
            content.map((item, index) => (
              <Result
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
              />
            ))}
        </Grid>
      </>
    );
  }

  if (user && content) {
    return <h2>Go subscribe to your favorite podcast to get started!</h2>;
  }

  return <h2>Please Sign In</h2>;
}
