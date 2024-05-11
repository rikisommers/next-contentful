// pages/_error.js

import React from 'react';
import Layout from "../components/layout";

class ErrorPage extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Layout>
        <div className='flex items-center justify-center w-full h-full'>
        <h1>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        </div>
      </Layout>
    );
  }
}

export default ErrorPage;
