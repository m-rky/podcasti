import Search from "@comp/Search";
import tw from "twin.macro";

const index = () => {
  return (
    <SearchPage>
      <Search></Search>
    </SearchPage>
  );
};

export default index;

const SearchPage = tw.section`h-screen justify-center items-center flex px-8`;
