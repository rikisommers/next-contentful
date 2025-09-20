import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  SITE_NAME, 
  SITE_DESCRIPTION, 
  SITE_URL, 
  SITE_KEYWORDS,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  ORGANIZATION_SCHEMA 
} from '../../lib/constants';

const SEOMeta = ({
  title,
  description = SITE_DESCRIPTION,
  keywords = SITE_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  article = false,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  noindex = false,
  canonical,
  children
}) => {
  const router = useRouter();
  const currentUrl = `${SITE_URL}${router.asPath}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  
  // Generate additional keywords from tags
  const allKeywords = [...keywords.split(', '), ...tags].join(', ');
  
  // Article schema for blog posts/case studies
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author || SITE_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || currentUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph */}
      {article && (
        <>
          <meta property="article:author" content={author || SITE_NAME} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title ? title : SITE_NAME} preview image`} />
      
      {/* Additional SEO Meta */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo tags for local SEO (if applicable) */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Language tags */}
      <meta httpEquiv="content-language" content="en-us" />
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_SCHEMA)
        }}
      />
      
      {/* Structured Data - Article */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
      )}
      
      {/* Additional structured data for creative work */}
      {!article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": SITE_NAME,
              "url": SITE_URL,
              "description": SITE_DESCRIPTION,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      )}
      
      {/* Custom additional meta tags */}
      {children}
    </Head>
  );
};

export default SEOMeta;