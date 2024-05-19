import { Html, Head, Main, NextScript } from 'next/document'
import Meta from '../components/meta'

import { useTheme } from 'next-themes';
import { themes } from '../utils/theme';
import { getThemeByKey } from "../utils/theme";


export default function Document() {

  const { theme } = useTheme()
  const currentTheme = getThemeByKey(theme);


  return (
    <Html lang="en">
      <Head />
      <body className={currentTheme?.bodyBackgroundColor}>

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
