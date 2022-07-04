import React, { useEffect } from "react";
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
import Header from "components/headers/light.js";

export default ({menu}) => {
  // const [homepage, setHomePage] = React.useState(null);
  // const [menu, setMenu] = React.useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     console.log("homepageRes");

  //     const [menuRes, homepageRes] = await Promise.all([
  //       fetchAPI("/menu", { populate: "*", locale: "en" }),
  //       fetchAPI("/homepage", {
  //         populate: {
  //           heros: { populate: "*" },
  //           seo: { populate: "*" },
  //         },
  //       }),
  //     ]);
  //     setHomePage(homepageRes);
  //     setMenu(menuRes);
  //     console.log({ homepageRes, menuRes });
  //   }
  //   fetchData();
  // }, []);
  return (
    <AnimationRevealPage>
      <Header menu={menu} />
      <Profile />
      <Footer menu={menu}  />
    </AnimationRevealPage>
  );
};