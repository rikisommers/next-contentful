import { useContext } from "react";
import { motion , cubicBezier} from "framer-motion";
import { RouteContext } from "../routeContext";
import { useRouter } from "next/router";

export default function Chrome({ lastUpdated }) {

  const router = useRouter();
  const path = router.asPath.split("?")[0];

  return (
    <div className="fixed w-full h-full pointer-events-none z-50">
      

          <motion.div className="absolute top-6 left-6 pointer-events-auto"
            initial={{
                scale:0
            }}
            animate={{
              scale:1
            }}
            exit={{
              scale:0
            }}
            transition={{
              duration: 0.3,
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
            }}
          >
            <motion.div className="inset inset--top-left "></motion.div>
          </motion.div> 

           <div className="absolute top-6 right-6 pointer-events-auto">
            <div className="inset inset--top-right">test</div>
          </div>

      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <motion.div className="pb-6 text-xs"
        initial={{
          opacity:0,
          x:'0rem'
        }}
        animate={{
          opacity:1,
          x:'4rem'
        }}
        transition={{
          duration: 0.6,
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        }}
        >
          Last Updated : {lastUpdated}
        </motion.div>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <motion.div className="pb-6 text-xs"
        initial={{
          opacity:0,

          x:'0rem'
        }}
        animate={{
          opacity:1,

          x:'-4rem'

        }}
                transition={{
                  duration: 0.6,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                }}>
          Location Temp
        </motion.div>
      </div>
    </div>
  );
}
