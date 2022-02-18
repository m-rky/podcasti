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
  ${tw`flex items-center`}
  @media (max-width: 250px) {
    ${tw`flex-col`}
  }
`;
const CardInfo = tw.div`flex-1 pl-1 text-xs sm:(text-base py-2 px-2)`;
const CardInfoHeader = tw.h2`font-bold pb-2`;
const CardImageBox = styled.div`
  & img {
    ${tw`rounded`}
  }
  ${tw`relative block h-16 w-16 sm:(h-36 w-36)`}
  @media (max-width: 250px) {
    display: none;
  }
`;
const CardImage = tw.img``;
