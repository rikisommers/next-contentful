const PAGE_GRAPHQL_FIELDS = `
title
intro
content{
  json
}
sys {
  id
  publishedAt
}
titlealt
contentalt
video{
  title
  description
  poster {
    title
    url
    description
  }
}
textLoop{
  lead
  textCollection(limit: 10) {
    items {
      basicContent
      content{
        json
      }
    }
  }
}
`;

const BIO_GRAPHQL_FIELDS = `
    title
    intro
    titlealt
    contentalt
    content{
      json
    }

    video{
      title
      description
      poster {
        title
        url
        description

      }
    }

    textLoop{
      lead
      textCollection(limit: 10) {
        items {
          basicContent
          content{
            json
          }
        }
      }
    }

    sectionsCollection(limit: 3){
      items{
        title
        articlesCollection(limit: 10){
          total
          items{
            __typename
            ... on CaseStudy{
                  tags
                  title
                  url
                  archived
                  client
                  role
                  duration
            }
            ... on BlockArticle{
                  title
                  caption
                  contentRich {
                  json
                  }
            }
          }

        }
      }
    }

`;

const POSTINTRO_GRAPHQL_FIELDS = `
slug
color
type
title
subtitle
client
tags
layout
img {
  title
  url
  description
}
`;

const POST_GRAPHQL_FIELDS = `
slug
title
titlealt
contentalt
subtitle
color
type
client
duration
description
tags
intro{
  json
}
role
img {
  title
  url
  description
}
csblocksCollection(limit:5){
  items{
    __typename
... on BlockArticle {
    title
    contentRich {
      json
    }
      }
  __typename
  ... on BlockImage {
      title
      image{
        url
      }
    }
    __typename
    ... on BlockHotspotImage {
      title 
      imageUrl
      hotspots
    }
 
   __typename
   ... on BlockQuote {
    title
    content
      }
      __typename
         ... on BlockEmbed {
    title
    url
    caption
      }
      __typename
      ... on BlockList {
 title
description
       itemsCollection(limit:5){
         items{
           title
           content
         }
       }
   }
  }}
`;

// imagegridCollection(limit:2){
//   items{
//     title
//     url
//   }
// }
const IMAGES_GRAPHQL_FIELDS = `

img {
  url
}
csblocksCollection(limit:10){
  items{
        __typename
        ... on BlockImage {
            image{
              url
            }
          }
      __typename
      ... on BlockIg  {
        imagegridCollection(limit:2){
          items{
            url
          }
        }
 
   }
  }}
`;

const THEME_GRAPHQL_FIELDS = `
  theme
  color
  test
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

// function extractPost(fetchResponse) {
//   return fetchResponse?.data?.postCollection?.items?.[0];
// }

function extractHome(fetchResponse) {
  return fetchResponse?.data?.homeCollection?.items?.[0];
}

function extractCS(fetchResponse) {
  return fetchResponse?.data?.caseStudyCollection?.items?.[0];
}

// function extractPostEntries(fetchResponse) {
//   return fetchResponse?.data?.postCollection?.items;
// }

function extractCSEntries(fetchResponse) {
  return fetchResponse?.data?.caseStudyCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}



export async function getBio() {
  const query = `query {
      homeCollection(where: { slug: "bio" }) {
  
        items {
          ${BIO_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection?.items[0];
  return data;
}

export async function getHome() {
  const query = `query {
    
      homeCollection(where: { slug: "home" }) {
  
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection?.items[0];
  return data;
}

export async function getWork() {
  const query = `query {
      homeCollection(where: { slug: "work" }) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection?.items[0];
  return data;
}

export async function getAllImages(preview = false) {
  const query = `
      query {
        caseStudyCollection(preview: ${preview}) {
          items {
            ${IMAGES_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getAllCaseStudies(preview = false) {
  const query = `
      query {
        caseStudyCollection(
          where : { type_contains_all : "casestudy" }
        ) {
          items {
            ${POSTINTRO_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getAllBlogPosts(preview = false) {
  const query = `
      query {
        caseStudyCollection(
          where : { type_contains_all : "blogpost" }
        ) {
          items {
            ${POSTINTRO_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getPost(slug, preview = false) {
  const query = `
      query {
        caseStudyCollection(where: { slug: "${slug}" },
        order: title_ASC,
        preview: ${preview}) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}




export async function getNextPost(slug, preview = false) {
  const query = `
      query {
        caseStudyCollection(
          where: { slug_not_in: "${slug}" },
          order: title_ASC,
          limit: 1
          preview: ${preview}) {
          items {
            ${POSTINTRO_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}




export async function getAllCaseStudiesIntro(preview = false) {
  const query = `
      query {
        caseStudyCollection( 
          where : { type_contains_all : "casestudy" }
          preview: ${preview},
        ) {
          items {
            ${POSTINTRO_GRAPHQL_FIELDS}
          }
        }
      }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}


export async function getAllBlogPostsIntro(preview = false) {
  const query = `query {
      caseStudyCollection( 
        where : { type_contains_all : "blogpost" }
        preview: ${preview},
        order: title_ASC,
        ) {
        items {
          ${POSTINTRO_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}



export async function getTheme(preview = false) {
  const entryId = '4iGdsk96V3ykxZGracUGeJ'; // Replace 'xxx' with the actual Contentful content entry ID
  const query = `
    query {
      themeCollection(
        limit: 1) {
          items {
            ${THEME_GRAPHQL_FIELDS}
          }
        }
      )
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.themeCollection?.items;
  return data;
}
