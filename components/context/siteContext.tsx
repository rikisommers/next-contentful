import React, { createContext, useContext, useMemo } from 'react';
import { buildProfile, type Profile } from '../../lib/profile';

const SiteContext = createContext<Profile>(buildProfile(null, null));

/** Site owner profile from Contentful settings + footer, available to every page. */
export function SiteProvider({
  settings,
  footer,
  children,
}: {
  settings?: Parameters<typeof buildProfile>[0];
  footer?: Parameters<typeof buildProfile>[1];
  children: React.ReactNode;
}) {
  const profile = useMemo(() => buildProfile(settings, footer), [settings, footer]);
  return <SiteContext.Provider value={profile}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
