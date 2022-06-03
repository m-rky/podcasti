import { search } from "@lib/PodcastIndex";
import Result from "@comp/Result";
import Search from "@comp/Search";
import Grid from "@comp/Grid";
import tw, { styled } from "twin.macro";

const SearchPage = ({ feeds, count, query }) => {
  if (feeds && feeds.length > 1) {
    return (
      <StyledSearchPage>
        <Search />
        <StyledHeader>Results:</StyledHeader>
        <Grid>
          {feeds.map((feed) => (
            <Result
              key={feed.id}
              name={feed.title}
              image={feed.artwork || feed.image}
              id={feed.id}
              host={feed.author}
            />
          ))}
        </Grid>
      </StyledSearchPage>
    );
  } else if (feeds && feeds.length <= 1) {
    return (
      <StyledSearchPage>
        <Search />
        <StyledHeader>Results:</StyledHeader>
        <Grid>
          <Result
            key={feeds[0].id}
            name={feeds[0].title}
            image={feeds[0].artwork || feeds[0].image}
            id={feeds[0].id}
            host={feeds[0].author}
          />
        </Grid>
      </StyledSearchPage>
    );
  }

  if (count === 0) {
    return (
      <StyledSearchPage>
        <StyledHeader>No results found for '{query}'</StyledHeader>
      </StyledSearchPage>
    );
  }

  return (
    <StyledSearchPage>
      <StyledHeader>Loading...</StyledHeader>
    </StyledSearchPage>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const query = context.query.param;
  const res = await search(context.query.param);
  const { feeds, count } = await res.json();

  if (feeds && count) {
    return {
      props: { feeds, count, query },
    };
  }

  return {
    props: { count, query },
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
