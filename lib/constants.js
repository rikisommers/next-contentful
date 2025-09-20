export const EXAMPLE_PATH = 'cms-contentful'
export const CMS_NAME = 'Contentful'
export const CMS_URL = 'https://www.contentful.com'

// SEO Constants
export const SITE_NAME = 'Award-Winning Digital Studio'
export const SITE_DESCRIPTION = 'Innovative web design and development featuring cutting-edge animations, immersive user experiences, and creative storytelling. Showcasing modern web technologies and award-worthy digital craftsmanship.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
export const SITE_KEYWORDS = [
  'web design',
  'digital studio',
  'creative development', 
  'interactive design',
  'modern web technologies',
  'award-winning design',
  'user experience',
  'creative coding',
  'digital craftsmanship',
  'innovative interfaces'
].join(', ')

// Social Media
export const TWITTER_HANDLE = '@yourstudio'
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/yourstudio',
  instagram: 'https://instagram.com/yourstudio',
  github: 'https://github.com/yourstudio',
  linkedin: 'https://linkedin.com/company/yourstudio'
}

// Open Graph Images
export const HOME_OG_IMAGE_URL = `${SITE_URL}/og-images/home-og.jpg`
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-images/default-og.jpg`

// Schema.org Organization Data
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": SITE_DESCRIPTION,
  "foundingDate": "2024",
  "sameAs": Object.values(SOCIAL_LINKS),
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@yourstudio.com"
  }
}
