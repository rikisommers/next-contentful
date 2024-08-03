import React,{useState, useRef} from "react";
import Link from "next/link";

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
            <motion.p className="text-sm" style={{color: 'var(--text-color-inv)'}}>sdfsdf</motion.p>
            {/* <TextAnimation content={content?.title} /> */}
            {content?.titlealt && (
              // <TextAnimation content={content?.title} color={'#000'}/>
              <h2 style={{color: 'var(--text-accent)'}} 
              className="grid-cols-5 text-2xl font-light text-left text-balance">
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

        <h2 className="grid-cols-5 text-2xl font-light text-left md:text-right text-balance"
        style={{color: 'var(--text-color-inv)'}}
        >
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
        <h4 className="text-lg"
        style={{color: 'var(--text-color-inv)'}}
        >Connect       
          <Link
          href="mailto:test@test.com"
          className="text-lg text-medium"
          style={{color: 'var(--text-accent)'}}
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
        className="absolute w-full h-full"
        style={{
          y: yTransform,
          clipPath: "inset( 1rem round 1rem )",
          backgroundColor:  'var(--accent)',
        }}
      />
    </motion.div>
  );
}
