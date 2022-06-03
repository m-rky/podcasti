import tw, {styled, theme} from "twin.macro";
import NavLinks from "@core/NavLinks";
import Burger from "@core/Burger";
import { useState, useEffect } from "react";
import { Menu } from "@comp/icons/Menu";
import { Close } from "@comp/icons/Close";
import { useRouter } from "next/router";

const MobileMenu = ({ open, setOpen }) => {
  if (open) {
    return (
      <MobileButton onClick={() => setOpen(false)} aria-label="Menu Button">
        <Close />
      </MobileButton>
    );
  }
  return (
    <MobileButton onClick={() => setOpen(true)} aria-label="Menu Button">
      <Menu />
    </MobileButton>
  );
};

const Nav = ({ person }) => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-active");
    } else {
      document.body.classList.remove("menu-active");
    }
  }, [open]);

  return (
    <>
      <MobileMenu open={open} setOpen={setOpen} />
      <Burger open={open} setOpen={setOpen} person={person} />
      {!mobile && <NavLinks />}
    </>
  );
};

export default Nav;

const MobileButton = styled.button`${tw`right-0 p-4 top-0 z-40 h-14 w-14 outline-none focus:(ring ring-main)`}`;
