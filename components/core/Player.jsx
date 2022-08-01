import React, { useEffect, useState, useRef } from 'react';
import tw, { styled, theme } from 'twin.macro';
import { PlayButton } from '../icons/PlayButton';
import { PauseButton } from '../icons/PauseButton';

function Player({ playing, name, img, author }) {
  console.log(img);
  const [stopped, setStopped] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const audioRef = useRef(null);

  // useEffect(() => {
  //   const audioElement = audioRef.current;
  // }, []);

  const handlePause = () => {
    audioRef.current.pause();
    setStopped(true);
    setActive(false);
  };
  const handlePlay = () => {
    if (loaded) {
      audioRef.current.play();
      setStopped(false);
      setActive(true);
    }
  };
  const handleLoad = () => {
    setLoaded(true);
  };
  const handleLoadStart = () => {
    setLoaded(false);
  };

  return (
    <PlayerContainer>
      <PlayerBox>
        <PlayerImage>
          <img src={img} alt={`Cover image for the podcast`} width={100} height={100}></img>
        </PlayerImage>
        <PlayerBar>
          <PlayerInfo>
            <PlayerMarquee>
              <PlayerText>{name}</PlayerText>
              <PlayerText>{name}</PlayerText>
            </PlayerMarquee>
            <PlayerSecondaryInfo>
              <p>{author}</p>
              {/* <p>Other Info Here</p> */}
            </PlayerSecondaryInfo>
          </PlayerInfo>

          <PlayerButtons>
            {/* <ForwardButton flipped={true} /> */}
            {!active ? <PlayButton onClick={handlePlay} /> : <PauseButton onClick={handlePause} />}
            {/* <ForwardButton flipped={false} /> */}
          </PlayerButtons>
        </PlayerBar>
        <audio ref={audioRef} src={playing} onCanPlayThrough={handleLoad} onLoadStart={handleLoadStart} />
      </PlayerBox>
    </PlayerContainer>
  );
}

export default Player;

const PlayerContainer = styled.section`
  ${tw`fixed bottom-0 left-0 right-0 w-full ml-auto mr-auto`}
`;
const PlayerBox = styled.div`
  margin-bottom: calc(2rem + env(safe-area-inset-bottom));
  ${tw`flex items-center px-4 mx-4 -mt-2 bg-bg shadow-xl rounded sm:(p-2)`}
`;
const PlayerImage = styled.div`
  position: relative;
  & img {
    ${tw`rounded`}
  }
  ${tw`w-12 h-12 sm:(w-20 h-20 m-2)`}
  @media (max-width: 250px) {
    display: none;
  }
`;
const PlayerBar = tw.div`flex-1 overflow-hidden min-w-0 pt-4 text-sm sm:(flex pt-0 items-center)`;
const PlayerInfo = tw.div`ml-2 w-3/4 sm:(flex flex-col flex-1 w-full)`;
const PlayerSecondaryInfo = tw.div`pt-2`;
const PlayerMarquee = styled.div`
  display: flex;
  height: 18px;
  width: -webkit-fill-available;
  overflow: visible;
  text-overflow: ellipsis;
  mask-image: linear-gradient(to right, transparent, #fff 0%, #fff 80%, transparent);
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  &:hover {
    > span {
      animation-play-state: paused;
    }
  }
`;
const PlayerText = styled.span`
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 25s linear infinite;
  animation-delay: 3s;
  padding-right: 100%;
`;
const PlayerButtons = styled.div`
  ${tw`w-full flex justify-center mt-2 mb-4 space-x-16 sm:(justify-end px-2)`}
  @media (min-width: 640px) {
    flex: 0 0 0%;
  }
`;
