/**
 * Composes all application context providers into a single wrapper.
 * ThemeProvider is outermost: other providers (e.g. the cursor tracker) read the theme.
 * @component
 * @category layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Application content
 * @param {Object} [props.globalData] - Global site settings from Contentful
 * @param {Object} [props.footerData] - Footer entry (social links feed the profile)
 */
import { RouteProvider } from './context/routeContext';
import { MousePosProvider } from './context/mousePosContext';
import { ToastProvider } from './context/toastContext';
import { ThemeProvider } from './context/themeContext';
import { MenuProvider } from './context/menuContext';
import { SiteProvider } from './context/siteContext';

const AppProviders = ({ children, globalData, footerData }) => (
  <SiteProvider settings={globalData} footer={footerData}>
    <ThemeProvider initialTheme={globalData?.currentTheme}>
      <RouteProvider>
        <MousePosProvider>
          <ToastProvider>
            <MenuProvider menuData={globalData?.menuCollection?.items}>{children}</MenuProvider>
          </ToastProvider>
        </MousePosProvider>
      </RouteProvider>
    </ThemeProvider>
  </SiteProvider>
);

export default AppProviders;
