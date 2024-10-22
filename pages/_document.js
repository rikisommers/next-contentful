import { Html, Head, Main, NextScript } from 'next/document'
import Meta from '../components/meta'
export default function Document() {



  return (
    <Html lang="en">
      <Head />
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
