
import React from "react";
//import "../../styles/preloader.scss";

const Preloader = ({ show, data }) => {
  return (
    <div className={`${show ? 'show' : 'hide'} fixed left-0 flex items-center content-center w-full h-full bg-gray-700 test top-0`}>
     
        <h1 className="text-white">{data}</h1>
   
    </div>
  );
};

export default Preloader;
