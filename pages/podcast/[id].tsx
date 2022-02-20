import List from "@comp/List";
import Listing from "@comp/Listing";
import tw, { styled } from "twin.macro";
import { getPodcastEpisodes } from "@lib/spotify";

const PodcastPage = ({ items, name }) => {
  if (name && items) {
    return (
      <StyledPodPage>
        <PodPageTitle>{name}</PodPageTitle>
        <List>
          {items.slice(0, 10).map((item) => (
            <Listing key={item.id} info={item} />
          ))}
        </List>
      </StyledPodPage>
    );
  }
};

export default PodcastPage;

export async function getServerSideProps(context) {
  const { id, name } = context.query;
  const response = await getPodcastEpisodes(id);
  const data = await response.json();
  const { items } = data;

  return { props: { items, name } };
}

const StyledPodPage = styled.section`
  > :not(:first-of-type) {
    ${tw`mx-4`}
  }
  margin-bottom: calc(5vh + env(safe-area-inset-bottom));
  ${tw`mt-28 mx-4 px-4`}
`;
const PodPageTitle = tw.h1`text-4xl text-center`;
