import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-rotary-input.ts';

/**
 * The AW Rotary Input component provides an intuitive dial/knob interface for value selection.
 * Features multiple modes, drag interaction, keyboard navigation, and accessibility support.
 */
const meta: Meta = {
  title: 'Components/Base/Rotary Input',
  component: 'aw-rotary-input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An interactive rotary input component that simulates physical knobs and dials.

## Features
- Multiple operation modes (continuous, limited, stepped, snap)
- Drag-based interaction with configurable sensitivity
- Keyboard navigation support
- Value display and formatting
- Validation and error handling
- Responsive sizing
- ARIA compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-rotary-input 
  label="Volume"
  value="0.5"
  mode="limited"
  min="0"
  max="1">
</aw-rotary-input>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the rotary input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    value: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Current rotation value (0-1 normalized)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
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
    mode: {
      control: 'select',
      options: ['continuous', 'limited', 'stepped', 'snap'],
      description: 'Rotary input operation mode',
      table: {
        type: { summary: 'continuous | limited | stepped | snap' },
        defaultValue: { summary: 'continuous' }
      }
    },
    sensitivity: {
      control: { type: 'range', min: 0.1, max: 1.2, step: 0.1 },
      description: 'Mouse drag sensitivity',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' }
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
      description: 'Enable keyboard navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    show_value: {
      control: 'boolean',
      description: 'Show value display in center',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    animation_curve: {
      control: 'select',
      options: ['linear', 'ease', 'ease-in-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'],
      description: 'Animation curve for smooth transitions',
      table: {
        type: { summary: 'linear | ease | ease-in-out | spring | smooth' },
        defaultValue: { summary: 'smooth' }
      }
    },
    min: {
      control: { type: 'number', min: -10, max: 10, step: 0.1 },
      description: 'Minimum value (for limited and stepped modes)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    max: {
      control: { type: 'number', min: -10, max: 10, step: 0.1 },
      description: 'Maximum value (for limited and stepped modes)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' }
      }
    },
    step: {
      control: { type: 'number', min: 0.01, max: 1, step: 0.01 },
      description: 'Step size (for stepped mode)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' }
      }
    },
    limit_angle: {
      control: { type: 'range', min: 90, max: 360, step: 15 },
      description: 'Maximum rotation angle in degrees (for limited mode)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '270' }
      }
    },
    start_angle: {
      control: { type: 'range', min: -180, max: 180, step: 15 },
      description: 'Starting angle offset in degrees',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '-135' }
      }
    }
  },
  args: {
    label: 'Rotary Control',
    value: 0.5,
    size: 'md',
    mode: 'continuous',
    sensitivity: 0.5,
    disabled: false,
    keyboard_navigation: true,
    show_value: false,
    animation_curve: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    min: 0,
    max: 1,
    step: 0.1,
    limit_angle: 270,
    start_angle: -135
  }
};

export default meta;
type Story = StoryObj;

/**
 * The default rotary input with standard settings
 */
export const Default: Story = {
  render: (args) => html`
    <aw-rotary-input 
      label=${args.label}
      value=${args.value}
      size=${args.size}
      mode=${args.mode}
      sensitivity=${args.sensitivity}
      ?disabled=${args.disabled}
      ?keyboard_navigation=${args.keyboard_navigation}
      ?show_value=${args.show_value}
      animation_curve=${args.animation_curve}
      min=${args.min}
      max=${args.max}
      step=${args.step}
      limit_angle=${args.limit_angle}
      start_angle=${args.start_angle}
      @awChange=${(e: CustomEvent) => {
        console.log('Rotary value changed:', e.detail);
      }}
      @awDragStart=${(e: CustomEvent) => {
        console.log('Drag started:', e.detail);
      }}
      @awDragEnd=${(e: CustomEvent) => {
        console.log('Drag ended:', e.detail);
      }}>
    </aw-rotary-input>
  `
};

/**
 * Examples of different operation modes
 */
export const OperationModes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Continuous"
          value="0.3"
          mode="continuous"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Unlimited rotation
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Limited"
          value="0.5"
          mode="limited"
          limit_angle="270"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          270° range limit
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Stepped"
          value="0.4"
          mode="stepped"
          step="0.2"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Discrete steps (0.2)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Snap Points"
          value="0.5"
          mode="snap"
          .snap_points=${[0, 0.25, 0.5, 0.75, 1]}
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Snaps to specific values
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to experience different operation modes
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports four different operation modes: continuous rotation, limited range, stepped increments, and snap points.'
      }
    }
  }
};

