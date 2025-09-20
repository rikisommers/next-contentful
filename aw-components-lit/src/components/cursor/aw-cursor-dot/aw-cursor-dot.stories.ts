import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { CursorDotSize, CursorDotBlendMode } from './aw-cursor-dot';
import './aw-cursor-dot';

/**
 * The AW Cursor Dot component provides a smooth, animated cursor dot that follows mouse movement with spring physics.
 * It features click states, hover effects, theme-aware styling, and magnetic attraction to interactive elements.
 * Perfect for creating engaging interactive experiences with minimal performance impact.
 */
const meta: Meta = {
  title: 'Cursor/aw-cursor-dot',
  component: 'aw-cursor-dot',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Features
- **Spring Physics**: Smooth movement with configurable stiffness, damping, and mass
- **Magnetic Attraction**: Cursor can be attracted to specified elements
- **Interactive States**: Hover and click state changes
- **Accessibility**: Respects prefers-reduced-motion and hides on touch devices
- **Performance**: Uses requestAnimationFrame for smooth 60fps animations
- **Theme Aware**: Customizable colors and blend modes

### Use Cases
- Portfolio websites requiring sophisticated interaction
- Creative agency sites with advanced cursor effects
- Interactive presentations and galleries
- Modern web applications with enhanced UX
        `
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(CursorDotSize),
      description: 'Size of the cursor dot'
    },
    color: {
      control: { type: 'color' },
      description: 'CSS color for the cursor dot'
    },
    blendMode: {
      control: { type: 'select' },
      options: Object.values(CursorDotBlendMode),
      description: 'CSS blend mode for the cursor'
    },
    smooth: {
      control: { type: 'boolean' },
      description: 'Whether to enable smooth movement with spring physics'
    },
    magnetic: {
      control: { type: 'boolean' },
      description: 'Whether to enable magnetic attraction to elements'
    },
    hideCursor: {
      control: { type: 'boolean' },
      description: 'Whether to hide the default system cursor'
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the cursor should be visible'
    },
    hoverSelector: {
      control: { type: 'text' },
      description: 'Selector for elements that trigger hover state'
    },
    magneticSelector: {
      control: { type: 'text' },
      description: 'Selector for magnetic elements'
    },
    stiffness: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: 'Spring stiffness for smooth movement (higher = faster)'
    },
    damping: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
      description: 'Spring damping for smooth movement (higher = less bouncy)'
    },
    mass: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Spring mass for smooth movement (higher = slower)'
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Basic cursor dot with default settings. Move your mouse around to see the smooth following behavior.
 */
export const Default: Story = {
  args: {
    size: CursorDotSize.Medium,
    color: '#ef7801',
    blendMode: CursorDotBlendMode.Normal,
    smooth: true,
    magnetic: false,
    hideCursor: false,
    visible: true,
    hoverSelector: 'a, button, .interactive',
    magneticSelector: 'button, .magnetic',
    stiffness: 1200,
    damping: 40,
    mass: 0.5
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <aw-cursor-dot
        size="${args.size}"
        color="${args.color}"
        blend-mode="${args.blendMode}"
        ?smooth="${args.smooth}"
        ?magnetic="${args.magnetic}"
        ?hide-cursor="${args.hideCursor}"
        ?visible="${args.visible}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
        stiffness="${args.stiffness}"
        damping="${args.damping}"
        mass="${args.mass}"
      ></aw-cursor-dot>
      
      <div style="color: white; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Cursor Dot Demo</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9;">
          Move your mouse around to experience the smooth cursor following behavior.
          Try hovering over the interactive elements below to see state changes.
        </p>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
          <button class="interactive" style="padding: 1rem 2rem; font-size: 1.1rem; border: 2px solid white; background: transparent; color: white; cursor: pointer; border-radius: 8px;">
            Hover Button
          </button>
          <a href="#" class="interactive" style="padding: 1rem 2rem; font-size: 1.1rem; border: 2px solid white; color: white; text-decoration: none; border-radius: 8px; display: inline-block;">
            Interactive Link
          </a>
          <div class="interactive" style="padding: 1rem 2rem; font-size: 1.1rem; border: 2px solid white; color: white; border-radius: 8px; cursor: pointer;">
            Custom Element
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Small cursor dot with fast, bouncy spring physics.
 */
export const Small: Story = {
  args: {
    ...Default.args,
    size: CursorDotSize.Small,
    stiffness: 2000,
    damping: 20,
    mass: 0.2
  },
  render: Default.render
};

/**
 * Large cursor dot with slower, smoother spring physics.
 */
export const Large: Story = {
  args: {
    ...Default.args,
    size: CursorDotSize.Large,
    stiffness: 600,
    damping: 60,
    mass: 1.0
  },
  render: Default.render
};

/**
 * Cursor with magnetic attraction to buttons. The cursor will be pulled toward nearby magnetic elements.
 */
export const Magnetic: Story = {
  args: {
    ...Default.args,
    magnetic: true,
    color: '#4ecdc4'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: #1a1a1a;">
      <aw-cursor-dot
        size="${args.size}"
        color="${args.color}"
        blend-mode="${args.blendMode}"
        ?smooth="${args.smooth}"
        ?magnetic="${args.magnetic}"
        ?hide-cursor="${args.hideCursor}"
        ?visible="${args.visible}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
        stiffness="${args.stiffness}"
        damping="${args.damping}"
        mass="${args.mass}"
      ></aw-cursor-dot>
      
      <div style="color: white; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Magnetic Cursor</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9;">
          Move your mouse near the buttons to see the magnetic attraction effect.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 4rem; max-width: 800px; margin: 0 auto;">
          <button class="magnetic" style="padding: 2rem; font-size: 1.2rem; border: 2px solid #4ecdc4; background: transparent; color: white; cursor: pointer; border-radius: 12px;">
            Magnetic Button
          </button>
          <button class="magnetic" style="padding: 2rem; font-size: 1.2rem; border: 2px solid #ff6b6b; background: transparent; color: white; cursor: pointer; border-radius: 12px;">
            Magnetic Button
          </button>
          <button class="magnetic" style="padding: 2rem; font-size: 1.2rem; border: 2px solid #45b7d1; background: transparent; color: white; cursor: pointer; border-radius: 12px;">
            Magnetic Button
          </button>
          <button class="magnetic" style="padding: 2rem; font-size: 1.2rem; border: 2px solid #96ceb4; background: transparent; color: white; cursor: pointer; border-radius: 12px;">
            Magnetic Button
          </button>
        </div>
      </div>
    </div>
  `
};

