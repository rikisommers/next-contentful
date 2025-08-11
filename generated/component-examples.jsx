// Auto-generated file with rendered component examples
import React from 'react';
import GridBasic from '../components/articleList/grid-basic';
import GridBento from '../components/articleList/grid-bento';
import GridThings from '../components/articleList/grid-things';
import ListTextHover from '../components/articleList/list-text-hover';
import ListTextImage from '../components/articleList/list-text-image';
import ListText from '../components/articleList/list-text';
import ButtonMonks from '../components/base/button/button-monks';
import ButtonSwap from '../components/base/button/button-swap';
import ButtonWipe from '../components/base/button/button-wipe';
import Button from '../components/base/button/button';
import BlockCode from '../components/blocks/block-code';
import CursorCta from '../components/cursor/cursor-cta';
import CursorDot from '../components/cursor/cursor-dot';
import CursorGabriel from '../components/cursor/cursor-gabriel';
import CursorImage from '../components/cursor/cursor-image';
import PostTileCs from '../components/tile/post-tile-cs';
import PostTileFunky from '../components/tile/post-tile-funky';
import PostTileHoverText from '../components/tile/post-tile-hovertext';
import PostTileImg from '../components/tile/post-tile-img';
import PostTileMonks from '../components/tile/post-tile-monks';
import PostTileProjects from '../components/tile/post-tile-projects';
import PostTileReone from '../components/tile/post-tile-reone';
import PostTileTextBasic from '../components/tile/post-tile-text';
import { TextAnimBlur } from '../components/motion/text-anim-blur';
import { TextAnimChar } from '../components/motion/text-anim-char';
import { TextAnimCode } from '../components/motion/text-anim-code';
import { TextAnimFigma } from '../components/motion/text-anim-figma';
import { TextAnimLineFadeIn } from '../components/motion/text-anim-line-fade';
import { TextAnimLinePosUp } from '../components/motion/text-anim-line-pos-up';
import { TextAnimLinear } from '../components/motion/text-anim-linear';
import { TextAnimNavigators } from '../components/motion/text-anim-navigators';
import { TextAnimRandom } from '../components/motion/text-anim-random';
import { TextAnimWordMask } from '../components/motion/text-anim-word-mask';
import Link from 'next/link';
import { withDeclarativeAudio } from '../components/audio/audio-trigger';
import PostTile from '../components/tile/post-tile';

// Define button enums
const ButtonType = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TRANSPARENT: 'transparent'
};

const ButtonSound = {
  CLICK: 'click',
  HOVER: 'hover',
  NONE: 'none'
};

// Define HOC components
const AudioPostTile = withDeclarativeAudio(PostTile);

const AudioGridTile = withDeclarativeAudio(({ post, children, ...props }) => (
  <Link href={`/posts/${post.slug}`} {...props}>
    {children}
  </Link>
));

const PostContent = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.subtitle}</p>
  </div>
);

// Create example data
const examplePost = {
  title: "Example Post",
  slug: "example-post",
  subtitle: "Example description"
};

