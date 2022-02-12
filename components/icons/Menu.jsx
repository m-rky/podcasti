import React from "react";
import { styled } from "twin.macro";

export const Menu = (props) => {
  return (
    <>
      <StyledMenu {...props} icon-role="menu" />
    </>
  );
};

const StyledMenu = styled.i`
  & {
    transform: scale(1);
  }
  &,
  &::after,
  &::before {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 3px;
    background: currentColor;
  }
  &::after,
  &::before {
    content: "";
    position: absolute;
    top: -6px;
  }
  &::after {
    top: 6px;
  }
`;
