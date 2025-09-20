import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-hero-block.ts';

/**
 * The AW Hero Block is a powerful component for creating impactful hero sections
 * with various background types, text positioning, and animation options.
 */
const meta: Meta = {
  title: 'Components/Organisms/Hero Block',
  component: 'aw-hero-block',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A versatile hero block component for creating engaging landing sections.

## Features
- Multiple background types (CSS gradients, canvas animations, images)
- Flexible text positioning in a 3x4 grid system
- Built-in animations for title and content
- Support for tags/badges
- Responsive design with mobile optimizations

## Usage
\`\`\`html
<aw-hero-block 
  title="Welcome to __Our Platform__"
  content="Discover amazing experiences"
  tag="Featured"
  background_type="cssgradient"
  height_style="full">
</aw-hero-block>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Hero title text. Use __text__ for emphasis highlighting.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    content: {
      control: 'text',
      description: 'Hero subtitle or description text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    tag: {
      control: 'text',
      description: 'Optional tag or badge text displayed above the title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    background_type: {
      control: 'select',
      options: ['none', 'canvasSphere', 'canvasGradient', 'cssgradient', 'image'],
      description: 'Type of background to display',
      table: {
        type: { summary: 'none | canvasSphere | canvasGradient | cssgradient | image' },
        defaultValue: { summary: 'cssgradient' }
      }
    },
    height_style: {
      control: 'select',
      options: ['full', 'half', 'auto'],
      description: 'Controls the hero block height',
      table: {
        type: { summary: 'full | half | auto' },
        defaultValue: { summary: 'full' }
      }
    },
    text_position: {
      control: 'select',
      options: ['1-1', '1-2', '1-3', '1-4', '2-1', '2-2', '2-3', '2-4', '3-1', '3-2', '3-3', '3-4'],
      description: 'Position of main text in the grid system',
      table: {
        type: { summary: 'Grid position (row-column format)' },
        defaultValue: { summary: '2-2' }
      }
    },
    text_align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment for all text elements',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' }
      }
    }
  },
  args: {
    title: 'Welcome to Our Platform',
    content: 'Discover amazing experiences with cutting-edge technology',
    tag: '',
    background_type: 'cssgradient',
    height_style: 'half',
    text_position: '2-2',
    text_align: 'center'
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default hero block with standard settings
 */
export const Default: Story = {
  render: (args) => html`
    <aw-hero-block 
      title=${args.title}
      content=${args.content}
      tag=${args.tag}
      background_type=${args.background_type}
      height_style=${args.height_style}
      text_position=${args.text_position}
      text_align=${args.text_align}>
    </aw-hero-block>
  `
};

/**
 * Hero with emphasized text using markdown syntax
 */
export const WithEmphasis: Story = {
  render: () => html`
    <aw-hero-block 
      title="Research __design__ and build amazing experiences"
      content="We create digital products that make a difference"
      tag="Featured"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use __text__ syntax in the title to create emphasized text with special styling.'
      }
    }
  }
};

/**
 * Examples of different background types
 */
export const BackgroundTypes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <aw-hero-block 
        title="CSS Gradient"
        content="Beautiful gradient background"
        background_type="cssgradient"
        height_style="auto">
      </aw-hero-block>
      
      <aw-hero-block 
        title="Canvas Sphere"
        content="Dynamic sphere animation"
        background_type="canvasSphere"
        height_style="auto">
      </aw-hero-block>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Hero block supports multiple background types including CSS gradients and canvas animations.'
      }
    }
  }
};

/**
 * Different height styles demonstration
 */
export const HeightStyles: Story = {
  render: () => html`
    <div>
      <aw-hero-block 
        title="Full Height Hero"
        content="Takes up the full viewport height"
        background_type="cssgradient"
        height_style="full">
      </aw-hero-block>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Hero block can be full height (100vh), half height (50vh), or auto height.'
      }
    }
  }
};

/**
 * Text positioning examples
 */
export const TextPositioning: Story = {
  render: () => html`
    <aw-hero-block 
      title="Top Left Position"
      content="Text positioned in the upper left area"
      text_position="1-1"
      text_align="left"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Text can be positioned in different areas of the hero using the grid system (1-1 through 3-4).'
      }
    }
  }
};