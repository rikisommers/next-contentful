import {
  pageWidthThemes,
  cursorThemes,
  pageTransitionThemes,
  gridLayoutThemes,
  listLayoutThemes,
  gridColumns,
  gridGap,
  textAnimationThemes,
  typographyThemes,
  fontScaleThemes,
  textHighlightThemes,
  bodyTextAlign,
  footerOptions,
  navigationPositionThemes,
  navigationStyleThemes,
  navigationThemes,
  navigationOptions,
  heroBackgroundThemes,
  heroShaderEffectThemes,
  heroCssGradientThemes,
  heroCssGradientRadialPositionThemes,
  heroTextImageThemes,
  heroTextPositionThemes,
  heroTextColSpanThemes,
  heroTextColSpanLgThemes,
  headerTextPositionThemes,
  headerTextColSpanThemes,
  textAlignThemes,
  cardThemes,
  cardHoverThemes,
  cardAspectRatio,
  mixBlendThemes,
  imageTextureThemes,
  surfaceTexture,
  logoStyle,
  logoBackground,
  sounds,
  shaderEffect,
} from "./theme";


// audioInit: soundThemes.default,
// audioInternalLinkHover: typographyThemes.sans,
// audioPrimaryButton: soundThemes.default,
// audioSecondaryButton: soundThemes.default,
// audioInternalLink: soundThemes.default,
// audioExternalLink: soundThemes.default,
// audioPageTransitionStart: soundThemes.default,
// audioPageTransitionEnd: soundThemes.default,
// audioModalOpen: soundThemes.default,
// audioModalClose: soundThemes.default,

