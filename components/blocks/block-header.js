import React from "react";
import { useThemeContext } from "../context/themeContext";

import PostIntro from "../../components/post/post-intro"
export default function BlockHeader({ data  }) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={`flex relative flex-col justify-end pt-40`}
    >
      <PostIntro title={data.content}  tag={data.title}/>
    </div>
  );
}
    // <div
    //   className={`flex flex-col justify-end relative px-8 ${data.primaryPageHeader === true ? "h-vhh" : "h-vh33"}`}
    // >
    //   <div className="grid grid-cols-12 gap-6 content-end items-end w-full">
    //     <div className="col-span-12 md:col-span-8 lg:col-span-8">
    //       {data.title && (
    //         <h4
    //           className="mb-4 text-xs font-normal"
    //           style={{color:'var(--subtext-color)'}} 
    //         >
    //           <AnimatedText
    //             content={data.title}
    //             type={currentTheme.data.textAnimationSec}
    //             delay={AnimTextOrder.TWO}
    //           >
    //           </AnimatedText>
    //         </h4>
    //       )}

    //       {data.content && (
    //         <h2 className="leading-normal font-normal ~text-2xl/4xl text-balance">
             
    //           <AnimatedText
    //             content={data.content}
    //             type={'none'}
    //             delay={AnimTextOrder.TWO}
    //           />
    //         </h2>
    //       )}


    //     </div>
    //   </div>
    // </div>