import React from "react";
import tw from "twin.macro";

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default List;

const StyledList = tw.div`grid gap-2 sm:(mt-4)`;
