import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { CursorGabrielSize, CursorGabrielBlendMode } from './aw-cursor-gabriel';
import './aw-cursor-gabriel';

/**
 * The AW Cursor Gabriel component provides an advanced cursor system inspired by gabrielveres.com.
 * Features a sophisticated two-layer animation with trailing circle, foreground dot, SVG path trail,
 * and mix-blend-mode effects for creative visual experiences.
 */
const meta: Meta = {
  title: 'Cursor/aw-cursor-gabriel',
  component: 'aw-cursor-gabriel',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Features
- **Dual-Layer System**: Background trailing circle and responsive foreground dot
- **SVG Path Trail**: Smooth trail that follows mouse movement with quadratic curves
- **Spring Physics**: Independent physics for background and foreground elements
- **Velocity-Based Effects**: Visual feedback based on mouse movement speed
- **Blend Modes**: Multiple blend mode options for creative effects
- **Magnetic Attraction**: Optional magnetic pull toward specified elements
- **Glow Effects**: Optional glow effects for enhanced visual impact
- **High Performance**: 60fps animations with optimized rendering

### Use Cases
- Premium creative portfolios and agencies
- Interactive art installations and exhibitions
- Sophisticated web applications requiring advanced UX
- Modern design showcases and brand experiences
- Gaming interfaces and interactive entertainment
        `
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(CursorGabrielSize),
      description: 'Size of the cursor elements'
    },
    color: {
      control: { type: 'color' },
      description: 'Primary color for the cursor elements'
    },
    accentColor: {
      control: { type: 'color' },
      description: 'Accent color for the trail and background'
    },
    blendMode: {
      control: { type: 'select' },
      options: Object.values(CursorGabrielBlendMode),
      description: 'CSS blend mode for the foreground cursor'
    },
    trailLength: {
      control: { type: 'range', min: 5, max: 50, step: 5 },
      description: 'Maximum number of trail points to track'
    },
    trailOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity of the trail path'
    },
    trailWidth: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Width of the trail stroke'
    },
    trailSmoothing: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Smoothing factor for the trail path (0-1)'
    },
    glow: {
      control: { type: 'boolean' },
      description: 'Whether to enable glow effect'
    },
    magnetic: {
      control: { type: 'boolean' },
      description: 'Whether to enable magnetic attraction to elements'
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the cursor should be visible'
    },
    velocityThreshold: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Velocity threshold for high velocity state'
    },
    backgroundStiffness: {
      control: { type: 'range', min: 100, max: 800, step: 50 },
      description: 'Spring stiffness for background cursor (lower = slower)'
    },
    foregroundStiffness: {
      control: { type: 'range', min: 200, max: 1200, step: 100 },
      description: 'Spring stiffness for foreground cursor (higher = faster)'
    },
    hoverSelector: {
      control: { type: 'text' },
      description: 'Selector for elements that trigger hover state'
    },
    magneticSelector: {
      control: { type: 'text' },
      description: 'Selector for magnetic elements'
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default Gabriel cursor with balanced settings showcasing the dual-layer system and SVG trail.
 */
export const Default: Story = {
  args: {
    size: CursorGabrielSize.Medium,
    color: '#ef7801',
    accentColor: '#fb923c',
    blendMode: CursorGabrielBlendMode.Difference,
    trailLength: 15,
    trailOpacity: 0.6,
    trailWidth: 2,
    trailSmoothing: 0.3,
    glow: false,
    magnetic: false,
    visible: true,
    velocityThreshold: 5,
    backgroundStiffness: 400,
    foregroundStiffness: 800,
    hoverSelector: 'a, button, .cursor-hover',
    magneticSelector: 'button, .magnetic'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 100vh; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
      <aw-cursor-gabriel
        size="${args.size}"
        color="${args.color}"
        accent-color="${args.accentColor}"
        blend-mode="${args.blendMode}"
        trail-length="${args.trailLength}"
        trail-opacity="${args.trailOpacity}"
        trail-width="${args.trailWidth}"
        trail-smoothing="${args.trailSmoothing}"
        ?glow="${args.glow}"
        ?magnetic="${args.magnetic}"
        ?visible="${args.visible}"
        velocity-threshold="${args.velocityThreshold}"
        background-stiffness="${args.backgroundStiffness}"
        foreground-stiffness="${args.foregroundStiffness}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
      ></aw-cursor-gabriel>
      
      <div style="color: white; text-align: center; padding: 3rem; position: relative; z-index: 1;">
        <h1 style="font-size: 4rem; margin-bottom: 2rem; font-weight: 300; letter-spacing: -2px;">
          Gabriel Cursor
        </h1>
        <p style="font-size: 1.3rem; margin-bottom: 4rem; opacity: 0.8; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          Experience the sophisticated dual-layer cursor system with SVG trail effects.
          Move your mouse around to see the background and foreground elements respond independently.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto;">
          <div class="cursor-hover" style="padding: 2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px); cursor: pointer; transition: all 0.3s ease;">
            <h3 style="margin-bottom: 1rem; color: #ffd700;">Trail Effect</h3>
            <p style="opacity: 0.7; line-height: 1.5;">Watch the SVG path trail smoothly follow your mouse movement</p>
          </div>
          
          <div class="cursor-hover" style="padding: 2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px); cursor: pointer;">
            <h3 style="margin-bottom: 1rem; color: #4ecdc4;">Dual Layers</h3>
            <p style="opacity: 0.7; line-height: 1.5;">Background and foreground cursors with independent physics</p>
          </div>
          
          <div class="cursor-hover" style="padding: 2rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px); cursor: pointer;">
            <h3 style="margin-bottom: 1rem; color: #ff6b6b;">Hover States</h3>
            <p style="opacity: 0.7; line-height: 1.5;">Dynamic scaling and opacity changes on interactive elements</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Small, fast cursor with high sensitivity and short trail for subtle effects.
 */
export const Small: Story = {
  args: {
    ...Default.args,
    size: CursorGabrielSize.Small,
    trailLength: 8,
    trailWidth: 1.5,
    backgroundStiffness: 600,
    foregroundStiffness: 1000,
    velocityThreshold: 3
  },
  render: Default.render
};

/**
 * Large cursor with glow effect and extended trail for dramatic visual impact.
 */
export const Large: Story = {
  args: {
    ...Default.args,
    size: CursorGabrielSize.Large,
    glow: true,
    trailLength: 25,
    trailWidth: 3,
    trailOpacity: 0.8,
    backgroundStiffness: 300,
    foregroundStiffness: 600
  },
  render: Default.render
};

/**
 * Magnetic cursor that's attracted to interactive elements with enhanced trail effects.
 */
export const Magnetic: Story = {
  args: {
    ...Default.args,
    magnetic: true,
    glow: true,
    color: '#4ecdc4',
    accentColor: '#45b7d1',
    trailOpacity: 0.8,
    trailWidth: 2.5
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 100vh; background: radial-gradient(circle at center, #0a0a0a 0%, #1a1a1a 100%);">
      <aw-cursor-gabriel
        size="${args.size}"
        color="${args.color}"
        accent-color="${args.accentColor}"
        blend-mode="${args.blendMode}"
        trail-length="${args.trailLength}"
        trail-opacity="${args.trailOpacity}"
        trail-width="${args.trailWidth}"
        trail-smoothing="${args.trailSmoothing}"
        ?glow="${args.glow}"
        ?magnetic="${args.magnetic}"
        ?visible="${args.visible}"
        velocity-threshold="${args.velocityThreshold}"
        background-stiffness="${args.backgroundStiffness}"
        foreground-stiffness="${args.foregroundStiffness}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
      ></aw-cursor-gabriel>
      
      <div style="color: white; text-align: center; padding: 3rem;">
        <h1 style="font-size: 4rem; margin-bottom: 2rem; font-weight: 200;">
          Magnetic Attraction
        </h1>
        <p style="font-size: 1.3rem; margin-bottom: 4rem; opacity: 0.8; max-width: 700px; margin-left: auto; margin-right: auto;">
          Move your mouse near the magnetic elements below to experience the attractive force.
          The cursor will be gently pulled toward nearby interactive elements.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; max-width: 900px; margin: 0 auto;">
          <button class="magnetic cursor-hover" style="padding: 3rem 2rem; font-size: 1.3rem; background: linear-gradient(135deg, #667eea, #764ba2); border: none; color: white; border-radius: 20px; cursor: pointer; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
            <h3 style="margin-bottom: 1rem;">Magnetic Field</h3>
            <p style="opacity: 0.9;">Feel the pull</p>
          </button>
          
          <button class="magnetic cursor-hover" style="padding: 3rem 2rem; font-size: 1.3rem; background: linear-gradient(135deg, #ff6b6b, #ee5a24); border: none; color: white; border-radius: 20px; cursor: pointer; box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);">
            <h3 style="margin-bottom: 1rem;">Attraction Zone</h3>
            <p style="opacity: 0.9;">Gravitational effect</p>
          </button>
          
          <button class="magnetic cursor-hover" style="padding: 3rem 2rem; font-size: 1.3rem; background: linear-gradient(135deg, #4ecdc4, #44a08d); border: none; color: white; border-radius: 20px; cursor: pointer; box-shadow: 0 10px 30px rgba(78, 205, 196, 0.3);">
            <h3 style="margin-bottom: 1rem;">Force Field</h3>
            <p style="opacity: 0.9;">Magnetic pull</p>
          </button>
          
          <button class="magnetic cursor-hover" style="padding: 3rem 2rem; font-size: 1.3rem; background: linear-gradient(135deg, #ffd93d, #ff6b6b); border: none; color: white; border-radius: 20px; cursor: pointer; box-shadow: 0 10px 30px rgba(255, 217, 61, 0.3);">
            <h3 style="margin-bottom: 1rem;">Energy Core</h3>
            <p style="opacity: 0.9;">Attractive force</p>
          </button>
        </div>
      </div>
    </div>
  `
};

