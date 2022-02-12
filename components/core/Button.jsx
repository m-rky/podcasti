import React from "react";
import tw, {theme} from "twin.macro";

const Button = ({ onClick, children, type }) => {
  return (
    <StyledButton type={type || "button"} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = tw.button`background-color: ${theme`colors.main`}`;
