"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CtxMenu from './ctx-menu';
const PageNav = ({ content }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const controls = useAnimation();

    
  useEffect(() => {
    controls.start(isOpen ? 'visible' : 'hidden');
  }, [controls, isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true); // Ensure menu stays closed when hovered over
    }
  };

  const handleMenuMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false); // Close menu when mouse leaves menu
    }
  };

  return (
<>
    <nav className="sticky right-0 z-20 flex flex-col self-start justify-center inset-y-1/3"
     onMouseEnter={handleMouseEnter} 
     onMouseLeave={handleMouseLeave}>
        <div className='relative'>
    <ul className="flex flex-col items-end gap-3 p-3 ml-50">
    {content &&
      content.length > 0 &&
      content.map((item, index) => {
        return (
          <div key={index}>
           
              <div className="flex w-6 h-1 text-red-400 rounded-sm bg-slate-300">
-
              </div>    
           
          </div>
        );
      })}
      </ul>

      <motion.div
        className="absolute left-0 z-10 shadow-lg"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 }
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={isOpen ? handleMenuMouseEnter : null}
        onMouseLeave={isOpen ? handleMenuMouseLeave : null}
      >
{content &&
      content.length > 0 &&
      content.map((item, index) => {
        return (
          <div key={index}>
           
              <div className="flex w-6 h-1 text-red-400 rounded-sm bg-slate-500">
{item.title}
              </div>    
           
          </div>
        );
      })}
      </motion.div>

      </div>

  

  </nav>

  
  </>
  );
};

export default PageNav;
