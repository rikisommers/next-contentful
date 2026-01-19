# Visual Effect Reference Guide

Quick visual reference for selecting the right effect for your needs.

---

## ASCII Effects

### Character-Based Rendering

```
┌─────────────────────┬──────────────────────┬─────────────────────┐
│ ascii_standard      │ ascii_dense          │ ascii_minimal       │
├─────────────────────┼──────────────────────┼─────────────────────┤
│                     │                      │                     │
│   @@@@@@@           │  █████████████       │    @@               │
│  @@@@@@@@@          │ ████████████████     │   @@@@              │
│ @@@@@@@@@@@         │████████████████████  │  @@@@@@             │
│ ####@@@@##          │████████▓▓▓▓████████  │  @@@@@@             │
│  ##@@@@##           │ ████████▓▓████████   │   @@@               │
│   ######            │  ███████████████     │    @                │
│                     │                      │                     │
│ Classic ASCII       │ High-Detail Smooth   │ Bold Minimalist     │
│ Chars: .:-=+*#%@    │ 60+ characters       │ Chars: .o0@         │
│ Use: General        │ Use: Photos          │ Use: Graphics       │
└─────────────────────┴──────────────────────┴─────────────────────┘

┌─────────────────────┬──────────────────────┬─────────────────────┐
│ ascii_blocks        │ ascii_braille        │ ascii_technical     │
├─────────────────────┼──────────────────────┼─────────────────────┤
│                     │                      │                     │
│ ████████            │ ⣿⣿⣿⣿⣿⣿⣿⣿         │ FF FF FF            │
│ ████▓▓██            │ ⣿⣿⣿⣷⣶⣿⣿⣿         │ FF EE EE            │
│ ██▓▓▓▓██            │ ⣿⣿⣶⣤⣤⣶⣿⣿         │ EE CC DD            │
│ ██▒▒▓▓██            │ ⣿⣶⣤⣀⣀⣤⣶⣿         │ DD AA BB            │
│ ██▒▒▒▒██            │ ⣿⣶⣤⣤⣤⣶⣿⣿         │ CC 88 99            │
│ ██░░▒▒██            │ ⣿⣿⣿⣶⣶⣿⣿⣿         │ AA 66 77            │
│                     │                      │                     │
│ Mosaic/Pixelated    │ Dot Matrix Detail    │ Hex Terminal        │
│ Chars: ░▒▓█         │ Pattern: Braille     │ Chars: 0-9A-F       │
│ Use: Retro Games    │ Use: Texture/Detail  │ Use: Tech/Matrix    │
└─────────────────────┴──────────────────────┴─────────────────────┘

┌─────────────────────┬──────────────────────┐
│ ascii_matrix        │ ascii_hatching       │
├─────────────────────┼──────────────────────┤
│                     │                      │
│ ▓█▒░█▓░▒█          │ //// \\\\            │
│ █▓░▒█░▓█▒          │ //// \\\\            │
│ ▒█░▓▒░█▓░  SCAN    │ //// \\\\            │
│ ░▒▓█░▒▓█▒          │ XXXX XXXX            │
│ ▓░█▒▓░▒█░          │ XXXX XXXX            │
│ █▒░█▓█░▓▒          │ #### ####            │
│                     │                      │
│ Digital Rain        │ Pencil Sketch        │
│ Animated: YES       │ Pattern: /\X#        │
│ Use: Cyberpunk      │ Use: Artistic/Sketch │
└─────────────────────┴──────────────────────┘
```

---

## Dithering Effects

### Error Diffusion Algorithms

