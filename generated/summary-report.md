# Component Examples Summary

Generated on: 2025-08-02T10:23:26.196Z

## Overview
- **Total Components**: 34
- **Categories**: 7
- **Categories**: grid, hoc/audio, buttons, blocks, cursor, animations, tiles

## Components by Category

### Grid (6 components)

#### GridBasic
- **File**: `articleList/grid-basic.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `props` (Object): Component props
  - `props.data` (Array): Array of items to display in the grid
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

#### GridBento
- **File**: `articleList/grid-bento.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `props` (Object): Component props
  - `props.data` (Array): Array of items to display in the bento grid
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

#### GridThings
- **File**: `articleList/grid-things.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `props` (Object): Component props
  - `props.items` (Array): Array of items to display in the gallery
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

#### ListTextHover
- **File**: `articleList/list-text-hover.js`
- **Description**: 
- **Examples**: 0
- **Parameters**:
  - `props` (Object): Component props
  - `props.data` (Array): Array of items to display in the list
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

#### ListTextImage
- **File**: `articleList/list-text-image.js`
- **Description**: 
- **Examples**: 0
- **Parameters**:
  - `props` (Object): Component props
  - `props.data` (Array): Array of items to display in the list
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

#### ListText
- **File**: `articleList/list-text.js`
- **Description**: 
- **Examples**: 0
- **Parameters**:
  - `props` (Object): Component props
  - `props.data` (Array): Array of items to display in the list
  - `props.className` (string): Additional CSS classes
  - `props.style` (Object): Inline styles

### Hoc/audio (1 components)

#### PostTile
- **File**: `audio/audio-trigger.js`
- **Description**: 
- **Examples**: 2
- **Parameters**:
  - `Component` (React.Component): The component to wrap with audio functionality

### Buttons (4 components)

#### ButtonMonks
- **File**: `base/button/button-monks.js`
- **Description**: Advanced button component with Monks-style animations and effects
- **Examples**: 5
- **Parameters**:
  - `props` (Object): Component props
  - `props.label` (string): Button text
  - `props.click` (Function): Click handler function
  - `props.type` (ButtonType): Button style type
  - `props.sound` (ButtonSound): Sound effect type
  - `props.children` (React.ReactNode): Child elements

#### ButtonSwap
- **File**: `base/button/button-swap.js`
- **Description**: Button component with text swap animation on hover
- **Examples**: 5
- **Parameters**:
  - `props` (Object): Component props
  - `props.label` (string): Button text
  - `props.click` (Function): Click handler function
  - `props.type` (ButtonType): Button style type
  - `props.sound` (ButtonSound): Sound effect type

#### ButtonWipe
- **File**: `base/button/button-wipe.js`
- **Description**: Button component with wipe animation effect on hover
- **Examples**: 5
- **Parameters**:
  - `props` (Object): Component props
  - `props.label` (string): Button text
  - `props.click` (Function): Click handler function
  - `props.type` (ButtonType): Button style type
  - `props.sound` (ButtonSound): Sound effect type

#### Button
- **File**: `base/button/button.js`
- **Description**: Basic button component with customizable styling and sound effects
- **Examples**: 5
- **Parameters**:
  - `props` (Object): Component props
  - `props.label` (string): Button text
  - `props.click` (Function): Click handler function
  - `props.type` (ButtonType): Button style type (DEFAULT, PRIMARY, SECONDARY, TRANSPARENT)
  - `props.sound` (ButtonSound): Sound effect type (CLICK, ON, OFF)
  - `props.children` (React.ReactNode): Child elements
  - `props.size` (ButtonSize): Button size (SM, MD, LG)

### Blocks (1 components)

#### BlockCode
- **File**: `blocks/block-code.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `data` (Object): Code block data
  - `data.code` (string): The code content to display
  - `data.title` (string): Optional title for the code block
  - `data.type` (string): Programming language for syntax highlighting (default: "javascript")
  - `data.embedurl` (string): Optional embed URL for iframe
  - `maxHeight` (number): Maximum height in pixels before showing expand button (default: 400)

### Cursor (4 components)

