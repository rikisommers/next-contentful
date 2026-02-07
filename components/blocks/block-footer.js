import React from "react";
import { useThemeContext } from "../context/themeContext";

import FooterDefault from "../footer/footer-default";
import FooterFormat from "../footer/footer-format";
import FooterOnto from "../footer/footer-ondo";


export default function BlockFooter({ data }) {

  const { currentTheme } = useThemeContext();

  const discoveredFooterType = data.type ? data.type : currentTheme?.data?.footerTheme

  // Normalize and render grid component based on layout type
  const renderFooterComponent = (footerType, data) => {

    // Map normalized keys to components
    switch (footerType) {
      case 'textList':
        return <FooterDefault data={data} pages={pages}/>;
      case 'format':
        return <FooterFormat data={data} pages={pages}/>;
      case 'onto':
        return <FooterOnto data={data} pages={pages}  />;
      default:
        return <FooterDefault data={data} pages={pages}/>;
    }
  };


  const pages = [
    {
      id: "home",
      title: "Home",
      url: "/",
    },
    {
      id: "work",
      title: "Work",
      url: "/work",
    },
    {
      id: "blog",
      title: "Blog",
      url: "/blog",
    },
    {
      id: "about",
      title: "About",
      url: "/bio",
    },
  ];

  // return (
  //  <>
  //  asd
  //  </>
  // );

  return renderFooterComponent(discoveredFooterType, data);

}
