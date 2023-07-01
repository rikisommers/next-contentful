//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useRef, useCallback} from "react";
import { useFrame } from '@studio-freight/hamo';

import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Transition from "../components/transition-wipe";
import { useLenis } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis';
import { ScrollableBox } from "../components/scrollable";

export default function Archive() {
  
    const scrollRef = useRef(null);

    const handleScrollChange = (value) => {
        console.log(value)
      };

  return (

      <Layout>

        <Head>
          <title>Bio</title>
        </Head>


         <div className="fixed h-full w-full bg-slate-200" >
         <ScrollableBox 
          ref={scrollRef} 
          infinite={true}
          onScrollChange={handleScrollChange} 
            orientation={'horizontal'}
          >
            <div className="archive-grid" >
                <h1>ddd</h1>
            </div>
            <div className="archive-grid" >
                <h1>ddd</h1>
            </div>
            </ScrollableBox>
         </div>

        <Transition/>
    
      </Layout>
  )
}