/**
 * Creative cursor with screen blend mode and custom colors for artistic effects.
 */
export const Creative: Story = {
  args: {
    ...Default.args,
    blendMode: CursorGabrielBlendMode.Screen,
    color: '#ffffff',
    accentColor: '#ff6b6b',
    glow: true,
    trailLength: 20,
    trailOpacity: 0.7,
    trailWidth: 3
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 100vh; background: linear-gradient(45deg, #2d1b69, #11998e, #38ef7d); background-size: 300% 300%; animation: gradient 8s ease infinite;">
      <aw-cursor-gabriel
        size="${args.size}"
        color="${args.color}"
        accent-color="${args.accentColor}"
        blend-mode="${args.blendMode}"
        trail-length="${args.trailLength}"
        trail-opacity="${args.trailOpacity}"
        trail-width="${args.trailWidth}"
        trail-smoothing="${args.trailSmoothing}"
        ?glow="${args.glow}"
        ?magnetic="${args.magnetic}"
        ?visible="${args.visible}"
        velocity-threshold="${args.velocityThreshold}"
        background-stiffness="${args.backgroundStiffness}"
        foreground-stiffness="${args.foregroundStiffness}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
      ></aw-cursor-gabriel>
      
      <style>
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>
      
      <div style="color: white; text-align: center; padding: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
        <h1 style="font-size: 4rem; margin-bottom: 2rem; font-weight: 100; letter-spacing: 3px;">
          CREATIVE
        </h1>
        <p style="font-size: 1.4rem; margin-bottom: 4rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">
          Blend modes and animated backgrounds create unique visual experiences.
          Perfect for creative portfolios and artistic presentations.
        </p>
        
        <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; margin-top: 4rem;">
          <div class="cursor-hover" style="padding: 3rem; background: rgba(255,255,255,0.1); border-radius: 50%; width: 200px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(20px);">
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">ART</h3>
            <p style="opacity: 0.8;">Creative expression</p>
          </div>
          
          <div class="cursor-hover" style="padding: 3rem; background: rgba(0,0,0,0.2); border-radius: 50%; width: 200px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(20px);">
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">DESIGN</h3>
            <p style="opacity: 0.8;">Visual innovation</p>
          </div>
          
          <div class="cursor-hover" style="padding: 3rem; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; width: 200px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(20px);">
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">MOTION</h3>
            <p style="opacity: 0.8;">Dynamic interaction</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * High-performance cursor with fast physics and reduced trail for gaming interfaces.
 */
export const Performance: Story = {
  args: {
    ...Default.args,
    trailLength: 10,
    trailWidth: 1,
    trailSmoothing: 0.1,
    backgroundStiffness: 800,
    foregroundStiffness: 1200,
    velocityThreshold: 2,
    color: '#00ff00',
    accentColor: '#00cc00'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 100vh; background: #000; font-family: 'Courier New', monospace;">
      <aw-cursor-gabriel
        size="${args.size}"
        color="${args.color}"
        accent-color="${args.accentColor}"
        blend-mode="${args.blendMode}"
        trail-length="${args.trailLength}"
        trail-opacity="${args.trailOpacity}"
        trail-width="${args.trailWidth}"
        trail-smoothing="${args.trailSmoothing}"
        ?glow="${args.glow}"
        ?magnetic="${args.magnetic}"
        ?visible="${args.visible}"
        velocity-threshold="${args.velocityThreshold}"
        background-stiffness="${args.backgroundStiffness}"
        foreground-stiffness="${args.foregroundStiffness}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
      ></aw-cursor-gabriel>
      
      <div style="color: #00ff00; text-align: center; padding: 3rem;">
        <h1 style="font-size: 3rem; margin-bottom: 2rem; letter-spacing: 4px; text-shadow: 0 0 10px #00ff00;">
          &gt; PERFORMANCE MODE
        </h1>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8; max-width: 600px; margin-left: auto; margin-right: auto;">
          Optimized for high-performance applications and gaming interfaces.
          Fast physics, reduced trail length, and minimal overhead.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto;">
          <div class="cursor-hover" style="padding: 1.5rem; border: 1px solid #00ff00; background: rgba(0,255,0,0.05); cursor: pointer;">
            <span>&gt; FAST_RESPONSE</span>
          </div>
          <div class="cursor-hover" style="padding: 1.5rem; border: 1px solid #00ff00; background: rgba(0,255,0,0.05); cursor: pointer;">
            <span>&gt; LOW_LATENCY</span>
          </div>
          <div class="cursor-hover" style="padding: 1.5rem; border: 1px solid #00ff00; background: rgba(0,255,0,0.05); cursor: pointer;">
            <span>&gt; HIGH_FPS</span>
          </div>
          <div class="cursor-hover" style="padding: 1.5rem; border: 1px solid #00ff00; background: rgba(0,255,0,0.05); cursor: pointer;">
            <span>&gt; OPTIMIZED</span>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Playground for testing different Gabriel cursor configurations and spring physics.
 */
export const Playground: Story = {
  args: {
    ...Default.args
  },
  render: Default.render
};