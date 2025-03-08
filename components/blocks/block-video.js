import React, {useRef} from "react";
import Audio from "../navigation/audio";
import ContentfulImage from "../image/contentful-image";
import FadeInWhenVisible from "../utils/fade-in-visible";
import RollUpWhenVisible from "../utils/roll-up-visible";
import {
  motion,
  useTransform,
  cubicBezier,
  useScroll,
} from "../../utils/motion";;


export const BlockVideo = (data) => {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({

    target: ref,
  
    offset: ['start end', 'end start']
  
  })
  
  
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0])
  



  return (
    <RollUpWhenVisible>

    <motion.div ref={ref} 
    className="flex flex-col content-end overflow-hidden align-bottom rounded-lg w-full bg-gray-500 relative grid aspect-[16/9] overflow-hidden flex justify-end"  
                // initial={{ clipPath: clipPathInitial }}
                // animate={{ clipPath: clipPathInitial }}
                // exit={{ clipPath: clipPathInitial }}
                // transition={{
                //   duration: 0.6,
                //   easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                // }}
    >



      {data.data.poster && 
        <div className="absolute w-full h-[calc(100%+200px)] -top-[10px] left-0 flex flex-col justify-center items-center">
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

      
      <div className="flex flex-col w-full gap-6 p-4"  >
      {/* <h1 className="text-7xl">{title && title}</h1> */}
      <motion.p
        className="text-sm uppercase text-slate-500"
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
