"use client"

import React, { Suspense } from "react"
import dynamic from 'next/dynamic'

// Sample post data for previews
const sampleNavbarData = [
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

// Dynamically import specific navbar components with no SSR
const NavBarApplause = dynamic(() => import('./navbar-applause'), { ssr: false })
const NavBarApplauseMain = dynamic(() => import('./navbar-applause-main'), { ssr: false })
const NavBarAwwwards = dynamic(() => import('./navbar-awwwards'), { ssr: false })
const PageNav = dynamic(() => import('./page-nav'), { ssr: false })

/**
 * Creates the navigation components object with sample data
 * @returns {Object} - The navigation components object
 */
export const createNavComponents = () => {
  return {
    navbarApplause: {
      title: "Applause Navigation",
      description: "A responsive navigation bar with hover effects and icons",
      component: (
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
          <NavBarApplause 
            pages={sampleNavbarData} 
            activePage="home"
            currentTheme={{ data: { navPosition: "topCenter" } }}
            handleNavClick={() => {}}
          />
        </Suspense>
      ),
      code: `<NavBarApplause 
  pages={data} 
  activePage="home"
  currentTheme={currentTheme}
  handleNavClick={handleNavClick}
/>`
    },
    navbarApplauseMain: {
      title: "Applause Main Navigation",
      description: "A responsive navigation bar with text/icon swap animations",
      component: (
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
          <NavBarApplauseMain 
            pages={sampleNavbarData} 
            activePage="home"
            currentTheme={{ data: { navPosition: "topCenter" } }}
            handleNavClick={() => {}}
          />
        </Suspense>
      ),
      code: `<NavBarApplauseMain 
  pages={data} 
  activePage="home"
  currentTheme={currentTheme}
  handleNavClick={handleNavClick}
/>`
    },
    navbarAwwwards: {
      title: "Awwwards Navigation",
      description: "A responsive navigation bar with vertical text support",
      component: (
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
          <NavBarAwwwards 
            pages={sampleNavbarData} 
            activePage="home"
            currentTheme={{ data: { navPosition: "topCenter" } }}
            handleNavClick={() => {}}
          />
        </Suspense>
      ),
      code: `<NavBarAwwwards 
  pages={data} 
  activePage="home"
  currentTheme={currentTheme}
  handleNavClick={handleNavClick}
/>`
    },
    pageNav: {
      title: "UX Case Study Navigation",
      description: "A side navigation component for a UX case study that highlights the current section and expands on hover",
      component: (
        <Suspense fallback={<div className="h-[300px] bg-gray-100 animate-pulse" />}>
          <div className="flex flex-col gap-4 h-[300px]">
            <PageNav content={samplePageNavData} />
          </div>
        </Suspense>
      ),
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

// Remove the module-level export that was causing the issue
// export const navComponents = createNavComponents()

