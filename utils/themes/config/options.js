/**
 * Theme option enums -- layout, animation, typography, navigation, and effect variants
 * @module utils/themes/config/options
 */

// Grid layout
export const gridLayoutThemes = {
  gridBasic: "gridBasic",
  gridBento: "gridBento",
  gridBento2: "gridBento2",
  gridThings: "gridThings",
};

// List layout

export const listLayoutThemes = {
  textList: "textList",
  textHoverList: "textHoverList",
  textImageList: "textImageList",
  textImageListStack: "textImageListStack",
};


// colums
export const gridColumns = {
  1: 1,
  2: 2,
  3: 3,
  4: 4
};

export const gridGap = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const gridGapClasses = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};


// Text Animation themes
export const textAnimationThemes = {
  none: "none",
  figma: "figma",
  linesup: "linesup",
  linefadeinup: "linefadeinup",
  charfade: "charfade",
  charblur: "charblur",
  charrandom: "charrandom",
  charcode: "charcode",
  wordmask: "wordmask",
  navigators: "navigators",
  wordsup: "wordsup",
};

export const textHighlightThemes = {
  text: "text",
  background: "background",
  tabloid: "tabloid",
  underline: "underline",
  highlight: "highlight",
  none: "none"
};

// Type Themes
// using google fonts kndoif sucks really just need a way to select local dfonts and not include in prod
export const typographyThemes = {
  roobertRegular: 'Roobert-Regular',
  interphase: 'Interphase',
  tron: 'Tronica Mono',
  mono: 'Aeonik Mono Light',
  aeonikMono: 'Aeonik Mono Regular',
  aonMono: 'Aeonik Mono Medium',
  aonThin: 'Aeonik Mono Thin',
  aonPro: 'Aeonik Pro Light',
  aonBold: 'Aeonik Bold',
  aonRegular: 'Aeonik Regular',
  milling: 'MillingTrial-Duplex1mm',
  jetBrains: 'JetBrains Mono',
  itcGaramonLightNarrow: 'ITCGaramondStd-LtNarrow',
  brett: 'BrettTrial-Regular',
};




// Type Themes
export const fontScaleThemes = {
  fixed: 'fixed',
  fluid: 'fluid',
};

export const fluidFontSizeThemes = {
fontSizeMin: '8',
fontSizeMax: '16',
fontRatioMin: 0.2,
fontRatioMax: 1.1,
fontWidthMin: '320',
fontWidthMax: '1200',
variableUnit: '1vw',
};

export const pageTransitionThemes = {
  tiltandwipe:'tilt and wipe',
  tilt:'tilt',
  fade:'fade',
  wipe:'wipe',
  pixel:'pixel',
  none:'none',
  onto: 'onto',
  carousel: 'carousel',
};

export const pageWidthThemes = {
  small:'small',
  medium: 'medium',
  large: 'large',
  fluid: 'fluid'
};

export const cursorThemes = {
  none: 'none',
  dot: 'dot',
  cta:'cta',
  gabriel:'gabriel',
  onto: 'onto',
};

export const cardThemes = {
  formal: 'formal',
  funky: 'funky',
  monks: 'monks',
  reone: 'reone',
  img: 'img',
  text: "text",
  hovertext: "hovertext",
  colabs: "colabs",
  formfun: "formfun",
  mount: "mount",
  onto: "onto",
  onto2: "onto2",
};

export const cardAspectRatio = {
  square: 'square',
  video: 'video',
  landscape: 'landscape',
  portrait: 'portrait',
  auto: 'auto',
};


export const surfaceTexture = {
  none: 'none',
  color: 'color',
  metal: 'metal',
  glass: 'glass',
  paper: 'paper',
}


export const imageTextureThemes = {
  none: 'none',
  noise: 'noise',
  paper: 'paper',
  grain: 'grain',
  dissolve: 'dissolve',
  pixelated: 'pixelated',
}

export const imageTextureContrastThemes = {
  contrast: '110%',
  brightness: '110%',
  opacity: '0.8',
}


export const mixBlendThemes = {
  normal: 'normal',
  multiply: 'multiply',
  screen: 'screen',
  overlay: 'overlay',
  darken: 'darken',
  lighten: 'lighten',
  colordodge: 'color-dodge',
  colorburn: 'color-burn',
  hardlight: 'hard-light',
  softlight: 'soft-light',
  difference: 'difference',
  exclusion: 'exclusion',
  hue: 'hue',
  saturation: 'saturation',
  color: 'color',
  luminosity: 'luminosity',
};

export const cardHoverThemes = {
  none: 'none',
  zoom: 'zoom',
};

