// Color themes
const colorThemes = {
  light: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#fafafa',
    backgroundColor: '#f4f4f5',
    surface1: '#c1c1c1',
    surface2: '#6f6f6f',
    surface3:'#C0C6C9',
    backgroundColorInv: '#6b7280',
    headingColor: '#52525b',
    textColor: '#09090b',
    subtextColor: '#52525b',
    textColorInv: '#fafafa',
    accent:'#c0b89b',
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    textAccent:'#d946ef',
    mixBlendMode:'color',
    stateSuccessBackground:'#d946ef',
    textHighlight: 'text',
  },
  dark: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#271C1B',
    backgroundColor: '#47362E',
    surface1: '#c1c1c1',
    surface2: '#6f6f6f',
    surface3:'#C0C6C9',
    backgroundColorInv: '#f4f4f5',
    headingColor: '#e4e4e7',
    textColor: '#fafafa',
    subtextColor: '#FE8500',
    textColorInv: '#09090b',
    accent:'#FE8500',
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    textAccent:'#99f6e4',
    mixBlendMode:'luminosity',
    stateSuccessBackground:'#d946ef',
    textHighlight: 'underline',
  },
  tokyo: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#F8FBF8',
    backgroundColor: '#F7FCFE',
    surface1: '#F8FBF8',
    surface2: '#F7FCFE',
    surface3:'#C0C6C9',
    backgroundColorInv: '#C0C6C9',
    headingColor: '#887F7A',
    textColor: '#887F7A',
    subtextColor: '#C0C6C9',
    textColorInv: '#887F7A',
    accent:'#c0b89b',
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    textAccent:'#BED3CD',
    mixBlendMode:'luminosity',
    stateSuccessBackground:'#BED3CD',
    textHighlight: 'background',
  },
  textureAndContrast: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#212121', // Dark gray
    backgroundColor:'#212121', // White
    surface1: '#D81B60', // Raspberry
    surface2: '#388E3C', // Green
    surface3: '#009688', // Teal
    backgroundColorInv: '#000000', // Black
    headingColor:  '#C0C6C9', // Pink
    textColor: '#FFFFFF', // Dark gray
    subtextColor: '#887F74', // Blue-gray
    textColorInv: '#FFFFFF', // White
    accent: '#887F74', // Orange
    navBg: '#FFFFFF', // White
    accentPri: '#556B2F', // Olive green
    accentSec: '#556B2F', // Light orange
    textAccent: '#556B2F', // Teal
    mixBlendMode: 'difference',
    stateSuccessBackground: '#4CAF50', // Green
    textHighlight: 'text',
  },
};

// Text Animation themes
export const textAnimationThemes = {
  none: "none",
  linesup: "linesup",
  lineposup: "lineposup",
  linefadein: "linefadein",
  charfade: "charfade",
  charblur: "charblur",
  charrandom: "charrandom",
  charcode: "charcode",
};


const textHighlightThemes = {
  text: "text",
  background: "background",
  underline: "underline",
  highlight: "highlight",
  none: "none"
};


// Type Themes
export const typographyThemes = {
  sans: 'sans-serif',
  serif: 'serif',
  mono: 'monospace',
};

export const pageTransitionThemes = {
  tiltandwipe:'tilt and wipe',
  tilt:'tilt',
  fade:'fade',
  wipe:'wipe',
  none:'none'
};

export const pageWidthThemes = {
  small:'small',
  large: 'large',
  fluid: 'fluid'
};

export const cursorThemes = {
  none: 'none',
  dot: 'dot',
};



// Function to get theme by key
export function getThemeByKey(themeKey) {
  return themes[themeKey];
}

// Function to update theme
export function updateTheme(themeKey, updates) {
  if (themes[themeKey]) {
    Object.assign(themes[themeKey], updates);
  }
}

// Function to get Leva controls for a theme
export function getThemeLevaControls(themeKey) {
  const theme = getThemeByKey(themeKey);
  if (!theme) return {};

  const controls = {};
  Object.keys(theme).forEach(key => {
    if (typeof theme[key] === 'string' && theme[key].startsWith('#')) {
      controls[key] = { value: theme[key], onChange: (value) => updateTheme(themeKey, { [key]: value }) };
    }
  });

  return controls;
}

// Merge themes
export const themes = {
  light: {
    key: 'light', // Key for the light theme
    ...colorThemes.light,
    ...typographyThemes.sans, // Default to sans
    ...textHighlightThemes.text, // Add text highlight theme
    ...pageTransitionThemes.wipe,
    ...pageWidthThemes.fluid,
    ...cursorThemes.dot,
    weights: {
      color: 1,
      typography: 1,
      vibrance:1,
      funkyness:1,
    },
  },
  dark: {
    key: 'dark', // Key for the dark theme
    ...colorThemes.serif,
    ...typographyThemes.sans, // Default to sans
    ...textHighlightThemes.text, // Add text highlight theme
    ...pageTransitionThemes.wipe,
    ...pageWidthThemes.fluid,
    ...cursorThemes.dot,
    weights: {
      color: 9,
      typography: 9,
      vibrance:9,
      funkyness:9,
    },
  },
  tokyo: {
    key: 'tokyo', // Key for the tokyo theme
    ...colorThemes.tokyo,
    ...typographyThemes.sans, // Default to sans
    ...textHighlightThemes.text, // Add text highlight theme
    ...pageTransitionThemes.wipe,
    ...pageWidthThemes.fluid,
    ...cursorThemes.dot,
    weights: {
      color: 5,
      typography: 5,
      vibrance:5,
      funkyness:5,
    },
  },
  textureAndContrast: {
    key: 'textureAndContrast',
    ...colorThemes.textureAndContrast,
    ...typographyThemes.mono, // Default to sans
    ...textHighlightThemes.text, // Add text highlight theme
    ...pageTransitionThemes.wipe,
    ...pageWidthThemes.fluid,
    ...cursorThemes.dot,
    weights: {
      color: 2,
      typography: 7,
      vibrance:5,
      funkyness:8,
    },
  },
};