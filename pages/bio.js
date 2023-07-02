import React from "react";
import Layout from '../components/layout'
import Head from 'next/head'
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";

export default function Bio() {
  
  return (

      <Layout>

        <Head>
          <title>Bio</title>
        </Head>

        <TransitionTilt>
         <header className="o-page-header">

            <div className="o-content o-content-grid">
            <div className="title">
               BIO
            </div>
            </div>
        
        </header>  
        </TransitionTilt>
        <TransitionWipe/>
    
      </Layout>
  )
}


