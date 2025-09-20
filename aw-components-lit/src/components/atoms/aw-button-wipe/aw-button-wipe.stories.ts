import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-button-wipe.ts';

/**
 * The AW Button Wipe component is an animated button with wipe animation effects on hover.
 * Features sophisticated highlight animations, sound effects, and multiple button variants.
 */
const meta: Meta = {
  title: 'Components/Base/Button Wipe',
  component: 'aw-button-wipe',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A dynamic button component with wipe animation effects for enhanced visual feedback.

## Features
- Smooth wipe highlight animations on hover
- Multiple button type variants
- Sound effect integration
- Scale animations on hover and active states
- Accessibility compliant with proper event handling
- Customizable animation timing

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button-wipe 
  label_text="Click me" 
  button_type="primary"
  sound_type="click">
</aw-button-wipe>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label_text: {
      control: 'text',
      description: 'The button text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' }
      }
    },
    button_type: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'transparent'],
      description: 'Controls the button appearance variant',
      table: {
        type: { summary: 'default | primary | secondary | transparent' },
        defaultValue: { summary: 'default' }
      }
    },
    sound_type: {
      control: 'select',
      options: ['beepOn', 'beepOff', 'click', 'plink', 'drip', 'marimba'],
      description: 'Sound effect to play on click',
      table: {
        type: { summary: 'beepOn | beepOff | click | plink | drip | marimba' },
        defaultValue: { summary: 'click' }
      }
    }
  },
  args: {
    label_text: 'Button',
    button_type: 'default',
    sound_type: 'click'
  }
};

export default meta;
type Story = StoryObj;

/**
 * The default button wipe with standard settings
 */
export const Default: Story = {
  render: (args) => html`
    <aw-button-wipe 
      label_text=${args.label_text}
      button_type=${args.button_type}
      sound_type=${args.sound_type}
      @awClick=${(e: CustomEvent) => {
        console.log('Button wipe clicked:', e.detail);
      }}
      @awButtonSound=${(e: CustomEvent) => {
        console.log('Sound event:', e.detail);
      }}>
    </aw-button-wipe>
  `
};

/**
 * Examples of all button type variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Default" 
        button_type="default">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Primary" 
        button_type="primary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Secondary" 
        button_type="secondary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Transparent" 
        button_type="transparent">
      </aw-button-wipe>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button wipe supports multiple visual variants with unique highlight colors for each type.'
      }
    }
  }
};

/**
 * Interactive demonstration showing hover states
 */
export const HoverStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-direction: column; align-items: center;">
      <div style="text-align: center;">
        <h3>Hover over buttons to see wipe animation</h3>
        <p style="color: #666; font-size: 0.9rem;">
          Each button type has a unique wipe highlight effect
        </p>
      </div>
      
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Default Wipe" 
            button_type="default">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Blue highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Primary Wipe" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Secondary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Secondary Wipe" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Transparent Wipe" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Hover states demonstrate the unique wipe animation for each button variant. The highlight element transforms from a line to a circle on hover.'
      }
    }
  }
};

/**
 * Examples of different sound types
 */
export const SoundTypes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Beep On" 
        button_type="primary"
        sound_type="beepOn">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Beep Off" 
        button_type="primary"
        sound_type="beepOff">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Click" 
        button_type="primary"
        sound_type="click">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Plink" 
        button_type="primary"
        sound_type="plink">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Drip" 
        button_type="primary"
        sound_type="drip">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Marimba" 
        button_type="primary"
        sound_type="marimba">
      </aw-button-wipe>
    </div>
    
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
      Click buttons to trigger different sound effects (check console for sound events)
    </p>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button wipe supports multiple sound effect types for audio feedback on interactions.'
      }
    }
  }
};

/**
 * Animation details showcase
 */
export const AnimationDetails: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Animation Sequence</h3>
        <p style="color: #666; max-width: 500px;">
          The wipe animation consists of multiple coordinated effects:
        </p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; width: 100%; max-width: 800px;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Scale Animation</h4>
          <aw-button-wipe 
            label_text="Hover Me" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Button scales on hover
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Highlight Wipe</h4>
          <aw-button-wipe 
            label_text="Watch Highlight" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Highlight transforms & moves
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Exit Animation</h4>
          <aw-button-wipe 
            label_text="Hover & Leave" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Smooth return animation
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The wipe animation combines scale effects with highlight transformations for a sophisticated interaction experience.'
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
        <h3>Navigation Button</h3>
        <aw-button-wipe 
          label_text="Explore Features" 
          button_type="primary"
          sound_type="click">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Call-to-Action</h3>
        <aw-button-wipe 
          label_text="Get Started" 
          button_type="secondary"
          sound_type="plink">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Subtle Action</h3>
        <aw-button-wipe 
          label_text="Learn More" 
          button_type="transparent"
          sound_type="beepOn">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Form Submit</h3>
        <aw-button-wipe 
          label_text="Submit Form" 
          button_type="default"
          sound_type="marimba">
        </aw-button-wipe>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples demonstrating how button wipe enhances different types of user interactions.'
      }
    }
  }
};