import { useRouter } from "next/router";
import Head from "next/head";
import Container from "./container";
import PostBody from "./post-body";

import Layout from "./layout";
import PostTitle from "./post-title";
import { CMS_NAME } from "../lib/constants";
import { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import CaseStudyHeader from "./case-study-header";


export default function PostContent({post}) {

//  console.log('p',post);
  return (
    <>
      <article className="px-24 pt-32">
       
        {/* <h1>IS IT WORKING</h1>
        {post.title && 
          <h1>{post.title}</h1>
        } */}
        {/* <h1>{post?.subtitle}</h1>
        <h1>{post?.img.url}</h1> */}
          <CaseStudyHeader
          title={post.title}
          subtitle={post.subtitle}
          img={post.img}
          />
          {post.csblocksCollection && 
            <PostBody content={post.csblocksCollection} />
          }

        
 
        
      </article>
    </>
  );
}
