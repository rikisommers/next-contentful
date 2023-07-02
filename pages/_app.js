import "../styles/index.scss";
import Navigation from "../components/navigation/primary-navigation";
import { AnimatePresence } from "framer-motion";
import "../styles/index.scss";
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
