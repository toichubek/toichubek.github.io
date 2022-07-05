import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { fetchAPI } from "helpers/api";

import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`,
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;

export default () => {
  const [tours, setTours] = React.useState(null);
  const [main, setMain] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      const [tourRes, mainRes] = await Promise.all([
        fetchAPI("/tours", { populate: "*", locale: "ru", _limit: 2 }),
        fetchAPI("/main-tour", { populate: "*", locale: "ru" }),
        // fetchAPI("/homepage", {
        //   populate: {
        //     heros: { populate: "*" },
        //     seo: { populate: "*" },
        //   },
        // }),
      ]);
      console.log("tourRes");
      console.log({ tourRes, mainRes });
      setTours(tourRes);
      setMain(mainRes);
    }
    fetchData();
  }, []);

  const cards = [
    {
      imageSrc:
        "http://admin.kut-tourism.kg/uploads/photo_1553194587_b010d08c6c56_ixlib_rb_1_2_a2fe11dfac.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80?updated_at=2022-06-18T04:55:17.744Z",
      category: "Туры по стране",
      pricePerDay: "5099 сом",
      title: "Поездка в Иссык-Кол",
      trendingText: "Популярное",
      durationText: "7 дней",
      locationText: "Ысык-Кол",
    },
    {
      imageSrc:
        "http://admin.kut-tourism.kg/uploads/photo_1553194587_b010d08c6c56_ixlib_rb_1_2_a2fe11dfac.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80?updated_at=2022-06-18T04:55:17.744Z",
      category: "Туры по стране",
      pricePerDay: "1690 сом",
      title: "Cruise to the Mariana Trench and the Phillipines",
      trendingText: "Популярное",
      durationText: "15 дней",
      locationText: "Ош",
    },
  ];
  return (
    <Container>
      <Content>
        <ThreeColumn>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>
                {main?.data?.attributes?.Title
                  ? main?.data?.attributes?.Title
                  : "Популярные Туры"}
              </HeadingTitle>
              <HeadingDescription>
                {main?.data?.attributes?.description
                  ? main?.data?.attributes?.description
                  : ""}
              </HeadingDescription>
              {main?.data?.attributes?.button ? (
                <PrimaryLink
                  href={
                    main?.data?.attributes?.button?.url
                      ? main?.data?.attributes?.button?.url
                      : "/tours"
                  }
                >
                  {main?.data?.attributes?.button?.text
                    ? main?.data?.attributes?.button?.text
                    : "Посмотреть все"}{" "}
                  <ArrowRightIcon />
                </PrimaryLink>
              ) : null}
            </HeadingInfoContainer>
          </HeadingColumn>
          {tours
            ? tours?.data.map((card, index) => (
                <CardColumn key={index}>
                  <Card>
                    <CardImage
                      imageSrc={
                        "http://admin.kut-tourism.kg" +
                        card?.attributes?.cover?.data?.attributes?.formats
                          ?.small?.url
                      }
                    />
                    <CardText>
                      <CardHeader>
                        <CardType>
                          {card?.attributes?.category?.data?.attributes?.name}
                        </CardType>
                        {/* <CardPrice>
                      <CardPriceAmount>{card.pricePerDay}</CardPriceAmount> в день
                    </CardPrice> */}
                      </CardHeader>
                      <CardTitle>{card?.attributes?.title}</CardTitle>
                      <CardMeta>
                        {/* <CardMetaFeature>
                      <TrendingIcon /> {card.trendingText}
                    </CardMetaFeature> */}
                        {card?.attributes?.duration ? (
                          <CardMetaFeature>
                            <TimeIcon /> {card?.attributes?.duration}
                          </CardMetaFeature>
                        ) : null}
                        <CardMetaFeature>
                          <LocationIcon /> {card?.attributes?.place}
                        </CardMetaFeature>
                      </CardMeta>
                      <CardAction
                        onClick={() =>
                          window.location.replace(
                            "/tours/" + card?.attributes?.slug
                          )
                        }
                      >
                        Подробнее
                      </CardAction>
                    </CardText>
                  </Card>
                </CardColumn>
              ))
            : null}
        </ThreeColumn>
      </Content>
    </Container>
  );
};
