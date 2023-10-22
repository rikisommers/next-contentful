import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const router = useRouter(); // Add this line
  const [routeInfo, setRouteInfo] = useState({ destRoute: "/", sourceRoute: "/" });

  const handleRouteChangeStart = (url) => {
    // 'shallow' is true if the change is not a full page reload
    const sourceRoute = router.asPath;
    setRouteInfo({ destRoute:url, sourceRoute });

    console.log("Incoming Route:", url);
    console.log("Outgoing Route:", sourceRoute);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, []); // Run this effect only once on mount

  return (
    <RouteContext.Provider value={{ routeInfo, handleRouteChangeStart }}>
      {children}
    </RouteContext.Provider>
  );
};
