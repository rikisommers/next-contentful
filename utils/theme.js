
const soundThemes = {
  default: "default",
  click: "click",
}

const colorThemes = {
  light: {
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
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    gradStart: '#EF7801',
    gradStop: '#f4f4f5',
    textAccent:'#d946ef',
    stateSuccessBackground:'#d946ef',
    accentImageBg: '#EF7801', // Matching accentPri
  },
  dark: {
    bodyBackgroundColor: '#271C1B',
    backgroundColor: '#47362E',
    surface1: '#c1c1c1',
    surface2: '#6f6f6f',
    surface3:'#C0C6C9',
    backgroundColorInv: '#f4f4f5',
    headingColor: '#e4e4e7',
    textColor: '#fafafa',
    subtextColor: '#FE8500',
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    gradStart: '#EF7801',
    gradStop: '#47362E',
    textAccent:'#99f6e4',
    stateSuccessBackground:'#d946ef',
    accentImageBg: '#EF7801', // Matching accentPri
  },
  tokyo: {
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
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    gradStart: '#EF7801',
    gradStop: '#F7FCFE',
    textAccent:'#BED3CD',
    stateSuccessBackground:'#BED3CD',
    accentImageBg: '#EF7801', // Matching accentPri
  },
  amberMonochrome: {
    key: 'amberMonochrome', // Key for the amber monochrome theme
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
    navBg:"#332900",
    accentPri: '#FFB000',
    accentSec: '#FFD700',
    textAccent:'#FFEA00',
    stateSuccessBackground:'#4D3D00',
    gradStart: '#FFB000', // Using accentPri as gradStart
    gradStop: '#1A1A00',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FFB000', // Matching accentPri
  },
  greenPhosphor: {
    key: 'greenPhosphor', // Key for the green phosphor theme
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
    navBg:"#003300",
    accentPri: '#00FF00',
    accentSec: '#00FF33',
    textAccent:'#33FF33',
    stateSuccessBackground:'#004400',
    gradStart: '#00FF00', // Using accentPri as gradStart
    gradStop: '#002200',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#00FF00', // Matching accentPri
  },
  ibmPcXt: {
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
    navBg:"#000055",
    accentPri: '#FFFF55',
    accentSec: '#55FF55',
    textAccent:'#FF5555',
    stateSuccessBackground:'#55FF55',
    gradStart: '#FFFF55', // Using accentPri as gradStart
    gradStop: '#0000AA',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FFFF55', // Matching accentPri
  },
  commodore64: {
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
    navBg:"#8F84D9",
    accentPri: '#A59FE6',
    accentSec: '#BCBAF0',
    textAccent:'#FFFFFF',
    stateSuccessBackground:'#A59FE6',
    gradStart: '#A59FE6', // Using accentPri as gradStart
    gradStop: '#7869C4',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#A59FE6', // Matching accentPri
  },
  appleII: {
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
    navBg:"#383838",
    accentPri: '#66FF66',
    accentSec: '#FF6666',
    textAccent:'#66FFFF',
    stateSuccessBackground:'#555555',
    gradStart: '#66FF66', // Using accentPri as gradStart
    gradStop: '#1B1B1B',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#66FF66', // Matching accentPri
  },
  zxSpectrum: {
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
    navBg:"#0000FF",
    accentPri: '#FFFF00',
    accentSec: '#FF00FF',
    textAccent:'#00FF00',
    stateSuccessBackground:'#00D8FF',
    gradStart: '#FFFF00',
    gradStop: '#0000D8',
    accentImageBg: '#FFFF00', // Matching accentPri
  },
  atari8bit: {
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
    navBg:"#686868",
    accentPri: '#50E080',
    accentSec: '#E05050',
    textAccent:'#E0E050',
    stateSuccessBackground:'#909090',
    gradStart: '#50E080',
    gradStop: '#404040',
    accentImageBg: '#50E080', // Matching accentPri
  },
  msdos: {
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
    navBg:"#0000D0",
    accentPri: '#FFFF00',
    accentSec: '#00FFFF',
    textAccent:'#FF00FF',
    stateSuccessBackground:'#0000F8',
    gradStart: '#FFFF00',
    gradStop: '#0000A8',
    accentImageBg: '#FFFF00', // Matching accentPri
  },
  amigaWorkbench: {
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
    navBg:"#0099AA",
    accentPri: '#FF8800',
    accentSec: '#FFAA00',
    textAccent:'#00FFFF',
    stateSuccessBackground:'#00BBAA',
    gradStart: '#FF8800',
    gradStop: '#0077AA',
    accentImageBg: '#FF8800', // Matching accentPri
  },
  custom: {
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
    navBg:"#C0C6C9",
    accentPri: '#EF7801',
    accentSec: '#FCD00A',
    textAccent:'#BED3CD',
    stateSuccessBackground:'#BED3CD',
    gradStart: '#EF7801', // Using accentPri as gradStart
    gradStop: '#F8FBF8',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  nes: {
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
    navBg:"#7C7C7C",
    navBg:"#7C7C7C",
    accentPri: '#FC9838',
    accentSec: '#F8D800',
    textAccent:'#00B800',
    stateSuccessBackground:'#00B800',
    gradStart: '#FC9838', // Using accentPri as gradStart
    gradStop: '#7C7C7C',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  gameboy: {
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
    navBg:"#306230",
    accentPri: '#9BBC0F',
    accentSec: '#8BAC0F',
    textAccent:'#0F380F',
    stateSuccessBackground:'#8BAC0F',
    gradStart: '#9BBC0F', // Using accentPri as gradStart
    gradStop: '#306230',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  sega: {
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
    navBg:"#0000FF",
    accentPri: '#FFFF00',
    accentSec: '#00FF00',
    textAccent:'#FF00FF',
    stateSuccessBackground:'#00FF00',
    gradStart: '#FFFF00', // Using accentPri as gradStart
    gradStop: '#0000FF',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  mustang69: {
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
    navBg: '#2E2E2E',
    accentPri: '#D4AF37',
    accentSec: '#8B0000',
    textAccent: '#D4AF37',
    stateSuccessBackground: '#006400',
    gradStart: '#D4AF37', // Using accentPri as gradStart
    gradStop: '#2E2E2E',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#D4AF37', // Matching accentPri
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  camaro69: {
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
    navBg: '#1E1E1E',
    accentPri: '#FFA500',
    accentSec: '#4682B4',
    textAccent: '#FFA500',
    stateSuccessBackground: '#228B22',
    gradStart: '#FFA500', // Using accentPri as gradStart
    gradStop: '#1E1E1E',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FFA500', // Matching accentPri
  },
  corvette72: {
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
    navBg: '#232323',
    accentPri: '#C41E3A',
    accentSec: '#708090',
    textAccent: '#C41E3A',
    stateSuccessBackground: '#2E8B57',
    gradStart: '#C41E3A', // Using accentPri as gradStart
    gradStop: '#232323',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#C41E3A', // Matching accentPri
  },
  beetle68: {
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
    navBg: '#E0E0E0',
    accentPri: '#4D7EA8',
    accentSec: '#D84B20',
    textAccent: '#4D7EA8',
    stateSuccessBackground: '#5CB85C',
    gradStart: '#4D7EA8', // Using accentPri as gradStart
    gradStop: '#E0E0E0',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri
  },
  audi80: {
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
    navBg: '#2B2B2B',
    accentPri: '#B30000',
    accentSec: '#8C8C8C',
    textAccent: '#B30000',
    stateSuccessBackground: '#4CAF50',
    gradStart: '#B30000', // Using accentPri as gradStart
    gradStop: '#2B2B2B',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  porsche911: {
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
    navBg: '#E6E6E6',
    accentPri: '#FF5722',
    accentSec: '#795548',
    textAccent: '#FF5722',
    stateSuccessBackground: '#66BB6A',
    gradStart: '#FF5722', // Using accentPri as gradStart
    gradStop: '#E6E6E6',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  spiritedAway: {
    bodyBackgroundColor: '#E6D7B9', // Light sand color from the bathhouse
    backgroundColor: '#B9D7E6', // Soft sky blue from daytime scenes
    surface1: '#D1E8E2', // Pale teal from Haku's dragon form
    surface2: '#F1D4B3', // Warm light from lanterns
    surface3: '#E6C2C2', // Soft pink from Chihiro's clothes
    backgroundColorInv: '#1E434C', // Deep teal from night scenes
    headingColor: '#9B1B30', // Rich red from Yubaba's dress
    textColor: '#4A4737', // Earthy brown from wooden structures
    subtextColor: '#7A8C85', // Muted green from forest scenes
    textColorInv: '#F0EAD6', // Cream color from paper
    navBg: '#CDE6F5', // Light blue from sky scenes
    accentPri: '#8A9A5B', // Moss green from forest spirits
    accentSec: '#D4AF37', // Gold from the bathhouse details
    textAccent: '#7B3F00', // Rich brown from Kamaji's skin
    stateSuccessBackground: '#98D98E', // Soft green from grassy areas
    gradStart: '#D4AF37', // Using accentSec as gradStart
    gradStop: '#B9D7E6',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#D4AF37', // Matching accentPri
  },

  myNeighborTotoro: {
    bodyBackgroundColor: '#E8F3E8', // Soft green from forest scenes
    backgroundColor: '#B5D8E6', // Light blue from sky scenes
    surface1: '#F3E8E8', // Pale pink from Mei's dress
    surface2: '#E6DFC8', // Light beige from Totoro's fur
    surface3: '#D1E8D1', // Pastel green from leaves
    backgroundColorInv: '#4C3228', // Dark brown from tree trunks
    headingColor: '#7BA05B', // Leaf green from forest canopy
    textColor: '#4F4A45', // Warm gray from house interiors
    subtextColor: '#8E9B97', // Muted teal from rainy scenes
    textColorInv: '#F4F1E0', // Cream color from clouds
    navBg: '#D6E6F2', // Soft blue from rainy skies
    accentPri: '#9ED2C6', // Teal from the Cat Bus
    accentSec: '#FAE03C', // Bright yellow from Mei's hat
    textAccent: '#A52A2A', // Reddish-brown from Satsuki's hair
    stateSuccessBackground: '#98FB98', // Pale green from grass
    gradStart: '#FAE03C', // Using accentSec as gradStart
    gradStop: '#B5D8E6',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#9ED2C6', // Matching accentPri

  },

  howlsMovingCastle: {
    bodyBackgroundColor: '#F0E6D2', // Soft beige from castle exterior
    backgroundColor: '#D6E6F2', // Light blue from sky scenes
    surface1: '#E6D2D2', // Pale pink from Sophie's dress
    surface2: '#D2E6D6', // Light green from meadow scenes
    surface3: '#E6E6D2', // Pale yellow from Howl's hair
    backgroundColorInv: '#4A4E69', // Deep blue-gray from night scenes
    headingColor: '#8E6C88', // Muted purple from Howl's jacket
    textColor: '#5D5C61', // Charcoal gray from castle interiors
    subtextColor: '#7D8491', // Cool gray from cloudy scenes
    textColorInv: '#F7F9F9', // Off-white from steam
    navBg: '#E6F2D6', // Pale green from countryside scenes
    accentPri: '#7FB7BE', // Teal from Calcifer
    accentSec: '#FDFD96', // Light yellow from magic spells
    textAccent: '#D64161', // Pink-red from Howl's pendant
    stateSuccessBackground: '#90EE90', // Light green from grassy hills
    gradStart: '#FDFD96', // Using accentSec as gradStart
    gradStop: '#D6E6F2',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#7FB7BE', // Matching accentPri
  },

  sakuraBreeze: {
    bodyBackgroundColor: '#FFF0F5', // Light pink
    backgroundColor: '#FFE4E1', // Misty rose
    surface1: '#FFF5EE', // Seashell
    surface2: '#F0FFF0', // Honeydew
    surface3: '#F0FFFF', // Azure
    backgroundColorInv: '#4B0082', // Indigo
    headingColor: '#DB7093', // Pale violet red
    textColor: '#696969', // Dim gray
    subtextColor: '#A9A9A9', // Dark gray
    textColorInv: '#FFFFFF', // White
    navBg: '#E6E6FA', // Lavender
    accentPri: '#DDA0DD', // Plum
    accentSec: '#98FB98', // Pale green
    textAccent: '#20B2AA', // Light sea green
    stateSuccessBackground: '#90EE90', // Light green
    gradStart: '#DDA0DD', // Using accentPri as gradStart
    gradStop: '#FFE4E1',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#DDA0DD', // Matching accentPri
  },

  zenGarden: {
    bodyBackgroundColor: '#F5F5F5', // White smoke
    backgroundColor: '#E0F0E0', // Light mint
    surface1: '#F0F8FF', // Alice blue
    surface2: '#F5FFFA', // Mint cream
    surface3: '#F0FFF0', // Honeydew
    backgroundColorInv: '#2F4F4F', // Dark slate gray
    headingColor: '#556B2F', // Dark olive green
    textColor: '#696969', // Dim gray
    subtextColor: '#808080', // Gray
    textColorInv: '#FFFFFF', // White
    navBg: '#E6E6FA', // Lavender
    accentPri: '#6B8E23', // Olive drab
    accentSec: '#7FFFD4', // Aquamarine
    textAccent: '#4682B4', // Steel blue
    stateSuccessBackground: '#98FB98', // Pale green
    gradStart: '#6B8E23', // Using accentPri as gradStart
    gradStop: '#E0F0E0',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  pastelAnime: {
    bodyBackgroundColor: '#FAFAFA', // Near white
    backgroundColor: '#FFE4E1', // Misty rose
    surface1: '#E6E6FA', // Lavender
    surface2: '#F0E6FF', // Light pastel purple
    surface3: '#FFE4B5', // Moccasin
    backgroundColorInv: '#4B0082', // Indigo
    headingColor: '#DDA0DD', // Plum
    textColor: '#708090', // Slate gray
    subtextColor: '#A9A9A9', // Dark gray
    textColorInv: '#FFFFFF', // White
    navBg: '#F0FFF0', // Honeydew
    accentPri: '#87CEFA', // Light sky blue
    accentSec: '#98FB98', // Pale green
    textAccent: '#FF69B4', // Hot pink
    stateSuccessBackground: '#90EE90', // Light green
    gradStart: '#87CEFA', // Using accentPri as gradStart
    gradStop: '#FFE4E1',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  deathNote: {
    bodyBackgroundColor: '#1A1A1A', // Dark gray background
    backgroundColor: '#2C2C2C', // Slightly lighter gray
    surface1: '#3D3D3D', // Medium gray
    surface2: '#4F4F4F', // Light gray
    surface3: '#616161', // Lighter gray
    backgroundColorInv: '#F0F0F0', // Off-white
    headingColor: '#C41E3A', // Blood red for headings
    textColor: '#D3D3D3', // Light gray text
    subtextColor: '#A9A9A9', // Dark gray subtext
    textColorInv: '#1A1A1A', // Dark gray on light background
    navBg: '#2C2C2C', // Same as backgroundColor
    accentPri: '#C41E3A', // Blood red primary accent
    accentSec: '#4B0082', // Indigo secondary accent
    textAccent: '#FFD700', // Gold for text accents
    stateSuccessBackground: '#006400', // Dark green for success states
    gradStart: '#C41E3A', // Using accentPri as gradStart
    gradStop: '#2C2C2C',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  attackOnTitan: {
    bodyBackgroundColor: '#2B2B2B', // Dark gray background
    backgroundColor: '#3C3C3C', // Slightly lighter gray
    surface1: '#4D4D4D', // Medium gray
    surface2: '#5E5E5E', // Light gray
    surface3: '#6F6F6F', // Lighter gray
    backgroundColorInv: '#E0E0E0', // Light gray
    headingColor: '#8B4513', // Saddle brown for headings
    textColor: '#D2B48C', // Tan text color
    subtextColor: '#A0522D', // Sienna subtext
    textColorInv: '#2B2B2B', // Dark gray on light background
    navBg: '#3C3C3C', // Same as backgroundColor
    accentPri: '#8B4513', // Saddle brown primary accent
    accentSec: '#D2691E', // Chocolate secondary accent
    textAccent: '#F4A460', // Sandy brown for text accents
    stateSuccessBackground: '#556B2F', // Dark olive green for success states
    gradStart: '#8B4513', // Using accentPri as gradStart
    gradStop: '#3C3C3C',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  tokyoGhoul: {
    bodyBackgroundColor: '#1C1C1C', // Very dark gray background
    backgroundColor: '#2D2D2D', // Dark gray
    surface1: '#3E3E3E', // Medium gray
    surface2: '#4F4F4F', // Light gray
    surface3: '#606060', // Lighter gray
    backgroundColorInv: '#E6E6E6', // Very light gray
    headingColor: '#DC143C', // Crimson for headings
    textColor: '#C0C0C0', // Silver text color
    subtextColor: '#A9A9A9', // Dark gray subtext
    textColorInv: '#1C1C1C', // Very dark gray on light background
    navBg: '#2D2D2D', // Same as backgroundColor
    accentPri: '#DC143C', // Crimson primary accent
    accentSec: '#8B0000', // Dark red secondary accent
    textAccent: '#00CED1', // Dark turquoise for text accents
    stateSuccessBackground: '#2E8B57', // Sea green for success states
    gradStart: '#DC143C', // Using accentPri as gradStart
    gradStop: '#2D2D2D',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  akc12: {
    bodyBackgroundColor: '#000000', // Black
    backgroundColor: '#1A1A1A', // Dark gray
    surface1: '#333333', // Medium gray
    surface2: '#4D4D4D', // Light gray
    surface3: '#666666', // Lighter gray
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#00FFFF', // Cyan
    textColor: '#00FF00', // Green
    subtextColor: '#008080', // Teal
    textColorInv: '#000000', // Black
    navBg: '#333333', // Medium gray
    accentPri: '#FF0000', // Red
    accentSec: '#0000FF', // Blue
    textAccent: '#FFFF00', // Yellow
    stateSuccessBackground: '#008000', // Dark green
    gradStart: '#FF0000', // Using accentPri as gradStart
    gradStop: '#1A1A1A',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  taikonColor24: {
    bodyBackgroundColor: '#1A1A1A', // Dark gray
    backgroundColor: '#2D2D2D', // Medium gray
    surface1: '#404040', // Light gray
    surface2: '#535353', // Lighter gray
    surface3: '#666666', // Even lighter gray
    backgroundColorInv: '#F0F0F0', // Very light gray
    headingColor: '#FF6B6B', // Soft red
    textColor: '#4ECDC4', // Turquoise
    subtextColor: '#45B7A0', // Dark turquoise
    textColorInv: '#1A1A1A', // Dark gray
    navBg: '#404040', // Light gray
    accentPri: '#FF6B6B', // Soft red
    accentSec: '#4ECDC4', // Turquoise
    textAccent: '#FF8C42', // Orange
    stateSuccessBackground: '#6BFF74', // Light green
    gradStart: '#FF6B6B', // Using accentPri as gradStart
    gradStop: '#2D2D2D',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF6B6B', // Matching accentPri
  },

  eightVision: {
    bodyBackgroundColor: '#000000', // Black
    backgroundColor: '#21211F', // Very dark gray
    surface1: '#3F3F3B', // Dark gray
    surface2: '#5D5D57', // Medium gray
    surface3: '#7B7B73', // Light gray
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#55FFFF', // Cyan
    textColor: '#55FF55', // Green
    subtextColor: '#FFFF55', // Yellow
    textColorInv: '#000000', // Black
    navBg: '#3F3F3B', // Dark gray
    accentPri: '#FF55FF', // Magenta
    accentSec: '#5555FF', // Blue
    textAccent: '#FFFFFF', // White
    stateSuccessBackground: '#00AA00', // Dark green
    gradStart: 'red', // Using accentPri as gradStart
    gradStop: 'blue',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF55FF', // Matching accentPri
  },

  cgaPalette0Low: {
    bodyBackgroundColor: '#000000', // Black
    backgroundColor: '#0000AA', // Blue
    surface1: '#00AA00', // Green
    surface2: '#00AAAA', // Cyan
    surface3: '#AA0000', // Red
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#AA00AA', // Magenta
    textColor: '#AAAAAA', // Light gray
    subtextColor: '#555555', // Dark gray
    textColorInv: '#000000', // Black
    navBg: '#0000AA', // Blue
    accentPri: '#AA0000', // Red
    accentImageBg: '#AA0000', // Matching accentPri
    accentSec: '#00AA00', // Green
    textAccent: '#AA00AA', // Magenta
    stateSuccessBackground: '#00AA00', // Green
    gradStart: '#AA0000', // Using accentPri as gradStart
    gradStop: '#0000AA',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },
  metallicChic: {
    bodyBackgroundColor: '#607D8B', // Blue gradient
    backgroundColor: '#D1C4E9', // Metallic touches
    surface1: '#7891A1', // Lighter blue gradient
    surface2: '#E0D6F2', // Lighter metallic
    surface3: '#4E6875', // Darker blue gradient
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#455A64', // Darker blue
    textColor: '#212121', // Almost black
    subtextColor: '#757575', // Gray
    textColorInv: '#FFFFFF', // White
    navBg: '#D1C4E9', // Metallic touches
    accentPri: '#3F51B5', // Indigo
    accentSec: '#7986CB', // Lighter indigo
    textAccent: '#5C6BC0', // Mid indigo
    stateSuccessBackground: '#81C784', // Light green
    gradStart: '#3F51B5', // Using accentPri as gradStart
    gradStop: '#D1C4E9',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  deepVintageMood: {
    bodyBackgroundColor: '#173F5F', // Deep blue gradient
    backgroundColor: '#D98E5D', // Earthy terracotta
    surface1: '#1D4E75', // Lighter deep blue
    surface2: '#E0A575', // Lighter terracotta
    surface3: '#B0A19D', // Metallic touches
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#000000', // Black
    textColor: '#FFFFFF', // White
    subtextColor: '#B0A19D', // Metallic touches
    textColorInv: '#000000', // Black
    navBg: '#173F5F', // Deep blue gradient
    accentPri: '#D98E5D', // Earthy terracotta
    accentSec: '#B0A19D', // Metallic touches
    textAccent: '#E0A575', // Lighter terracotta
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#D98E5D', // Using accentPri as gradStart
    gradStop: '#D98E5D',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#4D7EA8', // Matching accentPri

  },

  coolAndCollected: {
    bodyBackgroundColor: '#004D4D', // Deep teal
    backgroundColor: '#C5CAE9', // Bright metallics
    surface1: '#006666', // Lighter deep teal
    surface2: '#D0D4F0', // Lighter bright metallics
    surface3: '#003333', // Darker deep teal
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#001F1F', // Darkest teal
    textColor: '#FFFFFF', // White
    subtextColor: '#A4A8C7', // Darker bright metallics
    textColorInv: '#004D4D', // Deep teal
    navBg: '#004D4D', // Deep teal
    accentPri: '#3F51B5', // Indigo
    accentSec: '#5C6BC0', // Lighter indigo
    textAccent: '#9FA8DA', // Light indigo
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#3F51B5', // Using accentPri as gradStart
    gradStop: '#C5CAE9',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#3F51B5', // Matching accentPri
  },

  earthyAndSerene: {
    bodyBackgroundColor: '#E0C097', // Sandy tones
    backgroundColor: '#6B6B6B', // Slate gray
    surface1: '#B37445', // Clay
    surface2: '#7EC8E3', // Sky blue
    surface3: '#3B7A57', // Fern green
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#4A4A4A', // Darker slate gray
    textColor: '#333333', // Dark gray
    subtextColor: '#555555', // Medium gray
    textColorInv: '#FFFFFF', // White
    navBg: '#6B6B6B', // Slate gray
    accentPri: '#B37445', // Clay
    accentSec: '#3B7A57', // Fern green
    textAccent: '#E0C097', // Sandy tones
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#B37445', // Using accentPri as gradStart
    gradStop: '#6B6B6B',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#B37445', // Matching accentPri
  },

  textureAndContrast: {
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
    navBg: '#FFFFFF', // White
    accentPri: '#556B2F', // Olive green
    accentSec: '#556B2F', // Light orange
    textAccent: '#556B2F', // Teal
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#556B2F', // Using accentPri as gradStart
    gradStop: '#212121',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#556B2F', // Matching accentPri
  },

  mechanicalAndFloaty: {
    bodyBackgroundColor: '#F5F5F5', // Light gray
    backgroundColor: '#212121', // Almost black
    surface1: '#E0E0E0', // Lighter gray
    surface2: '#424242', // Dark gray
    surface3: '#BDBDBD', // Medium gray
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#2979FF', // Bright blue accents
    textColor: '#F5F5F5', // Light gray
    subtextColor: '#9E9E9E', // Gray
    textColorInv: '#212121', // Almost black
    navBg: '#212121', // Almost black
    accentPri: '#448AFF', // Light blue
    accentSec: '#82B1FF', // Lighter blue
    textAccent: '#40C4FF', // Light blue
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#82B1FF', // Using accentPri as gradStart
    gradStop: '#212121',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#448AFF', // Matching accentPri
  },

  pixelIntensity: {
    bodyBackgroundColor: '#000000', // Black
    backgroundColor: '#0D47A1', // Red
    surface1: '#0D47A1', // Blue
    surface2: '#8B0000', // Dark red
    surface3: '#B71C1C', // Darker red
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#FFFFFF', // White
    textColor: '#FFFFFF', // White
    subtextColor: '#BDBDBD', // Light gray
    textColorInv: '#000000', // Black
    navBg: '#000000', // Black
    accentPri: '#FF0000', // Red
    accentSec: '#0D47A1', // Blue
    textAccent: '#FFC107', // Amber
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#0D47A1', // Using accentPri as gradStart
    gradStop: '#000000',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF0000', // Matching accentPri
  },

  gradientPop: {
    bodyBackgroundColor: '#87CEEB', // Sky blue
    backgroundColor: '#FF8A80', // Salmon-pink
    surface1: '#FF9800', // Bright orange
    surface2: '#000000', // Black
    surface3: '#39FF14', // Neon green
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#000000', // Black
    textColor: '#FFFFFF', // White
    subtextColor: '#BDBDBD', // Light gray
    textColorInv: '#000000', // Black
    navBg: '#87CEEB', // Sky blue
    accentPri: '#FF8A80', // Salmon-pink
    accentSec: '#FF9800', // Bright orange
    textAccent: '#FFC107', // Amber
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#FF8A80', // Using accentPri as gradStart
    gradStop: '#FF8A80',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF8A80', // Matching accentPri
  },

  cosmicArtistry: {
    bodyBackgroundColor: '#F5F5F5', // Gray-washed white
    backgroundColor: '#0D3B66', // Space blue
    surface1: '#708090', // Slate gray
    surface2: '#EAEAEA', // Soft gradients
    surface3: '#1A5F7A', // Darker space blue
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#0D3B66', // Space blue
    textColor: '#333333', // Dark gray
    subtextColor: '#708090', // Slate gray
    textColorInv: '#FFFFFF', // White
    navBg: '#F5F5F5', // Gray-washed white
    accentPri: '#0D3B66', // Space blue
    accentSec: '#708090', // Slate gray
    textAccent: '#4A90E2', // Light blue
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#0D3B66', // Using accentPri as gradStart
    gradStop: '#0D3B66',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#0D3B66', // Matching accentPri
  },

  vibrantButCalm: {
    bodyBackgroundColor: '#E0E0E0', // Creamy-gray
    backgroundColor: '#B71C1C', // Muted red
    surface1: '#FFC0CB', // Pink
    surface2: '#F5F5F5', // Off-white
    surface3: '#D32F2F', // Lighter muted red
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#B71C1C', // Muted red
    textColor: '#212121', // Almost black
    subtextColor: '#757575', // Gray
    textColorInv: '#FFFFFF', // White
    navBg: '#E0E0E0', // Creamy-gray
    accentPri: '#B71C1C', // Muted red
    accentSec: '#FFC0CB', // Pink
    textAccent: '#FF5252', // Light red
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#B71C1C', // Using accentPri as gradStart
    gradStop: '#B71C1C',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#B71C1C', // Matching accentPri
  },

  livelyAndInviting: {
    bodyBackgroundColor: '#FF69B4', // Candy pink
    backgroundColor: '#ADFF2F', // Green-yellow
    surface1: '#C8A2C8', // Lavender gray
    surface2: '#D2B48C', // Pastel brown
    surface3: '#FF1493', // Deep pink
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#8B4513', // Saddle brown
    textColor: '#333333', // Dark gray
    subtextColor: '#696969', // Dim gray
    textColorInv: '#FFFFFF', // White
    navBg: '#ADFF2F', // Green-yellow
    accentPri: '#C8A2C8', // Lavender gray
    accentSec: '#D2B48C', // Pastel brown
    textAccent: '#FF1493', // Deep pink
    mixBlendMode: 'color',
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#C8A2C8', // Using accentPri as gradStart
    gradStop: '#ADFF2F',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#C8A2C8', // Matching accentPri
  },

  strikingAndSimple: {
    bodyBackgroundColor: '#2F2F2F', // Smoky black
    backgroundColor: '#2979FF', // Electric blue
    surface1: '#424242', // Dark gray
    surface2: '#82B1FF', // Light blue
    surface3: '#1565C0', // Darker blue
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#FFFFFF', // White
    textColor: '#FFFFFF', // White
    subtextColor: '#BDBDBD', // Light gray
    textColorInv: '#2F2F2F', // Smoky black
    navBg: '#2F2F2F', // Smoky black
    accentPri: '#2979FF', // Electric blue
    accentSec: '#82B1FF', // Light blue
    textAccent: '#40C4FF', // Light blue
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#2979FF', // Using accentPri as gradStart
    gradStop: '#2979FF',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#2979FF', // Matching accentPri
  },

  redAndLively: {
    bodyBackgroundColor: '#8B0000', // Dark scarlet red
    backgroundColor: '#FF1493', // Dark pink
    surface1: '#D3D3D3', // Light gray
    surface2: '#FF69B4', // Hot pink
    surface3: '#DC143C', // Crimson
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#FFFFFF', // White
    textColor: '#FFFFFF', // White
    subtextColor: '#D3D3D3', // Light gray
    textColorInv: '#8B0000', // Dark scarlet red
    navBg: '#8B0000', // Dark scarlet red
    accentPri: '#FF1493', // Dark pink
    accentSec: '#FF69B4', // Hot pink
    textAccent: '#FFC0CB', // Pink
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#FF1493', // Using accentPri as gradStart
    gradStop: '#FF1493',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF1493', // Matching accentPri
  },

  artsyAndCreative: {
    bodyBackgroundColor: '#EFDFBB', // Dutch white
    backgroundColor: '#DAA520', // Goldenrod
    surface1: '#E34234', // Vermillion
    surface2: '#00008B', // Dark blue
    surface3: '#CD853F', // Peru
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#00008B', // Dark blue
    textColor: '#333333', // Dark gray
    subtextColor: '#8B4513', // Saddle brown
    textColorInv: '#FFFFFF', // White
    navBg: '#EFDFBB', // Dutch white
    accentPri: '#DAA520', // Goldenrod
    accentSec: '#E34234', // Vermillion
    textAccent: '#00008B', // Dark blue
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#DAA520', // Using accentPri as gradStart
    gradStop: '#DAA520',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#DAA520', // Matching accentPri
  },

  elegantYetApproachable: {
    bodyBackgroundColor: '#FFDAB9', // Skin tones
    backgroundColor: '#1C1C3B', // Dark imperial blue
    surface1: '#9B111E', // Ruby
    surface2: '#E6BE8A', // Lighter skin tone
    surface3: '#2E2E5F', // Lighter imperial blue
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#9B111E', // Ruby
    textColor: '#FFFFFF', // White
    subtextColor: '#D2B48C', // Tan
    textColorInv: '#1C1C3B', // Dark imperial blue
    navBg: '#1C1C3B', // Dark imperial blue
    accentPri: '#9B111E', // Ruby
    accentSec: '#FFDAB9', // Skin tones
    textAccent: '#FFB6C1', // Light pink
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#9B111E', // Using accentPri as gradStart
    gradStop: '#1C1C3B',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#9B111E', // Matching accentPri
  },

  sleekAndFuturistic: {
    bodyBackgroundColor: '#0F4C81', // Blue sapphire
    backgroundColor: '#2F4F4F', // Gunmetal gray
    surface1: '#E5E4E2', // Platinum
    surface2: '#FFDAB9', // Peach-orange
    surface3: '#D2B48C', // Tan
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#E5E4E2', // Platinum
    textColor: '#FFFFFF', // White
    subtextColor: '#D2B48C', // Tan
    textColorInv: '#0F4C81', // Blue sapphire
    navBg: '#2F4F4F', // Gunmetal gray
    accentPri: '#0F4C81', // Blue sapphire
    accentSec: '#E5E4E2', // Platinum
    textAccent: '#87CEEB', // Sky blue
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#0F4C81', // Using accentPri as gradStart
    gradStop: '#2F4F4F',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#0F4C81', // Matching accentPri
  },

  innovativeAndAudacious: {
    bodyBackgroundColor: '#1C1C1C', // Dark gray, almost black
    backgroundColor: '#FF5A36', // Portland Orange
    surface1: '#FFEB3B', // Vivid yellow
    surface2: '#00A86B', // Jade
    surface3: '#FF8C69', // Salmon
    backgroundColorInv: '#FFFFFF', // White
    headingColor: '#FFEB3B', // Vivid yellow
    textColor: '#FFFFFF', // White
    subtextColor: '#BDBDBD', // Light gray
    textColorInv: '#1C1C1C', // Dark gray, almost black
    navBg: '#1C1C1C', // Dark gray, almost black
    accentPri: '#FF5A36', // Portland Orange
    accentSec: '#FFEB3B', // Vivid yellow
    textAccent: '#FF8C69', // Salmon
    stateSuccessBackground: '#4CAF50', // Green
    gradStart: '#FF5A36', // Using accentPri as gradStart
    gradStop: '#FF5A36',  // Using bodyBackgroundColor as gradStop
    accentImageBg: '#FF5A36', // Matching accentPri
  },
  coastalMirage: {
    bodyBackgroundColor: '#F7FCFA', // Drift White
    backgroundColor: '#A3DAD9',     // Ocean Mist
    surface1: '#5EC0B8',            // Seafoam Teal
    surface2: '#FFA987',            // Coral Leaf
    surface3: '#B28A6E',            // Driftwood Tan
    backgroundColorInv: '#5EC0B8',  // Seafoam Teal
    headingColor: '#B28A6E',        // Driftwood Tan
    textColor: '#2D2D2D',           // Neutral dark
    subtextColor: '#5EC0B8',        // Seafoam Teal
    textColorInv: '#F7FCFA',        // Drift White
    navBg: '#A3DAD9',               // Ocean Mist
    accentPri: '#FFA987',           // Coral Leaf
    accentSec: '#5EC0B8',           // Seafoam Teal
    gradStart: '#A3DAD9',           // Ocean Mist
    gradStop: '#FFA987',            // Coral Leaf
    textAccent: '#B28A6E',          // Driftwood Tan
    stateSuccessBackground: '#5EC0B8', // Seafoam Teal
    accentImageBg: '#FFA987',       // Coral Leaf
  },
  velvetArchive: {
    bodyBackgroundColor: '#F3ECD8', // Parchment Beige
    backgroundColor: '#8C5A6E',     // Faded Plum
    surface1: '#B9473E',            // Wax Red
    surface2: '#355E7C',            // Bookbinder Blue
    surface3: '#8F7150',            // Dusty Bronze
    backgroundColorInv: '#355E7C',  // Bookbinder Blue
    headingColor: '#B9473E',        // Wax Red
    textColor: '#2D2D2D',           // Neutral dark
    subtextColor: '#8C5A6E',        // Faded Plum
    textColorInv: '#F3ECD8',        // Parchment Beige
    navBg: '#8C5A6E',               // Faded Plum
    accentPri: '#B9473E',           // Wax Red
    accentSec: '#355E7C',           // Bookbinder Blue
    gradStart: '#8C5A6E',           // Faded Plum
    gradStop: '#8F7150',            // Dusty Bronze
    textAccent: '#355E7C',          // Bookbinder Blue
    stateSuccessBackground: '#B9473E', // Wax Red
    accentImageBg: '#8F7150',       // Dusty Bronze
  },
  desertCinema: {
    bodyBackgroundColor: '#E3CFA6', // Sand Fade
    backgroundColor: '#D59E61',     // Ochre Heat
    surface1: '#BF6248',            // Duststorm Coral
    surface2: '#864332',            // Adobe Rust
    surface3: '#3F2E24',            // Shadow Sienna
    backgroundColorInv: '#BF6248',  // Duststorm Coral
    headingColor: '#D59E61',        // Ochre Heat
    textColor: '#3F2E24',           // Shadow Sienna
    subtextColor: '#BF6248',        // Duststorm Coral
    textColorInv: '#E3CFA6',        // Sand Fade
    navBg: '#D59E61',               // Ochre Heat
    accentPri: '#BF6248',           // Duststorm Coral
    accentSec: '#864332',           // Adobe Rust
    gradStart: '#D59E61',           // Ochre Heat
    gradStop: '#BF6248',            // Duststorm Coral
    textAccent: '#864332',          // Adobe Rust
    stateSuccessBackground: '#3F2E24', // Shadow Sienna
    accentImageBg: '#BF6248',       // Duststorm Coral
  },
  dataDream: {
    bodyBackgroundColor: '#F9F9FE', // Void White
    backgroundColor: '#45A8F0',     // Signal Blue
    surface1: '#BB5FF9',            // Hyper Purple
    surface2: '#56F5D2',            // Digital Mint
    surface3: '#1C1C1F',            // Carbon Black
    backgroundColorInv: '#56F5D2',  // Digital Mint
    headingColor: '#45A8F0',        // Signal Blue
    textColor: '#1C1C1F',           // Carbon Black
    subtextColor: '#BB5FF9',        // Hyper Purple
    textColorInv: '#F9F9FE',        // Void White
    navBg: '#45A8F0',               // Signal Blue
    accentPri: '#BB5FF9',           // Hyper Purple
    accentSec: '#56F5D2',           // Digital Mint
    gradStart: '#45A8F0',           // Signal Blue
    gradStop: '#BB5FF9',            // Hyper Purple
    textAccent: '#56F5D2',          // Digital Mint
    stateSuccessBackground: '#45A8F0', // Signal Blue
    accentImageBg: '#BB5FF9',       // Hyper Purple
  },
  forestFade: {
    bodyBackgroundColor: '#DCE1D9', // Lichen Mist
    backgroundColor: '#7CB86D',     // Pine Ash
    surface1: '#AAC29C',            // Soft Fern
    surface2: '#6B4F3D',            // Cedar Bark
    surface3: '#9F8974',            // Clay Shadow
    backgroundColorInv: '#AAC29C',  // Soft Fern
    headingColor: '#7CB86D',        // Pine Ash
    textColor: '#6B4F3D',           // Cedar Bark
    subtextColor: '#AAC29C',        // Soft Fern
    textColorInv: '#DCE1D9',        // Lichen Mist
    navBg: '#7CB86D',               // Pine Ash
    accentPri: '#AAC29C',           // Soft Fern
    accentSec: '#9F8974',           // Clay Shadow
    gradStart: '#7CB86D',           // Pine Ash
    gradStop: '#AAC29C',            // Soft Fern
    textAccent: '#6B4F3D',          // Cedar Bark
    stateSuccessBackground: '#AAC29C', // Soft Fern
    accentImageBg: '#9F8974',       // Clay Shadow
  },
  popFiction: {
    bodyBackgroundColor: '#304FFE', // Retro Cobalt
    backgroundColor: '#FF1D89',     // Blazing Pink
    surface1: '#00E0B8',            // Teal Pop
    surface2: '#FFEC00',            // Fizz Yellow
    surface3: '#231F20',            // Comic Black
    backgroundColorInv: '#00E0B8',  // Teal Pop
    headingColor: '#304FFE',        // Retro Cobalt
    textColor: '#231F20',           // Comic Black
    subtextColor: '#FF1D89',        // Blazing Pink
    textColorInv: '#FFEC00',        // Fizz Yellow
    navBg: '#304FFE',               // Retro Cobalt
    accentPri: '#FF1D89',           // Blazing Pink
    accentSec: '#00E0B8',           // Teal Pop
    gradStart: '#304FFE',           // Retro Cobalt
    gradStop: '#FF1D89',            // Blazing Pink
    textAccent: '#00E0B8',          // Teal Pop
    stateSuccessBackground: '#FFEC00', // Fizz Yellow
    accentImageBg: '#FF1D89',       // Blazing Pink
  },
  cloudcore: {
    bodyBackgroundColor: '#F5F5FF', // Angel Cloud
    backgroundColor: '#D3BDF2',     // Mood Lilac
    surface1: '#ADA7FF',            // Baby Peri
    surface2: '#A8E2FF',            // Opal Blue
    surface3: '#FFE1DA',            // Fluffy Peach
    backgroundColorInv: '#ADA7FF',  // Baby Peri
    headingColor: '#D3BDF2',        // Mood Lilac
    textColor: '#ADA7FF',           // Baby Peri
    subtextColor: '#A8E2FF',        // Opal Blue
    textColorInv: '#F5F5FF',        // Angel Cloud
    navBg: '#D3BDF2',               // Mood Lilac
    accentPri: '#ADA7FF',           // Baby Peri
    accentSec: '#A8E2FF',           // Opal Blue
    gradStart: '#D3BDF2',           // Mood Lilac
    gradStop: '#FFE1DA',            // Fluffy Peach
    textAccent: '#A8E2FF',          // Opal Blue
    stateSuccessBackground: '#ADA7FF', // Baby Peri
    accentImageBg: '#FFE1DA',       // Fluffy Peach
  },
  cosmicAurora: {
    bodyBackgroundColor: '#0F1A2F', // Deep Space
    backgroundColor: '#2CE6D6',     // Galactic Teal
    surface1: '#FF4D8A',            // Plasma Pink
    surface2: '#E9E9F0',            // Moon Dust
    surface3: '#2CE6D6',            // Galactic Teal
    backgroundColorInv: '#E9E9F0',  // Moon Dust
    headingColor: '#FF4D8A',        // Plasma Pink
    textColor: '#E9E9F0',           // Moon Dust
    subtextColor: '#2CE6D6',        // Galactic Teal
    textColorInv: '#0F1A2F',        // Deep Space
    navBg: '#0F1A2F',               // Deep Space
    accentPri: '#FF4D8A',           // Plasma Pink
    accentSec: '#2CE6D6',           // Galactic Teal
    gradStart: '#0F1A2F',           // Deep Space
    gradStop: '#FF4D8A',            // Plasma Pink
    textAccent: '#2CE6D6',          // Galactic Teal
    stateSuccessBackground: '#FF4D8A', // Plasma Pink
    accentImageBg: '#E9E9F0',       // Moon Dust
  },
  silentStorm: {
    bodyBackgroundColor: '#6D6D7A', // Storm Gray
    backgroundColor: '#3A506B',     // Thunder Blue
    surface1: '#FFF9C4',            // Whisper Yellow
    surface2: '#B3889E',            // Hush Mauve
    surface3: '#3A506B',            // Thunder Blue
    backgroundColorInv: '#FFF9C4',  // Whisper Yellow
    headingColor: '#6D6D7A',        // Storm Gray
    textColor: '#3A506B',           // Thunder Blue
    subtextColor: '#B3889E',        // Hush Mauve
    textColorInv: '#FFF9C4',        // Whisper Yellow
    navBg: '#6D6D7A',               // Storm Gray
    accentPri: '#FFF9C4',           // Whisper Yellow
    accentSec: '#B3889E',           // Hush Mauve
    gradStart: '#6D6D7A',           // Storm Gray
    gradStop: '#FFF9C4',            // Whisper Yellow
    textAccent: '#B3889E',          // Hush Mauve
    stateSuccessBackground: '#3A506B', // Thunder Blue
    accentImageBg: '#FFF9C4',       // Whisper Yellow
  },
  digitalMist: {
    bodyBackgroundColor: '#D1FFE8', // Neon Fog
    backgroundColor: '#6A7BFF',     // Hologram Blue
    surface1: '#FF69D2',            // Glitch Pink
    surface2: '#3C3C4D',            // Static Gray
    surface3: '#6A7BFF',            // Hologram Blue
    backgroundColorInv: '#FF69D2',  // Glitch Pink
    headingColor: '#D1FFE8',        // Neon Fog
    textColor: '#3C3C4D',           // Static Gray
    subtextColor: '#6A7BFF',        // Hologram Blue
    textColorInv: '#D1FFE8',        // Neon Fog
    navBg: '#D1FFE8',               // Neon Fog
    accentPri: '#FF69D2',           // Glitch Pink
    accentSec: '#6A7BFF',           // Hologram Blue
    gradStart: '#D1FFE8',           // Neon Fog
    gradStop: '#FF69D2',            // Glitch Pink
    textAccent: '#6A7BFF',          // Hologram Blue
    stateSuccessBackground: '#FF69D2', // Glitch Pink
    accentImageBg: '#3C3C4D',       // Static Gray
  },
  neonNoir: {
    bodyBackgroundColor: '#1A1A1A', // Noir Void
    backgroundColor: '#C4FF4D',     // Cyber Lime
    surface1: '#BA8CFF',            // Vapor Violet
    surface2: '#4D4D4D',            // Grid Gray
    surface3: '#C4FF4D',            // Cyber Lime
    backgroundColorInv: '#BA8CFF',  // Vapor Violet
    headingColor: '#C4FF4D',        // Cyber Lime
    textColor: '#4D4D4D',           // Grid Gray
    subtextColor: '#BA8CFF',        // Vapor Violet
    textColorInv: '#1A1A1A',        // Noir Void
    navBg: '#1A1A1A',               // Noir Void
    accentPri: '#C4FF4D',           // Cyber Lime
    accentSec: '#BA8CFF',           // Vapor Violet
    gradStart: '#1A1A1A',           // Noir Void
    gradStop: '#C4FF4D',            // Cyber Lime
    textAccent: '#BA8CFF',          // Vapor Violet
    stateSuccessBackground: '#C4FF4D', // Cyber Lime
    accentImageBg: '#4D4D4D',       // Grid Gray
  },
  retroFuture: {
    bodyBackgroundColor: '#00CED1', // Vintage Cyan
    backgroundColor: '#FF6F00',     // Hoverboard Orange
    surface1: '#FAF0E6',            // CRT Beige
    surface2: '#A020F0',            // Laser Purple
    surface3: '#FF6F00',            // Hoverboard Orange
    backgroundColorInv: '#FAF0E6',  // CRT Beige
    headingColor: '#00CED1',        // Vintage Cyan
    textColor: '#A020F0',           // Laser Purple
    subtextColor: '#FF6F00',        // Hoverboard Orange
    textColorInv: '#FAF0E6',        // CRT Beige
    navBg: '#00CED1',               // Vintage Cyan
    accentPri: '#FF6F00',           // Hoverboard Orange
    accentSec: '#A020F0',           // Laser Purple
    gradStart: '#00CED1',           // Vintage Cyan
    gradStop: '#FF6F00',            // Hoverboard Orange
    textAccent: '#A020F0',          // Laser Purple
    stateSuccessBackground: '#FF6F00', // Hoverboard Orange
    accentImageBg: '#FAF0E6',       // CRT Beige
  },
  zenGardenPalette: {
    bodyBackgroundColor: '#E3E8D8', // Washed Bamboo
    backgroundColor: '#2B4A3C',     // Moss Ink
    surface1: '#8A9B8F',            // Stone Path
    surface2: '#FFA7A7',            // Blossom Ash
    surface3: '#2B4A3C',            // Moss Ink
    backgroundColorInv: '#8A9B8F',  // Stone Path
    headingColor: '#2B4A3C',        // Moss Ink
    textColor: '#8A9B8F',           // Stone Path
    subtextColor: '#FFA7A7',        // Blossom Ash
    textColorInv: '#E3E8D8',        // Washed Bamboo
    navBg: '#E3E8D8',               // Washed Bamboo
    accentPri: '#FFA7A7',           // Blossom Ash
    accentSec: '#8A9B8F',           // Stone Path
    gradStart: '#E3E8D8',           // Washed Bamboo
    gradStop: '#FFA7A7',            // Blossom Ash
    textAccent: '#2B4A3C',          // Moss Ink
    stateSuccessBackground: '#8A9B8F', // Stone Path
    accentImageBg: '#FFA7A7',       // Blossom Ash
  },
  quantumFlora: {
    bodyBackgroundColor: '#00FFA3', // Proton Green
    backgroundColor: '#FF00D0',     // Quantum Fuchsia
    surface1: '#2A2A3C',            // Dark Matter
    surface2: '#FFFFFF',            // Void White
    surface3: '#FF00D0',            // Quantum Fuchsia
    backgroundColorInv: '#2A2A3C',  // Dark Matter
    headingColor: '#00FFA3',        // Proton Green
    textColor: '#2A2A3C',           // Dark Matter
    subtextColor: '#FF00D0',        // Quantum Fuchsia
    textColorInv: '#FFFFFF',        // Void White
    navBg: '#00FFA3',               // Proton Green
    accentPri: '#FF00D0',           // Quantum Fuchsia
    accentSec: '#2A2A3C',           // Dark Matter
    gradStart: '#00FFA3',           // Proton Green
    gradStop: '#FF00D0',            // Quantum Fuchsia
    textAccent: '#2A2A3C',          // Dark Matter
    stateSuccessBackground: '#FF00D0', // Quantum Fuchsia
    accentImageBg: '#FFFFFF',       // Void White
  },
  blueDianneNorway: {
    bodyBackgroundColor: '#0C3D48', // Blue Dianne
    backgroundColor: '#A4BF9D',     // Norway
    surface1: '#0C3D48',            // Blue Dianne
    surface2: '#A4BF9D',            // Norway
    surface3: '#0C3D48',            // Blue Dianne
    backgroundColorInv: '#A4BF9D',  // Norway
    headingColor: '#A4BF9D',        // Norway
    textColor: '#A4BF9D',           // Norway
    subtextColor: '#0C3D48',        // Blue Dianne
    textColorInv: '#0C3D48',        // Blue Dianne
    navBg: '#0C3D48',               // Blue Dianne
    accentPri: '#A4BF9D',           // Norway
    accentSec: '#0C3D48',           // Blue Dianne
    gradStart: '#0C3D48',           // Blue Dianne
    gradStop: '#A4BF9D',            // Norway
    textAccent: '#A4BF9D',          // Norway
    stateSuccessBackground: '#A4BF9D', // Norway
    accentImageBg: '#0C3D48',       // Blue Dianne
  },
  costaDelSolYuma: {
    bodyBackgroundColor: '#D2C893', // Costa del Sol
    backgroundColor: '#58541F',     // Yuma
    surface1: '#D2C893',            // Costa del Sol
    surface2: '#58541F',            // Yuma
    surface3: '#D2C893',            // Costa del Sol
    backgroundColorInv: '#58541F',  // Yuma
    headingColor: '#58541F',        // Yuma
    textColor: '#58541F',           // Yuma
    subtextColor: '#D2C893',        // Costa del Sol
    textColorInv: '#D2C893',        // Costa del Sol
    navBg: '#D2C893',               // Costa del Sol
    accentPri: '#58541F',           // Yuma
    accentSec: '#D2C893',           // Costa del Sol
    gradStart: '#D2C893',           // Costa del Sol
    gradStop: '#58541F',            // Yuma
    textAccent: '#58541F',          // Yuma
    stateSuccessBackground: '#D2C893', // Costa del Sol
    accentImageBg: '#58541F',       // Yuma
  },
  pearlBushTea: {
    bodyBackgroundColor: '#C2B8AC', // Pearl Bush
    backgroundColor: '#EAE4DD',     // Tea
    surface1: '#C2B8AC',            // Pearl Bush
    surface2: '#EAE4DD',            // Tea
    surface3: '#C2B8AC',            // Pearl Bush
    backgroundColorInv: '#EAE4DD',  // Tea
    headingColor: '#C2B8AC',        // Pearl Bush
    textColor: '#EAE4DD',           // Tea
    subtextColor: '#C2B8AC',        // Pearl Bush
    textColorInv: '#C2B8AC',        // Pearl Bush
    navBg: '#EAE4DD',               // Tea
    accentPri: '#C2B8AC',           // Pearl Bush
    accentSec: '#EAE4DD',           // Tea
    gradStart: '#C2B8AC',           // Pearl Bush
    gradStop: '#EAE4DD',            // Tea
    textAccent: '#C2B8AC',          // Pearl Bush
    stateSuccessBackground: '#EAE4DD', // Tea
    accentImageBg: '#C2B8AC',       // Pearl Bush
  },
};


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
  none:'none'
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
  gabriel:'gabriel'
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
  heroBgRowSpanSm: 5, // Full height on small screens
  heroBgRowSpanMd: 5, // Full height on medium screens
  heroBgRowSpanLg: 5, // Full height on large screens
  heroBgRowSpanXl: 5, // Full height on extra large screens

heroBgShadow:shadowThemes.none,
heroBgBorderRadius:borderRadiusThemes.none,


  heroGradMidPoint:heroGradThemes.gradMidPoint,
  heroCssGradient:heroCssGradientThemes.linear,
  heroCssGradientAngle:'90',
  heroCssGradientRadialPosition: { x: 50, y: 50 }, // Center position as x,y percentages
  heroBackground:heroBackgroundThemes.canvasPerlinBlob,
  heroShaderEffect: shaderEffect.blueNoise, // Default shader type (legacy, use effectVariant)
  
  // Effect Selection
  effectType: 'none',
  effectVariant: heroShaderEffectThemes.none,
  
  // ASCII Effect Controls
  asciiPixelSize: 12,
  asciiShowBackground: false,
  asciiContrast: 100,
  
  // Dithering Effect Controls
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

export const fontSizes = {
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  32: "32px",
  48: "48px",
  64: "64px",
};

export const fontFamilies = {
  primary: "sans-serif",
  secondary: "serif",
  mono: "monospace",
};

export const fontWeights = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  loose: 1.8,
};

export const letterSpacings = {
  tight: "-0.05em",
  normal: "0",
  wide: "0.05em",
};

export const colors = {
  primary: "#0070f3",
  secondary: "#ff4081",
  background: "#ffffff",
  text: "#333333",
  black: "#000000",
  white: "#ffffff",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "64px",
};

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  md: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  lg: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
};

export const defaultTheme = {
  data: {
    baseFontSize: fontSizes[16],
    fontFamily: fontFamilies.primary,
    h1: {
      fontSize: fontSizes[32],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h2: {
      fontSize: fontSizes[24],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    h3: {
      fontSize: fontSizes[20],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacings.tight,
    },
    body: {
      fontSize: fontSizes[16],
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacings.normal,
    },
    caption: {
      fontSize: fontSizes[12],
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacings.normal,
    },
    colors: {
      background: colors.white,
      text: colors.black,
      primary: colors.primary,
      accent: colors.secondary,
    },
    spacing: spacing.md,
    radii: radii.md,
    shadows: shadows.md,
    cardLayout: "formal",
    gridType: gridLayoutThemes.gridBasic,
    listType: listLayoutThemes.textList,
    gridColumns: { sm: 2, md: 3, lg: 4, xl: 4 },
    gridGap: "md",
    imageParallax: false,
    imageTexture: imageTextureThemes.noise,
      buttonStyle: "default",
      buttonType: "primary",
      buttonSound: "click",
  },
};

// Theme attribute configuration for intent-based selection
export const themeAttributesConfig = {
  mood: {
    calm: 0,
    energetic: 0,
    warm: 0,
    cool: 0,
    neutral: 0,
    playful: 0,
    professional: 0,
    retro: 0,
    modern: 0,
    pastel: 0,
    duotone: 0,
    dark: 0,
    light: 0,
    vibrant: 0,
    muted: 0,
    earthy: 0,
    futuristic: 0,
    minimal: 0,
    maximal: 0,
    elegant: 0,
    bold: 0,
    soft: 0,
    highContrast: 0,
    lowContrast: 0,
  },
  // High-level intent attributes
  baseColor: {
    blue: 0,
    green: 0,
    red: 0,
    yellow: 0,
    orange: 0,
    purple: 0,
    pink: 0,
    brown: 0,
    gray: 0,
    black: 0,
    white: 0,
    beige: 0,
    teal: 0,
    cyan: 0,
    gold: 0,
    // Add more as needed
  },
  lightOrDark: {
    light: 0,
    dark: 0,
    balanced: 0, // for mid-tone or flexible themes
  },
  contrast: {
    high: 0,
    medium: 0,
    low: 0,
  },
  // Add more high-level intent categories as needed
};