// pages/_error.js

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from "../components/layout";

const NotFoundComponent = () => {
    const searchParams = useSearchParams();

    // Your logic using searchParams
    return <h1>404 - Page Not Found</h1>;
};

export default function Custom404() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                <div className='flex items-center justify-center w-full h-full'>
                    <NotFoundComponent />
                </div>
            </Layout>
        </Suspense>
    );
}