export const exampleComponents = {
  "GridBasic_0": (<GridBasic
data={[
{
title: "Interactive Web App",
subtitle: "Modern React application with seamless user experience",
slug: "interactive-web-app",
color: "#6366f1",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Interactive web application"
}
},
{
title: "E-commerce Platform",
subtitle: "Full-stack shopping experience with modern design",
slug: "ecommerce-platform",
color: "#f59e0b",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "E-commerce platform"
}
},
{
title: "Brand Identity System",
subtitle: "Complete visual identity and brand guidelines",
slug: "brand-identity-system",
color: "#ec4899",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Brand identity system"
}
},
{
title: "Mobile App Design",
subtitle: "Native iOS and Android application interface",
slug: "mobile-app-design",
color: "#10b981",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Mobile app design"
}
},
{
title: "Dashboard Analytics",
subtitle: "Data visualization and business intelligence tool",
slug: "dashboard-analytics",
color: "#8b5cf6",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Dashboard analytics"
}
}
]}
/>),
  "GridBento_0": (<GridBento
data={[
{
title: "Creative Portfolio",
subtitle: "Showcase of artistic and creative projects",
slug: "creative-portfolio",
color: "#f97316",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Creative portfolio"
}
},
{
title: "Tech Startup Landing",
subtitle: "Modern landing page for technology company",
slug: "tech-startup-landing",
color: "#3b82f6",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Tech startup landing"
}
},
{
title: "Restaurant Website",
subtitle: "Elegant dining experience with online reservations",
slug: "restaurant-website",
color: "#dc2626",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Restaurant website"
}
},
{
title: "Fitness App Interface",
subtitle: "Health tracking and workout planning application",
slug: "fitness-app-interface",
color: "#059669",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Fitness app interface"
}
},
{
title: "Financial Dashboard",
subtitle: "Investment tracking and portfolio management",
slug: "financial-dashboard",
color: "#7c3aed",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Financial dashboard"
}
}
]}
/>),
  "GridThings_0": (<GridThings
data={[
{
title: "Digital Art Gallery",
subtitle: "Contemporary digital artwork and installations",
slug: "digital-art-gallery",
color: "#7c2d12",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Digital art gallery"
}
},
{
title: "Product Design System",
subtitle: "Comprehensive design tokens and components",
slug: "product-design-system",
color: "#1e40af",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Product design system"
}
},
{
title: "Gaming Platform UI",
subtitle: "Interactive gaming interface and user experience",
slug: "gaming-platform-ui",
color: "#991b1b",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Gaming platform UI"
}
},
{
title: "SaaS Dashboard Design",
subtitle: "Enterprise software interface and workflow",
slug: "saas-dashboard-design",
color: "#065f46",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "SaaS dashboard design"
}
},
{
title: "Non-Profit Campaign",
subtitle: "Social impact website and donation platform",
slug: "non-profit-campaign",
color: "#7e22ce",
img: {
url: "https://images.ctfassets.net/4v0tb3n9jpvc/6VsWqYUjrhXErXIzbCbqdR/0693ad01ab5d19a8ff2c4acb6b47bd88/kula.png?w=1920&q=75",
width: 800,
height: 600,
description: "Non-profit campaign"
}
}
]}
/>),
  "PostTile_0": (<AudioPostTile
            post={examplePost}
            data-audio-click="beepOn"
            data-audio-hover="plink"
          />),
  "PostTile_1": (<div className="grid">
            <AudioGridTile
              post={examplePost}
              data-audio-click="beepOn"
              data-audio-hover="plink"
            >
              <PostContent post={examplePost} />
            </AudioGridTile>
          </div>),
  "ButtonMonks_0": (<ButtonMonks
label="Discover"
type={ButtonType.DEFAULT}
sound={ButtonSound.CLICK}
/>),
  "ButtonMonks_1": (<ButtonMonks
label="Get Started"
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonMonks_2": (<ButtonMonks
label="Activate"
type={ButtonType.SECONDARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonMonks_3": (<ButtonMonks
label="Close"
type={ButtonType.TRANSPARENT}
sound={ButtonSound.CLICK}
/>),
  "ButtonMonks_4": (<ButtonMonks
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
>
<span>🚀 Launch</span>
</ButtonMonks>),
  "ButtonSwap_0": (<ButtonSwap
label="Default Swap"
type={ButtonType.DEFAULT}
sound={ButtonSound.CLICK}
/>),
  "ButtonSwap_1": (<ButtonSwap
label="Download Now"
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonSwap_2": (<ButtonSwap
label="Learn More"
type={ButtonType.SECONDARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonSwap_3": (<ButtonSwap
label="Cancel"
type={ButtonType.TRANSPARENT}
sound={ButtonSound.CLICK}
/>),
  "ButtonSwap_4": (<ButtonSwap
label="Hover to Swap"
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonWipe_0": (<ButtonWipe
label="Default Wipe"
type={ButtonType.DEFAULT}
sound={ButtonSound.CLICK}
/>),
  "ButtonWipe_1": (<ButtonWipe
label="Submit Form"
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonWipe_2": (<ButtonWipe
label="Enable Feature"
type={ButtonType.SECONDARY}
sound={ButtonSound.CLICK}
/>),
  "ButtonWipe_3": (<ButtonWipe
label="Disable"
type={ButtonType.TRANSPARENT}
sound={ButtonSound.CLICK}
/>),
  "ButtonWipe_4": (<ButtonWipe
label="Learn More"
type={ButtonType.SECONDARY}
sound={ButtonSound.CLICK}
/>),
  "Button_0": (<Button
label="Default Button"
type={ButtonType.DEFAULT}
sound={ButtonSound.CLICK}
/>),
  "Button_1": (<Button
label="Submit Form"
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
/>),
  "Button_2": (<Button
label="Secondary Action"
type={ButtonType.SECONDARY}
sound={ButtonSound.CLICK}
/>),
  "Button_3": (<Button
label="Cancel"
type={ButtonType.TRANSPARENT}
sound={ButtonSound.CLICK}
/>),
  "Button_4": (<Button
type={ButtonType.PRIMARY}
sound={ButtonSound.CLICK}
>
<span>🚀 Launch App</span>
</Button>),
  "BlockCode_0": (<BlockCode
data={{
code: "console.log('Hello World');",
title: "Basic JavaScript",
type: "javascript"
}}
maxHeight={300}
/>),
  "CursorCta_0": (<CursorCta content="Click me" />),
  "CursorCta_1": (<CursorCta content="Example" />),
  "CursorDot_0": (<CursorDot />),
  "CursorDot_1": (<CursorDot content="Example" />),
  "CursorGabriel_0": (<CursorGabriel />),
  "CursorGabriel_1": (<CursorGabriel content="Example" />),
  "CursorImage_0": (<CursorImage />),
  "CursorImage_1": (<CursorImage content="Example" />),
  "TextAnimBlur_0": (<TextAnimBlur
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimChar_0": (<TextAnimChar
content="A __modular__, __themable__ website template for __Designers__, __Developers__ and __Agencies__."
delay={0}
/>),
  "TextAnimCode_0": (<TextAnimCode
content="A __modular__, __themable__ website template for __Designers__, __Developers__ and __Agencies__."
/>),
  "TextAnimFigma_0": (<TextAnimFigma
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimLineFadeIn_0": (<TextAnimLineFadeIn
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimLinePosUp_0": (<TextAnimLinePosUp
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimLinear_0": (<TextAnimLinear
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimNavigators_0": (<TextAnimNavigators
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "TextAnimRandom_0": (<TextAnimRandom
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
/>),
  "TextAnimWordMask_0": (<TextAnimWordMask
content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
delay={0}
highlight="background"
/>),
  "PostTileCs_0": (<PostTileCs
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
aspect="4:3"
/>),
  "PostTileFunky_0": (<PostTileFunky
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
aspect="16:9"
/>),
  "PostTileText_0": (<PostTileTextBasic
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
/>),
  "PostTileImg_0": (<PostTileImg
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
aspect="16:9"
/>),
  "PostTileMonks_0": (<PostTileMonks
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
aspect="16:9"
layout="col"
/>),
  "PostTileProjects_0": (<PostTileTextBasic
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
/>),
  "PostTileReone_0": (<PostTileReone
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
/>),
  "PostTileText_0": (<PostTileTextBasic
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
/>)
};
