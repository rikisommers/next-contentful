
// Color themes
const colorThemes = {
  light: {
    bodyBackgroundColor: '#fafafa',
    backgroundColor: '#f4f4f5',
    backgroundColorInv: '#6b7280',
    headingColor: '#52525b',
    textColor: '#09090b',
    subtextColor: '#52525b',
    textColorInv: '#fafafa',
    accent:'#d946ef'
  },
  dark: {
    bodyBackgroundColor: '#1f2937',
    backgroundColor: '#6b7280',
    backgroundColorInv: '#f4f4f5',
    headingColor: '#e4e4e7',
    textColor: '#fafafa',
    subtextColor: '#a1a1aa',
    textColorInv: '#09090b',
    accent:'#99f6e4'
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

const cardThemes = {
  light: {
    cardBackground: 'red',
    mixBlendMode: 'color',
  },
  dark: {
    cardBackground: 'green',
    mixBlendMode:  'luminosity',
  },
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
    ...cardThemes.light,
  },
  dark: {
    key: 'dark', // Key for the dark theme
    ...colorThemes.dark,
    ...animationThemes.fadedown,
    ...layoutThemes.narrow,
    ...cardThemes.dark,
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