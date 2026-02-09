/**
 * Composes all application context providers into a single wrapper
 * Reduces nesting in _app.js and centralizes provider configuration
 * @component
 * @category layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Application content
 * @param {Object} [props.globalData] - Global site settings from Contentful
 * @param {Array} [props.customThemes] - Custom themes from CMS
 */
import { RouteProvider } from './context/routeContext';
import { ScrollPositionProvider } from './context/scrollPosContext';
import { MousePosProvider } from './context/mousePosContext';
import { ToastProvider } from './context/toastContext';
import { ThemeProvider } from './context/themeContext';
import { MenuProvider } from './context/menuContext';

const AppProviders = ({ children, globalData, customThemes }) => (
  <RouteProvider>
    <ScrollPositionProvider>
      <MousePosProvider>
        <ToastProvider>
          <ThemeProvider
            theme={globalData?.currentTheme}
            customThemes={customThemes}
          >
            <MenuProvider menuData={globalData?.menuCollection?.items}>
              {children}
            </MenuProvider>
          </ThemeProvider>
        </ToastProvider>
      </MousePosProvider>
    </ScrollPositionProvider>
  </RouteProvider>
);

export default AppProviders;
