# Component Inventory - Source Analysis

Based on audit of `/Users/user/Dev/cms-contentful-app/components/`, here are the components to be converted:

## Base Components (Foundation)
### Buttons
- `base/button/button.js` → `aw-button`
- `base/button/button-monks.js` → `aw-button-monks`
- `base/button/button-swap.js` → `aw-button-swap`
- `base/button/button-wipe.js` → `aw-button-wipe`

### Form Components
- `base/form/TextInput.js` → `aw-text-input`
- `base/form/checkbox-input.js` → `aw-checkbox`
- `base/form/color-input.js` → `aw-color-input`
- `base/form/position-input.js` → `aw-position-input`
- `base/form/rotary-input.js` → `aw-rotary-input`
- `base/form/select-input.js` → `aw-select`
- `base/form/slider-input.js` → `aw-slider`

### Modal & Theme
- `base/modal.js` → `aw-modal`
- `base/theme-modal.js` → `aw-theme-modal`
- `base/theme-trigger/index.js` → `aw-theme-trigger`
- `base/close.js` → `aw-close-button`
- `base/ctx-menu.js` → `aw-context-menu`

### Glass Effect
- `base/glass/glass-element.tsx` → `aw-glass-element`

## Layout & Structure Components
### Blocks
- `blocks/block-header.js` → `aw-block-header`
- `blocks/block-footer.js` → `aw-block-footer`
- `blocks/block-hero.js` → `aw-block-hero`
- `blocks/block-intro.js` → `aw-block-intro`
- `blocks/block-article.js` → `aw-block-article`
- `blocks/block-articles.js` → `aw-block-articles`
- `blocks/block-quote.js` → `aw-block-quote`
- `blocks/block-code.js` → `aw-block-code`
- `blocks/block-list.js` → `aw-block-list`
- `blocks/block-tags.js` → `aw-block-tags`
- `blocks/block-video.js` → `aw-block-video`
- `blocks/block-embed.js` → `aw-block-embed`
- `blocks/block-img.js` → `aw-block-image`
- `blocks/block-images.js` → `aw-block-images`
- `blocks/block-hotspot-image.js` → `aw-block-hotspot-image`

### Grid & Layout
- `grid/basic.js` → `aw-grid`
- `articleList/grid-basic.js` → `aw-article-grid-basic`
- `articleList/grid-bento.js` → `aw-article-grid-bento`
- `articleList/grid-jonas.js` → `aw-article-grid-jonas`

## Navigation Components
- `navigation/navbar.js` → `aw-navbar`
- `navigation/navbar-awwwards.js` → `aw-navbar-awwwards`
- `navigation/navbar-awwwards2.js` → `aw-navbar-awwwards-v2`
- `navigation/navbar-awwwards-glass.js` → `aw-navbar-glass`
- `navigation/primary-navigation.js` → `aw-primary-nav`
- `navigation/menu.js` → `aw-menu`
- `navigation/page-nav.js` → `aw-page-nav`
- `navigation/logo.js` → `aw-logo`
- `navigation/logotype.js` → `aw-logotype`

## Content Components
### Article Lists
- `articleList/articles-list-stack.js` → `aw-articles-stack`
- `articleList/list-text.js` → `aw-article-list-text`
- `articleList/list-text-hover.js` → `aw-article-list-hover`
- `articleList/list-text-image.js` → `aw-article-list-image`

### Post Components
- `post/post-header.js` → `aw-post-header`
- `post/post-intro.js` → `aw-post-intro`
- `post/post-body.js` → `aw-post-body`
- `post/post-content.js` → `aw-post-content`
- `post/post-details.js` → `aw-post-details`
- `post/post-modal.js` → `aw-post-modal`
- `post/post-next.js` → `aw-post-next`

### Tiles
- `tile/post-tile.js` → `aw-post-tile`
- `tile/post-tile-img.js` → `aw-post-tile-image`
- `tile/post-tile-text.js` → `aw-post-tile-text`
- `tile/post-tile-cs.js` → `aw-post-tile-cs`
- `tile/post-tile-funky.js` → `aw-post-tile-funky`
- `tile/post-tile-hovertext.js` → `aw-post-tile-hover`

