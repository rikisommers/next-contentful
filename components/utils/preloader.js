
import React, { useState, useEffect } from "react";
import { getGlobal } from "../../lib/api";
import "../../styles/preloader.scss";


const Preloader = ({ data,show }) => {

  console.log('-----------__GGGLOOOBAL',data)

  return (
    <div className={`${show ? 'show' : 'hide'} fixed left-0 flex items-center content-center w-full h-full bg-gray-700 test top-0`}>
     
        <h1 className="text-white">sad</h1>
   
    </div>
  );
};
export async function getStaticProps({ preview = false }) {
  const [globalData] = await Promise.all([
    getGlobal(), // Fetch the footer content
  ]);

  return {
    props: {
      data: globalData || null, // Use null as fallback if data is undefined
    },
  };
}
export default Preloader;
