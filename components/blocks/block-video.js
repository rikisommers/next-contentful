import React, {useRef} from "react";
import TextAnimation from "../utils/text-animation";
import Audio from "../navigation/audio";
import ContentfulImage from "../image/contentful-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import RollUpWhenVisible from "../utils/roll-up-visible";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
} from "framer-motion";


export const BlockVideo = (data) => {


  // const lastUpdatedDate = home?.sys?.updatedAt || "N/A";
  // const clipPathInitial = `inset(1.0rem 1.0rem 6.0rem round 0.5rem)`;
  // const clipPathAnimate = `inset( 1.5rem round 1rem )`;
  // const clipPathExit = `inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )`;
  // console.log('dddd',data)


  const ref = useRef(null);

  const { scrollYProgress } = useScroll({

    target: ref,
  
    offset: ['start end', 'end start']
  
  })
  
  
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0])
  



  return (
    <RollUpWhenVisible>
      
    <motion.div ref={ref} 
    className="c-video flex flex-col align-bottom content-end"  
                // initial={{ clipPath: clipPathInitial }}
                // animate={{ clipPath: clipPathInitial }}
                // exit={{ clipPath: clipPathInitial }}
                // transition={{
                //   duration: 0.6,
                //   easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                // }}
    >



      {data.data.poster && 
        <div className="c-video__content">
            <motion.div className="w-full h-full py-6" 
                        style={{y}}>    

            <ContentfulImage
              
              className="img-cover"
              alt={data.data.poster.title}
              src={data.data.poster.url}
            />
             </motion.div> 
        </div>
      }

      
      <div className="w-full flex flex-col gap-6 p-4"  >
      {/* <h1 className="text-7xl">{title && title}</h1> */}
      <motion.p
        className="text-sm text-slate-500 uppercase"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          duration: 0.6,
          delay: 0.3,
        }}
      >
       {data.title}
      </motion.p>

        <FadeInWhenVisible>
        <p className="text-slate-100">{data.data.description}</p>
        </FadeInWhenVisible>
      {/* <TextAnimation
        content={data.data.description}
        color={"text-slate-400"}
      /> */}

  
   
    </div>

      <div className="absolute bottom-3 right-3">
        <Audio />
      </div>


  </motion.div>

  </RollUpWhenVisible>

  );
};

export default BlockVideo;
