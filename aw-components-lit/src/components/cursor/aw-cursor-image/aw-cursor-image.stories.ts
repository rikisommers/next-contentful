import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { CursorImageSize, ImageFit } from './aw-cursor-image';
import './aw-cursor-image';

/**
 * The AW Cursor Image component displays a large image preview that follows the mouse cursor.
 * Perfect for portfolio galleries, product showcases, and interactive image browsing experiences.
 */
const meta: Meta = {
  title: 'Cursor/aw-cursor-image',
  component: 'aw-cursor-image',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Features
- **Image Preview**: Display full-resolution images at cursor position
- **Fade Animations**: Smooth enter/exit transitions with scale effects
- **Loading States**: Built-in loading and error state handling
- **Responsive Sizing**: Multiple size presets and custom dimensions
- **Object Fit Control**: Configure how images fill the container
- **Parallax Effects**: Optional parallax movement for enhanced depth
- **Accessibility**: Respects motion preferences and hides on touch devices
- **Performance**: Optimized image loading and smooth 60fps animations

### Use Cases
- Portfolio galleries with image previews
- E-commerce product browsing
- Interactive image collections and exhibitions
- Creative agency showcases
- Art and design portfolio presentations
        `
      }
    }
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL'
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text for the image'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(CursorImageSize),
      description: 'Predefined size of the cursor image'
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels (overrides size)'
    },
    height: {
      control: { type: 'number' },
      description: 'Custom height in pixels (overrides size)'
    },
    objectFit: {
      control: { type: 'select' },
      options: Object.values(ImageFit),
      description: 'How the image should fit within the container'
    },
    objectPosition: {
      control: { type: 'text' },
      description: 'Position of the image within the container'
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'Border radius for the cursor image'
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color for the container'
    },
    offsetX: {
      control: { type: 'range', min: -300, max: 300, step: 10 },
      description: 'Horizontal offset from mouse position'
    },
    offsetY: {
      control: { type: 'range', min: -300, max: 300, step: 10 },
      description: 'Vertical offset from mouse position'
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the cursor should be visible'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether to show loading placeholder'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether to show error state'
    },
    blendMode: {
      control: { type: 'select' },
      options: [undefined, 'multiply', 'screen', 'overlay', 'difference'],
      description: 'CSS blend mode for the image'
    },
    spring: {
      control: { type: 'boolean' },
      description: 'Whether to use spring animation'
    },
    parallax: {
      control: { type: 'boolean' },
      description: 'Whether to enable parallax effect'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no image is provided'
    },
    showOverlay: {
      control: { type: 'boolean' },
      description: 'Whether to show overlay effect'
    },
    triggerSelector: {
      control: { type: 'text' },
      description: 'Selector for elements that trigger visibility'
    }
  }
};

export default meta;
type Story = StoryObj;

const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
  square: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop',
  architecture: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop'
};

/**
 * Basic cursor image with default settings. Hover over the trigger areas to see the image appear.
 */
export const Default: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Preview image',
    size: CursorImageSize.Medium,
    objectFit: ImageFit.Cover,
    objectPosition: 'center',
    offsetX: -150,
    offsetY: -150,
    visible: true,
    loading: false,
    error: false,
    spring: false,
    parallax: false,
    placeholder: 'No image',
    showOverlay: true,
    triggerSelector: '.image-trigger'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: #f8f9fa;">
      <aw-cursor-image
        src="${args.src}"
        alt="${args.alt}"
        size="${args.size}"
        width="${args.width}"
        height="${args.height}"
        object-fit="${args.objectFit}"
        object-position="${args.objectPosition}"
        border-radius="${args.borderRadius}"
        background-color="${args.backgroundColor}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        ?visible="${args.visible}"
        ?loading="${args.loading}"
        ?error="${args.error}"
        blend-mode="${args.blendMode}"
        ?spring="${args.spring}"
        ?parallax="${args.parallax}"
        placeholder="${args.placeholder}"
        ?show-overlay="${args.showOverlay}"
        trigger-selector="${args.triggerSelector}"
      ></aw-cursor-image>
      
      <div style="color: #333; max-width: 1200px; margin: 0 auto;">
        <div style="text-align: center; padding: 3rem 0;">
          <h2 style="font-size: 3rem; margin-bottom: 2rem;">Image Cursor Demo</h2>
          <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8;">
            Hover over the cards below to see the image cursor in action.
            The image will follow your mouse with smooth animations.
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div class="image-trigger" style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s ease;">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Mountain Landscape</h3>
            <p style="color: #7f8c8d; line-height: 1.6;">
              Beautiful mountain scenery with pristine lakes and dramatic peaks.
              Hover to see a preview of this stunning landscape photography.
            </p>
          </div>
          
          <div class="image-trigger" style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Nature Photography</h3>
            <p style="color: #7f8c8d; line-height: 1.6;">
              Explore breathtaking natural landscapes captured in high resolution.
              Move your mouse around while hovering for the full experience.
            </p>
          </div>
          
          <div class="image-trigger" style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Portfolio Showcase</h3>
            <p style="color: #7f8c8d; line-height: 1.6;">
              Perfect for creative portfolios and image galleries.
              The cursor image provides instant visual feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Small cursor image with spring animation for bouncy, playful interactions.
 */
export const Small: Story = {
  args: {
    ...Default.args,
    src: sampleImages.square,
    size: CursorImageSize.Small,
    spring: true,
    borderRadius: '50%'
  },
  render: Default.render
};

/**
 * Large cursor image with parallax effect for immersive experiences.
 */
export const Large: Story = {
  args: {
    ...Default.args,
    src: sampleImages.architecture,
    size: CursorImageSize.Large,
    parallax: true,
    offsetX: -200,
    offsetY: -200
  },
  render: Default.render
};

/**
 * Gallery-style cursor with multiple images triggered by different elements.
 */
export const Gallery: Story = {
  args: {
    ...Default.args,
    triggerSelector: '.gallery-item'
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: #1a1a1a;">
      <!-- Multiple cursor images for different triggers -->
      <aw-cursor-image
        src="${sampleImages.landscape}"
        alt="Landscape"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        trigger-selector=".gallery-item-1"
        ?show-overlay="${args.showOverlay}"
      ></aw-cursor-image>
      
      <aw-cursor-image
        src="${sampleImages.portrait}"
        alt="Portrait"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        trigger-selector=".gallery-item-2"
        ?show-overlay="${args.showOverlay}"
      ></aw-cursor-image>
      
      <aw-cursor-image
        src="${sampleImages.square}"
        alt="Square"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        trigger-selector=".gallery-item-3"
        ?show-overlay="${args.showOverlay}"
      ></aw-cursor-image>
      
      <aw-cursor-image
        src="${sampleImages.architecture}"
        alt="Architecture"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        trigger-selector=".gallery-item-4"
        ?show-overlay="${args.showOverlay}"
      ></aw-cursor-image>
      
      <div style="color: white; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; padding: 3rem 0;">
          <h2 style="font-size: 3rem; margin-bottom: 2rem;">Gallery Cursor</h2>
          <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9;">
            Each gallery item shows a different image on hover. Perfect for creative portfolios.
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <div class="gallery-item-1" style="aspect-ratio: 4/3; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;">
            <span style="font-size: 1.2rem;">Mountain Landscape</span>
          </div>
          
          <div class="gallery-item-2" style="aspect-ratio: 4/3; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.2rem;">City Portrait</span>
          </div>
          
          <div class="gallery-item-3" style="aspect-ratio: 4/3; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.2rem;">Square Format</span>
          </div>
          
          <div class="gallery-item-4" style="aspect-ratio: 4/3; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span style="font-size: 1.2rem;">Architecture</span>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Cursor image with custom styling, blend mode, and no overlay for artistic effects.
 */
export const Artistic: Story = {
  args: {
    ...Default.args,
    src: sampleImages.portrait,
    blendMode: 'multiply',
    showOverlay: false,
    borderRadius: '20px',
    objectFit: ImageFit.Cover
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: linear-gradient(45deg, #ff9a56, #ff6b6b, #4ecdc4); background-size: 300% 300%; animation: gradient 6s ease infinite;">
      <aw-cursor-image
        src="${args.src}"
        alt="${args.alt}"
        size="${args.size}"
        object-fit="${args.objectFit}"
        border-radius="${args.borderRadius}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        ?visible="${args.visible}"
        blend-mode="${args.blendMode}"
        ?show-overlay="${args.showOverlay}"
        trigger-selector="${args.triggerSelector}"
      ></aw-cursor-image>
      
      <style>
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>
      
      <div style="color: white; text-align: center; padding: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Artistic Cursor</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem;">
          Blend modes and animated backgrounds create unique visual effects.
        </p>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 3rem;">
          <div class="image-trigger" style="padding: 2rem 3rem; background: rgba(255,255,255,0.2); border-radius: 12px; backdrop-filter: blur(10px); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Creative Vision</h3>
            <p>Artistic blend effects</p>
          </div>
          <div class="image-trigger" style="padding: 2rem 3rem; background: rgba(0,0,0,0.3); border-radius: 12px; backdrop-filter: blur(10px); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Visual Impact</h3>
            <p>Stunning presentations</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Loading and error states demonstration.
 */
export const LoadingStates: Story = {
  args: {
    ...Default.args,
    src: '',
    loading: true
  },
  render: (args) => html`
    <div style="padding: 2rem; min-height: 80vh; background: #f8f9fa;">
      <!-- Loading state -->
      <aw-cursor-image
        src=""
        alt="Loading example"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        ?loading="${true}"
        trigger-selector=".loading-trigger"
        placeholder="Loading image..."
      ></aw-cursor-image>
      
      <!-- Error state -->
      <aw-cursor-image
        src="invalid-url"
        alt="Error example"
        size="${args.size}"
        offset-x="${args.offsetX}"
        offset-y="${args.offsetY}"
        trigger-selector=".error-trigger"
        placeholder="Failed to load"
      ></aw-cursor-image>
      
      <div style="color: #333; text-align: center; padding: 3rem;">
        <h2 style="font-size: 3rem; margin-bottom: 2rem;">Loading States</h2>
        <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.8;">
          See how the cursor image handles loading and error states.
        </p>
        
        <div style="display: flex; gap: 2rem; justify-content: center;">
          <div class="loading-trigger" style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Loading State</h3>
            <p>Shows animated loading placeholder</p>
          </div>
          
          <div class="error-trigger" style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer;">
            <h3 style="margin-bottom: 1rem;">Error State</h3>
            <p>Shows error message for failed loads</p>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Playground for testing different cursor image configurations and behaviors.
 */
export const Playground: Story = {
  args: {
    ...Default.args
  },
  render: Default.render
};