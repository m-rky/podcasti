import Search from "../components/Search";
import tw, { styled } from "twin.macro";

const Index = () => {
  return (
    <HomePage>
      <HomeTitle>Find your next pod!</HomeTitle>
      <Search />
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
