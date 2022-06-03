import React, { useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";
import { PlayButton } from "./icons/PlayButton";
import { Info } from "./icons/Info";

const Card = ({ info, playing, details, index, children, author }) => {
  const {
    // dateCrawled,
    datePublished,
    // datePublishedPretty,
    // description,
    duration,
    // enclosureLength,
    // enclosureType,
    enclosureUrl,
    // episode,
    // episodeType,
    // explicit,
    // feedId,
    feedImage,
    // feedItunesId,
    // feedLanguage,
    // guid,
    // id,
    image,
    // link,
    // season,
    title,
  } = info;

  const cloudUrl = buildUrl(image || feedImage, {
    cloud: {
      cloudName: "daiihufwr",
      storageType: "fetch",
    },
    transformations: {
      resize: {
        width: 300,
      },
    },
  });

  // TODO: Fix page change = resetting the times because the calculations aren't set
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const convertedDate = datePublished * 1000;
  const timeDate = new Date(convertedDate).toISOString();
  const formattedDate = new Date(convertedDate).toLocaleDateString(
    undefined,
    options
  );
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.round(duration / 60) - hours * 60;

  return (
    <StyledCard>
      <CardImageBox>
        <CardImage
          src={cloudUrl}
          alt={`Cover image for the show '${title}'`}
          layout="fill"
          quality={100}
        ></CardImage>
      </CardImageBox>
      <CardInfo>
        <CardInfoHeader>{title}</CardInfoHeader>
        {/* Edit this so that if it's within the past week, show "x days ago.../today" */}
        <time dateTime={timeDate}>{formattedDate}</time>
      </CardInfo>

      <CardActions>
        <Info onClick={() => details({ open: true, id: index })} />
        <Play
          onClick={() =>
            playing({
              playing: enclosureUrl,
              name: title,
              img: cloudUrl,
              author: author,
            })
          }
        >
          {duration > 1 ? (
            <Time>
              {hours} hr {minutes} min
            </Time>
          ) : (
            <Time>Play</Time>
          )}
          <PlayButton />
        </Play>
      </CardActions>
      {children}
    </StyledCard>
  );
};

export default Card;

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
const CardImage = tw(Image)``;
const CardActions = styled.div`
  button {
    ${tw`pl-2 my-2 ml-2`}
  }
  button:first-of-type {
    ${tw`sm:(border-2 border-transparent pr-2)`}
  }
  ${tw`flex flex-col justify-between sm:(items-end justify-center flex-none h-full)`}
  @media (max-width: 250px) {
    flex-direction: row;
  }
`;
const Play = tw.button`flex items-center sm:(border-2 shadow-sm border-main rounded px-2 py-2)`;
const Time = tw.p`hidden sm:(block mx-2)`;
