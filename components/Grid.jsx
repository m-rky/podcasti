import React from "react";
import tw from "twin.macro";

const Grid = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default Grid;

const StyledGrid = tw.section`grid sm:(gap-4 grid-cols-2) md:(grid-cols-3) lg:(grid-cols-4)`;
