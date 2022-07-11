import { useState, useEffect } from "react";
import { useAnimation, useCycle } from "framer-motion";
import { useLocation } from "react-router-dom";

//Below logic is for toggling the navbar when toggleNavbar is called. It is used on mobile toggling of navbar.
export default function useAnimatedNavToggler() {
  const location = useLocation();
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [x, cycleX] = useCycle("0%", "150%");
  const animation = useAnimation();

  // useEffect(() => {
  //   toggleNavbar(true);
  // }, []);
  // useEffect(() => {
  //   toggleNavbar(true);
  // }, [location]);
  const toggleNavbar = (locationChanged = false) => {
    // if (locationChanged) {
    // setShowNavLinks(true);
    // } else {
    setShowNavLinks(!showNavLinks);
    // }
    animation.start({ x: x, display: "block" });
    cycleX();
  };

  return { showNavLinks, animation, toggleNavbar };
}
