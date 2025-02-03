
import React from "react";
//import "../../styles/preloader.scss";

const Preloader = ({ show, data, logo}) => {
  return (
    <div className={`${show ? 'show' : 'hide'} fixed left-0 flex items-center justify-center w-full h-full bg-gray-700 test top-0`}>
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
