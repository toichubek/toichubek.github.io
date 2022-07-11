import React, { useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { fetchAPI } from "helpers/api";
import { useTranslation } from "react-i18next";
import { getStrapiMedia } from "helpers/media";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
// import Footer from "components/footers/FiveColumnWithInputForm.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default ({ lang }) => {
  const { t } = useTranslation();
  const [about, setAbout] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  useEffect(() => {
    getData();
  }, [lang]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    async function fetchData() {
      const [aboutRes, teamRes] = await Promise.all([
        fetchAPI("/about", { locale: lang, populate: "*" }),
        fetchAPI("/guides", { locale: lang, populate: "*" }),
      ]);
      console.log("aboutRes");
      console.log({ aboutRes, teamRes });
      setAbout(aboutRes);
      setTeam(teamRes);
    }
    fetchData();
  };

  return (
    <>
      <MainFeature1
        subheading={<Subheading>{t("about")}</Subheading>}
        heading={about?.data?.attributes?.title || "МЫ ПРОСТО ИНТЕРЕСНЫ"}
        buttonRounded={false}
        imageSrc={about && getStrapiMedia(about?.data?.attributes?.image)}
        description={about?.data?.attributes?.description || ""}
        // primaryButtonText="Туры"
        // imageSrc="http://admin.kut-tourism.kg/uploads/photo_1582564286939_400a311013a2_ixlib_rb_1_2_59db50d417.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80?updated_at=2022-06-18T04:58:04.920Z"
      />
      {/*  <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="We aim to disrupt the design space."
        buttonRounded={false}
        primaryButtonText="Contact Us"
        imageSrc="https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80"
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
          },
        ]}
        linkText=""
      /> */}
      <TeamCardGrid
        lang={lang}
        team={team}
        // subheading={<Subheading>Гиды</Subheading>}
      />
    </>
  );
};
