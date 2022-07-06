import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
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
export default ({menu, global}) => {
  return (
    <AnimationRevealPage>
      <Header global={global} menu={menu} />
      <MainFeature1
        subheading={<Subheading>Тур</Subheading>}
        heading="Тур по городу"
        buttonRounded={false}
        primaryButtonText="Туры"
        imageSrc="http://admin.kut-tourism.kg/uploads/photo_1582564286939_400a311013a2_ixlib_rb_1_2_59db50d417.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80?updated_at=2022-06-18T04:58:04.920Z"
      />
      <Footer menu={menu} global={global} />
    </AnimationRevealPage>
  );
};
