/**
 * Default theme content values and sound/shader/helper definitions
 * @module utils/themes/config/defaults
 */

import {
  textHighlightThemes,
  textAnimationThemes,
  typographyThemes,
  fontScaleThemes,
  fluidFontSizeThemes,
  pageTransitionThemes,
  pageWidthThemes,
  cursorThemes,
  cardThemes,
  cardHoverThemes,
  cardAspectRatio,
  gridLayoutThemes,
  listLayoutThemes,
  imageTextureThemes,
  imageTextureContrastThemes,
  mixBlendThemes,
  navigationStyleThemes,
  navigationThemes,
  navigationTextStyleThemes,
  navigationPositionThemes,
  navigationOptions,
  logoStyle,
  logoBackground,
  footerOptions,
  heroBackgroundThemes,
  heroShaderEffectThemes,
  heroCssGradientThemes,
  heroLabelTheme,
  heroTextPositionThemes,
  heroGradThemes,
  heroTextImageThemes,
  shadowThemes,
  borderRadiusThemes,
  textAlignThemes,
  bodyTextAlign,
  bodyTextThemes,
  shaderEffect,
} from './options';

export const sounds = {
  click: 'click',
  beepOn: 'beepOn',
  beepOff: 'beepOff',
  plink: 'plink',
  drip: 'drip',
  marimba: 'marimba',
} 

// export const soundTriggers = {
//   init: 'init',
//   internalLinkHover: 'internalLinkHover',
//   primaryButton: 'primaryButton',
//   secondaryButton: 'secondaryButton',
//   internalLink: 'internalLink',
//   externalLink: 'externalLink',
//   pageTransitionStart: 'pageTransitionStart',
//   pageTransitionEnd: 'pageTransitionEnd',
//   modalOpen: 'modalOpen',
//   modalClose: 'modalClose',
// }

