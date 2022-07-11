import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, { useEffect } from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import { fetchAPI } from "helpers/api";

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";

/*
 * Hero section is the top most section on the page. It contains the header as well.
 * So you dont need to import headers
 * separately
 */

/* Inner Pages */
// import LoginPage from "pages/Login.js";
// import SignupPage from "pages/Signup.js";
// import PricingPage from "pages/Pricing.js";
import AboutUsPage from "pages/AboutUs.js";
// import ContactUsPage from "pages/ContactUs.js";
import BlogIndexPage from "pages/BlogIndex.js";
import TourIndexPage from "pages/TourIndex.js";
// import TermsOfServicePage from "pages/TermsOfService.js";
// import PrivacyPolicyPage from "pages/PrivacyPolicy.js";

// import ComponentRenderer from "ComponentRenderer.js";
// import MainLandingPage from "MainLandingPage.js";
// import ThankYouPage from "ThankYouPage.js";
import HotelTravelLandingPage from "demos/HotelTravelLandingPage.js";
import KutMain from "pages/KutMain.js";
import TeamPage from "pages/TeamPage.js";
import BlogDetailPage from "pages/BlogDetail.js";
import TourDetailPage from "pages/TourDetail.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;
  const [homepage, setHomePage] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const [global, setGlobal] = React.useState(null);
  const [lang, setLang] = React.useState(i18n.resolvedLanguage);

  const changeLang = () => {
    const l = i18n.language == "ru" ? "en" : "ru";
    setLang(l);
    i18n.changeLanguage(l);
  };
  const getInitialData = () => {
    async function fetchData() {
      const [menuRes, homepageRes, globalRes] = await Promise.all([
        fetchAPI("/menu", { populate: "*", locale: lang }),
        fetchAPI("/homepage", {
          // populate: "*",
          locale: lang,
          populate: {
            heros: { populate: "*" },
            seo: { populate: "*" },
          },
        }),
        fetchAPI("/global", { populate: "*", locale: lang }),
      ]);
      setHomePage(homepageRes);
      setMenu(menuRes);
      setGlobal(globalRes);
      console.log({ homepageRes, menuRes, globalRes });
    }
    fetchData();
  };
  useEffect(() => {
    getInitialData();
  }, []);
  useEffect(() => {
    getInitialData();
  }, [lang]);

  return (
    <AnimationRevealPage>
      <BrowserRouter>
        <Header
          layout={true}
          lang={lang}
          handleLang={changeLang}
          menu={menu}
          global={global}
        />
        <Routes>
          {/* <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/components/:type/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/thank-you">
          <ThankYouPage />
        </Route> */}
          <Route path="/contacts" element={<TeamPage lang={lang} />} />

          <Route path="/blog/:slug" element={<BlogDetailPage lang={lang} />} />

          <Route path="/blog" element={<BlogIndexPage lang={lang} />} />

          <Route path="/about" element={<AboutUsPage lang={lang} />} />

          <Route path="/tours" element={<TourIndexPage lang={lang} />} />

          <Route path="/tours/:slug" element={<TourDetailPage lang={lang} />} />
          <Route
            path="/"
            element={
              <KutMain
                lang={lang}
                changeLang={changeLang}
                menu={menu}
                global={global}
                homepage={homepage}
              />
            }
          />

          {/* <HotelTravelLandingPage />   */}
          {/* <MainLandingPage /> */}
          {/* </Route> */}
        </Routes>
        <Footer menu={menu} global={global} />
      </BrowserRouter>
    </AnimationRevealPage>
  );
}
