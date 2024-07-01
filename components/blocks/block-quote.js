import React from "react";
import TextAnimationUp from "../utils/text-animation-up";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from '../../utils/theme';

export const BlockQuote = ({ data }) => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <blockquote className="grid grid-cols-6">
      <div className="flex flex-col col-span-4 col-start-2 gap-4"
      style={{color:currentTheme?.subtextColor}}>
        {data.title && 
        <span style={{color:currentTheme?.headingColor}}>
          {data.title}
          </span>}

        {/* <TextAnimationUp content={data.content}/> */}
        {data.content && <h2 className="text-6xl ">{data.content}</h2>}
      </div>
    </blockquote>
  );
};

export default BlockQuote;
