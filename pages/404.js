// pages/_error.js

import React from 'react';
import Layout from "../components/layout";



export default function Custom404() {
    return  (
        <Layout>
          <div className='flex items-center justify-center w-full h-full'>
          <h1>
            404
          </h1>
          </div>
        </Layout>
      );
  }