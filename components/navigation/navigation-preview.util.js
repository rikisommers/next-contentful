"use client"

import React from "react"
import NavBar from "./navbar"
import PageNav from "./page-nav"
// Sample post data for previews
const sampleNavbarData =  [
        {
            "slug": "home",
            "title": "port",
            "icon": "Panorama"
        },
        {
            "slug": "work",
            "title": "work",
            "icon": "Intersect"
        },
        {
            "slug": "blog",
            "title": "blog",
            "icon": "Brain"
        },
        {
            "slug": "bio",
            "title": "bio",
            "icon": "Fingerprint"
        },
        {
            "slug": "components",
            "title": "Components",
            "icon": null
        }
    ]

const samplePageNavData = [
    { title: "Overview" },
    { title: "Discovery" },
    { title: "Research" },
    { title: "User Personas" },
    { title: "Journey Mapping" },
    { title: "Wireframing" },
    { title: "Prototyping" },
    { title: "Testing" },
    { title: "Results" },
    { title: "Takeaways" }
  ]

/**
 * Creates the navigation components object with sample data
 * @returns {Object} - The navigation components object
 */
export const createNavComponents = () => {
  return {
    navbar: {
      title: "Navigation Bar",
      description: "A responsive navigation bar with icons and links",
      component: <NavBar data={sampleNavbarData} />,
      code: `<NavBar data={data} />`
    },
    pageNav: {
      title: "UX Case Study Navigation",
      description: "A side navigation component for a UX case study that highlights the current section and expands on hover",
      component: <div className="flex flex-col gap-4 h-[300px]">
        <PageNav content={samplePageNavData} />
      </div>,
      code: `<PageNav content={[
  { title: "Overview" },
  { title: "Discovery" },
  { title: "Research" },
  { title: "User Personas" },
  { title: "Journey Mapping" },
  { title: "Wireframing" },
  { title: "Prototyping" },
  { title: "Testing" },
  { title: "Results" },
  { title: "Takeaways" }
]} />`,
    }
  }
}

// Default export for backward compatibility
export const navComponents = createNavComponents()

