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
  },
  amberMonochrome: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#1A1A00',
    surface1: '#332900',
    surface2: '#4D3D00',
    surface3:'#665200',
    backgroundColorInv: '#FFB000',
    headingColor: '#FFB000',
    textColor: '#FFB000',
    subtextColor: '#CC8C00',
    textColorInv: '#000000',
    accent:'#FFD700',
    navBg:"#332900",
    accentPri: '#FFB000',
    accentSec: '#FFD700',
    textAccent:'#FFEA00',
    mixBlendMode:'screen',
    stateSuccessBackground:'#4D3D00',
  },
  greenPhosphor: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#001100',
    backgroundColor: '#002200',
    surface1: '#003300',
    surface2: '#004400',
    surface3:'#005500',
    backgroundColorInv: '#00FF00',
    headingColor: '#00FF00',
    textColor: '#00FF00',
    subtextColor: '#00CC00',
    textColorInv: '#001100',
    accent:'#00FF33',
    navBg:"#003300",
    accentPri: '#00FF00',
    accentSec: '#00FF33',
    textAccent:'#33FF33',
    mixBlendMode:'screen',
    stateSuccessBackground:'#004400',
  },
  ibmPcXt: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#0000AA',
    surface1: '#000055',
    surface2: '#0000FF',
    surface3:'#5555FF',
    backgroundColorInv: '#AAAAAA',
    headingColor: '#55FFFF',
    textColor: '#FFFFFF',
    subtextColor: '#55FFFF',
    textColorInv: '#000000',
    accent:'#FF55FF',
    navBg:"#000055",
    accentPri: '#FFFF55',
    accentSec: '#55FF55',
    textAccent:'#FF5555',
    mixBlendMode:'screen',
    stateSuccessBackground:'#55FF55',
  },
  commodore64: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#40318D',
    backgroundColor: '#7869C4',
    surface1: '#8F84D9',
    surface2: '#A59FE6',
    surface3:'#BCBAF0',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FFFFFF',
    textColor: '#FFFFFF',
    subtextColor: '#BCBAF0',
    textColorInv: '#40318D',
    accent:'#7869C4',
    navBg:"#8F84D9",
    accentPri: '#A59FE6',
    accentSec: '#BCBAF0',
    textAccent:'#FFFFFF',
    mixBlendMode:'screen',
    stateSuccessBackground:'#A59FE6',
  },
  appleII: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#1B1B1B',
    surface1: '#383838',
    surface2: '#555555',
    surface3:'#727272',
    backgroundColorInv: '#C0C0C0',
    headingColor: '#66FF66',
    textColor: '#66FF66',
    subtextColor: '#33CC33',
    textColorInv: '#000000',
    accent:'#FF6666',
    navBg:"#383838",
    accentPri: '#66FF66',
    accentSec: '#FF6666',
    textAccent:'#66FFFF',
    mixBlendMode:'screen',
    stateSuccessBackground:'#555555',
  },
  zxSpectrum: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#0000D8',
    surface1: '#0000FF',
    surface2: '#00D8FF',
    surface3:'#00FFFF',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FFFF00',
    textColor: '#FFFFFF',
    subtextColor: '#FF00FF',
    textColorInv: '#000000',
    accent:'#FF0000',
    navBg:"#0000FF",
    accentPri: '#FFFF00',
    accentSec: '#FF00FF',
    textAccent:'#00FF00',
    mixBlendMode:'screen',
    stateSuccessBackground:'#00D8FF',
  },
  atari8bit: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#404040',
    surface1: '#686868',
    surface2: '#909090',
    surface3:'#B8B8B8',
    backgroundColorInv: '#E0E0E0',
    headingColor: '#F0F0F0',
    textColor: '#F0F0F0',
    subtextColor: '#D0D0D0',
    textColorInv: '#000000',
    accent:'#50E080',
    navBg:"#686868",
    accentPri: '#50E080',
    accentSec: '#E05050',
    textAccent:'#E0E050',
    mixBlendMode:'screen',
    stateSuccessBackground:'#909090',
  },
  msdos: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#0000A8',
    surface1: '#0000D0',
    surface2: '#0000F8',
    surface3:'#2828FF',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FFFFFF',
    textColor: '#FFFFFF',
    subtextColor: '#A8A8FF',
    textColorInv: '#0000A8',
    accent:'#00FF00',
    navBg:"#0000D0",
    accentPri: '#FFFF00',
    accentSec: '#00FFFF',
    textAccent:'#FF00FF',
    mixBlendMode:'screen',
    stateSuccessBackground:'#0000F8',
  },
  amigaWorkbench: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#0055AA',
    backgroundColor: '#0077AA',
    surface1: '#0099AA',
    surface2: '#00BBAA',
    surface3:'#00DDAA',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FFFFFF',
    textColor: '#000000',
    subtextColor: '#0055AA',
    textColorInv: '#FFFFFF',
    accent:'#FF8800',
    navBg:"#0099AA",
    accentPri: '#FF8800',
    accentSec: '#FFAA00',
    textAccent:'#00FFFF',
    mixBlendMode:'screen',
    stateSuccessBackground:'#00BBAA',
  },
  custom: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#F8FBF8',
    backgroundColor: '#4a484b',
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
  },
  nes: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#7C7C7C',
    surface1: '#BCBCBC',
    surface2: '#FC9838',
    surface3:'#F8D800',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FC9838',
    textColor: '#FFFFFF',
    subtextColor: '#BCBCBC',
    textColorInv: '#000000',
    accent:'#F8D800',
    navBg:"#7C7C7C",
    accentPri: '#FC9838',
    accentSec: '#F8D800',
    textAccent:'#00B800',
    mixBlendMode:'screen',
    stateSuccessBackground:'#00B800',
  },
  gameboy: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#0F380F',
    backgroundColor: '#306230',
    surface1: '#8BAC0F',
    surface2: '#9BBC0F',
    surface3:'#AAC0AA',
    backgroundColorInv: '#AAC0AA',
    headingColor: '#9BBC0F',
    textColor: '#0F380F',
    subtextColor: '#306230',
    textColorInv: '#AAC0AA',
    accent:'#8BAC0F',
    navBg:"#306230",
    accentPri: '#9BBC0F',
    accentSec: '#8BAC0F',
    textAccent:'#0F380F',
    mixBlendMode:'screen',
    stateSuccessBackground:'#8BAC0F',
  },
  sega: {
    audio:true,
    volume:0.5,
    bodyBackgroundColor: '#000000',
    backgroundColor: '#0000FF',
    surface1: '#FF0000',
    surface2: '#FFFF00',
    surface3:'#00FF00',
    backgroundColorInv: '#FFFFFF',
    headingColor: '#FFFF00',
    textColor: '#FFFFFF',
    subtextColor: '#00FF00',
    textColorInv: '#000000',
    accent:'#FF0000',
    navBg:"#0000FF",
    accentPri: '#FFFF00',
    accentSec: '#00FF00',
    textAccent:'#FF00FF',
    mixBlendMode:'screen',
    stateSuccessBackground:'#00FF00',
  },
  mustang69: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#1C1C1C',
    backgroundColor: '#2E2E2E',
    surface1: '#4A4A4A',
    surface2: '#D4AF37',
    surface3: '#8B0000',
    backgroundColorInv: '#F5F5F5',
    headingColor: '#D4AF37',
    textColor: '#F5F5F5',
    subtextColor: '#BDBDBD',
    textColorInv: '#1C1C1C',
    accent: '#8B0000',
    navBg: '#2E2E2E',
    accentPri: '#D4AF37',
    accentSec: '#8B0000',
    textAccent: '#D4AF37',
    mixBlendMode: 'overlay',
    stateSuccessBackground: '#006400',
  },
  camaro69: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#0F0F0F',
    backgroundColor: '#1E1E1E',
    surface1: '#3D3D3D',
    surface2: '#FFA500',
    surface3: '#4682B4',
    backgroundColorInv: '#F0F0F0',
    headingColor: '#FFA500',
    textColor: '#F0F0F0',
    subtextColor: '#A9A9A9',
    textColorInv: '#0F0F0F',
    accent: '#4682B4',
    navBg: '#1E1E1E',
    accentPri: '#FFA500',
    accentSec: '#4682B4',
    textAccent: '#FFA500',
    mixBlendMode: 'soft-light',
    stateSuccessBackground: '#228B22',
  },
  corvette72: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#141414',
    backgroundColor: '#232323',
    surface1: '#3C3C3C',
    surface2: '#C41E3A',
    surface3: '#708090',
    backgroundColorInv: '#F8F8F8',
    headingColor: '#C41E3A',
    textColor: '#F8F8F8',
    subtextColor: '#B0B0B0',
    textColorInv: '#141414',
    accent: '#708090',
    navBg: '#232323',
    accentPri: '#C41E3A',
    accentSec: '#708090',
    textAccent: '#C41E3A',
    mixBlendMode: 'multiply',
    stateSuccessBackground: '#2E8B57',
  },
  beetle68: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#F2F2F2',
    backgroundColor: '#E0E0E0',
    surface1: '#CCCCCC',
    surface2: '#4D7EA8',
    surface3: '#D84B20',
    backgroundColorInv: '#333333',
    headingColor: '#4D7EA8',
    textColor: '#333333',
    subtextColor: '#666666',
    textColorInv: '#F2F2F2',
    accent: '#D84B20',
    navBg: '#E0E0E0',
    accentPri: '#4D7EA8',
    accentSec: '#D84B20',
    textAccent: '#4D7EA8',
    mixBlendMode: 'normal',
    stateSuccessBackground: '#5CB85C',
  },
  audi80: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#1A1A1A',
    backgroundColor: '#2B2B2B',
    surface1: '#3D3D3D',
    surface2: '#B30000',
    surface3: '#8C8C8C',
    backgroundColorInv: '#F0F0F0',
    headingColor: '#B30000',
    textColor: '#F0F0F0',
    subtextColor: '#A9A9A9',
    textColorInv: '#1A1A1A',
    accent: '#8C8C8C',
    navBg: '#2B2B2B',
    accentPri: '#B30000',
    accentSec: '#8C8C8C',
    textAccent: '#B30000',
    mixBlendMode: 'overlay',
    stateSuccessBackground: '#4CAF50',
  },
  porsche911: {
    audio: true,
    volume: 0.5,
    bodyBackgroundColor: '#F0F0F0',
    backgroundColor: '#E6E6E6',
    surface1: '#D9D9D9',
    surface2: '#FF5722',
    surface3: '#795548',
    backgroundColorInv: '#212121',
    headingColor: '#FF5722',
    textColor: '#212121',
    subtextColor: '#757575',
    textColorInv: '#F0F0F0',
    accent: '#795548',
    navBg: '#E6E6E6',
    accentPri: '#FF5722',
    accentSec: '#795548',
    textAccent: '#FF5722',
    mixBlendMode: 'difference',
    stateSuccessBackground: '#66BB6A',
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



// Animation themes
// const animationThemes = {
//   fadeup: {
//     animation: 'fadeup'
//   },
//   fadedown: {
//     animation: 'fadedown'
//   },
//   wave: {
//     animation: 'wave'
//   },
//   leafFall: {
//     animation: 'leaf-fall'
//   }
// };




// Layout themes
// const layoutThemes = {
//   wide: {
//     layout: 'wide'
//   },
//   narrow: {
//     layout: 'narrow'
//   },
//   grid: {
//     layout: 'grid'
//   },
//   column: {
//     layout: 'column'
//   }
// };

// Image themes
// const imageThemes = {
//   wide: {
//     layout: 'wide'
//   },
//   narrow: {
//     layout: 'narrow'
//   },
//   grid: {
//     layout: 'grid'
//   },
//   column: {
//     layout: 'column'
//   }
// };

// const transitionThemes = {
//   wide: {
//     layout: 'wide'
//   },
//   narrow: {
//     layout: 'narrow'
//   },
//   grid: {
//     layout: 'grid'
//   },
//   column: {
//     layout: 'column'
//   }
// };

// Merge themes
export const themes = {
  light: {
    key: 'light', // Key for the light theme
    ...colorThemes.light,
  },
  dark: {
    key: 'dark', // Key for the dark theme
    ...colorThemes.dark,
  },
  tokyo: {
    key: 'tokyo', // Key for the tokyo theme
    ...colorThemes.tokyo,
  },
  custom: {
    key: 'custom', // Key for the custom theme
    ...colorThemes.custom,
  },
  amberMonochrome: {
    key: 'amberMonochrome', // Key for the amber monochrome theme
    ...colorThemes.amberMonochrome,
  },
  greenPhosphor: {
    key: 'greenPhosphor', // Key for the green phosphor theme
    ...colorThemes.greenPhosphor,
  },
  ibmPcXt: {
    key: 'ibmPcXt', // Key for the IBM PC XT theme
    ...colorThemes.ibmPcXt,
  },
  commodore64: {
    key: 'commodore64',
    ...colorThemes.commodore64,
  },
  appleII: {
    key: 'appleII',
    ...colorThemes.appleII,
  },
  zxSpectrum: {
    key: 'zxSpectrum',
    ...colorThemes.zxSpectrum,
  },
  atari8bit: {
    key: 'atari8bit',
    ...colorThemes.atari8bit,
  },
  msdos: {
    key: 'msdos',
    ...colorThemes.msdos,
  },
  amegaWorkbench: {
    key: 'amegaWorkbench',
    ...colorThemes.amigaWorkbench,
  },
  nes: {
    key: 'nes',
    ...colorThemes.nes,
  },
  gameboy: {
    key: 'gameboy',
    ...colorThemes.gameboy,
  },
  sega: {
    key: 'sega',
    ...colorThemes.sega,
  },
  mustang69: {
    key: 'mustang69',
    ...colorThemes.mustang69,
  },
  camaro69: {
    key: 'camaro69',
    ...colorThemes.camaro69,
  },
  corvette72: {
    key: 'corvette72',
    ...colorThemes.corvette72,
  },
  beetle68: {
    key: 'beetle68',
    ...colorThemes.beetle68,
  },
  audi80: {
    key: 'audi80',
    ...colorThemes.audi80,
  },
  audi80: {
    key: 'audi80',
    ...colorThemes.audi80,
  },
  audi80: {
    key: 'audi80',
    ...colorThemes.audi80,
  },
  porsche911: {
    key: 'porsche911',
    ...colorThemes.porsche911,
  },
};

// // Function to get theme by key
// export function getThemeByKey(themeKey) {
//   return themes[themeKey];
// }

// // Function to update theme
// export function updateTheme(themeKey, updates) {
//   if (themes[themeKey]) {
//     Object.assign(themes[themeKey], updates);
//   }
// }