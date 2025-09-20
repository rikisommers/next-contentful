import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "../lib/constants";
import SEOMeta from "./seo/seo-meta";

export default function Meta({ 
  title = "Award-winning digital experiences",
  description = "Innovative web design and development featuring cutting-edge animations, immersive user experiences, and creative storytelling.",
  image = HOME_OG_IMAGE_URL,
  url = ""
}) {
  // Use the new SEO component for comprehensive meta tags
  return (
    <SEOMeta 
      title={title}
      description={description}
      image={image}
    >
      {/* Legacy meta tags for backward compatibility */}
      <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      
      {/* Essential Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Digital Studio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Performance & SEO */}
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      {url && <link rel="canonical" href={url} />}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Digital Studio",
            "url": url,
            "logo": `${url}/logo.png`,
            "description": description,
            "sameAs": [
              "https://twitter.com/digitalstudio",
              "https://instagram.com/digitalstudio"
            ]
          })
        }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.ctfassets.net" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.ctfassets.net" />
    </Head>
  );
}
