//npx cross-env CONTENTFUL_SPACE_ID=4v0tb3n9jpvc CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc npm run setup
//CFPAT-wwsdnZLZwdYpl8egGCKcVNoBv_InezP3krIyJUJACTc
import React, { useState, useEffect, useCallback} from "react";

import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Transition from "../components/transition-wipe";


export default function Bio() {
  
  return (

      <Layout>

        <Head>
          <title>Bio</title>
        </Head>


         <header className="o-page-header">

            <div className="o-content o-content-grid">
            <div className="title">
               BIO
            </div>
            </div>
        
        </header>  

        <Transition/>
    
      </Layout>
  )
}


