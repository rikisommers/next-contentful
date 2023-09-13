import "../styles/index.scss";
import Navigation from "../components/navigation/primary-navigation";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "../components/appContext";

import "../styles/index.scss";
function MyApp({ Component, pageProps, router }) {
  return (
    <AppProvider>
      <Navigation />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </AppProvider>
  );
}

export default MyApp;
