import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { fetchAPI } from "helpers/api";
import { getStrapiMedia } from "helpers/media";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(
  Column
)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-8 lg:mr-16 md:order-first`
    : tw`md:ml-8 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`;

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`;
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`;
const Value = tw.div`font-bold text-primary-500`;
const Key = tw.div`font-medium text-gray-700`;

export default ({ textOnLeft = false, lang }) => {
  const [statistics, setStats] = React.useState([]);
  const [progres, setProgress] = React.useState(null);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [lang]);

  const getData = () => {
    async function fetchData() {
      const [progressRes] = await Promise.all([
        fetchAPI("/progress", { populate: "*", locale: lang }),
      ]);
      setProgress(progressRes);
      let progStat = progressRes.data.attributes.achievement;
      if (progStat && progStat.length) {
        setStats(progStat);
      }
    }
    fetchData();
  };
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  let placeholder = {
    data: {
      attributes: {
        url: "/uploads/what_s_inside_a_black_hole_246bb17969.jpg?updated_at=2022-06-12T19:50:19.182Z",
      },
    },
  };
  if (!progres)
    return (
      <Container>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={getStrapiMedia(placeholder)} />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              <Heading>...</Heading>
              <Description>...</Description>
              <Statistics>
                {[1, 2, 3, 4].map((statistic, index) => (
                  <Statistic key={index}>
                    <Value> ... </Value>
                    <Key> ... </Key>
                  </Statistic>
                ))}
              </Statistics>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    );
  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={getStrapiMedia(progres.data.attributes.image)} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{progres.data.attributes.title}</Heading>
            <Description>{progres.data.attributes.description}</Description>
            <Statistics>
              {statistics.map((statistic, index) => (
                <Statistic key={index}>
                  <Value>{statistic.number}</Value>
                  <Key>{statistic.name}</Key>
                </Statistic>
              ))}
            </Statistics>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
