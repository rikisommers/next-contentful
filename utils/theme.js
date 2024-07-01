
// Color themes
const colorThemes = {
  light: {
    bodyBackgroundColor: '#fafafa',
    backgroundColor: '#f4f4f5',
    surface1: '#c1c1c1',
    surface2: '#6f6f6f',
    backgroundColorInv: '#6b7280',
    headingColor: '#52525b',
    textColor: '#09090b',
    subtextColor: '#52525b',
    textColorInv: '#fafafa',
    accent:'#d946ef',
    textAccent:'#d946ef',
    mixBlendMode:'color',
    stateSuccessBackground:'#d946ef',
  },
  dark: {
    bodyBackgroundColor: '#1f2937',
    backgroundColor: '#6b7280',
    surface1: '#c1c1c1',
    surface2: '#6f6f6f',
    backgroundColorInv: '#f4f4f5',
    headingColor: '#e4e4e7',
    textColor: '#fafafa',
    subtextColor: '#a1a1aa',
    textColorInv: '#09090b',
    accent:'#99f6e4',
    textAccent:'#99f6e4',
    mixBlendMode:'luminosity',
    stateSuccessBackground:'#d946ef',
  },
};

// Animation themes
const animationThemes = {
  fadeup: {
    animation: 'fadeup'
  },
  fadedown: {
    animation: 'fadedown'
  },
  wave: {
    animation: 'wave'
  },
  leafFall: {
    animation: 'leaf-fall'
  }
};

// Layout themes
const layoutThemes = {
  wide: {
    layout: 'wide'
  },
  narrow: {
    layout: 'narrow'
  },
  grid: {
    layout: 'grid'
  },
  column: {
    layout: 'column'
  }
};


// Image themes
const imageThemes = {
  wide: {
    layout: 'wide'
  },
  narrow: {
    layout: 'narrow'
  },
  grid: {
    layout: 'grid'
  },
  column: {
    layout: 'column'
  }
};


const transitionThemes = {
  wide: {
    layout: 'wide'
  },
  narrow: {
    layout: 'narrow'
  },
  grid: {
    layout: 'grid'
  },
  column: {
    layout: 'column'
  }
};

// Merge themes
export const themes = {
  light: {
    key: 'light', // Key for the light theme
    ...colorThemes.light,
    ...animationThemes.fadeup,
    ...layoutThemes.wide,
  },
  dark: {
    key: 'dark', // Key for the dark theme
    ...colorThemes.dark,
    ...animationThemes.fadedown,
    ...layoutThemes.narrow,
  },

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