export const themeControlConfig = {
  Audio: {
    audioEnabled: { type: "boolean", label: "Audio" },
    audioVolume: { type: "slider", label: "Volume", min: 0, max: 1, step: 0.1 },
    audioInit: { type: "select", label: "Init", options: sounds },
    audioInternalLinkHover: { type: "select", label: "Internal Link Hover", options: sounds },
    audioPrimaryButton: { type: "select", label: "Primary Button", options: sounds },
    audioSecondaryButton: { type: "select", label: "Secondary Button", options: sounds },
    audioInternalLink: { type: "select", label: "Primary Link", options: sounds },
    audioExternalLink: { type: "select", label: "Secondary Link", options: sounds },
    audioPageTransitionStart: { type: "select", label: "Page Transition Start", options: sounds },
    audioPageTransitionEnd: { type: "select", label: "Page Transition End", options: sounds },
    audioModalOpen: { type: "select", label: "Modal Open", options: sounds },
    audioModalClose: { type: "select", label: "Modal Close", options: sounds },
  },
  Globals: {
    pageWidth: { type: "select", label: "Page Width", options: pageWidthThemes },
    pageTransition: { type: "select", label: "Page Transition", options: pageTransitionThemes },
    cursor: { type: "select", label: "Cursor", options: cursorThemes },
    pageClipContainer: {type: "boolean", label: "Page content clip container" }
  },
  Typography: {
    fontFamilyPrimary: { type: "select", label: "Font Family Primary", options: typographyThemes },
    fontFamilySecondary: { type: "select", label: "Font Family Secondary", options: typographyThemes },
    fontScale: { type: "select", label: "Scale", options: fontScaleThemes },
    fluidFontRatioMax: { type: "slider", label: "Fluid Max", min: 0, max: 1.3, step: 0.01 },
    fluidFontRatioMin: { type: "slider", label: "Fluid Min", min: 0, max: 1.3, step: 0.01 },
    headerTextAlign: { type: "select", label: "Header Align", options: textAlignThemes },
    blockquoteTextAlign: { type: "select", label: "Blockquote Align", options: textAlignThemes },
    bodyTextDropCap: { type: "boolean", label: "Drop Cap" },
    bodyTextIndent: { type: "boolean", label: "Indent" },
    bodyTextHighlight: { type: "select", label: "Highlight", options: textHighlightThemes },
    bodyTextAlign: { type: "select", label: "Align", options: bodyTextAlign }
  },
  TypographyAnimation: {
    textAnimation: { type: "select", label: "Text Animation", options: textAnimationThemes },
    textAnimationSec: { type: "select", label: "Text Anim Sec", options: textAnimationThemes },
    textHighlight: { type: "select", label: "Text Highlight", options: textHighlightThemes },
  },
  Header: {
    headerHeight: { type: "slider", label: "Height (vh)", min: 10, max: 100, step: 5 },
    headerTextAlign: { type: "select", label: "Text Align", options: textAlignThemes },
  },
  HeaderTextPosition: {
    // Text Position - Responsive
    headerTextPositionSm: { type: "position", label: "Text Position Sm", options: headerTextPositionThemes },
    headerTextPositionMd: { type: "position", label: "Text Position Md", options: headerTextPositionThemes },
    headerTextPositionLg: { type: "position", label: "Text Position Lg", options: headerTextPositionThemes },
    headerTextPositionXl: { type: "position", label: "Text Position Xl", options: headerTextPositionThemes },

    // Text Column Span - Responsive
    headerTextColSpanSm: { type: "select", label: "Text Col Span Sm", options: headerTextColSpanThemes },
    headerTextColSpanMd: { type: "select", label: "Text Col Span Md", options: headerTextColSpanThemes },
    headerTextColSpanLg: { type: "select", label: "Text Col Span Lg", options: headerTextColSpanThemes },
    headerTextColSpanXl: { type: "select", label: "Text Col Span Xl", options: headerTextColSpanThemes },
  },
  Hero: {
    heroHeight: { type: "slider", label: "Height (vh)", min: 10, max: 100, step: 5 },
    heroTextImage: { type: "select", label: "Images", options: heroTextImageThemes },
    heroBackground: { type: "select", label: "Bg", options: heroBackgroundThemes },
    // Text Alignment Controls
    heroTextAlign: { type: "select", label: "Text Align", options: textAlignThemes },
    heroSubTextAlign: { type: "select", label: "Subtext Align", options: textAlignThemes },
    // CSS Gradient Controls
    heroCssGradient: { type: "select", label: "CSS Gradient Type", options: heroCssGradientThemes },
    heroCssGradientAngle: { type: "slider", label: "CSS Gradient Angle", min: 0, max: 180, step: 1 },
    heroCssGradientRadialPosition: { type: "joystick", label: "CSS Gradient Radial Position" },
    heroGradMidPoint: { type: "slider", label: "Gradient Mid Point", min: 0, max: 1, step: 0.1 },
    // Text Position - Responsive
 
  },
  HeroTextPosition: {
    heroTextPositionSm: { type: "position", label: "Text Position Sm", options: heroTextPositionThemes },
    heroTextPositionMd: { type: "position", label: "Text Position Md", options: heroTextPositionThemes },
    heroTextPositionLg: { type: "position", label: "Text Position Lg", options: heroTextPositionThemes },
    heroTextPositionXl: { type: "position", label: "Text Position Xl", options: heroTextPositionThemes },

    // Text Column Span - Responsive
    heroTextColSpanSm: { type: "select", label: "Text Col Span Sm", options: heroTextColSpanThemes },
    heroTextColSpanMd: { type: "select", label: "Text Col Span Md", options: heroTextColSpanThemes },
    heroTextColSpanLg: { type: "select", label: "Text Col Span Lg", options: heroTextColSpanLgThemes },
    heroTextColSpanXl: { type: "select", label: "Text Col Span Xl", options: heroTextColSpanLgThemes },

    // Subtext Position - Responsive
    heroSubTextPositionSm: { type: "position", label: "Subtext Position Sm", options: heroTextPositionThemes },
    heroSubTextPositionMd: { type: "position", label: "Subtext Position Md", options: heroTextPositionThemes },
    heroSubTextPositionLg: { type: "position", label: "Subtext Position Lg", options: heroTextPositionThemes },
    heroSubTextPositionXl: { type: "position", label: "Subtext Position Xl", options: heroTextPositionThemes },

    // Subtext Column Span - Responsive
    heroSubTextColSpanSm: { type: "select", label: "Subtext Col Span Sm", options: heroTextColSpanThemes },
    heroSubTextColSpanMd: { type: "select", label: "Subtext Col Span Md", options: heroTextColSpanThemes },
    heroSubTextColSpanLg: { type: "select", label: "Subtext Col Span Lg", options: heroTextColSpanLgThemes },
    heroSubTextColSpanXl: { type: "select", label: "Subtext Col Span Xl", options: heroTextColSpanLgThemes },
    },
  CanvasCamera: {
    _description: "Control the 3D camera position and field of view. Use sliders to position the camera or enable orbit controls below.",
    canvasCameraPositionX: { type: "slider", label: "Camera X", min: -20, max: 20, step: 0.1 },
    canvasCameraPositionY: { type: "slider", label: "Camera Y", min: -20, max: 20, step: 0.1 },
    canvasCameraPositionZ: { type: "slider", label: "Camera Z", min: 0.1, max: 30, step: 0.1 },
    canvasCameraFov: { type: "slider", label: "Field of View", min: 10, max: 120, step: 1 },
    canvasOrbitControlsEnabled: { type: "boolean", label: "Enable Orbit Controls" },
  },
  CanvasGeometry: {
    _description: "Control the size and quality of 3D geometries. Higher segment counts create smoother surfaces but use more resources.",
    // Plane Geometry Controls
    canvasPlaneWidth: { type: "slider", label: "Plane Width", min: 1, max: 50, step: 1 },
    canvasPlaneHeight: { type: "slider", label: "Plane Height", min: 1, max: 50, step: 1 },
    canvasPlaneWidthSegments: { type: "slider", label: "Plane Width Segments", min: 1, max: 200, step: 1 },
    canvasPlaneHeightSegments: { type: "slider", label: "Plane Height Segments", min: 1, max: 200, step: 1 },
    // Sphere Geometry Controls
    canvasSphereRadius: { type: "slider", label: "Sphere Radius", min: 1, max: 50, step: 1 },
    canvasSphereWidthSegments: { type: "slider", label: "Sphere Width Segments", min: 3, max: 64, step: 1 },
    canvasSphereHeightSegments: { type: "slider", label: "Sphere Height Segments", min: 3, max: 64, step: 1 },
    // Perlin Blob Geometry Controls
    canvasPerlinBlobRadius: { type: "slider", label: "Perlin Blob Radius", min: 0.5, max: 10, step: 0.1 },
    canvasPerlinBlobWidthSegments: { type: "slider", label: "Perlin Blob Detail Level", min: 1, max: 10, step: 1 },
    canvasPerlinBlobHeightSegments: { type: "slider", label: "Perlin Blob Height Segments", min: 1, max: 10, step: 1 },
    // Experience Sphere Geometry Controls
    canvasExpSphereRadius: { type: "slider", label: "Experience Sphere Radius", min: 1, max: 20, step: 1 },
    canvasExpSphereWidthSegments: { type: "slider", label: "Experience Sphere Width Segments", min: 3, max: 64, step: 1 },
    canvasExpSphereHeightSegments: { type: "slider", label: "Experience Sphere Height Segments", min: 3, max: 64, step: 1 },
  },
  Articles: {
    gridType: { type: "select", label: "Grid Type", options: gridLayoutThemes },
    listType: { type: "select", label: "List Type", options: listLayoutThemes },
    gridColumnsSm: { type: "select", label: "Sm", options: gridColumns },
    gridColumnsMd: { type: "select", label: "Md", options: gridColumns },
    gridColumnsLg: { type: "select", label: "Lg", options: gridColumns },
    gridColumnsXl: { type: "select", label: "Xl", options: gridColumns },
    gridGap: { type: "select", label: "Grid Gap", options: gridGap },
    cardAspectRatio: { type: "select", label: "Aspect Ratio", options: cardAspectRatio },
    cardLayout: { type: "select", label: "Card Type", options: cardThemes },
    cardHover: { type: "select", label: "Hover", options: cardHoverThemes },
  },
  Images: {
    imageParallax: { type: "boolean", label: "Parallax" },
    imageMixBlendMode: { type: "select", label: "Blend Mode", options: mixBlendThemes },
    imageTexture: { type: "select", label: "Texture", options: imageTextureThemes },
    imageTextureContrast: { type: "slider", label: "Contrast", min: 0, max: 1000, step: 1, suffix: "%" },
    imageTextureBrightness: { type: "slider", label: "Brightness", min: 0, max: 1000, step: 1, suffix: "%" },
  },
  Navigation: {
    navPosition: { type: "select", label: "Position", options: navigationPositionThemes },
    navLayoutPosition: { type: "select", label: "Layout Position", options: navigationOptions.position},
    navStyle: { type: "select", label: "Style", options: navigationStyleThemes },
    navTheme: { type: "select", label: "Theme", options: navigationThemes },
    navLabelDisplay: { type: "select", label: "Label Display", options: navigationOptions.labelDisplay },
    navBorder: { type: "boolean", label: "Border" },
    navShadow: { type: "boolean", label: "Shadow" },
    navShadowColor: { type: "select", label: "Shadow Color", options: navigationOptions.shadowColor },
    navShadowSize: { type: "select", label: "Shadow Size", options: navigationOptions.shadowSize },
    logoBackground: { type: "select", label: "Logo Background", options: logoBackground },
    logoStyle: { type: "select", label: "Logo Style", options: logoStyle },
  },
  Footer: {
    footerPosition: { type: "select", label: "Position", options: footerOptions.position },
  },
  EffectSelection: {
    _description: "Choose visual effects to apply to canvas backgrounds. Select a category first, then choose a specific variant.",
    effectType: { 
      type: "select", 
      label: "Effect Category",
      options: {
        none: 'None',
        custom: 'Custom',
        ascii: 'ASCII',
        dithering: 'Dithering',
        halftone: 'Halftone'
      }
    },
    effectVariant: { 
      type: "select", 
      label: "Effect Variant",
      options: heroShaderEffectThemes
    }
  },
  EffectControls: {
    _description: "Fine-tune the selected effect. Controls shown depend on the effect category.",
    // Custom (legacy) Controls
    halftoneSize: {
      type: "slider",
      label: "Halftone Size",
      min: 2, max: 32, step: 2
    },
    asciiSize: {
      type: "slider",
      label: "ASCII Size",
      min: 4, max: 32, step: 2
    },
    ditherLevels: {
      type: "slider",
      label: "Dither Levels",
      min: 2, max: 16, step: 1
    },
    ditherSize: {
      type: "slider",
      label: "Dither Size",
      min: 2, max: 16, step: 1
    },
    pixelationSize: {
      type: "slider",
      label: "Pixelation Size",
      min: 2, max: 32, step: 2
    },
    noiseIntensity: {
      type: "slider",
      label: "Noise Intensity",
      min: 0, max: 1, step: 0.05
    },

    // ASCII Controls
    asciiPixelSize: { 
      type: "slider", 
      label: "Cell Size", 
      min: 4, max: 32, step: 2
    },
    asciiShowBackground: { 
      type: "boolean", 
      label: "Show Colors"
    },
    asciiContrast: { 
      type: "slider", 
      label: "Contrast", 
      min: 50, max: 200, step: 10
    },
    
    // Dithering Controls
    ditherColorLevels: { 
      type: "slider", 
      label: "Color Levels", 
      min: 2, max: 16, step: 1
    },
    ditherContrast: { 
      type: "slider", 
      label: "Contrast", 
      min: 50, max: 200, step: 10
    },
    ditherInverted: { 
      type: "boolean", 
      label: "Inverted"
    },
    
    // Halftone Controls
    halftoneDotSize: { 
      type: "slider", 
      label: "Dot/Cell Size", 
      min: 2, max: 32, step: 2
    },
    halftoneAngle: { 
      type: "slider", 
      label: "Angle (degrees)", 
      min: 0, max: 360, step: 15
    },
    halftoneContrast: { 
      type: "slider", 
      label: "Contrast", 
      min: 50, max: 200, step: 10
    },
    halftoneSpread: { 
      type: "slider", 
      label: "Spread", 
      min: 0, max: 100, step: 5
    },
    halftoneShape: { 
      type: "select", 
      label: "Shape",
      options: { 
        circle: 'Circle', 
        square: 'Square', 
        line: 'Line' 
      }
    },
    halftoneColorMode: { 
      type: "select", 
      label: "Color Mode",
      options: { 
        mono: 'Monochrome', 
        color: 'Color' 
      }
    },
    halftoneInverted: { 
      type: "boolean", 
      label: "Inverted"
    }
  },
  Color: {
    accentPri: { type: "color", label: "Accent Primary" },
    accentSec: { type: "color", label: "Accent Secondary" },
    accentImageBg: { type: "color", label: "Accent Image Bg" },
    backgroundColor: { type: "color", label: "Background Color" },
    backgroundColorInv: { type: "color", label: "Background Color Inverted" },
    bodyBackgroundColor: { type: "color", label: "Body Background Color" },
    gradStart: { type: "color", label: "Gradient Start" },
    gradStop: { type: "color", label: "Gradient Stop" },
    headingColor: { type: "color", label: "Heading Color" },
    navBg: { type: "color", label: "Navigation Background" },
    subtextColor: { type: "color", label: "Subtext Color" },
    surface1: { type: "color", label: "Surface 1" },
    surface2: { type: "color", label: "Surface 2" },
    surface3: { type: "color", label: "Surface 3" },
    textAccent: { type: "color", label: "Text Accent" },
    textColor: { type: "color", label: "Text Color" },
    textColorInv: { type: "color", label: "Text Color Inverted" },
    surfaceTexture: { type: "select", label: "Surface Texture", options: surfaceTexture },
  },
}; 