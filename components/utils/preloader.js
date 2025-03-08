
import React from "react";
//import "../../styles/preloader.scss";

const Preloader = ({ show, data, logo}) => {
  return (
    <div className={`${show ? 'translate-y-0' : '-translate-y-full'} fixed flex items-center justify-center w-full h-full fixed top-0 left-0 z-[9999] pointer-events-none w-full h-full 
        transition-all duration-600 ease-in-out top-0`}
        style={{
          backgroundColor: 'var(--body-background-color)',
        }} 
        >
{/*      
        <h1 className="text-white">{data}</h1> */}
        {logo &&
        <div className="w-24 h-24">
        <img
          src={logo.url}
          title={logo.title}
          viewBox="0 0 32 32"
          className="h-full"
        ></img>
        </div>
        }
    </div>
  );
};

export default Preloader;
