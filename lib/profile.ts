/**
 * The site owner's public profile, built from the Contentful settings entry (and the
 * footer's social links). Everything that identifies the person on the site, in
 * metadata, structured data, llms.txt and /resume.json comes from here.
 */
import { FALLBACK_SITE_NAME, absoluteUrl } from './site';
import { toHref } from '../components/utils/links';

export interface Profile {
  name: string;
  jobTitle: string | null;
  headline: string | null;
  summary: string | null;
  location: string | null;
  skills: string[];
  /** Public profile URLs (LinkedIn, GitHub, ...), https only, de-duplicated. */
  sameAs: string[];
  resumeUrl: string | null;
  openToWork: boolean;
  availability: string | null;
  image: string | null;
}

type Maybe<T> = T | null | undefined;

interface SettingsData {
  sitetitle?: Maybe<string>;
  jobTitle?: Maybe<string>;
  headline?: Maybe<string>;
  summary?: Maybe<string>;
  location?: Maybe<string>;
  skills?: Maybe<string[]>;
  profileLinks?: Maybe<string[]>;
  resume?: Maybe<{ url?: Maybe<string> }>;
  openToWork?: Maybe<boolean>;
  availability?: Maybe<string>;
  logo?: Maybe<{ url?: Maybe<string> }>;
}

interface FooterData {
  socialCollection?: Maybe<{ items?: Maybe<Array<Maybe<{ url?: Maybe<string> }>>> }>;
}

const clean = (value: Maybe<string>) => (typeof value === 'string' && value.trim() ? value.trim() : null);
const https = (url: Maybe<string>) => (url?.startsWith('//') ? `https:${url}` : url ?? null);

export function buildProfile(settings?: Maybe<SettingsData>, footer?: Maybe<FooterData>): Profile {
  const links = [
    ...(settings?.profileLinks ?? []),
    ...(footer?.socialCollection?.items ?? []).map((item) => item?.url),
  ]
    .map((url) => toHref(url ?? ''))
    .filter((url): url is string => typeof url === 'string' && /^https:\/\//i.test(url))
    // Only real profiles: "https://codepen.io/me", not a site's home page like "https://codepen.com".
    .filter((url) => new URL(url).pathname.replace(/\/+$/, '') !== '');

  return {
    name: clean(settings?.sitetitle) ?? FALLBACK_SITE_NAME,
    jobTitle: clean(settings?.jobTitle),
    headline: clean(settings?.headline),
    summary: clean(settings?.summary),
    location: clean(settings?.location),
    skills: (settings?.skills ?? []).map((s) => s.trim()).filter(Boolean),
    sameAs: [...new Set(links)],
    resumeUrl: https(settings?.resume?.url),
    openToWork: settings?.openToWork === true,
    availability: clean(settings?.availability),
    image: https(settings?.logo?.url),
  };
}

/** One-line description of the person, for meta descriptions and summaries. */
export function profileDescription(profile: Profile): string {
  if (profile.summary) return profile.summary;
  if (profile.headline) return profile.headline;
  const role = [profile.jobTitle, profile.location && `based in ${profile.location}`].filter(Boolean).join(', ');
  return role ? `${profile.name}: ${role}.` : `${profile.name}: portfolio and case studies.`;
}

/** schema.org Person, referenced by @id from every page. */
export function personJsonLd(profile: Profile) {
  return {
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: profile.name,
    url: absoluteUrl('/'),
    ...(profile.jobTitle ? { jobTitle: profile.jobTitle } : {}),
    ...(profile.summary || profile.headline ? { description: profile.summary ?? profile.headline } : {}),
    ...(profile.location ? { address: { '@type': 'PostalAddress', addressLocality: profile.location } } : {}),
    ...(profile.skills.length ? { knowsAbout: profile.skills } : {}),
    ...(profile.sameAs.length ? { sameAs: profile.sameAs } : {}),
    ...(profile.image ? { image: profile.image } : {}),
  };
}