/**
 * Examples of different component sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XS"
          value="0.3"
          size="xs"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Small"
          value="0.4"
          size="sm"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Medium"
          value="0.5"
          size="md"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Large"
          value="0.6"
          size="lg"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XL"
          value="0.7"
          size="xl"
          mode="limited">
        </aw-rotary-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports 5 different sizes to fit various design contexts.'
      }
    }
  }
};

/**
 * Sensitivity and interaction demonstration
 */
export const SensitivityLevels: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very Low"
          value="0.5"
          sensitivity="0.1"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.1 (precise)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal"
          value="0.5"
          sensitivity="0.5"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.5 (balanced)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very High"
          value="0.5"
          sensitivity="1.2"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 1.2 (quick)
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to feel the difference in sensitivity levels
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sensitivity levels affect how much the knob rotates relative to mouse movement. Lower values provide more precise control.'
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
          Click on a rotary input below and use keyboard controls.
          Try arrow keys, Page Up/Down, Home, and End.
        </p>
      </div>
      
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
        <aw-rotary-input 
          label="Use Arrow Keys"
          value="0.5"
          mode="limited"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
        
        <aw-rotary-input 
          label="Stepped Control"
          value="0.6"
          mode="stepped"
          step="0.1"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
      </div>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Up/Right:</strong> Increase value</li>
          <li><strong>Arrow Down/Left:</strong> Decrease value</li>
          <li><strong>Page Up:</strong> Large increase</li>
          <li><strong>Page Down:</strong> Large decrease</li>
          <li><strong>Home:</strong> Go to minimum</li>
          <li><strong>End:</strong> Go to maximum</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports comprehensive keyboard navigation for accessibility. Focus the component and use keyboard controls.'
      }
    }
  }
};

/**
 * Value display and formatting
 */
export const ValueDisplay: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Volume"
          value="0.75"
          mode="limited"
          size="xl"
          show_value
          .formatter=${(value: number) => `${Math.round(value * 100)}%`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Percentage display
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Temperature"
          value="0.4"
          mode="limited"
          min="-10"
          max="40"
          size="xl"
          show_value
          .formatter=${(value: number) => `${Math.round(-10 + value * 50)}°C`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Temperature range
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Frequency"
          value="0.6"
          mode="limited"
          size="xl"
          show_value
          .formatter=${(value: number) => `${(value * 20).toFixed(1)}kHz`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Frequency display
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports custom value formatting for different units and display formats.'
      }
    }
  }
};

/**
 * Disabled and error states
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal State"
          value="0.6"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Interactive
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Disabled State"
          value="0.4"
          mode="limited"
          size="lg"
          show_value
          disabled>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Cannot interact
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="No Keyboard"
          value="0.7"
          mode="limited"
          size="lg"
          show_value
          keyboard_navigation="false">
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Mouse only
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports disabled states and can have keyboard navigation disabled while keeping mouse interaction.'
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
        <h3>Audio Mixer Controls</h3>
        <div style="display: flex; gap: 1rem; align-items: end;">
          <aw-rotary-input 
            label="Volume"
            value="0.75"
            mode="limited"
            size="lg"
            show_value
            .formatter=${(value: number) => `${Math.round(value * 100)}%`}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Balance"
            value="0.5"
            mode="limited"
            start_angle="-90"
            limit_angle="180"
            size="lg"
            show_value
            .formatter=${(value: number) => value < 0.5 ? `L${Math.round((0.5 - value) * 200)}` : value > 0.5 ? `R${Math.round((value - 0.5) * 200)}` : 'C'}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Treble"
            value="0.6"
            mode="limited"
            size="lg"
            show_value
            .formatter=${(value: number) => `${Math.round((value - 0.5) * 20)}dB`}>
          </aw-rotary-input>
        </div>
      </div>
      
      <div>
        <h3>Motor Speed Control</h3>
        <aw-rotary-input 
          label="RPM"
          value="0.3"
          mode="stepped"
          step="0.05"
          size="xl"
          show_value
          .formatter=${(value: number) => `${Math.round(value * 3000)} RPM`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Stepped control for precise speed settings
        </p>
      </div>
      
      <div>
        <h3>Color Picker Hue</h3>
        <aw-rotary-input 
          label="Hue"
          value="0.6"
          mode="continuous"
          size="xl"
          show_value
          .formatter=${(value: number) => `${Math.round(value * 360)}°`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Continuous rotation for hue selection
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how rotary input can be used for audio controls, motor speed, and color selection.'
      }
    }
  }
};