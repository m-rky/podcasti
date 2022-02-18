import React from "react";
import tw, { styled } from "twin.macro";

const SimpleCard = ({ id, title, image }) => {
  return (
    <StyledCard>
      <CardImageBox>
        <CardImage
          src={image}
          alt={`Cover image for the show '${title}'`}
          layout="fill"
          quality={100}
        ></CardImage>
      </CardImageBox>
      <CardInfo>
        <CardInfoHeader>{title}</CardInfoHeader>
        {/* Edit this so that if it's within the past week, show "x days ago.../today" */}
        {/* <time dateTime={timeDate}>{formattedDate}</time> */}
      </CardInfo>
    </StyledCard>
  );
};

export default SimpleCard;

const StyledCard = styled.article`
  ${tw`bg-[#FDE0D3] w-40 my-2 mx-2 flex flex-col flex-grow items-center border-2 border-transparent transition duration-150 ease-in-out rounded-lg shadow hover:shadow-md active:(border-2 border-black opacity-95 shadow-inner transform scale-95)`}
`;
const CardInfo = tw.div`flex-1 flex items-center pl-1 text-xs text-center sm:(text-base py-2 px-2)`;
const CardInfoHeader = tw.h2`font-bold pb-2`;
const CardImageBox = styled.div`
  & img {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    ${tw`rounded`}
  }
  ${tw`relative block p-4`}
  @media (max-width: 250px) {
    display: none;
  }
`;
const CardImage = tw.img``;
