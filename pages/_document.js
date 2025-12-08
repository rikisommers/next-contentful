import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" initialScale={1}>
      <Head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.ctfassets.net" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* Favicon and app icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        
        {/* Theme and app configuration */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        
        {/* RSS feed */}
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </Head>
      <body>

        {/* <div id={'globalLoader'}>
              <div className="loader">
                <div/>
                <div/>
            </div>
        </div> */}

        <Main />
        <NextScript />
        {/* <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
                if (!("anchorName" in document.documentElement.style)) {
                  (async () => {
                    const { default: polyfill } = await import("https://unpkg.com/@oddbird/css-anchor-positioning/dist/css-anchor-positioning-fn.js");
                    polyfill(true);
                  })();
                }
              `,
            }}
          /> */}
      </body>
    </Html>
  )
}
