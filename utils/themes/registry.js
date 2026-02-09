/**
 * Theme registry -- utility functions and composed theme definitions
 * @module utils/themes/registry
 */

import { colorThemes } from './colors';
import { navigationThemes } from './config/options';
import { themeContent } from './config/defaults';

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

export const getThemeValue = (key) => {
  const root = document.documentElement;
  const cssVarName = `--${key}`;
  const value = getComputedStyle(root).getPropertyValue(cssVarName).trim();
  return value || null;
};

export const themes = {
  light: {
    name: "light",
    data: {
      key: "light",
      ...colorThemes.light,
      ...themeContent,
      navTheme:navigationThemes.applause,
    },
  },
  dark: {
    name: "dark",
    data: {
      key: "dark",
      ...colorThemes.dark,
      ...themeContent,
      navTheme:navigationThemes.applauseMain,
    },
  },
  custom: {
    name: "custom",
    data: {
      key: "custom",
      ...colorThemes.custom,
      ...themeContent,
    },
  },
  neonNoir: {
    name: "neonNoir",
    data: {
      key: "neonNoir",
      ...colorThemes.neonNoir,
      ...themeContent,
    },
  },
  zenGardenPalette: {
    name: "zenGardenPalette",
    data: {
      key: "zenGardenPalette",
      ...colorThemes.zenGardenPalette,
      ...themeContent,
    },
  },


    
  amberMonochrome: {
    name: "amberMonochrome",
    data: {
      key: "amberMonochrome",
      ...colorThemes.amberMonochrome,
      ...themeContent,
      navTheme:navigationThemes.awwwards
    },
  },
  greenPhosphor: {
    name: "greenPhosphor",
    data: {
      key: "greenPhosphor",
      ...colorThemes.greenPhosphor,
      ...themeContent,
    },
  },
  ibmPcXt: {
    name: "ibmPcXt",
    data: {
      key: "ibmPcXt",
      ...colorThemes.ibmPcXt,
      ...themeContent,
    },
  },
  commodore64: {
    name: "commodore64",
    data: {
      key: "commodore64",
      ...colorThemes.commodore64,
      ...themeContent,
    },
  },
  appleII: {
    name: "appleII",
    data: {
      key: "appleII",
      ...colorThemes.appleII,
      ...themeContent,
    },
  },
  zxSpectrum: {
    name: "zxSpectrum",
    data: {
      key: "zxSpectrum",
      ...colorThemes.zxSpectrum,
      ...themeContent,
    },
  },
  atari8bit: {
    name: "atari8bit",
    data: {
      key: "atari8bit",
      ...colorThemes.atari8bit,
      ...themeContent,
    },
  },
  msdos: {
    name: "msdos",
    data: {
      key: "msdos",
      ...colorThemes.msdos,
      ...themeContent,
    },
  },
  amigaWorkbench: {
    name: "amigaWorkbench",
    data: {
      key: "amigaWorkbench",
      ...colorThemes.amigaWorkbench,
      ...themeContent,
    },
  },
  nes: {
    name: "nes",
    data: {
      key: "nes",
      ...colorThemes.nes,
      ...themeContent,
    },
  },
  gameboy: {
    name: "gameboy",
    data: {
      key: "gameboy",
      ...colorThemes.gameboy,
      ...themeContent,
    },
  },
  // sega: {
  //   name: "sega",
  //   data: {
  //     key: "sega",
  //     ...colorThemes.sega,
  //     ...themeContent,
  //   },
  // },
  // mustang69: {
  //   name: "mustang69",
  //   data: {
  //     key: "mustang69",
  //     ...colorThemes.mustang69,
  //     ...themeContent,
  //   },
  // },
  // camaro69: {
  //   name: "camaro69",
  //   data: {
  //     key: "camaro69",
  //     ...colorThemes.camaro69,
  //     ...themeContent,
  //   },
  // },
  // corvette72: {
  //   name: "corvette72",
  //   data: {
  //     key: "corvette72",
  //     ...colorThemes.corvette72,
  //     ...themeContent,
  //   },
  // },
  // beetle68: {
  //   name: "beetle68",
  //   data: {
  //     key: "beetle68",
  //     ...colorThemes.beetle68,
  //     ...themeContent,
  //   },
  // },
  // audi80: {
  //   name: "audi80",
  //   data: {
  //     key: "audi80",
  //     ...colorThemes.audi80,
  //     ...themeContent,
  //   },
  // },
  // porsche911: {
  //   name: "porsche911",
  //   data: {
  //     key: "porsche911",
  //     ...colorThemes.porsche911,
  //     ...themeContent,
  //   },
  // },
  // spiritedAway: {
  //   name: "spiritedAway",
  //   data: {
  //     key: "spiritedAway",
  //     ...colorThemes.spiritedAway,
  //     ...themeContent,
  //   },
  // },
  // myNeighborTotoro: {
  //   name: "myNeighborTotoro",
  //   data: {
  //     key: "myNeighborTotoro",
  //     ...colorThemes.myNeighborTotoro,
  //     ...themeContent,
  //   },
  // },
  // howlsMovingCastle: {
  //   name: "howlsMovingCastle",
  //   data: {
  //     key: "howlsMovingCastle",
  //     ...colorThemes.howlsMovingCastle,
  //     ...themeContent,
  //   },
  // },
  // sakuraBreeze: {
  //   name: "sakuraBreeze",
  //   data: {
  //     key: "sakuraBreeze",
  //     ...colorThemes.sakuraBreeze,
  //     ...themeContent,
  //   },
  // },
  // zenGarden: {
  //   name: "zenGarden",
  //   data: {
  //     key: "zenGarden",
  //     ...colorThemes.zenGarden,
  //     ...themeContent,
  //   },
  // },
  // pastelAnime: {
  //   name: "pastelAnime",
  //   data: {
  //     key: "pastelAnime",
  //     ...colorThemes.pastelAnime,
  //     ...themeContent,
  //   },
  // },
  // deathNote: {
  //   name: "deathNote",
  //   data: {
  //     key: "deathNote",
  //     ...colorThemes.deathNote,
  //     ...themeContent,
  //   },
  // },
  // attackOnTitan: {
  //   name: "attackOnTitan",
  //   data: {
  //     key: "attackOnTitan",
  //     ...colorThemes.attackOnTitan,
  //     ...themeContent,
  //   },
  // },
  // tokyoGhoul: {
  //   name: "tokyoGhoul",
  //   data: {
  //     key: "tokyoGhoul",
  //     ...colorThemes.tokyoGhoul,
  //     ...themeContent,
  //   },
  // },
  // akc12: {
  //   name: "akc12",
  //   data: {
  //     key: "akc12",
  //     ...colorThemes.akc12,
  //     ...themeContent,
  //   },
  // },
  // taikonColor24: {
  //   name: "taikonColor24",
  //   data: {
  //     key: "taikonColor24",
  //     ...colorThemes.taikonColor24,
  //     ...themeContent,
  //   },
  // },
  // eightVision: {
  //   name: "eightVision",
  //   data: {
  //     key: "eightVision",
  //     ...colorThemes.eightVision,
  //     ...themeContent,
  //   },
  // },
  // cgaPalette0Low: {
  //   name: "cgaPalette0Low",
  //   data: {
  //     key: "cgaPalette0Low",
  //     ...colorThemes.cgaPalette0Low,
  //     ...themeContent,
  //   },
  // },
  // metallicChic: {
  //   name: "metallicChic",
  //   data: {
  //     key: "metallicChic",
  //     ...colorThemes.metallicChic,
  //     ...themeContent,
  //   },
  // },
  // deepVintageMood: {
  //   name: "deepVintageMood",
  //   data: {
  //     key: "deepVintageMood",
  //     ...colorThemes.deepVintageMood,
  //     ...themeContent,
  //   },
  // },
  // coolAndCollected: {
  //   name: "coolAndCollected",
  //   data: {
  //     key: "coolAndCollected",
  //     ...colorThemes.coolAndCollected,
  //     ...themeContent,
  //   },
  // },
  // earthyAndSerene: {
  //   name: "earthyAndSerene",
  //   data: {
  //     key: "earthyAndSerene",
  //     ...colorThemes.earthyAndSerene,
  //     ...themeContent,
  //   },
  // },
  // textureAndContrast: {
  //   name: "textureAndContrast",
  //   data: {
  //     key: "textureAndContrast",
  //     ...colorThemes.textureAndContrast,
  //     ...themeContent,
  //   },
  // },
  // mechanicalAndFloaty: {
  //   name: "mechanicalAndFloaty",
  //   data: {
  //     key: "mechanicalAndFloaty",
  //     ...colorThemes.mechanicalAndFloaty,
  //     ...themeContent,
  //   },
  // },
  // pixelIntensity: {
  //   name: "pixelIntensity",
  //   data: {
  //     key: "pixelIntensity",
  //     ...colorThemes.pixelIntensity,
  //     ...themeContent,
  //   },
  // },
  // gradientPop: {
  //   name: "gradientPop",
  //   data: {
  //     key: "gradientPop",
  //     ...colorThemes.gradientPop,
  //     ...themeContent,
  //   },
  // },
  // cosmicArtistry: {
  //   name: "cosmicArtistry",
  //   data: {
  //     key: "cosmicArtistry",
  //     ...colorThemes.cosmicArtistry,
  //     ...themeContent,
  //   },
  // },
  // vibrantButCalm: {
  //   name: "vibrantButCalm",
  //   data: {
  //     key: "vibrantButCalm",
  //     ...colorThemes.vibrantButCalm,
  //     ...themeContent,
  //   },
  // },
  // livelyAndInviting: {
  //   name: "livelyAndInviting",
  //   data: {
  //     key: "livelyAndInviting",
  //     ...colorThemes.livelyAndInviting,
  //     ...themeContent,
  //   },
  // },
  // strikingAndSimple: {
  //   name: "strikingAndSimple",
  //   data: {
  //     key: "strikingAndSimple",
  //     ...colorThemes.strikingAndSimple,
  //     ...themeContent,
  //   },
  // },
  // redAndLively: {
  //   name: "redAndLively",
  //   data: {
  //     key: "redAndLively",
  //     ...colorThemes.redAndLively,
  //     ...themeContent,
  //   },
  // },
  // artsyAndCreative: {
  //   name: "artsyAndCreative",
  //   data: {
  //     key: "artsyAndCreative",
  //     ...colorThemes.artsyAndCreative,
  //     ...themeContent,
  //   },
  // },
  // elegantYetApproachable: {
  //   name: "elegantYetApproachable",
  //   data: {
  //     key: "elegantYetApproachable",
  //     ...colorThemes.elegantYetApproachable,
  //     ...themeContent,
  //   },
  // },
  // sleekAndFuturistic: {
  //   name: "sleekAndFuturistic",
  //   data: {
  //     key: "sleekAndFuturistic",
  //     ...colorThemes.sleekAndFuturistic,
  //     ...themeContent,
  //   },
  // },
  // innovativeAndAudacious: {
  //   name: "innovativeAndAudacious",
  //   data: {
  //     key: "innovativeAndAudacious",
  //     ...colorThemes.innovativeAndAudacious,
  //     ...themeContent,
  //   },
  // },
};