export const themeContent = {
  audioEnabled:true,
  audioVolume:0.5,
  audioInit:sounds.click,
  audioInternalLinkHover:sounds.click,
  audioPrimaryButton:sounds.click,
  audioSecondaryButton:sounds.click,
  audioInternalLink:sounds.click,
  audioExternalLink:sounds.click,
  audioPageTransitionStart:sounds.click,
  audioPageTransitionEnd:sounds.click,
  audioModalOpen:sounds.click,
  audioModalClose:sounds.click,

  fontFamilyPrimary:typographyThemes.sans,
  fontFamilySecondary:typographyThemes.sans,
  fontScale:fontScaleThemes.fluid,
  fluidFontSizeMin: fluidFontSizeThemes.fontSizeMin,
  fluidFontSizeMax: fluidFontSizeThemes.fontSizeMax,
  fluidFontRatioMin: fluidFontSizeThemes.fontRatioMin,
  fluidFontRatioMax: fluidFontSizeThemes.fontRatioMax,
  fluidFontWidthMin: fluidFontSizeThemes.fontWidthMin,
  fluidFontWidthMax: fluidFontSizeThemes.fontWidthMax,
  fluidVariableUnit: fluidFontSizeThemes.variableUnit,
  bodyTextIndent: bodyTextThemes.indent,
  bodyTextHightlight: bodyTextThemes.hightlight,
  bodyTextAlign:bodyTextAlign.center,

  textHighlight:textHighlightThemes.text,
  textAnimation:textAnimationThemes.navigators,
  textAnimationSec:textAnimationThemes.none,

  pageTransition:pageTransitionThemes.fade,
  pageWidth:pageWidthThemes.fluid,
  cursor:cursorThemes.none,

  cardLayout:cardThemes.reone,

  cardHover:cardHoverThemes.none,
  cardAspectRatio:cardAspectRatio.square,
  gridType:gridLayoutThemes.gridBasic,
  listType:listLayoutThemes.textList,
  gridColumnsSm: 1,
  gridColumnsMd: 2,
  gridColumnsLg: 2,
  gridColumnsXl: 2,
  gridGap: "md",
  imageParallax:false,
  imageTexture:imageTextureThemes.none,
  imageTextureContrast:imageTextureContrastThemes.contrast,
  imageTextureBrightness:imageTextureContrastThemes.brightness,
  imageTextureOpacity:imageTextureContrastThemes.opacity,
  imageMixBlendMode:mixBlendThemes.luminosity,

  headerHeight:50,
  headerTextAlign:'left',
  headerSubtextAlign:'left',
  
  heroHeight: 100,
  heroLabelTheme:heroLabelTheme.text,
  heroTextAlign:'left',
  heroSubtextAlign:'left',
  heroShowSubtext:true,

  heroTextPosition:heroTextPositionThemes[60], // '5-0' middle-left  
  heroSubTextPosition:heroTextPositionThemes[84], // '7-0' lower-left
  heroTextColSpanDefault: 12, // Full width on small devices
  heroTextColSpanLg: 8, // 8 columns on large devices
  heroSubTextColSpanDefault: 12, // Full width on small devices  
  heroSubTextColSpanLg: 6, // 6 columns on large devices
  // Hero Text Position - Responsive breakpoints
  heroTextPositionSm: heroTextPositionThemes[60], // '5-0' middle-left for small screens
  heroTextPositionMd: heroTextPositionThemes[60], // '5-0' middle-left for medium screens
  heroTextPositionLg: heroTextPositionThemes[60], // '5-0' middle-left for large screens
  heroTextPositionXl: heroTextPositionThemes[60], // '5-0' middle-left for extra large screens
  // Hero Text Column Span - Responsive breakpoints
  heroTextColSpanSm: 10, // Full width on small screens
  heroTextColSpanMd: 10, // 10 columns on medium screens
  heroTextColSpanLg: 6,  // 8 columns on large screens
  heroTextColSpanXl: 6,  // 8 columns on extra large screens
  // Hero Text Row Span - Responsive breakpoints
  heroTextRowSpanSm: 1, // 1 row on small screens
  heroTextRowSpanMd: 1, // 1 row on medium screens
  heroTextRowSpanLg: 1, // 1 row on large screens
  heroTextRowSpanXl: 1, // 1 row on extra large screens
  // Hero Subtext Position - Responsive breakpoints
  heroSubTextPositionSm: heroTextPositionThemes[84], // '7-0' lower-left for small screens
  heroSubTextPositionMd: heroTextPositionThemes[84], // '7-0' lower-left for medium screens
  heroSubTextPositionLg: heroTextPositionThemes[84], // '7-0' lower-left for large screens
  heroSubTextPositionXl: heroTextPositionThemes[84], // '7-0' lower-left for extra large screens
  // Hero Subtext Column Span - Responsive breakpoints
  heroSubTextColSpanSm: 12, // Full width on small screens
  heroSubTextColSpanMd: 8,  // 8 columns on medium screens
  heroSubTextColSpanLg: 6,  // 6 columns on large screens
  heroSubTextColSpanXl: 6,  // 6 columns on extra large screens
  // Hero Subtext Row Span - Responsive breakpoints
  heroSubTextRowSpanSm: 1, // 1 row on small screens
  heroSubTextRowSpanMd: 1, // 1 row on medium screens
  heroSubTextRowSpanLg: 1, // 1 row on large screens
  heroSubTextRowSpanXl: 1, // 1 row on extra large screens

  // Hero Background Position - Responsive breakpoints
  heroBgPositionSm: heroTextPositionThemes[0], // '0-0' top-left for small screens
  heroBgPositionMd: heroTextPositionThemes[0], // '0-0' top-left for medium screens
  heroBgPositionLg: heroTextPositionThemes[0], // '0-0' top-left for large screens
  heroBgPositionXl: heroTextPositionThemes[0], // '0-0' top-left for extra large screens

  // Hero Background Column Span - Responsive breakpoints
  heroBgColSpanSm: 12, // Full width on small screens
  heroBgColSpanMd: 12, // Full width on medium screens
  heroBgColSpanLg: 12, // Full width on large screens
  heroBgColSpanXl: 12, // Full width on extra large screens

  // Hero Background Row Span - Responsive breakpoints
  heroBgRowSpanSm: 12, // Full height on small screens
  heroBgRowSpanMd: 12, // Full height on medium screens
  heroBgRowSpanLg: 12, // Full height on large screens
  heroBgRowSpanXl: 12, // Full height on extra large screens

heroBgShadow:shadowThemes.none,
heroBgBorderRadius:borderRadiusThemes.none,


  heroGradMidPoint:heroGradThemes.gradMidPoint,
  heroCssGradient:heroCssGradientThemes.linear,
  heroCssGradientAngle:'90',
  heroCssGradientRadialPosition: { x: 50, y: 50 }, // Center position as x,y percentages
  heroBackground:heroBackgroundThemes.cssGradient,
  heroShaderEffect: shaderEffect.blueNoise, // Default shader type (legacy, use effectVariant)
  
  // Effect Selection
  effectType: 'none',
  effectVariant: heroShaderEffectThemes.none,
  
  // ASCII Effect Controls
  asciiPixelSize: 12,
  asciiShowBackground: false,
  asciiContrast: 100,
  
  // Dithering Effect Controls
  ditherCellSize: 1,
  ditherColorLevels: 4,
  ditherContrast: 100,
  ditherInverted: false,
  
  // Halftone Effect Controls
  halftoneDotSize: 8,
  halftoneAngle: 45,
  halftoneContrast: 100,
  halftoneSpread: 50,
  halftoneShape: 'circle',
  halftoneColorMode: 'mono',
  halftoneInverted: false,

  // Canvas Camera Controls
  canvasCameraPositionX: 0,    // Camera X position
  canvasCameraPositionY: 1.5,  // Camera Y position
  canvasCameraPositionZ: 3,    // Camera Z position
  canvasCameraFov: 75,         // Field of view
  canvasOrbitControlsEnabled: true, // Enable orbit controls

  // Canvas Geometry Controls
  canvasPlaneWidth: 10,        // Plane width
  canvasPlaneHeight: 10,       // Plane height
  canvasPlaneWidthSegments: 60,  // Plane width segments
  canvasPlaneHeightSegments: 60, // Plane height segments
  canvasSphereRadius: 10,      // Sphere radius
  canvasSphereWidthSegments: 64,  // Sphere width segments (longitude)
  canvasSphereHeightSegments: 64, // Sphere height segments (latitude)
  canvasPerlinBlobRadius: 2,      // Perlin blob radius
  canvasPerlinBlobWidthSegments: 6,  // Perlin blob width segments (detail level)
  canvasPerlinBlobHeightSegments: 6, // Perlin blob height segments (detail level)
  canvasExpSphereRadius: 8,    // Experience sphere radius
  canvasExpSphereWidthSegments: 32,  // Experience sphere width segments
  canvasExpSphereHeightSegments: 32, // Experience sphere height segments

  // Effect size controls
  halftoneSize: 6.0,
  asciiSize: 12.0,
  ditherLevels: 4,
  ditherSize: 4,
  pixelationSize: 8.0,
  noiseIntensity: 0.1,

  heroTextAlign:textAlignThemes.left,
  headerTextAlign:textAlignThemes.left,
  // Header Text Position - Responsive breakpoints
  headerTextPositionSm: '0-0', // Top-left default for small screens
  headerTextPositionMd: '0-0', // Top-left default for medium screens
  headerTextPositionLg: '0-0', // Top-left default for large screens
  headerTextPositionXl: '0-0', // Top-left default for extra large screens
  // Header Text Column Span - Responsive breakpoints
  headerTextColSpanSm: 12, // Full width on small screens
  headerTextColSpanMd: 8,  // 8 columns on medium screens
  headerTextColSpanLg: 6,  // 6 columns on large screens
  headerTextColSpanXl: 6,  // 6 columns on extra large screens
  blockquoteTextAlign:textAlignThemes.left,
  heroSubTextAlign:textAlignThemes.left,
  heroTextImage:heroTextImageThemes.none,

  navPosition:navigationPositionThemes.topCenter,
  navStyle:navigationStyleThemes.applause,
  navTheme:navigationThemes.awwwardsGlass,
  navTextStyle:navigationTextStyleThemes.icons,
  navLayoutPosition: navigationOptions.position.fixed,
  
  navBorder: navigationOptions.bordered,
  navLabelDisplay:navigationOptions.labelDisplay.text,
  navShadow: false,
  navShadowColor: navigationOptions.shadowColor.default,
  navShadowSize:navigationOptions.shadowSize.sm,
  
  logoBackground:logoBackground.transparent,
  logoStyle:logoStyle.image,

  footerPosition: footerOptions.position.none,
  bodyTextDropCap: bodyTextThemes.dropCap,

  // shaderMesh: false,
  // pixelDensity: 20.0, // Default pixel density
  // halftoneSize: 8.0, // Default halftone size
  // halftoneShape: "circle", // Default halftone shape
  // halftoneInvert: false, // Default halftone invert
  // dotScale: 0.6, // Default dot scale
  // surfaceTexture: surfaceTexture.color
}
