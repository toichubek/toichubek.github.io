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

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;
  const [homepage, setHomePage] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  useEffect(() => {
    async function fetchData() {
      console.log("homepageRes");

      const [menuRes, homepageRes] = await Promise.all([
        fetchAPI("/menu", { populate: "*", locale: "ru" }),
        fetchAPI("/homepage", {
          populate: {
            heros: { populate: "*" },
            seo: { populate: "*" },
          },
        }),
      ]);
      setHomePage(homepageRes);
      setMenu(menuRes);
      console.log({ homepageRes, menuRes });
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
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
        <Route path="/team" element={<TeamPage menu={menu} />} />

        <Route path="/blog/detail" element={<BlogDetailPage menu={menu} />} />

        <Route path="/blog" element={<BlogIndexPage menu={menu} />} />

        <Route path="/about" element={<AboutUsPage menu={menu} />} />

        <Route path="/tours" element={<TourIndexPage menu={menu} />} />

        <Route path="/tour/detail" element={<TourDetailPage menu={menu} />} />
        <Route path="/" element={<KutMain menu={menu} homepage={homepage} />} />

        {/* <HotelTravelLandingPage />   */}
        {/* <MainLandingPage /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
