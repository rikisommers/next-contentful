import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SOCIAL_PROFILES,
  SITE_LOCALE,
  absoluteUrl,
  ogImageUrl,
} from '../../lib/site';

export interface SEOMetaProps {
  title?: string;
  description?: string;
  /** Absolute or site-relative image URL. Defaults to a generated card. */
  image?: string;
  /** Home page: uses the site name and tagline as the title. */
  home?: boolean;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
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
 * Per-page metadata: title, description, canonical, Open Graph, Twitter card
 * and JSON-LD (Organization, WebSite or Article + BreadcrumbList).
 * @component
 * @category seo
 */
const SEOMeta = ({
  title,
  description = SITE_DESCRIPTION,
  image,
  home = false,
  article = false,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  noindex = false,
  canonical,
  children,
}: SEOMetaProps) => {
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0] || '/';
  const url = absoluteUrl(canonical ?? path);
  const pageTitle = home
    ? `${SITE_NAME} | ${SITE_TAGLINE}`
    : title && title !== SITE_NAME
      ? `${title} | ${SITE_NAME}`
      : SITE_NAME;
  const metaDescription = trim(description || SITE_DESCRIPTION);
  const imageUrl = image ? absoluteUrl(image) : ogImageUrl(home ? SITE_TAGLINE : title);
  const imageAlt = `${title || SITE_NAME} preview image`;

  const organization = {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl(SITE_LOGO_PATH),
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };

  const graph: object[] = [
    organization,
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LOCALE,
      publisher: { '@id': organization['@id'] },
    },
  ];

  if (article) {
    graph.push(
      {
        '@type': 'Article',
        headline: title,
        description: metaDescription,
        image: imageUrl,
        author: { '@type': author ? 'Person' : 'Organization', name: author || SITE_NAME },
        publisher: { '@id': organization['@id'] },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        ...(tags.length ? { keywords: tags.join(', ') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: title || 'Article', item: url },
        ],
      }
    );
  }

  const robots = noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />
      {author && <meta name="author" content={author} />}

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article &&
        tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({ '@context': 'https://schema.org', '@graph': graph }),
        }}
      />
      {children}
    </Head>
  );
};

export default SEOMeta;
