import { useState } from "react";
import tw, { theme, styled } from "twin.macro";

const Listing = ({ info }): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box>
      {!loaded && (
        <LoadingBox
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="100%"
          y="152px"
          viewBox="0 0 100 100"
          xmlSpace="preserve"
        >
          <circle stroke="none" cx="25%" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle stroke="none" cx="50%" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle stroke="none" cx="75%" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </LoadingBox>
      )}
      <StyledFrame
        src={`https://open.spotify.com/embed/episode/${info.id}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
      ></StyledFrame>
    </Box>
  );
};

export default Listing;

const Box = styled.div`
  height: 152px;
  ${tw`w-full flex justify-center items-center`}
`;
const LoadingBox = styled.svg`
  > circle {
    fill: ${theme`colors.accent`};
  }
  ${tw`w-48 absolute transition-all ease-in-out delay-200`};
`;
const StyledFrame = styled.iframe(({ loaded }: { loaded: boolean }) => [
  `border-radius: 12px;
  opacity: 0;
  position: relative`,
  tw`transition-all ease-in-out`,
  loaded && `opacity: 1`,
]);
