import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_LOCALE, absoluteUrl, ogImageUrl } from '../../lib/site';
import { personJsonLd, profileDescription } from '../../lib/profile';
import { useSite } from '../context/siteContext';
import { toPlainText } from '../utils/plain-text';

export interface SEOMetaProps {
  title?: string;
  description?: string;
  /** Absolute or site-relative image URL. Defaults to a generated card. */
  image?: string;
  /** Home page: title is "<name> | <job title>" and the page describes the person. */
  home?: boolean;
  /** Profile page (e.g. /bio): marked up as a ProfilePage about the person. */
  profilePage?: boolean;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  /** Skills or tools used on a case study (schema.org keywords/about). */
  skills?: string[];
  noindex?: boolean;
  /** Absolute URL or site-relative path. Defaults to the current path without query. */
  canonical?: string;
  children?: React.ReactNode;
}

const trim = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

/** Serialise JSON-LD safely for inlining in a <script> tag. */
const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * Per-page metadata: title, description, canonical, Open Graph, Twitter card and JSON-LD.
 * Identity (name, job title, profiles, skills) comes from the Contentful settings entry
 * via SiteProvider, so every page describes the same Person entity.
 * @component
 * @category seo
 */
const SEOMeta = ({
  title,
  description,
  image,
  home = false,
  profilePage = false,
  article = false,
  publishedTime,
  modifiedTime,
  tags = [],
  skills = [],
  noindex = false,
  canonical,
  children,
}: SEOMetaProps) => {
  const router = useRouter();
  const profile = useSite();
  const path = router.asPath.split(/[?#]/)[0] || '/';
  const url = absoluteUrl(canonical ?? path);

  const cleanTitle = toPlainText(title ?? '');
  const roleLine = [profile.jobTitle, profile.location].filter(Boolean).join(', ');
  const pageTitle = home
    ? profile.jobTitle
      ? `${profile.name} | ${profile.jobTitle}`
      : profile.name
    : cleanTitle && cleanTitle !== profile.name
      ? `${cleanTitle} | ${profile.name}`
      : profile.name;
  const metaDescription = trim(toPlainText(description ?? '') || profileDescription(profile));
  const imageUrl = image
    ? absoluteUrl(image)
    : ogImageUrl(home ? profile.headline ?? profile.jobTitle ?? profile.name : cleanTitle, profile.name, roleLine);
  const imageAlt = `${cleanTitle || profile.name} preview image`;

  const person = personJsonLd(profile);
  const personRef = { '@id': person['@id'] };
  const keywords = [...new Set([...skills, ...tags])];

  const graph: object[] = [
    person,
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: profile.name,
      url: absoluteUrl('/'),
      description: profileDescription(profile),
      inLanguage: SITE_LOCALE,
      publisher: personRef,
    },
  ];

  if (home || profilePage) {
    graph.push({
      '@type': 'ProfilePage',
      '@id': url,
      url,
      name: pageTitle,
      mainEntity: personRef,
      ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    });
  }

  if (article) {
    graph.push(
      {
        '@type': 'Article',
        headline: cleanTitle,
        description: metaDescription,
        image: imageUrl,
        author: personRef,
        publisher: personRef,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(keywords.length ? { keywords: keywords.join(', '), about: keywords.map((name) => ({ '@type': 'Thing', name })) } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: profile.name, item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: cleanTitle || 'Case study', item: url },
        ],
      }
    );
  }

  const robots = noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />
      <meta name="author" content={profile.name} />

      <meta property="og:type" content={article ? 'article' : home || profilePage ? 'profile' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:locale" content="en_US" />

      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && <meta property="article:author" content={absoluteUrl('/')} />}
      {article && keywords.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd({ '@context': 'https://schema.org', '@graph': graph }) }}
      />
      {children}
    </Head>
  );
};

export default SEOMeta;
