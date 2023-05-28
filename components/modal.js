import { useEffect, useState, useRouter } from "react";
import { motion } from "framer-motion";
import { getAllCaseStudies2 } from "../lib/api";

const Modal = ({ isOpen, onClose, children, slug ,post }) => {

  const [isClosing, setIsClosing] = useState(false);
  const [caseStudy, setCaseStudy] = useState(null);

  console.log('post',post)
  console.log('slug',slug)


  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Adjust the duration to match your transition animation
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <>    
    {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
          initial={{ 
            opacity: 0, 
            y:'100vh'
            }}
          animate={{ opacity: 1 , y:0}}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg w-full h-auto p-6 m-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>
            {children}
            { post && 
            <h1>{post.title}</h1>
}   
          </motion.div>
        </motion.div>
      )}
      </>

  );
};

export default Modal;

export async function getStaticProps({ params, preview = false }) {
    const slug = params.slug;
    const data = await getAllCaseStudies2(slug,preview);
  
    return {
      props: {
        slug,
        preview,
        post: data[0] ?? null,
      },
    };
  }
  