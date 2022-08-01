import React from 'react';
import NavLinks from '../core/NavLinks';
import tw, { styled, theme } from 'twin.macro';
import Link from 'next/link';

const Burger = ({ open, setOpen }) => {
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
    open ? tw`visible transition-all transform translate-x-0` : tw`invisible transition-all transform translate-x-full`}
  ${tw`absolute top-0 left-0 z-30 w-full h-screen bg-white`}
  background-color: ${theme`colors.bg`};
`;
const NavigationSubgroup = tw.ul`flex flex-col h-full justify-center text-center `;
const NavigationLink = tw.li`font-bold m-4 text-center sm:(text-2xl) `;
const StyledLink = tw.a`capitalize block sm:(inline)`;
const StyledButtonLink = tw.button`font-bold m-4 text-center sm:(text-2xl inline) capitalize block`;
const User = tw.div`mx-4 mb-8 flex justify-between items-center`;
const Avatar = tw.img`rounded-full h-10 w-10`;
