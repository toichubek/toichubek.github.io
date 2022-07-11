import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import { fetchAPI } from "helpers/api";
import { useTranslation } from "react-i18next";
import { getStrapiMedia } from "helpers/media";
import { useParams } from "react-router-dom";

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
  let { slug } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    getData();
  }, [lang]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    async function fetchData() {
      const [blogRes] = await Promise.all([
        fetchAPI("/blogs", {
          locale: lang,
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: "*",
        }),
      ]);
      console.log("blogRes");
      console.log({ blogRes });
      setBlog(blogRes);
      // setTeam(teamRes);
    }
    fetchData();
  };
  if (!blog) return <p>Идет загрузка...</p>
   return (
    <MainFeature1
      subheading={<Subheading>Статья</Subheading>}
      heading={blog?.data[0].attributes?.title}
      description={blog?.data[0].attributes?.content}
      buttonRounded={false}
      primaryButtonText="Все статьи"
      imageSrc={getStrapiMedia(blog?.data[0].attributes?.cover)}
    />
  );
};
