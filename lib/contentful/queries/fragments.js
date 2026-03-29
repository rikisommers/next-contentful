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
  contentRich { json }
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
  image { url }
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
  callToAction {
    title
    slug
  }
}
`;
