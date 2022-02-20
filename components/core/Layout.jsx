import Nav from "@core/Nav";
import tw, { styled, theme } from "twin.macro";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import common from "../../locales/en/common";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>{common.title}</title>
        <meta name="viewport" content="width=device-width"></meta>
        <meta name="author" content="Marky R"></meta>
        <meta
          name="description"
          content="Podcasty is the ultimate place to listen to your favorite podcasts for free, keep up with your favorite hosts, explore and discover new shows from every genre around from news to entertainment to comedy!"
        ></meta>
        <meta name="theme-color" content={theme`colors.bg`}></meta>
      </Head>
      <StyledHeader>
        <Link href="/" passHref>
          <a>
            <Title>{common.title}</Title>
          </a>
        </Link>
        <Nav />
      </StyledHeader>

      {children}

      <Footer>
        <FooterText>Powered by</FooterText>
        <Image
          src="/spotify.png"
          alt="spotify logo"
          width={89.6}
          height={26.95}
        ></Image>
      </Footer>
    </>
  );
};

export default Layout;

const StyledHeader = styled.header`
  > button,
  > a {
    ${tw`rounded`}
  }
  color: ${theme`colors.main`};
  ${tw`px-8 fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-24 ml-auto mr-auto backdrop-filter backdrop-blur-xl`}
`;
const Title = tw.h1`text-xl font-bold py-4 sm:(text-3xl) lg:(text-4xl font-black)`;
const Footer = tw.footer`flex justify-center items-center py-12`;
const FooterText = tw.span`pr-2`;