#### CursorCta
- **File**: `cursor/cursor-cta.js`
- **Description**: Call-to-action cursor component with rotation and visibility effects
- **Examples**: 2
- **Parameters**:
  - `props` (Object): Component props
  - `props.content` (string): Text content to display in the cursor

#### CursorDot
- **File**: `cursor/cursor-dot.js`
- **Description**: Animated cursor dot component with smooth spring physics
- **Examples**: 2

#### CursorGabriel
- **File**: `cursor/cursor-gabriel.js`
- **Description**: Advanced cursor component with SVG motion trail inspired by gabrielveres.com
- **Examples**: 2

#### CursorImage
- **File**: `cursor/cursor-image.js`
- **Description**: Large animated cursor image component with fade transitions
- **Examples**: 2

### Animations (10 components)

#### TextAnimBlur
- **File**: `motion/text-anim-blur.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.
  - `[trigger=hover]` (string): What triggers the animation: 'hover', 'inview', or 'custom'.
  - `[onTrigger]` (Function): Custom function to trigger the animation (only used when trigger='custom').
  - `[key]` (string): Key prop passed from parent to force re-render.

#### TextAnimChar
- **File**: `motion/text-anim-char.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.

#### TextAnimCode
- **File**: `motion/text-anim-code.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate.

#### TextAnimFigma
- **File**: `motion/text-anim-figma.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.

#### TextAnimLineFadeIn
- **File**: `motion/text-anim-line-fade.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.

#### TextAnimLinePosUp
- **File**: `motion/text-anim-line-pos-up.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.

#### TextAnimLinear
- **File**: `motion/text-anim-linear.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `delay` (number): The delay in seconds before the animation starts.
  - `highlight` (string): The highlight style to apply to emphasized text.

#### TextAnimNavigators
- **File**: `motion/text-anim-navigators.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.

#### TextAnimRandom
- **File**: `motion/text-anim-random.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate.

#### TextAnimWordMask
- **File**: `motion/text-anim-word-mask.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `content` (string): The text content to animate. Supports markdown-like syntax for bold and italics.
  - `[delay=0]` (number): The delay in seconds before the animation starts.
  - `[highlight=background]` (string): The highlight style to apply to emphasized text.

### Tiles (8 components)

#### PostTileCs
- **File**: `tile/post-tile-cs.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `[aspect]` (string): The aspect ratio of the tile (e.g., 'square', '16/9').

#### PostTileFunky
- **File**: `tile/post-tile-funky.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `[aspect]` (string): The aspect ratio of the tile (e.g., 'square', '16/9').

#### PostTileText
- **File**: `tile/post-tile-hovertext.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `index` (number): The index of the post, used for animation delay.
  - `[size]` (string): The size of the tile.
  - `[layout]` (string): The layout style of the tile.

#### PostTileImg
- **File**: `tile/post-tile-img.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.color` (string): The accent color for the tile.
  - `post.img` (object): The image object for the post.
  - `[aspect]` (string): The aspect ratio of the tile (e.g., 'square', '16/9').

#### PostTileMonks
- **File**: `tile/post-tile-monks.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `[aspect]` (string): The aspect ratio of the tile (e.g., 'square', '16/9').
  - `[layout]` (string): The layout style of the tile.

#### PostTileProjects
- **File**: `tile/post-tile-projects.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `index` (number): The index of the post, used for animation delay.
  - `[size]` (string): The size of the tile.
  - `[layout]` (string): The layout style of the tile.

#### PostTileReone
- **File**: `tile/post-tile-reone.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `index` (number): The index of the post, used for animation delay.
  - `[size]` (string): The size of the tile.
  - `[layout]` (string): The layout style of the tile.

#### PostTileText
- **File**: `tile/post-tile-text.js`
- **Description**: 
- **Examples**: 1
- **Parameters**:
  - `post` (object): The post data object.
  - `post.title` (string): The title of the post.
  - `post.subtitle` (string): The subtitle of the post.
  - `post.slug` (string): The slug for the post URL.
  - `post.client` (string): The client name for the project.
  - `post.date` (string): The date of the project.
  - `post.tags` (array): An array of tags for the post.
  - `post.img` (object): The image object for the post.
  - `index` (number): The index of the post, used for animation delay.
  - `[size]` (string): The size of the tile.
  - `[layout]` (string): The layout style of the tile.

