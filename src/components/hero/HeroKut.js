import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getStrapiMedia } from "helpers/media";
import { HOST_ADMIN, fetchAPI } from "helpers/api";

import { css } from "styled-components/macro"; //eslint-disable-line

import Header, {
  LogoLink,
  NavLinks,
  PrimaryLink,
  NavLink as NavLinkBase,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = (url) => styled.div`
  background-image: url(${url});
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

export default ({ menu, global, homepage, handleLang, lang }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // const [homepage, setHomePage] = React.useState(null);

  // const getInitialData = () => {
  //   async function fetchData() {
  //     const [homepageRes] = await Promise.all([
  //       fetchAPI("/homepage", {
  //         populate: {
  //           heros: { populate: "*", locale: lang },
  //           seo: { populate: "*", locale: lang },
  //         },
  //       }),
  //     ]);
  //     setHomePage(homepageRes);
  //   }
  //   fetchData();
  // };
  // useEffect(() => {
  //   getInitialData();
  // }, []);
  // useEffect(() => {
  //   getInitialData();
  // }, [lang]);

  // const heading = (
  //   <>
  //     {homepage?.data.attributes.heros.title}
  //     {/* <wbr />
  //     <br />
  //     <span tw="text-primary-500">по всему Кыргызстану.</span> */}
  //   </>
  // );
  const navLinks = [
    <NavLinks key={1}>
      {menu?.data.attributes.menuItem.map((item) => (
        <NavLink
          key={item.id}
          onClick={() => {
            navigate(item.url);
          }}
        >
          {item.name}
        </NavLink>
      ))}
      <PrimaryLink onClick={handleLang}>
        {i18n.language == "ru" ? "Eng" : "Рус"}
      </PrimaryLink>
    </NavLinks>,
  ];
  // const button =
  //   homepage?.data.attributes.heros.button &&
  //   homepage?.data.attributes.heros.button.length > 0
  //     ? homepage?.data.attributes.heros.button.map((button, index) => (
  //         <a
  //           key={index}
  //           href={button.url}
  //           className={`action ${
  //             index === 0 ? "primaryAction" : "secondaryAction"
  //           }`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {button.text}
  //         </a>
  //       ))
  //     : null;

  // const description = homepage?.data.attributes.heros.description;
  const RightColumnComp = RightColumn(
    HOST_ADMIN + homepage?.data.attributes.heros.images?.data[0].attributes.url
  );
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader
            links={navLinks}
            global={global}
            collapseBreakpointClass="sm"
          />
          <div className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8" />

          <Content>
            <Heading>{homepage?.data.attributes.heros.title}</Heading>
            <Paragraph>{homepage?.data.attributes.heros.description}</Paragraph>
            <Actions>
              {homepage?.data.attributes.heros.button &&
              homepage?.data.attributes.heros.button.length > 0
                ? homepage?.data.attributes.heros.button.map(
                    (button, index) => (
                      <a
                        key={index}
                        href={button.url}
                        className={`action ${
                          index === 0 ? "primaryAction" : "secondaryAction"
                        }`}
                        // target="_blank"
                        rel="noopener noreferrer"
                      >
                        {button.text}
                      </a>
                    )
                  )
                : null}
              {/* <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </a>
              <a href={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </a> */}
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumnComp />
      </TwoColumn>
    </Container>
  );
};
