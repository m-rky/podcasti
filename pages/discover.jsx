import Search from "../components/Search";
import tw, { styled } from "twin.macro";
import { supabase } from "../lib/initSupabase";
import Grid from "../components/Grid";
import Result from "../components/Result";
import { Modal } from "../components/core/Modal";
import { useState } from "react";

const Discover = ({ data }) => {
  const [modal, setModal] = useState({ open: false, id: null });
  if (data) {
    return (
      <SearchPage>
        <PageHeader>Discover your next fav</PageHeader>
        <Search />
        <SecondaryPageHeader>Recommended</SecondaryPageHeader>
        <Grid>
          {data.map((item) => (
            <StyledCard key={item.id}>
              <Result id={item.podcastID} name={item.name} image={item.image} />
              {/* <button
                onClick={() => setModal({ open: true, id: item.podcastID })}
              >
                Why?
              </button> */}
              <Modal
                open={modal.id === item.podcastID}
                content={item.reasoning}
                selector="#portal"
                onClick={() => setModal({ open: false, id: null })}
              />
            </StyledCard>
          ))}
        </Grid>
      </SearchPage>
    );
  }

  return (
    <SearchPage>
      <PageHeader>Find a Podcast</PageHeader>
      <Search />
    </SearchPage>
  );
};

export default Discover;

export async function getServerSideProps() {
  // fetch the discover collection here from the database

  const { data, error } = await supabase.from("discoverCollection");

  if (data) {
    return {
      props: { data },
    };
  }

  return {
    props: {},
  };
}

const SearchPage = styled.section`
  > * {
    ${tw`mx-4`}
  }
  margin-bottom: calc(20vh + env(safe-area-inset-bottom));
  ${tw`flex flex-col justify-center w-11/12 mt-24 ml-auto mr-auto`}
`;
const PageHeader = tw.h2`text-2xl font-bold`;
const SecondaryPageHeader = tw.h3`text-xl font-bold ml-4`;
const StyledCard = tw.article`flex flex-col`;
