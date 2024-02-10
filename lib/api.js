const HOME_GRAPHQL_FIELDS = `
title
intro
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

const CASESTUDYINTRO_GRAPHQL_FIELDS = `
slug
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

const CASESTUDY_GRAPHQL_FIELDS = `
slug
title
subtitle
client
duration
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
csblocksCollection(limit:10){
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
      ... on BlockIg  {
        title
        test
        image{
          title
        }
        title
        
        imagegridCollection(limit:2){

          items{
            title
            url
          }
        }
 
   }
  }}
`;


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


const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
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

// export async function getAllPostsWithSlug() {
//   const entries = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug_exists: true }, order: date_DESC) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`
//   );
//   return extractPostEntries(entries);
// }

// export async function getCaseStudyAndNextPost(slug, preview) {

//   const entry = await fetchGraphQL(
//     `query {
//       caseStudyCollection(
//         where: { slug: "${slug}" },
//         preview: ${preview ? "true" : "false"}
//         , limit: 1
//         ) {
//         items {
//           ${CASESTUDY_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );

// export async function getPostWithSlug(slug) {
//   const query = `query {
//       caseStudyCollection(where: { slug_exists: true, slug: "$slug"}, order: date_DESC) {
//           items {
//             ${CASESTUDY_GRAPHQL_FIELDS}
//           }
//         }
      
//     }`;
//   const response = await fetchGraphQL(query);
//   const data = response;
//   return data;
// }

export async function getPostWithSlug(slug, preview = false) {
  const query = `
    query {
      caseStudyCollection(where: { slug: "${slug}" }, preview: ${preview}) {
        items {
          ${CASESTUDY_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  if (!data || data.length === 0) {
    return null; // Return null if data is not found or empty
  }

  return data[0]; // Return the first item
}

export async function getAllCSPostsWithSlug() {
  const query = `query {
      caseStudyCollection(where: { slug_exists: true }, order: date_DESC) {
          items {
            ${CASESTUDY_GRAPHQL_FIELDS}
          }
        }
      
    }`;
  const response = await fetchGraphQL(query);
  const data = response;
  return data;
}

// export async function getAllPostsForHome(preview) {
//   const entries = await fetchGraphQL(
//     `query {
//       postCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );
//   return extractPostEntries(entries);
// }

export async function getBio() {
  const query = `query {
      homeCollection(where: { slug: "bio" }) {
  
        items {
          ${HOME_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection.items[0];
  return data;
}

export async function getHome() {
  const query = `query {
      homeCollection(where: { slug: "welcome" }) {
  
        items {

          ${HOME_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection.items[0];
  return data;
}

export async function getWork() {
  const query = `query {
      homeCollection(where: { slug: "work" }) {
        items {
          ${HOME_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection.items[0];
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
        caseStudyCollection(preview: ${preview}) {
          items {
            ${CASESTUDY_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getAllCaseStudies2(slug, preview = false) {
  const query = `
      query {
        caseStudyCollection(where: { slug: "${slug}" },
        order: title_ASC,
        preview: ${preview}) {
          items {
            ${CASESTUDY_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getAllCaseStudiesNext(slug, preview = false) {
  const query = `
      query {
        caseStudyCollection(
          where: { slug_not_in: "${slug}" },
          order: title_ASC,
          limit: 1
          preview: ${preview}) {
          items {
            ${CASESTUDY_GRAPHQL_FIELDS}
          }
        }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}


export async function getAllCaseStudiesForHome(preview = false) {
  const query = `query {
      caseStudyCollection( 
        preview: ${preview},
        order: title_ASC,
        ) {
        items {
          ${CASESTUDYINTRO_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.caseStudyCollection?.items;
  return data;
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getCaseStudyAndNextPost(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      caseStudyCollection(
        where: { slug: "${slug}" }, 
        preview: ${preview ? "true" : "false"}
        , limit: 1
        ) {
        items {
          ${CASESTUDY_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  const next = await fetchGraphQL(
    `query {
      caseStudyCollection(
        where: { slug_not_in: "${slug}" },
        order: title_ASC,
        preview: ${preview ? "true" : "false"},
        limit: 1
        ) {
        items {
          ${CASESTUDY_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    post: extractCS(entry),
    nextPost: extractCSEntries(next),
  };
}

export async function lastUpdatedDate(preview) {
  const query = `
    query {
      caseStudyCollection(
        order: title_ASC,
        preview: ${preview ? "true" : "false"},
        limit: 1
      ) {
        sys {
          updatedAt
        }
        items {
          ${CASESTUDY_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  try {
    const response = await fetchGraphQL(query, preview);
    const data = response.data?.caseStudyCollection.items[0].sys.updatedAt;
    return data;
  } catch (error) {
    console.error("Error fetching case study collection:", error);
    return null;
  }
}

//nextPost: extractCSEntries(entries),
