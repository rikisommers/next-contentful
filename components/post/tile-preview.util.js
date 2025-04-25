"use client"

import React from "react"
import PostTileImg from "./post-tile-img"
import PostTileLg from "./post-tile-lg"
import PostTileCs from "./post-tile-cs"
import PostTileReone from "./post-tile-reone"
import PostTileMonks from "./post-tile-monks"

// Sample post data for previews
const samplePost = {
  title: "Project Title",
  subtitle: "A brief description of the project that showcases its main features and benefits.",
  slug: "project-slug",
  client: "Client Name",
  date: "January 2023",
  tags: ["Web Design", "Development", "UI/UX"],
  color: "var(--accent)",
  img: {
    url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
    width: 800,
    height: 600,
    description: "Project cover image"
  }
}

/**
 * Creates the post tile components object with sample data
 * @returns {Object} - The post tile components object
 */
export const createTileComponents = () => {
  return {
//     standard: {
//       title: "Standard Post Tile",
//       description: "A basic post tile with image, title, subtitle, and tags.",
//       component: <PostTile post={samplePost} index={0} />,
//       code: `<PostTile 
//   post={{
//     title: "Project Title",
//     subtitle: "A brief description of the project",
//     slug: "project-slug",
//     tags: ["Web Design", "Development"],
//     img: {
//       url: "https://example.com/image.jpg",
//       width: 800,
//       height: 600,
//       description: "Project cover image"
//     }
//   }}
//   index={0}
// />`
//     },
    image: {
      title: "Image Post Tile",
      description: "A post tile with animated image reveal on hover.",
      component: <PostTileImg post={samplePost} index={0} />,
      code: `<PostTileImg 
  post={{
    title: "Project Title",
    subtitle: "A brief description of the project",
    slug: "project-slug",
    color: "var(--accent)",
    img: {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
      description: "Project cover image"
    }
  }}
  index={0}
/>`
    },
    large: {
      title: "Large Post Tile",
      description: "A larger post tile with more prominent image and text.",
      component: <PostTileLg post={samplePost} index={0} />,
      code: `<PostTileLg 
  post={{
    title: "Project Title",
    subtitle: "A brief description of the project",
    slug: "project-slug",
    client: "Client Name",
    tags: ["Web Design", "Development"],
    img: {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
      description: "Project cover image"
    }
  }}
  index={0}
/>`
    },
    caseStudy: {
      title: "Case Study Post Tile",
      description: "A post tile optimized for case studies with client information.",
      component: <PostTileCs post={samplePost} index={0} />,
      code: `<PostTileCs 
  post={{
    title: "Project Title",
    subtitle: "A brief description of the project",
    slug: "project-slug",
    client: "Client Name",
    date: "January 2023",
    tags: ["Web Design", "Development"],
    img: {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
      description: "Project cover image"
    }
  }}
  index={0}
/>`
    },
    reone: {
      title: "Reone Post Tile",
      description: "A post tile with Reone-specific styling and layout.",
      component: <PostTileReone post={samplePost} index={0} />,
      code: `<PostTileReone 
  post={{
    title: "Project Title",
    subtitle: "A brief description of the project",
    slug: "project-slug",
    client: "Client Name",
    date: "January 2023",
    tags: ["Web Design", "Development"],
    img: {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
      description: "Project cover image"
    }
  }}
  index={0}
/>`
    },
    monks: {
      title: "Monks Post Tile",
      description: "A post tile with Monks-specific styling and layout.",
      component: <PostTileMonks post={samplePost} index={0} />,
      code: `<PostTileMonks 
  post={{
    title: "Project Title",
    subtitle: "A brief description of the project",
    slug: "project-slug",
    client: "Client Name",
    date: "January 2023",
    tags: ["Web Design", "Development"],
    img: {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
      description: "Project cover image"
    }
  }}
  index={0}
/>`
    },
  }
}