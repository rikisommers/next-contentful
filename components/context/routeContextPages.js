"use client";

import React, { createContext, useState, useEffect, useCallback} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Added useSearchParams import

export const RouteContext = createContext();

export const PagesRouteProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [routeInfo, setRouteInfo] = useState({ destRoute: "/", sourceRoute: "/" });

  const handleRouteChange = useCallback(() => {
    const newRoute = pathname + searchParams.toString();
    setRouteInfo(prevRouteInfo => ({
      destRoute: newRoute,
      sourceRoute: prevRouteInfo.destRoute
    }));
  }, [pathname, searchParams]);

  useEffect(() => {
    handleRouteChange();
  }, [handleRouteChange]);

  return (
    <RouteContext.Provider value={{ routeInfo }}>
      {children}
    </RouteContext.Provider>
  );
};