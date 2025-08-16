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

const HOME_GRAPHQL_FIELDS = `
    title
    intro
    image{
    url
    }
    titlealt
    contentalt
    content{
      json
    }
  sys {
    id
    publishedAt
  }
`;


const LANDING_GRAPHQL_FIELDS = `
    slug
    contentfulMetadata {
      tags {
        id
        name
      }
    }
    sys {
      id
      publishedAt
    }
    csblocksCollection(limit:4){
     items{
     __typename
      ... on BlockArticles {
        title
        description
        type
        filter
        articlesCollection(limit:6){
          items{
          __typename
            ... on CaseStudy {
              color
              slug
              title
              subtitle
              client
              tags
              img{
                url
              }
            }
          }
        }
      }
       __typename
        ... on BlockArticle {
        title
        contentRich {
          json
        }
      }
      __typename
        ... on BlockList {
        title
        content
        type
        itemsCollection(limit:10){
          items{
            title
            number
            content
          }
        }
      }
       __typename
        ... on BlockCode {
        title
        type
        code
      } 
      __typename
        ... on BlockHeader {
        title
        content
        type
        primaryPageHeader
      }
          __typename
  ... on BlockImage {
      title
      image{
        url
      }
    }
      __typename
        ... on BlockPreview {
        title
      }
      __typename
        ... on BlockQuote{
        title
        content
        author
        authorImage{
        url
        }
        callToAction{
          title
          slug
        }
      }
      __typename
      ... on BlockImages {
      title
      layout
      maxCols
      imagesCollection(limit:4){ 
        items{
          url
        }
      }
    }
      __typename
        ... on BlockHero {
        title
        intro
        tag
        content
        image{
          title
          url
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


const FOOTER_GRAPHQL_FIELDS = `
title
content
cta
ctalink
address
phone
email
privacypolicy
cookiespolicy
socialCollection{
  items{
    title
    url
    icon{
      url
    }
  }
}
`;



const GLOBAL_GRAPHQL_FIELDS = `
sitetitle
loadingText
currentTheme
text
logo{
  title  
  url
}
menuCollection(limit:10){
  items{
    slug
    title
    icon
  }
}
`;

// contentalt
// description
// client
// duration
// role
// intro{
//   json
// }
//titlealt
const POST_GRAPHQL_FIELDS = `
slug
title
subtitle
color
protected
tags
img {
  title
  url
  description
}
csblocksCollection(limit:16){
  items{
   __typename
  ... on BlockHeader {
    title
    content
       type
      }
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
  ... on BlockImages {
      title
      layout
      maxCols
      imagesCollection(limit:4){ 
        items{
          url
        }
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
    callToAction{
      title
      slug
    }
      }
      __typename
         ... on BlockEmbed {
    title
    url
    caption
      }
          __typename
     ... on BlockCode {
    title
    type
    code
    embedurl
  } 
   __typename
     ... on BlockList {
    title
    content
    type
    itemsCollection(limit:5){
     items{
          title
          number
          content
      }
    }
  } 
    __typename
    ... on BlockIntro {
      client
      overview
      duration
      role
    } 
    __typename
    ... on BlockHero {
      title
      intro
      content
      image{
        title
        url
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
  sys{id}
  name
  data
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${preview
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

export async function getHomePage(slug) {
  const query = `query {
    homeCollection(where: { 
      slug: "${slug}", 
        contentfulMetadata: {
          tags: {
            id_contains_some: ["${process.env.SPACE}"]
          }
        }
      }) {
      items {
        ${HOME_GRAPHQL_FIELDS}
      }
    }
  }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.homeCollection?.items[0];
  return data;
} 


export async function getLandingPage(slug) {
  console.log("Current SPACE value:", process.env.SPACE);

  // Build the where clause based on whether SPACE is defined
  const spaceFilter = process.env.SPACE 
    ? `, contentfulMetadata: { tags: { id_contains_some: ["${process.env.SPACE}"] } }`
    : '';

  const query = `query {
    homeCollection(where: { 
        slug: "${slug}"${spaceFilter}
      }) {
      items {
        ${LANDING_GRAPHQL_FIELDS}
      }
    }
  }`;

  try {
    const response = await fetchGraphQL(query);
    const data = response.data?.homeCollection?.items[0];
    
    if (!data) {
      console.warn('No data found for slug:', slug, 'with space:', process.env.SPACE);
    }
    
    return data || null;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export async function getPages() {
  const query = `query {
      homeCollection(where: { type: "home" }) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`;
  const response = await fetchGraphQL(query);
  const data = response.data?.pageCollection?.items[0];
  return data;
}

export async function getHomeCollection() {
  const query = `query {
    homeCollection(where: { type: "home" }, order: "order_ASC") {
      items {
        sys {
          id
        }
        title
        slug
        order
      }
    }
  }`;
  const response = await fetchGraphQL(query);
  return response.data?.homeCollection;
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

export async function getAllImages(preview = false, space) {
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

export async function getAllHomePageSlugs() {
  const query = `query {
   homeCollection(where: {
      contentfulMetadata: {
        tags: {
          id_contains_some: ["${process.env.SPACE}"]
        }
      }
   }) {
      items {
        slug
        title
      }
    }
  }`;

  const response = await fetchGraphQL(query);
  const slugs = response.data?.homeCollection?.items;
  console.log('ssslugzzz',slugs)
  return slugs;
}

export async function getAllCaseStudies(preview = false) {
  const query = `
      query {
        caseStudyCollection(
          where : { type_contains_all : "casestudy" },
          limit: 10
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


export async function getGlobal(preview = false) {
  const query = `
      query {
          footerCollection(limit:1){
            items{
              ${FOOTER_GRAPHQL_FIELDS}  
            }
          }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.footerCollection?.items[0];
  return data;
}

export async function getFooter(preview = false) {
  const query = `
      query {
        footerCollection(limit:1){
            items{
              ${FOOTER_GRAPHQL_FIELDS}  
            }
          }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.footerCollection?.items[0];
  return data;
}

export async function getLoading(preview = false) {
  const query = `
      query {
        settingsCollection(
            where:{
              contentfulMetadata: {
                tags: {
                  id_contains_some: ["${process.env.SPACE}"]
                }
              }
            }
            limit:1){
            items{
              ${GLOBAL_GRAPHQL_FIELDS}  
            }
          }
      }
    `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.settingsCollection?.items[0];
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
  // Extract all tags from the data
  const allTags = [...new Set(data.flatMap(item => item.tags || []))];

  return { posts: data, tags: allTags };

}

export async function getAllBlogTags(preview = false) {
  const query = `query {
      caseStudyCollection( 
        where : { blog : true }
        preview: ${preview},
        order: title_ASC,
        ) {
        items {
          tags
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const items = response.data?.caseStudyCollection?.items;

  const tags = items
    ?.flatMap(item => item.tags)
    .filter((tag, index, self) => self.indexOf(tag) === index);

  return tags;
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

export async function getThemes(preview = false) {
  const query = `
    query {
      themeCollection(
        limit: 10) {
          items {
            sys {
              id
            }
            ${THEME_GRAPHQL_FIELDS}
          }
        }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  const data = response.data?.themeCollection?.items;
  return data;
}
