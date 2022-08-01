import { useRef, useState, useEffect } from 'react';
import List from '../../components/List';
import Card from '../../components/Card';
import { getEpisodes, getTitle } from '../../lib/PodcastIndex';
import { Modal } from '../../components/core/Modal';
import ReactPaginate from 'react-paginate';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';

const PodcastPage = (props) => {
  const [content, setContent] = useState(props.items || null);
  const [modal, setModal] = useState({ open: false, id: null });
  const [subbed, setSubbed] = useState([]);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState(10);
  const [activeContent, setActiveContent] = useState(content.slice(0, size));
  const ref = useRef();

  useEffect(() => {
    setActiveContent(content.slice(0, size));

    ref.current = document.querySelector('html');
    ref.current.addEventListener('keydown', keyPressed);
  }, [content, size]);

  useEffect(() => {
    // TODO: Added is being set to true no matter what even when signed out...
    setAdded(subbed.includes(content[0].feedId));
  }, [content, subbed]);

  const keyPressed = (e) => {
    if (e.key === 'Escape') {
      setModal({ open: false, id: null });
    }
  };

  const handlePageClick = (data) => {
    let offset = size * data.selected;
    if (data.selected === 0) {
      setActiveContent(content.slice(0, size));
    }
    setActiveContent(content.slice(offset, offset + size));
  };

  console.log(props);

  return (
    <StyledPodPage>
      <Info>
        <StyledHeader>{props.title}</StyledHeader>
        <StyledImageWrapper>
          <img
            src={props.items[0].feedImage}
            alt={`Cover image for the podcast '${props.title}'`}
            width={100}
            height={100}
          />
        </StyledImageWrapper>

        <InfoText>
          {props.title !== props.author && <AuthorText>{props.author}</AuthorText>}
          <Genres>
            {Object.keys(props.categories).length > 1 &&
              Object.keys(props.categories)
                .slice(0, 3)
                .map((category, index) => <GenreItem key={index}>{props.categories[category]}</GenreItem>)}
            {Object.keys(props.categories).length <= 1 && <GenreItem>{Object.values(props.categories)}</GenreItem>}
          </Genres>
        </InfoText>
      </Info>

      {content && (
        <List>
          {activeContent.map((item, index) => (
            <Card key={item.id} info={item} playing={props.playing} details={setModal} index={index}>
              <Modal
                key={'modal-' + index}
                open={modal.id === index}
                content={item.description}
                selector="#portal"
                onClick={() => setModal({ open: false, id: null })}
              ></Modal>
            </Card>
          ))}
        </List>
      )}
      <StyledPaginate>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={content.length / size}
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={'prev'}
          disabledClassName={'disabled'}
        />
      </StyledPaginate>
    </StyledPodPage>
  );
};

export default PodcastPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const {
    feed: { title, categories, author },
  } = await getTitle(id);

  const res = await getEpisodes(id);
  const { count, items } = res;

  if (count >= 1 && title && categories && author) {
    return { props: { items, count, title, categories, author } };
  }
  return {
    redirect: { permanent: false, destination: '/404' },
    props: {},
  };
}

const StyledPodPage = styled.section`
  > :not(:first-of-type) {
    ${tw`mx-4`}
  }
  margin-bottom: calc(20vh + env(safe-area-inset-bottom));
  ${tw`w-11/12 mt-24 ml-auto mr-auto`}
`;
const Info = styled.div`
  ${tw`flex flex-col justify-center items-center text-center mb-4 sm:(grid grid-cols-2 gap-4 text-left justify-start mx-4) md:(justify-center items-end grid-cols-none)`}
`;
const StyledImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  ${tw`relative flex-none m-2 w-28 h-28 sm:(col-start-1 row-start-1 row-span-2 mt-0 mx-0 mb-0 w-full h-full)`}
  & * {
    ${tw`rounded`}
  }
`;
const InfoText = tw.div`flex flex-col justify-end flex-1 text-sm sm:(col-start-2 h-full)`;
const StyledHeader = tw.h2`text-2xl font-bold mb-auto sm:(col-start-2 row-start-1 text-4xl font-black uppercase) md:(text-4xl)`;
const AuthorText = tw.h2`sm:(text-center mx-2 mb-2)`;
const Genres = tw.ul`hidden sm:(flex flex-wrap justify-evenly space-x-2 mb-2)`;
const GenreItem = tw.li``;
const StyledSignIn = tw.a`self-center font-semibold text-main border-b-2 border-transparent p-0 w-max hover:(text-highlight border-highlight)`;
const StyledSubButton = styled.button`
  ${tw`bg-main text-white font-semibold py-2 mt-2 border-2 border-main rounded transition duration-200 ease-in-out disabled:(opacity-20 cursor-not-allowed)`}
  ${({ disabled }) => !disabled && tw`hover:(text-black bg-white)`}
`;
const StyledPaginate = styled.div`
  ${tw`my-4`}
  > ul {
    ${tw`text-center sm:(flex items-center justify-center space-x-4)`}
  }
  > ul a {
    ${tw`block`}
  }
  li:not(.prev):not(.next) {
    min-width: 3rem;
    ${tw`py-2 text-center rounded shadow`}
  }
  .active {
    ${tw`text-white bg-main`}
  }
  .disabled > [role='button'] {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