export const audioThemes = {
  audio: true,
  volume: 0.5,
}

export const navigationStyleThemes = {
  solid: 'solid',
  transparent: 'transparent',
};

export const navigationThemes = {
  custom: 'custom',
  awwwards: 'awwwards',
  awwwardsGlass: 'awwwards-glass',
  awwwards2: 'awwwards-2',
  applause: 'applause',
  applauseMain: 'applause-main',
};


export const navigationTextStyleThemes = {
  text: 'text',
  icons: 'icons',
};


export const logoStyle = {
  none: 'none',
  image: 'image',
  text: 'text',
  imageAndText: 'imageAndText',
};

export const logoBackground = {
  solid: 'solid',
  transparent: 'transparent',
};


export const navigationOptions = {
  logoFill:true,
  bordered: false,
  shadowColor: {
    default: 'default',
    accent: 'accent',
  },
  position: {
    fixed: 'fixed',
    floating: 'floating',
    none: 'none',
  },
  shadowSize:{
    sm:'sm',
    md:'md',
    lg:'lg',
  },
  labelDisplay:{
    text:'text',
    icons:'icons',
    textAndIcons:'textAndIcons',
  }
}

export const navigationPositionThemes = {
  topLeft: 'top-left',
  topCenter: 'top-center',
  topRight: 'top-right',
  bottomLeft: 'bottom-left',
  bottomCenter: 'bottom-center',
  bottomRight: 'bottom-right',
  leftCenter: 'left-center',
  rightCenter: 'right-center',
};

export const footerOptions = {
  position: {
    fixed: 'fixed',
    none: 'none',
  },
};

export const footerThemes = {
  default: 'default',
  format: 'format',
  onto: 'onto',
};


// animatedGradient: 'animated-gradient',
// blob: 'blob',
//video: 'video',
export const heroBackgroundThemes = {
  none: 'none',
  canvasPlaneShader: 'canvasPlaneShader', // Water shader
  canvasSphereShader: 'canvasSphereShader', // Sphere shader
  canvasPerlinBlob: 'canvasPerlinBlob', // Perlin blob shader
  canvasExp: 'canvasExp', // Experience shader
  canvasGradient: 'canvasGradient', // Canvas gradient background
  canvasImage: 'canvasImage',
  image: 'image',
  cssgradient: 'cssgradient',
};

// Separate effects that can be applied to canvas backgrounds
export const heroShaderEffectThemes = {
  none: 'none',
  
  // Original halftone effects
  halftone_dots: 'halftone-dots',
  halftone_ascii: 'halftone-ascii',
  ascii: 'ascii',
  ascii2: 'ascii2',
  luma: 'luma',
  halftone_led: 'halftone-led',
  halftone_lego: 'halftone-lego',
  halftone_rect: 'halftone-rect',
  
  // Original noise/pixel effects
  noise: 'noise',
  pixelation: 'pixelation',
  
  // Original dithering effects
  dither_blue_noise: 'dither-blue-noise',
  dither_ordered: 'dither-ordered',
  dither_color_quant: 'dither-color-quant',
  
  // New ASCII variants (efecto-inspired)
  ascii_standard: 'ascii-standard',
  ascii_dense: 'ascii-dense',
  ascii_minimal: 'ascii-minimal',
  ascii_blocks: 'ascii-blocks',
  ascii_braille: 'ascii-braille',
  ascii_technical: 'ascii-technical',
  ascii_matrix: 'ascii-matrix',
  ascii_hatching: 'ascii-hatching',
  
  // New dithering algorithms (efecto-inspired)
  dither_floyd_steinberg: 'dither-floyd-steinberg',
  dither_atkinson: 'dither-atkinson',
  dither_jarvis_judice_ninke: 'dither-jarvis-judice-ninke',
  dither_stucki: 'dither-stucki',
  dither_burkes: 'dither-burkes',
  dither_sierra: 'dither-sierra',
  dither_sierra2: 'dither-sierra2',
  dither_sierra_lite: 'dither-sierra-lite',
  
  // New halftone variants (efecto-inspired)
  halftone_dots_new: 'halftone-dots-new',
  halftone_circles: 'halftone-circles',
  halftone_squares: 'halftone-squares',
  halftone_lines: 'halftone-lines',
  halftone_crosshatch: 'halftone-crosshatch',
  halftone_newspaper: 'halftone-newspaper',
};

export const heroCssGradientThemes = {
  linear: 'linear',
  radial: 'radial',
  conic: 'conic',
};

