import Link from "next/link";
import { motion } from "framer-motion";
import { Router,useRouter } from "next/router";

export default function Header() {

const router = useRouter();
const path = router.asPath.split("?")[0];

  return (
      <div className="c-header o-content">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
              delay: 1,
            },
          }}
        >
          <Link className="font-bold text-5xl" href="/">  
          router: {path}
          </Link>

        </motion.h1>

    
        
      </div>
    
  );
}
