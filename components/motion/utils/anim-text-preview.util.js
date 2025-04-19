"use client"

import React from "react"
import { TextAnimLinear } from "../text-anim-linear"
import { TextAnimBlur } from "../text-anim-blur"
import { TextAnimChar } from "../text-anim-char"
import { TextAnimCode } from "../text-anim-code"
import { TextAnimFigma } from "../text-anim-figma"
import { TextAnimLineFadeIn } from "../text-anim-line-fade"
import { TextAnimLinePosUp } from "../text-anim-line-pos-up"
import { TextAnimNavigators } from "../text-anim-navigators"
import { TextAnimRandom } from "../text-anim-random"
import { TextAnimWordMask } from "../text-anim-word-mask"

// Sample text content for all components
const sampleText = `__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__
__development__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __testing__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg)`

// Default highlight value
const defaultHighlight = "background"

/**
 * Creates the text animation components object with the specified highlight value
 * @param {string} highlight - The highlight style to use for the components
 * @returns {Object} - The text animation components object
 */
export const createTextAnimComponents = (highlight = defaultHighlight) => {
  return {
    linear: {
      title: "Linear Text Animation",
      description: "Text that animates character by character in a linear fashion.",
      component:<h2 className="text-3xl leading-normal text-balance">
<TextAnimLinear content={sampleText} delay={0} highlight={highlight} />
</h2>,
      code: `<TextAnimLinear 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    blur: {
      title: "Blur Text Animation",
      description: "Text that animates with a blur effect.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimBlur content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimBlur 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    //   char: {
    //     title: "Character Text Animation",
    //     description: "Text that animates character by character with a typing effect.",
    //     component: <TextAnimChar content={sampleText} delay={0} />,
    //     code: `<TextAnimChar 
    //   content="A __modular__, __themable__ website template /nfor __Designers__, __Developers__ and __Agencies__."
    //   delay={0}
    // />`
    //   },
    //   code: {
    //     title: "Code Text Animation",
    //     description: "Text that animates like code being typed.",
    //     component: <TextAnimCode content={sampleText} />,
    //     code: `<TextAnimCode 
    //   content="A __modular__, __themable__ website template /nfor __Designers__, __Developers__ and __Agencies__."
    // />`
    //   },
    figma: {
      title: "Figma Text Animation",
      description: "Text that animates with a Figma-like effect.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimFigma content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimFigma 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    lineFade: {
      title: "Line Fade Text Animation",
      description: "Text that animates line by line with a fade effect.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimLineFadeIn content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimLineFadeIn 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    linePosUp: {
      title: "Line Position Up Text Animation",
      description: "Text that animates with lines moving up.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimLinePosUp content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimLinePosUp 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    navigators: {
      title: "Navigators Text Animation",
      description: "Text that animates with a navigator-like effect.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimNavigators content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimNavigators 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    },
    random: {
      title: "Random Text Animation",
      description: "Text that animates with random character effects.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimRandom content={sampleText} /></h2>,
      code: `<TextAnimRandom 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
/>`
    },
    wordMask: {
      title: "Word Mask Text Animation",
      description: "Text that animates with a word mask effect.",
      component: <h2 className="text-3xl leading-normal text-balance"><TextAnimWordMask content={sampleText} delay={0} highlight={highlight} /></h2>,
      code: `<TextAnimWordMask 
  content="__Re*se*arch__ ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
  delay={0}
  highlight={highlight}
/>`
    }
  }
}

// Default export for backward compatibility
export const textAnimComponents = createTextAnimComponents()