import React, { useState, useEffect } from "react";
import { getAllCaseStudies } from "../lib/api";

const getRandomPercentage = () => Math.floor(Math.random() * (90 - 60 + 1) + 60);

const Preloader = ({ allCaseStudies }) => {
  // const imageUrls = allCaseStudies.reduce((urls, item) => {
  //   if (item.img && item.img.url) {
  //     urls.push(item.img.url);
  //   }
  //   return urls;
  // }, []);

  // const [loadingPercentage, setLoadingPercentage] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  // const cacheImages = async (srcArray) => {
  //   // Start loading percentage at 0
  //   setLoadingPercentage(0);

  //   const randomTargetPercentage = getRandomPercentage();

  //   // Simulate loading from 0 to a random percentage between 60 and 90
  //   const loadingInterval = setInterval(() => {
  //     setLoadingPercentage((prevPercentage) => {
  //       const increment = Math.random() * 5; // Increment by a random amount
  //       const newPercentage = Math.min(prevPercentage + increment, randomTargetPercentage);

  //       // Stop the interval when reaching the random target percentage
  //       if (newPercentage >= randomTargetPercentage) {
  //         clearInterval(loadingInterval);
  //         loadRemainingImages(srcArray);
  //       }

  //       return newPercentage;
  //     });
  //   }, 50); // Adjust the interval duration as needed
  // };

  // const loadRemainingImages = async (srcArray) => {
  //   // Continue with the rest of the code for loading remaining images
  //   const startTime = new Date().getTime();

  //   const promises = srcArray.map((src) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image();
  //       img.src = src;
  //       img.onload = () => {
  //         setLoadingPercentage((prevPercentage) => {
  //           const adjustedPercentage = prevPercentage + (100 / srcArray.length);
  //           return adjustedPercentage > 100 ? 100 : adjustedPercentage;
  //         });
  //         resolve();
  //       };
  //       img.onerror = reject;
  //     });
  //   });

  //   await Promise.all(promises);

  //   const endTime = new Date().getTime();
  //   const loadingTime = endTime - startTime;

  //   // Add a delay if loading time is below 2000 milliseconds (2 seconds)
  //   if (loadingTime < 100) {
  //     const delay = 100 - loadingTime;
  //     await new Promise((resolve) => {
  //       setTimeout(() => {
  //         setLoadingPercentage(100);
  //         resolve();
  //       }, delay);
  //     });
  //   }

  //   setIsLoading(false);
  //   console.log('complete');
  //   console.log(loadingTime);
  //   console.log(allImages);
  // };

  // useEffect(() => {
  //   const images = imageUrls;
  //   cacheImages(imageUrls);
  // }, []);

  return (
    <div className="fixed w-full h-full bg-gray-700 z-50 flex items-center content-center">
     
        <h1 className="text-white">Loading Complete</h1>
   
    </div>
  );
};
export async function getStaticProps() {

  const allCaseStudies = (await getAllCaseStudies()) ?? [];

  return {
    props: {
      allCaseStudies,
    },
  };
}

export default Preloader;