```
┌──────────────────────────┬─────────────────────────┐
│ Original Image           │ dither_floyd_steinberg  │
├──────────────────────────┼─────────────────────────┤
│                          │                         │
│    ████████████          │    ▓▓▒▒░░▒▒▓▓          │
│  ████████████████        │  ▓▓▒▒░░  ░░▒▒▓▓        │
│ ██████████████████       │ ▓▓▒▒░░    ░░▒▒▓▓       │
│ ██████████████████       │ ▓▓▒▒░░    ░░▒▒▓▓       │
│  ████████████████        │  ▓▓▒▒░░  ░░▒▒▓▓        │
│    ████████████          │    ▓▓▒▒░░▒▒▓▓          │
│                          │                         │
│ Smooth Gradients         │ Classic (1976)          │
│                          │ Balanced, Organic       │
└──────────────────────────┴─────────────────────────┘

┌─────────────────────────┬──────────────────────────┐
│ dither_atkinson         │ dither_jarvis_judice_ninke│
├─────────────────────────┼──────────────────────────┤
│                         │                          │
│    ██▓▓▒▒██            │    ▓▓▓▒▒▒░░▒▒▒▓▓▓        │
│  ██▓▓▒▒  ▒▒▓▓██        │  ▓▓▓▒▒▒░░  ░░▒▒▒▓▓▓      │
│ ██▓▓▒▒    ▒▒▓▓██       │ ▓▓▒▒▒░░      ░░▒▒▒▓▓     │
│ ██▓▓▒▒    ▒▒▓▓██       │ ▓▓▒▒▒░░      ░░▒▒▒▓▓     │
│  ██▓▓▒▒  ▒▒▓▓██        │  ▓▓▓▒▒▒░░  ░░▒▒▒▓▓▓      │
│    ██▓▓▒▒██            │    ▓▓▓▒▒▒░░▒▒▒▓▓▓        │
│                         │                          │
│ Macintosh (1984)        │ Ultra Smooth (1976)      │
│ High Contrast, Crunchy  │ 12 Neighbors, Detailed   │
└─────────────────────────┴──────────────────────────┘

Performance Comparison:
floyd_steinberg   ████████░░ (8/10 speed)
atkinson         █████████░ (9/10 speed)
jarvis_judice    ██████░░░░ (6/10 speed)
stucki           ███████░░░ (7/10 speed)
burkes           █████████░ (9/10 speed)
sierra           ████████░░ (8/10 speed)
sierra2          ████████░░ (8/10 speed)
sierra_lite      ██████████ (10/10 speed)
```

---

## Halftone Effects

### Print & Pattern Styles

```
┌──────────────────────┬─────────────────────┬──────────────────────┐
│ halftone_dots        │ halftone_circles    │ halftone_squares     │
├──────────────────────┼─────────────────────┼──────────────────────┤
│                      │                     │                      │
│   • • • • •          │   ◐ ◑ ◑ ◐          │   ▪ ▪ ▪ ▪ ▪         │
│  • • • • • •         │  ◐ ◑ ◑ ◑ ◐         │  ▪ ▪ ▪ ▪ ▪ ▪        │
│ • • • • • • •        │ ◐ ◑ ◑ ◑ ◑ ◐        │ ▪ ▪ ▪ ▪ ▪ ▪ ▪       │
│ • • • • • • •        │ ◐ ◑ ◑ ◑ ◑ ◐        │ ▪ ▪ ▪ ▪ ▪ ▪ ▪       │
│  • • • • • •         │  ◐ ◑ ◑ ◑ ◐         │  ▪ ▪ ▪ ▪ ▪ ▪        │
│   • • • • •          │   ◐ ◑ ◑ ◐          │   ▪ ▪ ▪ ▪ ▪         │
│                      │                     │                      │
│ Newspaper Print      │ Psychedelic Waves   │ Geometric Modern     │
│ Dot Size = Luminance │ Concentric Circles  │ Square Grid Pattern  │
└──────────────────────┴─────────────────────┴──────────────────────┘

┌──────────────────────┬─────────────────────┬──────────────────────┐
│ halftone_lines       │ halftone_crosshatch │ halftone_newspaper   │
├──────────────────────┼─────────────────────┼──────────────────────┤
│                      │                     │                      │
│ ═══════════          │ ╬╬╬╬╬╬╬╬╬          │     • • • •          │
│ ───────────          │ ╬╬╬╬╬╬╬╬╬          │   • • • • •          │
│ ───────────          │ ┼┼┼┼┼┼┼┼┼          │  • • • • • •         │
│ ───────────          │ ┼┼┼┼┼┼┼┼┼          │ • • • • • • •        │
│ ───────────          │ ╫╫╫╫╫╫╫╫╫          │  • • • • • •         │
│ ───────────          │ ║║║║║║║║║          │   • • • • •          │
│                      │                     │                      │
│ CRT Scanlines        │ Hand-Drawn Engraving│ CMYK 45° Rotation    │
│ Horizontal Lines     │ Dense = Dark        │ Print Imperfections  │
└──────────────────────┴─────────────────────┴──────────────────────┘
```

