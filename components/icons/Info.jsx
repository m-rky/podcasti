import React from "react";
import tw, { styled } from "twin.macro";

export const Info = (props) => {
  return (
    <button onClick={props.onClick} type="button">
      <StyledInfo {...props} icon-role="info" />
    </button>
  );
};

const StyledInfo = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1);
    width: 30px;
    height: 22px;
    ${tw`text-main border-2 border-main rounded`}
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    background: currentColor;
    left: 12px;
  }
  &::after {
    bottom: 3px;
    height: 8px;
  }
  &::before {
    height: 2px;
    top: 3px;
  }
`;
