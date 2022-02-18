import Search from "@comp/Search";
import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import Grid from "@comp/Grid";
import SimpleCard from "@comp/SimpleCard";

const Index = () => {
  const [listOfPods, setListOfPods] = useState([]);

  useEffect(() => {
    const getTopPods = async () => {
      const response = await fetch(`/api/top-podcasts`);
      const { tracks } = await response.json();
      setListOfPods(tracks);
    };
    getTopPods();
  }, []);

  return (
    <HomePage>
      <HomeTitle>Find your next pod!</HomeTitle>
      <Search />
      <Grid>
        {listOfPods.map((podcast) => (
          <SimpleCard
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            image={podcast.image[0][1].url}
          />
        ))}
      </Grid>
    </HomePage>
  );
};

export default Index;

const HomePage = styled.section`
  height: calc(100vh - 10rem);
  > * {
    ${tw`mx-4`}
  }
  ${tw`flex flex-col justify-center flex-1 w-11/12 mt-24 ml-auto mr-auto`}
`;
const HomeTitle = tw.h2`text-3xl font-bold mb-5`;
