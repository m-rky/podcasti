import React from "react";
import tw, { styled } from "twin.macro";

export const PauseButton = (props) => {
  return (
    <button onClick={props.onClick}>
      <StyledPlayPause {...props} icon-role="play-pause" />
    </button>
  );
};

const StyledPlayPause = styled.i`
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
    width: 6px;
    height: 6px;
    left: 10px;
    top: 6px;
    border-left: 2px solid;
    border-right: 2px solid;
  }
`;
