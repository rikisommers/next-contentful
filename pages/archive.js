import React, { useRef } from "react";

import Layout from '../components/layout'
import Head from 'next/head'
import Transition from "../components/transition-wipe";
import { ScrollableBox } from "../components/utils/scrollable";

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

