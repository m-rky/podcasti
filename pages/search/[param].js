import Search from "@comp/Search";
import SimpleCard from "@comp/SimpleCard";
import { searchForPodcasts } from "@lib/spotify";
import tw, { styled } from "twin.macro";

const SearchPage = ({ items, count }) => {
  if (items && count > 1) {
    return (
      <StyledSearchPage>
        <Search />
        <span>{count}</span>
        <Flex>
          {items.map((show) => (
            <SimpleCard
              key={show.id}
              id={show.id}
              title={show.name}
              image={show.images[1].url}
            />
          ))}
        </Flex>
      </StyledSearchPage>
    );
  }

  return (
    <StyledSearchPage>
      <StyledHeader>Loading...</StyledHeader>
      <span>{count}</span>
    </StyledSearchPage>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const query = context.query.param;
  const response = await searchForPodcasts(query);
  const data = await response.json();

  if (data) {
    return {
      props: { items: data.shows.items, count: data.shows.total },
    };
  }
  return {
    props: {},
  };
}

const StyledSearchPage = styled.section`
  > :first-of-type {
    ${tw`mx-4`}
  }
  margin-bottom: calc(20vh + env(safe-area-inset-bottom));
  ${tw`w-11/12 mt-24 ml-auto mr-auto`}
`;
const StyledHeader = tw.h3`text-xl font-bold`;
const Flex = styled.div`
  ${tw`flex flex-wrap justify-between pb-8 gap-4`}
`;
