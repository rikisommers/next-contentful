/**
 * Shared GraphQL field fragments for Contentful content types
 * @module lib/contentful/queries/fragments
 */

/** Block content fragments shared between landing pages and case studies */
export const BLOCK_FRAGMENTS = `
__typename
... on BlockArticles {
  title
  description
  type
  filter
  articlesCollection(limit: 6) {
    items {
      __typename
      ... on CaseStudy {
        color
        slug
        title
        subtitle
        client
        tags
        img { url }
      }
    }
  }
}
... on BlockArticlesList {
  title
  description
  type
  filter
  articlesCollection(limit: 6) {
    items {
      __typename
      ... on CaseStudy {
        color
        slug
        title
        subtitle
        client
        tags
        img { url }
      }
    }
  }
}
... on BlockArticle {
  title
  caption
  contentRich { json }
  imgCollection(limit: 4) {
    items { url title description contentType width height }
  }
}
... on BlockList {
  title
  content
  type
  itemsCollection(limit: 10) {
    items {
      title
      number
      content
    }
  }
}
... on BlockHeader {
  title
  content
  type
  primaryPageHeader
}
... on BlockImage {
  title
  size
  video
  image { url title description contentType width height }
}
... on BlockImages {
  title
  layout
  maxCols
  imagesCollection(limit: 12) {
    items { url title description contentType width height }
  }
}
... on BlockEmbed {
  title
  url
  caption
  displayFullWidth
}
... on BlockCode {
  title
  type
  code
  embedurl
}
... on BlockHotspotImage {
  title
  imageUrl
  hotspots
}
... on BlockHero {
  title
  intro
  tag
  content
  infoMessage {
    type
    title
    content
    dismiss
  }
  image {
    title
    url
  }
}
... on BlockQuote {
  title
  content
  author
  authorImage { url title }
  callToAction {
    title
    slug
  }
}
`;

/**
 * Case studies additionally allow BlockIntro (project facts: client, role, duration).
 * Landing pages (Home) do not, and spreading it there is a GraphQL error.
 */
export const CASE_STUDY_BLOCK_FRAGMENTS = `
${BLOCK_FRAGMENTS}
... on BlockIntro {
  title
  client
  overview
  duration
  role
}
`;
