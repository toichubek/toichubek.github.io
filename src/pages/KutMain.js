import React, { useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/HeroKut.js";
// import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { fetchAPI } from "helpers/api";

export default ({ menu, homepage, global, lang, changeLang }) => {
  return (
    <>
      {homepage && menu && (
        <Hero
          index={true}
          handleLang={changeLang}
          menu={menu}
          lang={lang}
          global={global}
          homepage={homepage}
        />
      )}
      {/* <Features /> */}
      {/* <SliderCard /> */}
      <TrendingCard lang={lang}/>
      <MainFeature lang={lang}/>
      <Blog lang={lang}/>
      {/* <Testimonial textOnLeft={true} /> */}
      {/* <FAQ /> */}
      {/* <SubscribeNewsLetterForm /> */}
    </>
  );
};
