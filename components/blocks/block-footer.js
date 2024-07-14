import React,{useState, useRef} from "react";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getThemeByKey } from "../../utils/theme";
import Button, { ButtonType } from "../base/button";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
  useMotionValueEvent,
} from "framer-motion";

export default function BlockFooter({ content }) {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);



  return (


    <motion.div  ref={footerRef}  className="relative flex flex-col justify-end overflow-clip h-vhh ">
      {/* pt-32 pb-16 */}

      <div className="z-20 grid w-full grid-cols-12 gap-3 px-16 py-16">
        <div className="flex flex-col col-span-12 gap-12 md:col-span-7">
          <div className="flex flex-col items-start gap-4">
            <motion.p className="text-sm text-slate-400">sdfsdf</motion.p>
            {/* <TextAnimation content={content?.title} /> */}
            {content?.titlealt && (
              // <TextAnimation content={content?.title} color={'#000'}/>
              <h2 className="grid-cols-5 text-2xl font-light text-left text-slate-600 text-balance">
              {content?.intro}
            </h2>
              // <TextTitle
              //   content={content?.titlealt}
              //   color={"text-slate-400"}
              //   className="mb-8"
              // />
            )}
            <Button label="Start a project" type={ButtonType.PRIMARY} />
          </div>
        </div>

        <h2 className="grid-cols-5 text-2xl font-light text-left text-slate-300 md:text-right text-balance">
          {content?.intro}
        </h2>
      </div>



      {/* <motion.div ref={footerRef} className="fixed relative testing123 h-vhh">
          <motion.div
            className="fuck"
            style={{ y: footerOffsetValue }}
            // style={{ translateY: y }}
            //  animate={{ y: footerOffset }}
          >
            {data.intro && <BlockFooter content={data.intro} />}
          </motion.div>
        </motion.div> */}
      <div className="z-20 flex items-center justify-between w-full px-16 py-8">
        <h4 className="text-lg text-slate-300">Connect       
          <Link
          href="mailto:test@test.com"
          className="text-lg text-yellow-300 text-medium"
        >
          test@test.com
        </Link></h4>

        <div className="flex gap-2">
        <Button label={'social'}/>
        <Button label={'media'}/>
        <Button label={'sucks'}/>
        </div>
      </div>

      <motion.div 
        className="absolute w-full h-full bg-yellow-200"
        style={{
          y: yTransform,
          clipPath: "inset( 1rem round 1rem )",
          backgroundColor: currentTheme?.backgroundColor,
        }}
      />
    </motion.div>
  );
}
