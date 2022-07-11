import React, { useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/HeroKut.js";
// import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import Profile from "components/cards/ProfileThreeColGrid.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { fetchAPI } from "helpers/api";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "components/misc/Headings";
const Container = tw.div`relative m-4 w-full`;

const TextContainer = tw.div`md:w-full text-center flex justify-center`;
const TextContent = tw.div`py-2 md:text-left md:w-full  lg:w-1/4`;
const TextContentPhone = tw.div`py-2 text-center md:text-left flex flex-col  md:w-full  lg:w-1/4`;
const TextContentPhoneTel = tw.div`w-full`;

export default ({ lang }) => {
  const { t } = useTranslation();
  const [contact, setContact] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  useEffect(() => {
    getData();
  }, [lang]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    async function fetchData() {
      const [contactRes, teamRes] = await Promise.all([
        fetchAPI("/contact", { locale: lang, populate: "*" }),
        fetchAPI("/guides", { locale: lang, populate: "*" }),
      ]);
      console.log("contactRes");
      console.log({ contactRes, teamRes });
      setContact(contactRes);
      setTeam(teamRes);
    }
    fetchData();
  };

  return (
    <>
      <SectionHeading>{t("Contacts")}</SectionHeading>
      {contact ? (
        <Container>
          {contact?.data?.attributes?.address && (
            <TextContainer>
              <TextContent>{t("address")}: &nbsp;&nbsp; </TextContent>
              <TextContent>{contact?.data?.attributes?.address}</TextContent>
            </TextContainer>
          )}
          {contact?.data?.attributes?.email && (
            <TextContainer>
              <TextContent>Email: &nbsp;&nbsp; </TextContent>

              <TextContent>{contact?.data?.attributes?.email}</TextContent>
            </TextContainer>
          )}
          <TextContainer>
            <TextContent>{t("phone")}: &nbsp;&nbsp; </TextContent>
            <TextContentPhone>
              {contact?.data?.attributes?.phone.map((phone, indexPh) => {
                return (
                  <TextContentPhoneTel key={indexPh}>
                    {phone.number}
                  </TextContentPhoneTel>
                );
              })}
            </TextContentPhone>
          </TextContainer>
        </Container>
      ) : null}
      <Profile team={team} />
    </>
  );
};