/**
 * Cursor with difference blend mode for creative visual effects.
 */
export const BlendModeExample: Story = {
  args: {
    ...Default.args,
    blendMode: CursorDotBlendMode.Difference,
    color: '#ffffff',
    size: CursorDotSize.Large
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); background-size: 400% 400%; animation: gradient 8s ease infinite;">
      <aw-cursor-dot
        size="${args.size}"
        color="${args.color}"
        blend-mode="${args.blendMode}"
        ?smooth="${args.smooth}"
        ?magnetic="${args.magnetic}"
        ?hide-cursor="${args.hideCursor}"
        ?visible="${args.visible}"
        hover-selector="${args.hoverSelector}"
        magnetic-selector="${args.magneticSelector}"
        stiffness="${args.stiffness}"
        damping="${args.damping}"
        mass="${args.mass}"
      ></aw-cursor-dot>
      
      <style>
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>
      
      <div style="color: white; text-align: center; padding: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Blend Mode Cursor</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem;">
          The cursor uses difference blend mode to create interesting visual effects against the animated background.
        </p>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 3rem;">
          <div class="interactive" style="padding: 2rem; background: rgba(255,255,255,0.2); border-radius: 12px; backdrop-filter: blur(10px);">
            Hover me for effects
          </div>
          <div class="interactive" style="padding: 2rem; background: rgba(0,0,0,0.3); border-radius: 12px; backdrop-filter: blur(10px);">
            Try this one too
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Playground for testing different cursor configurations and spring physics parameters.
 */
export const Playground: Story = {
  args: {
    ...Default.args
  },
  render: Default.render
};