import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fetchAPI } from "helpers/api";
import { getStrapiMedia } from "helpers/media";

import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";

import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-3/4`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(
  motion.a
)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`,
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``;

const Column = tw.div``;
const HeadingColumn = tw(Column)` xl:w-1/3`;
const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

export default ({ lang }) => {
  const [posts, setPosts] = useState(null);
  const [main, setMain] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [lang]);

  const getData = () => {
    async function fetchData() {
      const [blogRes, mainRes] = await Promise.all([
        fetchAPI("/blogs", { populate: "*", locale: lang, _limit: 2 }),
        fetchAPI("/main-blog", { populate: "*", locale: lang }),
      ]);
      setPosts(blogRes);
      setMain(mainRes);
    }
    fetchData();
  };

  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%",
    },
    hover: {
      backgroundSize: "110%",
    },
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>
              {main?.data?.attributes?.title
                ? main?.data?.attributes?.title
                : "Популярные статьи"}
            </Heading>
            <PostsContainer>
              {posts
                ? posts?.data?.map((post, index) => (
                    <Post
                      key={index}
                      href={"/blog/" + post?.attributes?.slug+'?hl=true'}
                      className="group"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <Image
                        transition={{ duration: 0.3 }}
                        variants={postBackgroundSizeAnimation}
                        imageSrc={getStrapiMedia(post?.attributes?.cover)}
                      />
                      <Title>{post?.attributes?.title}</Title>
                      <Description>{post?.attributes?.description}</Description>
                      {/* <AuthorInfo>
                        <AuthorImage src={post.authorImageSrc} />
                        <AuthorNameAndProfession>
                          <AuthorName>{post.authorName}</AuthorName>
                          <AuthorProfile>{post.authorProfile}</AuthorProfile>
                        </AuthorNameAndProfession>
                      </AuthorInfo> */}
                    </Post>
                  ))
                : null}
            </PostsContainer>
          </PopularPostsContainer>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>
                <br />
                <br />
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
                      : "/blog"
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
          {/* <RecentPostsContainer>
            <Heading>Недавние посты</Heading>
            <PostsContainer>
              {recentPosts.map((post, index) => (
              <Post key={index} href={post.url} className="group">
                <PostTextContainer>
                  <Title>{post.title}</Title>
                  <AuthorName>{post.authorName}</AuthorName>
                </PostTextContainer>
                <Image imageSrc={post.postImageSrc} />
              </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer> */}
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
};