## Media Components
### Images
- `image/content-image.js` → `aw-content-image`
- `image/contentful-image.js` → `aw-contentful-image`
- `image/cover-image.js` → `aw-cover-image`
- `image/blend-image.js` → `aw-blend-image`
- `image/textured-image.js` → `aw-textured-image`
- `image/image-modal.js` → `aw-image-modal`

### Audio
- `audio/audio-trigger.js` → `aw-audio-trigger`

## Animation & Motion Components
### Text Animations
- `motion/animated-text.js` → `aw-animated-text`
- `motion/text-animation.js` → `aw-text-animation`
- `motion/text-anim-blur.js` → `aw-text-blur`
- `motion/text-anim-char.js` → `aw-text-char-anim`
- `motion/text-anim-code.js` → `aw-text-code-anim`
- `motion/text-anim-figma.js` → `aw-text-figma-anim`
- `motion/text-anim-line-up.js` → `aw-text-line-up`
- `motion/text-anim-word-mask.js` → `aw-text-word-mask`
- `motion/text-rotating.js` → `aw-text-rotating`
- `motion/text-scamble.js` → `aw-text-scramble`

### Element Animations
- `motion/animated-element.js` → `aw-animated-element`
- `motion/scale-container.js` → `aw-scale-container`
- `motion/clippath-container.js` → `aw-clippath-container`
- `motion/clippath-element.js` → `aw-clippath-element`
- `motion/paralax-element.js` → `aw-parallax-element`

## Interactive Components
### Cursors
- `cursor/cursor.js` → `aw-cursor`
- `cursor/cursor-dot.js` → `aw-cursor-dot`
- `cursor/cursor-cta.js` → `aw-cursor-cta`
- `cursor/cursor-image.js` → `aw-cursor-image`
- `cursor/cursor-gabriel.js` → `aw-cursor-gabriel`

## Background & Canvas Components
### Canvas Effects
- `background/canvasAnimatedGradient.js` → `aw-canvas-animated-gradient`
- `background/canvasGradientBackground.js` → `aw-canvas-gradient-bg`
- `background/canvasImageComponent.js` → `aw-canvas-image`
- `background/background.js` → `aw-background`
- `background/background-container.js` → `aw-background-container`
- `background/texture-container.js` → `aw-texture-container`

### Shader Components (Three.js Integration)
- `background/shaders/` → Various `aw-shader-*` components

## Transition Components
- `transition/pageTransition.js` → `aw-page-transition`
- `transition/transition-fade.js` → `aw-transition-fade`
- `transition/transition-wipe.js` → `aw-transition-wipe`
- `transition/transition-tilt.js` → `aw-transition-tilt`

## Security Components
- `security/password-dialog.js` → `aw-password-dialog`
- `security/password-page.js` → `aw-password-page`

## Rich Text Components
- `rich-text/rich-text.js` → `aw-rich-text`
- `rich-text/rich-text-asset.js` → `aw-rich-text-asset`

## Priority for Development

### Phase 1 (Critical Base Components) - 15 components
1. `aw-button`
2. `aw-text-input`
3. `aw-checkbox`
4. `aw-select`
5. `aw-modal`
6. `aw-navbar`
7. `aw-logo`
8. `aw-block-header`
9. `aw-block-footer`
10. `aw-content-image`
11. `aw-animated-text`
12. `aw-cursor`
13. `aw-background`
14. `aw-grid`
15. `aw-post-tile`

### Phase 2 (Extended Components) - 25 components
Advanced layout, specialized animations, canvas effects

### Phase 3 (Specialized Components) - Remaining components
Complex interactions, shaders, advanced animations

## Vanilla JS Libraries Required
- `@motionone/dom` - For all motion/animation components
- `three.js` - For background shaders and 3D effects
- `gsap` - For complex animations (if used in source)
- Custom vanilla utilities for scroll, intersection, etc.