---

## Effect Selection Matrix

### By Visual Style

```
┌─────────────────┬────────────────────────────────────┐
│ Style           │ Recommended Effects                │
├─────────────────┼────────────────────────────────────┤
│ Retro Computing │ • ascii_technical                  │
│                 │ • ascii_blocks                     │
│                 │ • dither_atkinson (Mac)            │
│                 │ • halftone_dots                    │
├─────────────────┼────────────────────────────────────┤
│ Print/Newspaper │ • halftone_newspaper               │
│                 │ • halftone_dots                    │
│                 │ • dither_floyd_steinberg           │
├─────────────────┼────────────────────────────────────┤
│ Artistic        │ • ascii_hatching                   │
│                 │ • halftone_crosshatch              │
│                 │ • dither_jarvis_judice_ninke       │
├─────────────────┼────────────────────────────────────┤
│ Modern/Minimal  │ • ascii_minimal                    │
│                 │ • halftone_squares                 │
│                 │ • dither_burkes                    │
├─────────────────┼────────────────────────────────────┤
│ Cyberpunk       │ • ascii_matrix (animated)          │
│                 │ • ascii_technical                  │
│                 │ • halftone_lines (scanlines)       │
├─────────────────┼────────────────────────────────────┤
│ Experimental    │ • ascii_braille                    │
│                 │ • halftone_circles                 │
│                 │ • ascii_dense                      │
└─────────────────┴────────────────────────────────────┘
```

### By Content Type

```
┌─────────────────┬────────────────────────────────────┐
│ Content         │ Best Effects                       │
├─────────────────┼────────────────────────────────────┤
│ Portraits       │ • ascii_standard                   │
│                 │ • dither_floyd_steinberg           │
│                 │ • halftone_dots                    │
├─────────────────┼────────────────────────────────────┤
│ Landscapes      │ • ascii_dense                      │
│                 │ • dither_jarvis_judice_ninke       │
│                 │ • halftone_circles                 │
├─────────────────┼────────────────────────────────────┤
│ Graphics/Logos  │ • ascii_minimal                    │
│                 │ • dither_atkinson                  │
│                 │ • halftone_squares                 │
├─────────────────┼────────────────────────────────────┤
│ Text/Documents  │ • ascii_standard                   │
│                 │ • dither_sierra_lite               │
│                 │ • halftone_lines                   │
├─────────────────┼────────────────────────────────────┤
│ Abstract Art    │ • ascii_braille                    │
│                 │ • halftone_circles                 │
│                 │ • dither_stucki                    │
└─────────────────┴────────────────────────────────────┘
```

### By Performance Need

```
HIGH PERFORMANCE (60+ FPS)
┌──────────────────────────────────────────────────┐
│ • ascii_minimal      • dither_sierra_lite       │
│ • ascii_blocks       • halftone_lines           │
└──────────────────────────────────────────────────┘

BALANCED (30-60 FPS)
┌──────────────────────────────────────────────────┐
│ • ascii_standard     • dither_floyd_steinberg   │
│ • dither_burkes      • halftone_dots            │
│ • halftone_squares   • dither_sierra            │
└──────────────────────────────────────────────────┘

QUALITY FOCUSED (15-30 FPS)
┌──────────────────────────────────────────────────┐
│ • ascii_dense        • dither_jarvis_judice_ninke│
│ • halftone_newspaper • ascii_hatching           │
│ • dither_stucki      • halftone_crosshatch      │
└──────────────────────────────────────────────────┘

SPECIAL (Animated, Heavy)
┌──────────────────────────────────────────────────┐
│ • ascii_matrix       (Requires animation loop)  │
└──────────────────────────────────────────────────┘
```

