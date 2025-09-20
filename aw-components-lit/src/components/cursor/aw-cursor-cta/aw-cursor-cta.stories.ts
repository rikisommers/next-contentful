import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { CursorCtaSize } from './aw-cursor-cta';
import './aw-cursor-cta';

/**
 * The AW Cursor CTA component displays custom text content that follows the mouse cursor with rotation animations
 * based on movement direction and velocity. Perfect for call-to-action messages and interactive guidance.
 */
const meta: Meta = {
  title: 'Cursor/aw-cursor-cta',
  component: 'aw-cursor-cta',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Features
- **Dynamic Rotation**: Text rotates based on mouse movement direction and velocity
- **Custom Content**: Display any text or call-to-action message
- **Theme Support**: Multiple theme variants with auto-detection
- **Velocity-based Effects**: Visual feedback based on mouse movement speed
- **Accessibility**: Respects motion preferences and hides on touch devices
- **Smooth Animations**: 60fps animations with optimized performance

### Use Cases
- Interactive tutorials and onboarding flows
- Portfolio navigation hints and guidance
- Call-to-action prompts in creative layouts
- Interactive presentations and galleries
- Modern web applications with enhanced UX
        `
      }
    }
  },
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'Text content to display in the cursor'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(CursorCtaSize),
      description: 'Size of the cursor CTA'
    },
    color: {
      control: { type: 'color' },
      description: 'CSS color for the text'
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'CSS background color for the cursor'
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Border color for the cursor'
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'accent', 'auto'],
      description: 'Theme variant for the cursor'
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the cursor should be visible'
    },
    offsetX: {
      control: { type: 'range', min: -100, max: 100, step: 5 },
      description: 'Horizontal offset from mouse position'
    },
    offsetY: {
      control: { type: 'range', min: -100, max: 100, step: 5 },
      description: 'Vertical offset from mouse position'
    },
    rotationSensitivity: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
      description: 'Sensitivity for rotation based on velocity'
    },
    maxRotation: {
      control: { type: 'range', min: 15, max: 180, step: 15 },
      description: 'Maximum rotation angle in degrees'
    },
    velocityThreshold: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Velocity threshold for high velocity state'
    },
    hideCursor: {
      control: { type: 'boolean' },
      description: 'Whether to hide the default system cursor'
    },
    visibleSelector: {
      control: { type: 'text' },
      description: 'Selector for elements that trigger visibility'
    },
    hoverSelector: {
      control: { type: 'text' },
      description: 'Selector for elements that trigger hover state'
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Basic cursor CTA with default settings. Move your mouse around to see rotation based on movement direction.
 */
export const Default: Story = {
  args: {
    content: 'Click me',
    size: CursorCtaSize.Medium,
    theme: 'auto',
    visible: true,
    offsetX: 20,
    offsetY: -20,
    rotationSensitivity: 20,
    maxRotation: 90,
    velocityThreshold: 5,
    hideCursor: false
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <aw-cursor-cta
        content="${args.content}"
        size="${args.size}"
        color="${args.color}"
        background-color="${args.backgroundColor}"
        border-color="${args.borderColor}"
        theme="${args.theme}"
        ?visible="${args.visible}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        rotation-sensitivity="${args.rotationSensitivity}"
        max-rotation="${args.maxRotation}"
        velocity-threshold="${args.velocityThreshold}"
        ?hide-cursor="${args.hideCursor}"
        visible-selector="${args.visibleSelector}"
        hover-selector="${args.hoverSelector}"
      ></aw-cursor-cta>
      
      <div style="color: white; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">CTA Cursor Demo</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9;">
          Move your mouse around to see the text rotate based on movement direction and velocity.
          Try quick movements to see high-velocity effects.
        </p>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 3rem;">
          <div style="padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px);">
            Move mouse in different directions
          </div>
          <div style="padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px);">
            Try fast vs slow movements
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Small CTA cursor with custom message and high sensitivity.
 */
export const Small: Story = {
  args: {
    ...Default.args,
    content: 'Explore',
    size: CursorCtaSize.Small,
    rotationSensitivity: 30,
    theme: 'accent'
  },
  render: Default.render
};

/**
 * Large CTA cursor with custom styling and reduced sensitivity.
 */
export const Large: Story = {
  args: {
    ...Default.args,
    content: 'Discover More',
    size: CursorCtaSize.Large,
    rotationSensitivity: 15,
    maxRotation: 45,
    theme: 'dark'
  },
  render: Default.render
};

/**
 * CTA cursor that appears only when hovering over specific elements.
 */
export const ConditionalVisibility: Story = {
  args: {
    ...Default.args,
    content: 'Learn More',
    visibleSelector: '.cta-trigger',
    theme: 'light'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: #f8f9fa;">
      <aw-cursor-cta
        content="${args.content}"
        size="${args.size}"
        color="${args.color}"
        background-color="${args.backgroundColor}"
        border-color="${args.borderColor}"
        theme="${args.theme}"
        ?visible="${args.visible}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        rotation-sensitivity="${args.rotationSensitivity}"
        max-rotation="${args.maxRotation}"
        velocity-threshold="${args.velocityThreshold}"
        ?hide-cursor="${args.hideCursor}"
        visible-selector="${args.visibleSelector}"
        hover-selector="${args.hoverSelector}"
      ></aw-cursor-cta>
      
      <div style="color: #333; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Conditional CTA</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8;">
          The CTA cursor only appears when hovering over the trigger elements below.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto;">
          <div class="cta-trigger" style="padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Hover me</h3>
            <p>CTA cursor will appear when you hover over this card</p>
          </div>
          <div class="cta-trigger" style="padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Or me</h3>
            <p>Move your mouse around while hovering to see rotation</p>
          </div>
          <div style="padding: 3rem; background: #e9ecef; border-radius: 12px;">
            <h3 style="margin-bottom: 1rem;">Not a trigger</h3>
            <p>No CTA cursor appears here</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Multiple CTA cursors with different themes and configurations.
 */
export const MultipleThemes: Story = {
  args: {
    ...Default.args,
    content: 'Dynamic'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: linear-gradient(45deg, #1a1a1a, #333);">
      <aw-cursor-cta
        content="${args.content}"
        size="${args.size}"
        theme="dark"
        ?visible="${args.visible}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        rotation-sensitivity="${args.rotationSensitivity}"
        max-rotation="${args.maxRotation}"
        velocity-threshold="${args.velocityThreshold}"
      ></aw-cursor-cta>
      
      <div style="color: white; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Dynamic CTA Cursor</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9;">
          Experience smooth rotation animations that respond to your mouse movement patterns.
          The faster you move, the more dramatic the rotation effects become.
        </p>
        
        <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; margin-top: 4rem;">
          <div style="padding: 2rem; border: 2px solid #4ecdc4; border-radius: 12px; min-width: 200px;">
            <h3 style="color: #4ecdc4; margin-bottom: 1rem;">Slow Movement</h3>
            <p style="font-size: 0.9rem; opacity: 0.8;">Gentle rotations</p>
          </div>
          <div style="padding: 2rem; border: 2px solid #ff6b6b; border-radius: 12px; min-width: 200px;">
            <h3 style="color: #ff6b6b; margin-bottom: 1rem;">Fast Movement</h3>
            <p style="font-size: 0.9rem; opacity: 0.8;">Dynamic rotations</p>
          </div>
          <div style="padding: 2rem; border: 2px solid #ffd93d; border-radius: 12px; min-width: 200px;">
            <h3 style="color: #ffd93d; margin-bottom: 1rem;">Direction Change</h3>
            <p style="font-size: 0.9rem; opacity: 0.8;">Smooth transitions</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Playground for testing different CTA cursor configurations and behaviors.
 */
export const Playground: Story = {
  args: {
    ...Default.args
  },
  render: Default.render
};