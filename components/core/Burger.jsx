import React from "react";
import NavLinks from "@core/NavLinks";
import tw, { styled, theme } from "twin.macro";
import { supabase } from "@lib/initSupabase";
import { useRouter } from "next/router";
import Link from "next/link";

const Burger = ({ open, setOpen }) => {
  const router = useRouter();
  const user = supabase.auth.user();

  const handleSignOut = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
    } else {
      router.push("/");
      setOpen(false);
    }
  };

  return (
    <StyledBurger open={open}>
      <NavigationSubgroup>
        {!user ? (
          <NavigationLink>
            <StyledLink href="/auth">Sign In</StyledLink>
          </NavigationLink>
        ) : (
          <User>
            <Link href="/profile" passhref>
              <a>
                <Avatar src="/temp.jpg" />
              </a>
            </Link>

            <StyledButtonLink onClick={(e) => handleSignOut(e)}>
              Sign Out
            </StyledButtonLink>
          </User>
        )}
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
const NavigationLink = tw.li`font-bold m-4 text-center sm:(text-2xl) `;
const StyledLink = tw.a`capitalize block sm:(inline)`;
const StyledButtonLink = tw.button`font-bold m-4 text-center sm:(text-2xl inline) capitalize block`;
const User = tw.div`mx-4 mb-8 flex justify-between items-center`;
const Avatar = tw.img`rounded-full h-10 w-10`;
