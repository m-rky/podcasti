import Search from "@comp/Search";
import tw, { styled, theme } from "twin.macro";
import { useEffect, useState } from "react";
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
      <Flex>
        {listOfPods.map((podcast) => (
          <SimpleCard
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            image={podcast.image[0][1].url}
          />
        ))}
      </Flex>
    </HomePage>
  );
};

export default Index;

const HomePage = styled.section`
  > form {
    ${tw`mb-6`}
  }
  ${tw`overflow-y-scroll overflow-x-hidden flex flex-col justify-center flex-1 px-8 mt-36 ml-auto mr-auto`}
`;
const HomeTitle = styled.h2`
  font-family: ${theme`fontFamily.body`};
  ${tw`text-3xl font-bold mb-5`}
`;
const Flex = styled.div`
  ${tw`flex flex-wrap justify-between pb-8 gap-4`}
`;
