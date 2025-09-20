import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-position-input.ts';

/**
 * The AW Position Input component provides an intuitive grid-based position selector.
 * Features multiple grid sizes, animations, keyboard navigation, and accessibility support.
 */
const meta: Meta = {
  title: 'Components/Base/Position Input',
  component: 'aw-position-input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An interactive position selector component with visual grid interface and comprehensive accessibility.

## Features
- Multiple grid sizes (2x2, 3x3, 4x4, 5x5)
- Various animation types (spring, smooth, bounce, fade)
- Keyboard navigation support
- Position validation
- Custom coordinate systems
- Responsive design
- ARIA compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-position-input 
  label="Select Position"
  value="1-1"
  grid_size="3x3"
  animation="spring">
</aw-position-input>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the position input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    value: {
      control: 'text',
      description: 'Current selected position (e.g., "1-1")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1-1' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Controls the component size',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'md' }
      }
    },
    grid_size: {
      control: 'select',
      options: ['2x2', '3x3', '4x4', '5x5'],
      description: 'Grid size configuration',
      table: {
        type: { summary: '2x2 | 3x3 | 4x4 | 5x5' },
        defaultValue: { summary: '3x3' }
      }
    },
    animation: {
      control: 'select',
      options: ['spring', 'smooth', 'bounce', 'fade'],
      description: 'Animation type for position changes',
      table: {
        type: { summary: 'spring | smooth | bounce | fade' },
        defaultValue: { summary: 'spring' }
      }
    },
    coordinate_system: {
      control: 'select',
      options: ['zero-based', 'one-based', 'named'],
      description: 'Coordinate system to use',
      table: {
        type: { summary: 'zero-based | one-based | named' },
        defaultValue: { summary: 'zero-based' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    keyboard_navigation: {
      control: 'boolean',
      description: 'Enable keyboard navigation with arrow keys',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    show_labels: {
      control: 'boolean',
      description: 'Show position labels on hover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    animation_duration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' }
      }
    }
  },
  args: {
    label: 'Select Position',
    value: '1-1',
    size: 'md',
    grid_size: '3x3',
    animation: 'spring',
    coordinate_system: 'zero-based',
    disabled: false,
    keyboard_navigation: true,
    show_labels: false,
    animation_duration: 300
  }
};

export default meta;
type Story = StoryObj;

/**
 * The default position input with standard settings
 */
export const Default: Story = {
  render: (args) => html`
    <aw-position-input 
      label=${args.label}
      value=${args.value}
      size=${args.size}
      grid_size=${args.grid_size}
      animation=${args.animation}
      coordinate_system=${args.coordinate_system}
      ?disabled=${args.disabled}
      ?keyboard_navigation=${args.keyboard_navigation}
      ?show_labels=${args.show_labels}
      animation_duration=${args.animation_duration}
      @awChange=${(e: CustomEvent) => {
        console.log('Position changed:', e.detail);
      }}
      @awPositionSelected=${(e: CustomEvent) => {
        console.log('Position selected:', e.detail);
      }}>
    </aw-position-input>
  `
};

/**
 * Examples of different grid sizes
 */
export const GridSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="text-align: center;">
        <aw-position-input 
          label="2x2 Grid"
          value="0-0"
          grid_size="2x2"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="3x3 Grid"
          value="1-1"
          grid_size="3x3"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="4x4 Grid"
          value="1-1"
          grid_size="4x4"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="5x5 Grid"
          value="2-2"
          grid_size="5x5"
          size="lg">
        </aw-position-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports multiple grid sizes from 2x2 up to 5x5 for different use cases.'
      }
    }
  }
};

/**
 * Examples of different animation types
 */
export const AnimationTypes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-position-input 
          label="Spring Animation"
          value="1-1"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Bouncy spring effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Smooth Animation"
          value="1-1"
          animation="smooth"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Smooth ease-out
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Bounce Animation"
          value="1-1"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Elastic bounce effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Fade Animation"
          value="1-1"
          animation="fade"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Simple fade effect
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Click different positions to see the animation effects
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports multiple animation types for the position indicator movement.'
      }
    }
  }
};

/**
 * Examples of different component sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <aw-position-input 
          label="XS Size"
          value="1-1"
          size="xs">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Small Size"
          value="1-1"
          size="sm">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Medium Size"
          value="1-1"
          size="md">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Large Size"
          value="1-1"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="XL Size"
          value="1-1"
          size="xl">
        </aw-position-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports 5 different sizes to fit various design contexts.'
      }
    }
  }
};

/**
 * Keyboard navigation demonstration
 */
export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Keyboard Navigation</h3>
        <p style="color: #666; max-width: 400px;">
          Click on the position input below and use arrow keys to navigate.
          Try Up, Down, Left, Right, Home, and End keys.
        </p>
      </div>
      
      <aw-position-input 
        label="Use Arrow Keys"
        value="1-1"
        grid_size="3x3"
        size="xl"
        keyboard_navigation
        show_labels>
      </aw-position-input>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Keys:</strong> Navigate positions</li>
          <li><strong>Home:</strong> Go to minimum position</li>
          <li><strong>End:</strong> Go to maximum position</li>
          <li><strong>Enter/Space:</strong> Select position</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports comprehensive keyboard navigation for accessibility. Focus the component and use arrow keys to navigate.'
      }
    }
  }
};

/**
 * Interactive features showcase
 */
export const InteractiveFeatures: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Interactive Features</h3>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; width: 100%;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>With Labels</h4>
          <aw-position-input 
            label="Hover for Labels"
            value="1-1"
            size="lg"
            show_labels>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Hover over positions to see labels
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Custom Animation Speed</h4>
          <aw-position-input 
            label="Fast Animation"
            value="1-1"
            size="lg"
            animation="spring"
            animation_duration="150">
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Faster animation (150ms)
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Disabled State</h4>
          <aw-position-input 
            label="Disabled Input"
            value="1-1"
            size="lg"
            disabled>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Cannot be interacted with
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Position input includes various interactive features like hover labels, custom animation speeds, and disabled states.'
      }
    }
  }
};

/**
 * Real-world usage examples
 */
export const UsageExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Image Alignment Control</h3>
        <aw-position-input 
          label="Image Position"
          value="1-1"
          grid_size="3x3"
          animation="smooth"
          show_labels>
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Control where images are positioned within containers
        </p>
      </div>
      
      <div>
        <h3>Layout Grid Selector</h3>
        <aw-position-input 
          label="Grid Position"
          value="0-0"
          grid_size="4x4"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions in responsive grid layouts
        </p>
      </div>
      
      <div>
        <h3>Game Board Position</h3>
        <aw-position-input 
          label="Player Position"
          value="2-2"
          grid_size="5x5"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions on game boards or tile-based interfaces
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how position input can be used for image alignment, layout selection, and game interfaces.'
      }
    }
  }
};