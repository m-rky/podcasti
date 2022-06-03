import tw, { styled } from "twin.macro";
import { buildUrl } from "cloudinary-build-url";
import Link from "next/link";
import Image from "next/image";

const Result = ({ name, id, image, host }) => {
  const cloudUrl = buildUrl(image, {
    cloud: {
      cloudName: "daiihufwr",
      storageType: "fetch",
    },
    transformations: {
      resize: {
        type: "scale",
        width: 200,
      },
    },
  });

  return (
    <ResultBox>
      <Link href={`/podcast/${id}`} passHref>
        <StyledLinkBox href={`/podcast/${id}`}>
          <StyledImageWrapper>
            <NextResultImage
              src={cloudUrl}
              layout="fill"
              quality={50}
              objectFit="cover"
              alt={`Cover image for the podcast '${name}'`}
            />
            <Image
              src={cloudUrl}
              layout="intrinsic"
              quality={100}
              width={100}
              height={100}
              alt={`Cover image for the podcast '${name}'`}
            />
          </StyledImageWrapper>
        </StyledLinkBox>
      </Link>
      <ResultTitle>{name}</ResultTitle>
      <ResultSecondaryTitle>{host}</ResultSecondaryTitle>
    </ResultBox>
  );
};

export default Result;

const ResultBox = styled.article`
  ${tw`my-4`}
`;
const StyledLinkBox = styled.a`
  > div {
    ${tw`transition duration-150 ease-in-out rounded-lg shadow hover:shadow-md active:(border-2 border-black opacity-95 shadow-inner transform scale-95)`}
  }
`;
const StyledImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  > div {
    ${tw`rounded-lg`}
  }
  ${tw`relative flex items-center justify-center w-full h-36`}
`;
const NextResultImage = styled(Image)`
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow) !important;
  ${tw`filter blur-2xl`}
`;
const ResultTitle = tw.h2`px-2 text-center`;
const ResultSecondaryTitle = tw.h3`px-4 text-center`;
