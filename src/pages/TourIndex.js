import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { fetchAPI } from "helpers/api";
import { useTranslation } from "react-i18next";

import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { getStrapiMedia } from "helpers/media";
import dayjs from "dayjs";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({
  lang,
  posts = [
    {
      imageSrc:
        "http://admin.kut-tourism.kg/uploads/photo_1582564286939_400a311013a2_ixlib_rb_1_2_59db50d417.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80?updated_at=2022-06-18T04:58:04.920Z",
      category: "Travel Tips",
      date: "April 21, 2020",
      title: "Safely Travel in Foreign Countries",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "/tour/detail",
      featured: true,
    },
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
  ],
}) => {
  const { t } = useTranslation();
  const [tours, setTour] = React.useState(null);
  useEffect(() => {
    getData();
  }, [lang]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    async function fetchData() {
      const [tourRes] = await Promise.all([
        fetchAPI("/tours", { locale: lang, populate: "*" }),
      ]);
      console.log("tourRes");
      console.log({ tourRes });
      setTour(tourRes);
    }
    fetchData();
  };
  return (
    <>
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{t("Tours")}</Heading>
          </HeadingRow>
          <Posts>
            {tours &&
              tours?.data?.map((tour, index) => (
                <PostContainer key={index} featured={index === 0}>
                  <Post
                    className="group"
                    as="a"
                    href={"/tours/" + tour.attributes.slug+'?hl=true'}
                  >
                    <Image imageSrc={getStrapiMedia(tour.attributes.cover)} />
                    <Info>
                      <Category>
                        {tour.attributes.category?.data?.attributes?.name}
                      </Category>
                      <CreationDate>
                        {dayjs(tour?.attributes?.updatedAt)
                          .locale(lang)
                          .format("D-MM-YYYY")}
                      </CreationDate>
                      <Title>{tour.attributes.title}</Title>
                      {index === 0 && tour.attributes.description && (
                        <Description>{tour.attributes.description}</Description>
                      )}
                    </Info>
                  </Post>
                </PostContainer>
              ))}
          </Posts>
          {/* {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>
                Load More
              </LoadMoreButton>
            </ButtonContainer>
          )} */}
        </ContentWithPaddingXl>
      </Container>
    </>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:
    "http://admin.kut-tourism.kg/uploads/photo_1582564286939_400a311013a2_ixlib_rb_1_2_59db50d417.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80?updated_at=2022-06-18T04:58:04.920Z",
  category: "Travel Guide",
  date: "April 19, 2020",
  title: "Visit the beautiful Alps in Switzerland",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: "/tour/detail",
});
