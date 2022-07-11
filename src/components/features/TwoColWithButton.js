import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import TeamIllustrationSrc from "images/team-illustration-2.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import ReactMarkdown from "react-markdown";
import toHTML from "helpers/toHTML";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";

const Container = tw.div`relative m-4`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-full md:mx-auto justify-between my-10`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-10/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.img((props) => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.div`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)((props) => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`,
]);

const Info = tw.div`flex justify-around py-5`;
const InfoItem = tw.div`flex justify-start gap-2  w-full`;
export default ({
  subheading = "Our Expertise",
  heading = "",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = TeamIllustrationSrc,
  buttonRounded = true,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  textOnLeft = true,
  location = false,
  time = false,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [HTML, setHTML] = useState(null);
  useEffect(async () => {
    let descHTML = await toHTML(description);
    setHTML(descHTML);
    console.log("descHTML", descHTML, description);
  }, []);

  return (
    <Container>
      {/* <TwoColumn> */}

      <TextColumn textOnLeft={textOnLeft}>
        <TextContent>
          <Subheading>{subheading}</Subheading>
          <Heading>{heading}</Heading>
          <Info>
            {time && (
              <InfoItem>
                <TimeIcon />
                <span> {time}</span>
              </InfoItem>
            )}
            {location && (
              <InfoItem>
                <LocationIcon />
                <span> {location}</span>
              </InfoItem>
            )}
          </Info>

          <Description>
            {/* {toHTML(description)} */}
            <div dangerouslySetInnerHTML={{ __html: HTML }}></div>
            {/* {description} */}
            {/* <ReactMarkdown  
              // css={{whiteSpace:'pre-wrap'}}
              // allowedElements={["/n"]}
              // source={description}
              // escapeHtml={false}
            // /> */}
          </Description>
          {/* <PrimaryButton buttonRounded={buttonRounded} as="a" href={primaryButtonUrl}>
              {primaryButtonText}
            </PrimaryButton> */}
        </TextContent>
      </TextColumn>
      <ImageColumn>
        <Image
          css={imageCss}
          src={imageSrc}
          imageBorder={imageBorder}
          imageShadow={imageShadow}
          imageRounded={imageRounded}
        />
        {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
      </ImageColumn>
      {/* </TwoColumn> */}
    </Container>
  );
};
