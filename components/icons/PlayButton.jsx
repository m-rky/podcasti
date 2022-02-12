import React from "react";
import tw, { styled } from "twin.macro";

export const PlayButton = (props) => {
  if (props.onClick) {
    return (
      <button onClick={props.onClick}>
        <StyledPlayButton {...props} icon-role="play-button-o" />
      </button>
    );
  }
  return <StyledPlayButton {...props} icon-role="play-button-o" />;
};

const StyledPlayButton = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1);
    width: 30px;
    height: 22px;
    ${tw`text-main border-2 border-main rounded`}
  }
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0;
    height: 10px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid;
    top: 4px;
    left: 11px;
  }
`;
