import React from "react";
import tw, { styled } from "twin.macro";

export const Close = (props) => {
  return (
    <>
      <StyledCloseR {...props} icon-role="close" />
    </>
  );
};

const StyledCloseR = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1.75);
    width: 29px;
    height: 22px;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 12px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 10px;
    left: 7px;
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
