import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-button-swap.ts';

/**
 * The AW Button Swap component is an animated button with text swap effects on hover/click.
 * Features comprehensive text animation, sound effects, and multiple trigger modes.
 */
const meta: Meta = {
  title: 'Components/Base/Button Swap',
  component: 'aw-button-swap',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A sophisticated button component with text swap animations for enhanced user interactions.

## Features
- Text swap animations on hover, click, or manual trigger
- Multiple button variants and sizes
- Sound effect integration
- Configurable animation duration and stagger
- Accessibility compliant with ARIA support
- Comprehensive event handling

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button-swap 
  label="Click me" 
  swap_text="Thanks!"
  trigger="hover"
  type="primary">
</aw-button-swap>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The default button text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Swap Button' }
      }
    },
    swap_text: {
      control: 'text',
      description: 'The alternate text to swap to on interaction',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Controls the button size',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'md' }
      }
    },
    type: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'transparent'],
      description: 'Controls the button appearance variant',
      table: {
        type: { summary: 'default | primary | secondary | tertiary | transparent' },
        defaultValue: { summary: 'default' }
      }
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'manual'],
      description: 'When the text swap animation should trigger',
      table: {
        type: { summary: 'hover | click | manual' },
        defaultValue: { summary: 'hover' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    duration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' }
      }
    },
    stagger_delay: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Character stagger delay for animation',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '20' }
      }
    },
    restore_delay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description: 'Delay before restoring original text (hover mode)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' }
      }
    },
    sound: {
      control: 'select',
      options: ['beepOn', 'beepOff', 'click', 'plink', 'drip', 'marimba'],
      description: 'Sound effect to play on interaction',
      table: {
        type: { summary: 'beepOn | beepOff | click | plink | drip | marimba' },
        defaultValue: { summary: 'click' }
      }
    }
  },
  args: {
    label: 'Swap Button',
    swap_text: 'Swapped!',
    size: 'md',
    type: 'default',
    trigger: 'hover',
    disabled: false,
    duration: 300,
    stagger_delay: 20,
    restore_delay: 200,
    sound: 'click'
  }
};

export default meta;
type Story = StoryObj;

/**
 * The default button swap with hover trigger
 */
export const Default: Story = {
  render: (args) => html`
    <aw-button-swap 
      label=${args.label}
      swap_text=${args.swap_text}
      size=${args.size}
      type=${args.type}
      trigger=${args.trigger}
      ?disabled=${args.disabled}
      duration=${args.duration}
      stagger_delay=${args.stagger_delay}
      restore_delay=${args.restore_delay}
      sound=${args.sound}
      @awClick=${(e: CustomEvent) => {
        console.log('Button swap clicked:', e.detail);
      }}
      @awSwapComplete=${(e: CustomEvent) => {
        console.log('Swap animation complete:', e.detail);
      }}>
    </aw-button-swap>
  `
};

/**
 * Examples of different trigger modes
 */
export const TriggerModes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Hover Me" 
        swap_text="Hovering!" 
        trigger="hover"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Click Me" 
        swap_text="Clicked!" 
        trigger="click"
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Manual Control" 
        swap_text="Manually Swapped!" 
        trigger="manual"
        type="tertiary"
        id="manual-swap">
      </aw-button-swap>
    </div>
    
    <div style="margin-top: 1rem;">
      <button @click=${() => {
        const manualSwap = document.getElementById('manual-swap') as any;
        manualSwap?.swapTo('Manual Triggered!');
      }}>
        Trigger Manual Swap
      </button>
      
      <button @click=${() => {
        const manualSwap = document.getElementById('manual-swap') as any;
        manualSwap?.restore();
      }}>
        Restore Manual Swap
      </button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports hover, click, and manual trigger modes for different interaction patterns.'
      }
    }
  }
};

/**
 * Examples of all button variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Default" 
        swap_text="Default Swapped!" 
        type="default">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Primary" 
        swap_text="Primary Swapped!" 
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Secondary" 
        swap_text="Secondary Swapped!" 
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Tertiary" 
        swap_text="Tertiary Swapped!" 
        type="tertiary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Transparent" 
        swap_text="Transparent Swapped!" 
        type="transparent">
      </aw-button-swap>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports multiple visual variants to match different design contexts.'
      }
    }
  }
};

/**
 * Examples of all button sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <aw-button-swap 
        label="XS" 
        swap_text="XS!" 
        size="xs"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Small" 
        swap_text="Small!" 
        size="sm"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Medium" 
        swap_text="Medium!" 
        size="md"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Large" 
        swap_text="Large!" 
        size="lg"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Extra Large" 
        swap_text="XL!" 
        size="xl"
        type="primary">
      </aw-button-swap>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports 5 different sizes from extra small to extra large.'
      }
    }
  }
};

/**
 * Examples of different animation speeds
 */
export const AnimationSpeeds: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Fast (150ms)" 
        swap_text="Fast!" 
        duration="150"
        stagger_delay="10"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Normal (300ms)" 
        swap_text="Normal!" 
        duration="300"
        stagger_delay="20"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Slow (600ms)" 
        swap_text="Slow!" 
        duration="600"
        stagger_delay="40"
        type="primary">
      </aw-button-swap>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button swap animations can be customized with different durations and stagger delays.'
      }
    }
  }
};

/**
 * Disabled state examples
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Disabled Default" 
        swap_text="Won't Swap" 
        type="default"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Primary" 
        swap_text="Won't Swap" 
        type="primary"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Secondary" 
        swap_text="Won't Swap" 
        type="secondary"
        disabled>
      </aw-button-swap>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Disabled button swaps cannot be interacted with and have reduced opacity.'
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
        <h3>Call-to-Action Button</h3>
        <aw-button-swap 
          label="Download Now" 
          swap_text="Downloading..." 
          trigger="click"
          type="primary"
          size="lg">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Navigation Button</h3>
        <aw-button-swap 
          label="Learn More" 
          swap_text="Let's Go!" 
          trigger="hover"
          type="secondary">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Confirmation Button</h3>
        <aw-button-swap 
          label="Delete Item" 
          swap_text="Are you sure?" 
          trigger="hover"
          type="tertiary"
          duration="400">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Status Toggle</h3>
        <aw-button-swap 
          label="Enable Feature" 
          swap_text="Feature Enabled!" 
          trigger="click"
          type="transparent">
        </aw-button-swap>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how button swap can enhance user interactions in different contexts.'
      }
    }
  }
};