import React from "react";
import tw from "twin.macro";
import Link from "next/link";

const Locations = ["/", "/coming-soon"];

const NavLinks = () => {
  return (
    <>
      {Locations.map((place, index) => (
        <NavigationLink key={place + index}>
          <Link href={place} passHref>
            <StyledLink>
              {place.length > 1 ? place.substring(1) : "home"}
            </StyledLink>
          </Link>
        </NavigationLink>
      ))}
    </>
  );
};

export default NavLinks;

const NavigationLink = tw.li`font-bold m-4 text-center sm:(text-2xl) `;
const StyledLink = tw.a` capitalize block sm:(inline)`;
