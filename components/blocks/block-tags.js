import React from "react";
import { useThemeContext } from "../context/themeContext";
import ButtonAlt,{ButtonType} from "../base/button-alt";

export const BlockTags = ({ data, selected ,handleTagClick}) => {

    const { currentTheme } = useThemeContext();


  return (
    <nav className="flex gap-4 mb-8">

        <ButtonAlt type={selected === null ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                   label='all'
                   click={() => handleTagClick(null)}/>
    {data &&
      data.map((tag, index) => (
        <ButtonAlt key={index}
                    type={selected === tag ? ButtonType.PRIMARY : ButtonType.DEFAULT}
                    label={tag}
                   click={() => handleTagClick(tag)}/>
        // <div
        //   key={index}
        //   className={`px-2 py-1 text-sm rounded-md cursor-pointer bg-red-500 ${
        //     selected === tag ? "bg-white" : "bg-red-200"
        //   }`}
        //   onClick={() => handleTagClick(tag)}
        // >
        //   {tag}
        // </div>
      ))}
  </nav>
  );
};

export default BlockTags;
