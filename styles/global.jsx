import { Global, css } from "@emotion/react";
import tw, { GlobalStyles as BaseStyles, theme } from "twin.macro";

const customStyles = css`
  body {
    ${tw`w-full antialiased`}
  }
  body.menu-active {
    ${tw`fixed overflow-y-scroll`}
  }
  body > * {
    font-family: ${theme`fontFamily.body`};
  }
  html {
    text-size-adjust: 100% !important;
    color: ${theme`colors.main`};
    background-color: ${theme`colors.bg`};
  }
  #__next {
    ${tw`overflow-x-hidden`}
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: ${theme`fontFamily.accent`};
  }
  a {
    ${tw`outline-none focus:(ring ring-main) hover:(text-highlight)`};
  }
`;

const GlobalStyles = () => (
  <>
    <Global styles={customStyles} />
    <BaseStyles />
  </>
);

export default GlobalStyles;
