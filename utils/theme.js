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
  spiritedAway: {
    key: 'spiritedAway',
    audio: true,
    volume: 0.5,
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
    accent: '#F0B77F', // Warm orange from sunset scenes
    navBg: '#CDE6F5', // Light blue from sky scenes
    accentPri: '#8A9A5B', // Moss green from forest spirits
    accentSec: '#D4AF37', // Gold from the bathhouse details
    textAccent: '#7B3F00', // Rich brown from Kamaji's skin
    mixBlendMode: 'soft-light',
    stateSuccessBackground: '#98D98E', // Soft green from grassy areas
  },

  myNeighborTotoro: {
    key: 'myNeighborTotoro',
    audio: true,
    volume: 0.5,
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
    accent: '#E88D67', // Warm orange from sunset scenes
    navBg: '#D6E6F2', // Soft blue from rainy skies
    accentPri: '#9ED2C6', // Teal from the Cat Bus
    accentSec: '#FAE03C', // Bright yellow from Mei's hat
    textAccent: '#A52A2A', // Reddish-brown from Satsuki's hair
    mixBlendMode: 'multiply',
    stateSuccessBackground: '#98FB98', // Pale green from grass
  },

  howlsMovingCastle: {
    key: 'howlsMovingCastle',
    audio: true,
    volume: 0.5,
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
    accent: '#B7AD99', // Warm gray from castle metal parts
    navBg: '#E6F2D6', // Pale green from countryside scenes
    accentPri: '#7FB7BE', // Teal from Calcifer
    accentSec: '#FDFD96', // Light yellow from magic spells
    textAccent: '#D64161', // Pink-red from Howl's pendant
    mixBlendMode: 'screen',
    stateSuccessBackground: '#90EE90', // Light green from grassy hills
  },

  sakuraBreeze: {
    key: 'sakuraBreeze',
    audio: true,
    volume: 0.5,
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
    accent: '#FFB6C1', // Light pink
    navBg: '#E6E6FA', // Lavender
    accentPri: '#DDA0DD', // Plum
    accentSec: '#98FB98', // Pale green
    textAccent: '#20B2AA', // Light sea green
    mixBlendMode: 'soft-light',
    stateSuccessBackground: '#90EE90', // Light green
  },

  zenGarden: {
    key: 'zenGarden',
    audio: true,
    volume: 0.5,
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
    accent: '#8FBC8F', // Dark sea green
    navBg: '#E6E6FA', // Lavender
    accentPri: '#6B8E23', // Olive drab
    accentSec: '#7FFFD4', // Aquamarine
    textAccent: '#4682B4', // Steel blue
    mixBlendMode: 'multiply',
    stateSuccessBackground: '#98FB98', // Pale green
  },

  pastelAnime: {
    key: 'pastelAnime',
    audio: true,
    volume: 0.5,
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
    accent: '#FFB6C1', // Light pink
    navBg: '#F0FFF0', // Honeydew
    accentPri: '#87CEFA', // Light sky blue
    accentSec: '#98FB98', // Pale green
    textAccent: '#FF69B4', // Hot pink
    mixBlendMode: 'screen',
    stateSuccessBackground: '#90EE90', // Light green
  },

  deathNote: {
    key: 'deathNote',
    audio: true,
    volume: 0.5,
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
    accent: '#8B0000', // Dark red accent
    navBg: '#2C2C2C', // Same as backgroundColor
    accentPri: '#C41E3A', // Blood red primary accent
    accentSec: '#4B0082', // Indigo secondary accent
    textAccent: '#FFD700', // Gold for text accents
    mixBlendMode: 'overlay',
    stateSuccessBackground: '#006400', // Dark green for success states
  },

  attackOnTitan: {
    key: 'attackOnTitan',
    audio: true,
    volume: 0.5,
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
    accent: '#CD853F', // Peru accent
    navBg: '#3C3C3C', // Same as backgroundColor
    accentPri: '#8B4513', // Saddle brown primary accent
    accentSec: '#D2691E', // Chocolate secondary accent
    textAccent: '#F4A460', // Sandy brown for text accents
    mixBlendMode: 'multiply',
    stateSuccessBackground: '#556B2F', // Dark olive green for success states
  },

  tokyoGhoul: {
    key: 'tokyoGhoul',
    audio: true,
    volume: 0.5,
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
    accent: '#B22222', // Firebrick accent
    navBg: '#2D2D2D', // Same as backgroundColor
    accentPri: '#DC143C', // Crimson primary accent
    accentSec: '#8B0000', // Dark red secondary accent
    textAccent: '#00CED1', // Dark turquoise for text accents
    mixBlendMode: 'hard-light',
    stateSuccessBackground: '#2E8B57', // Sea green for success states
  },

  akc12: {
    key: 'akc12',
    audio: true,
    volume: 0.5,
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
    accent: '#FF00FF', // Magenta
    navBg: '#333333', // Medium gray
    accentPri: '#FF0000', // Red
    accentSec: '#0000FF', // Blue
    textAccent: '#FFFF00', // Yellow
    mixBlendMode: 'screen',
    stateSuccessBackground: '#008000', // Dark green
  },

  taikonColor24: {
    key: 'taikonColor24',
    audio: true,
    volume: 0.5,
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
    accent: '#FFD93D', // Yellow
    navBg: '#404040', // Light gray
    accentPri: '#FF6B6B', // Soft red
    accentSec: '#4ECDC4', // Turquoise
    textAccent: '#FF8C42', // Orange
    mixBlendMode: 'soft-light',
    stateSuccessBackground: '#6BFF74', // Light green
  },

  eightVision: {
    key: 'eightVision',
    audio: true,
    volume: 0.5,
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
    accent: '#FF5555', // Red
    navBg: '#3F3F3B', // Dark gray
    accentPri: '#FF55FF', // Magenta
    accentSec: '#5555FF', // Blue
    textAccent: '#FFFFFF', // White
    mixBlendMode: 'screen',
    stateSuccessBackground: '#00AA00', // Dark green
  },

  cgaPalette0Low: {
    key: 'cgaPalette0Low',
    audio: true,
    volume: 0.5,
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
    accent: '#AAAA00', // Yellow
    navBg: '#0000AA', // Blue
    accentPri: '#AA0000', // Red
    accentSec: '#00AA00', // Green
    textAccent: '#AA00AA', // Magenta
    mixBlendMode: 'screen',
    stateSuccessBackground: '#00AA00', // Green
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
  amigaWorkbench: {
    key: 'amigaWorkbench',
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
  porsche911: {
    key: 'porsche911',
    ...colorThemes.porsche911,
  },
  spiritedAway: {
    key: 'spiritedAway',
    ...colorThemes.spiritedAway,
  },
  myNeighborTotoro: {
    key: 'myNeighborTotoro',
    ...colorThemes.myNeighborTotoro,
  },
  howlsMovingCastle: {
    key: 'howlsMovingCastle',
    ...colorThemes.howlsMovingCastle,
  },
  sakuraBreeze: {
    key: 'sakuraBreeze',
    ...colorThemes.sakuraBreeze,
  },
  zenGarden: {
    key: 'zenGarden',
    ...colorThemes.zenGarden,
  },
  pastelAnime: {
    key: 'pastelAnime',
    ...colorThemes.pastelAnime,
  },
  deathNote: {
    key: 'deathNote',
    ...colorThemes.deathNote,
  },
  attackOnTitan: {
    key: 'attackOnTitan',
    ...colorThemes.attackOnTitan,
  },
  tokyoGhoul: {
    key: 'tokyoGhoul',
    ...colorThemes.tokyoGhoul,
  },
  akc12: {
    key: 'akc12',
    ...colorThemes.akc12,
  },
  taikonColor24: {
    key: 'taikonColor24',
    ...colorThemes.taikonColor24,
  },
  eightVision: {
    key: 'eightVision',
    ...colorThemes.eightVision,
  },
  cgaPalette0Low: {
    key: 'cgaPalette0Low',
    ...colorThemes.cgaPalette0Low,
  },
};