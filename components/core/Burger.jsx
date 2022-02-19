import React from "react";
import NavLinks from "@core/NavLinks";
import tw, { styled, theme } from "twin.macro";

const Burger = ({ open }) => {
  return (
    <StyledBurger open={open}>
      <NavigationSubgroup>
        <NavLinks />
      </NavigationSubgroup>
    </StyledBurger>
  );
};

export default Burger;

const StyledBurger = styled.div`
  ${({ open }) =>
    open
      ? tw`visible transition-all transform translate-x-0`
      : tw`invisible transition-all transform translate-x-full`}
  ${tw`absolute top-0 left-0 z-30 w-full h-screen bg-white`}
  background-color: ${theme`colors.bg`};
`;
const NavigationSubgroup = tw.ul`flex flex-col h-full justify-center text-center `;