---

## Parameter Quick Reference

### ASCII Parameters

```javascript
{
  pixelSize: 8 | 12 | 16 | 24 | 32
             ↓    ↓    ↓    ↓    ↓
           Fine Medium Balanced Bold Graphic
}
```

### Dithering Parameters

```javascript
{
  colorLevels: 2 | 4 | 8 | 16
               ↓   ↓   ↓   ↓
             B&W GB Retro Smooth
}
```

### Halftone Parameters

```javascript
{
  pixelSize: 4 | 8 | 16 | 32
             ↓   ↓   ↓    ↓
          Fine Med Bold Extreme
}
```

---

## Color Palette Examples (Future Enhancement)

```
Game Boy Classic        Synthwave Nights        Noir Cinema
┌──────────────┐       ┌──────────────┐        ┌──────────────┐
│ ▓▓▓▓         │       │ █▓▒░         │        │ ████         │
│ ▒▒▒▒         │       │ █▓▒░         │        │ ▓▓▓▓         │
│ ░░░░         │       │ █▓▒░         │        │ ▒▒▒▒         │
│              │       │ █▓▒░         │        │ ░░░░         │
│ Green Mono   │       │ Pink/Purple  │        │ B&W High     │
│ 4 Shades     │       │ Gradient     │        │ Contrast     │
└──────────────┘       └──────────────┘        └──────────────┘
```

---

## Effect Comparison Chart

```
                    Detail  Speed  Contrast  Use Case
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ascii_standard      ███░░  ████░  ███░░    General
ascii_dense         █████  ██░░░  ████░    Photos
ascii_minimal       █░░░░  █████  █████    Graphics
ascii_blocks        ██░░░  █████  ████░    Retro
ascii_braille       ████░  ███░░  ██░░░    Texture
ascii_technical     ███░░  ████░  ████░    Tech
ascii_matrix        ███░░  ██░░░  ████░    Animated
ascii_hatching      ████░  ███░░  ███░░    Artistic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dither_floyd        ████░  ████░  ███░░    Balanced
dither_atkinson     ███░░  ████░  █████    Mac/Bold
dither_jjn          █████  ██░░░  ███░░    Smooth
dither_stucki       ████░  ███░░  ███░░    Quality
dither_burkes       ███░░  ████░  ███░░    Fast
dither_sierra       ████░  ████░  ███░░    Natural
dither_sierra2      ███░░  ████░  ███░░    Balanced
dither_sierra_lite  ██░░░  █████  ██░░░    Speed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
halftone_dots       ████░  ████░  ████░    Print
halftone_circles    ███░░  ████░  ██░░░    Artistic
halftone_squares    ███░░  ████░  ████░    Modern
halftone_lines      ██░░░  █████  ███░░    Scanlines
halftone_crosshatch ████░  ███░░  ████░    Engraving
halftone_newspaper  ████░  ███░░  ████░    Authentic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

█████ = Excellent  ████░ = Good  ███░░ = Fair  ██░░░ = Low  █░░░░ = Minimal
```

---

## Quick Start Code Snippets

### Apply Effect in Theme

```javascript
import { shaderEffect } from '@/utils/theme';

// Retro terminal look
heroShaderEffect: shaderEffect.ascii_technical,

// Newspaper print
heroShaderEffect: shaderEffect.halftone_newspaper,

// Macintosh classic
heroShaderEffect: shaderEffect.dither_atkinson,

// Matrix animation
heroShaderEffect: shaderEffect.ascii_matrix,
```

### Adjust Parameters

```javascript
// Fine detail
{ pixelSize: 8, colorLevels: 16 }

// Bold graphics
{ pixelSize: 24, colorLevels: 2 }

// Balanced
{ pixelSize: 12, colorLevels: 4 }
```

---

For complete documentation, see:
- **EFECTO_EFFECTS_README.md** - Detailed effect descriptions
- **INTEGRATION_GUIDE.md** - Implementation instructions
- **IMPLEMENTATION_SUMMARY.md** - Project overview

