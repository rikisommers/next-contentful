
import React from "react";
//import "../../styles/preloader.scss";

const Preloader = ({ show }) => {
  return (
    <div className={`${show ? 'show' : 'hide'} fixed left-0 flex items-center content-center w-full h-full bg-gray-700 test top-0`}>
     
        <h1 className="text-white">PRELOADER</h1>
   
    </div>
  );
};

export default Preloader;
