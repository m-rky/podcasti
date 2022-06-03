import tw, { styled } from "twin.macro";

const StyledPlayForwards = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 3px;
    height: 10px;
    background: currentColor;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 0;
    height: 10px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid;
    left: -7px;
  }
  &::before {
    left: -14px;
  }
  ${({ flipped }) =>
    flipped ? `transform: scale(2) rotate(180deg);` : `transform: scale(2)`}
`;

export const ForwardButton = (props) => {
  return (
    <button>
      <StyledPlayForwards {...props} icon-role="play-forwards" />
    </button>
  );
};