export const heroCssGradientRadialPositionThemes = {
  center: 'center',
  topLeft:'top-left',
  bottomLeft:'bottom-left',
  bottomCenter:'bottom-center',
  topCenter:'top-center',
  topRight:'top-right',
  bottomRight:'bottom-right',
};


export const heroLabelTheme = {
  badge: 'badge',
  text:'text',
};


export const heroTextPositionThemes = [
  // Top row (0-11)
  '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8', '0-9', '0-10', '0-11',
  // Second row (1-11) 
  '1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11',
  // Third row (2-11)
  '2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9', '2-10', '2-11',
  // Fourth row (3-11)
  '3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9', '3-10', '3-11',
  // Fifth row (4-11)
  '4-0', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11',
  // Sixth row (5-11)
  '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11',
  // Seventh row (6-11)
  '6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11',
  // Eighth row (7-11)
  '7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7', '7-8', '7-9', '7-10', '7-11',
  // Ninth row (8-11)
  '8-0', '8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8', '8-9', '8-10', '8-11',
  // Tenth row (9-11)
  '9-0', '9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7', '9-8', '9-9', '9-10', '9-11',
  // Eleventh row (10-11)
  '10-0', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-11',
  // Bottom row (11-11)
  '11-0', '11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11'
];

export const shadowThemes = {
  none: 'none',
  sm:'sm',
  md:'md',
  lg:'lg',
  xl:'xl',
  '2xl':'2xl',
};

export const borderRadiusThemes = {
  none: 'none',
  sm:'sm',
  md:'md',
  lg:'lg',
  xl:'xl',
  '2xl':'2xl',
};

export const headerTextPositionThemes = {
  '0-0': '0-0',
  '0-1': '0-1',
  '0-2': '0-2',
  '0-3': '0-3',
  '0-4': '0-4',
  '0-5': '0-5',
  '0-6': '0-6',
  '0-7': '0-7',
  '0-8': '0-8',
  '0-9': '0-9',
  '0-10': '0-10',
  '0-11': '0-11',
};


export const colSpanThemes = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
};

export const headerTextColSpanThemes = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
};

export const heroTextColSpanThemes = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
};

export const heroTextRowSpanThemes = {
  auto: 'auto',
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
};

export const heroTextColSpanLgThemes = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
};


export const textAlignThemes = {
  left: 'left',
  center: 'center',
  right: 'right',
  split:'split',
};

export const heroGradThemes = {
  gradMidPoint: 0.5
};

export const heroTextCompositionThemes = {
  foo: 'foo',
  bar: 'bar',
};

export const heroTextImageThemes = {
  none: 'none',
  inline: 'inline',
  pill: 'pill',
};

export const bodyTextAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
  split:'split',
};


export const bodyTextThemes = {
  dropCap: false,
  indent: false,
  hightlight: false,
};

export const animationThemes = {
  inset:3,
  borderRadius:2,
};


export const helpers = {
    mousepos:false,
    grid:false,
};

export const shaderEffect = {
  // Original effects
  blueNoise: 'blueNoise',
  noiseDither: 'noiseDither',
  orderedDither: 'orderedDither',
  colorQuant: 'colorQuant',
  colorQuant2: 'colorQuant2',
  rect: 'rect',
  dots: 'dots',
  ascii: 'ascii',
  ascii2: 'ascii2',
  luma: 'luma',
  led: 'led',
  lego: 'lego',
  progress: 'progress',
  
  // ASCII variants (from efecto.app)
  ascii_standard: 'ascii_standard',
  ascii_dense: 'ascii_dense',
  ascii_minimal: 'ascii_minimal',
  ascii_blocks: 'ascii_blocks',
  ascii_braille: 'ascii_braille',
  ascii_technical: 'ascii_technical',
  ascii_matrix: 'ascii_matrix',
  ascii_hatching: 'ascii_hatching',
  
  // Dithering algorithms (from efecto.app)
  dither_floyd_steinberg: 'dither_floyd_steinberg',
  dither_atkinson: 'dither_atkinson',
  dither_jarvis_judice_ninke: 'dither_jarvis_judice_ninke',
  dither_stucki: 'dither_stucki',
  dither_burkes: 'dither_burkes',
  dither_sierra: 'dither_sierra',
  dither_sierra2: 'dither_sierra2',
  dither_sierra_lite: 'dither_sierra_lite',
  
  // Halftone variants (from efecto.app)
  halftone_dots: 'halftone_dots',
  halftone_circles: 'halftone_circles',
  halftone_squares: 'halftone_squares',
  halftone_lines: 'halftone_lines',
  halftone_crosshatch: 'halftone_crosshatch',
  halftone_newspaper: 'halftone_newspaper',
};
