import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './aw-button.ts';

/**
 * The AW Button component is a highly configurable button that follows AW design system guidelines.
 * It supports multiple sizes, variants, states, and accessibility features.
 */
const meta: Meta = {
  title: 'Components/Atoms/Button',
  component: 'aw-button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants and sizes.

## Features
- Multiple size options (xs, sm, md, lg, xl)
- Various color variants (primary, secondary, tertiary, danger, warning, success)  
- Disabled state support
- Custom click event handling
- Accessibility compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button label_text="Click me" variant="primary" size="md"></aw-button>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label_text: {
      control: 'text',
      description: 'The text content displayed in the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Controls the button size using predefined size tokens',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'],
      description: 'Controls the button appearance using predefined color variants',
      table: {
        type: { summary: 'primary | secondary | tertiary | danger | warning | success' },
        defaultValue: { summary: 'primary' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and cannot be interacted with',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    button_type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' }
      }
    },
    aria_label: {
      control: 'text',
      description: 'Accessible label for screen readers when button text is not descriptive enough',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    aria_controls: {
      control: 'text',
      description: 'Describes the element controlled by this button for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    aria_expanded: {
      control: 'boolean',
      description: 'Indicates if the button controls an expanded element',
      table: {
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'null' }
      }
    }
  },
  args: {
    label_text: 'Button',
    size: 'md',
    variant: 'primary',
    disabled: false,
    button_type: 'button',
    aria_label: '',
    aria_controls: '',
    aria_expanded: null
  }
};

export default meta;
type Story = StoryObj;

/**
 * The default button with standard settings
 */
export const Default: Story = {
  render: (args) => {
    // Clean args to ensure we only pass primitive values
    const cleanArgs = {
      label_text: String(args.label_text || 'Button'),
      size: String(args.size || 'md'),
      variant: String(args.variant || 'primary'),
      disabled: Boolean(args.disabled),
      button_type: String(args.button_type || 'button'),
      aria_label: args.aria_label ? String(args.aria_label) : undefined,
      aria_controls: args.aria_controls ? String(args.aria_controls) : undefined,
      aria_expanded: args.aria_expanded !== null && args.aria_expanded !== undefined ? Boolean(args.aria_expanded) : undefined
    };

    return html`
      <aw-button 
        label_text=${cleanArgs.label_text}
        size=${cleanArgs.size}
        variant=${cleanArgs.variant}
        ?disabled=${cleanArgs.disabled}
        button_type=${cleanArgs.button_type}
        aria_label=${ifDefined(cleanArgs.aria_label)}
        aria_controls=${ifDefined(cleanArgs.aria_controls)}
        ?aria_expanded=${cleanArgs.aria_expanded}
        @aw-button-click=${(e: CustomEvent) => {
          console.log('Button clicked:', e.detail);
        }}>
      </aw-button>
    `;
  }
};

/**
 * Examples of all available button sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <aw-button label_text="XS" size="xs"></aw-button>
      <aw-button label_text="Small" size="sm"></aw-button>
      <aw-button label_text="Medium" size="md"></aw-button>
      <aw-button label_text="Large" size="lg"></aw-button>
      <aw-button label_text="XL" size="xl"></aw-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports 5 different sizes from extra small to extra large.'
      }
    }
  }
};

/**
 * Examples of all available button variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <aw-button label_text="Primary" variant="primary"></aw-button>
      <aw-button label_text="Secondary" variant="secondary"></aw-button>
      <aw-button label_text="Tertiary" variant="tertiary"></aw-button>
      <aw-button label_text="Danger" variant="danger"></aw-button>
      <aw-button label_text="Warning" variant="warning"></aw-button>
      <aw-button label_text="Success" variant="success"></aw-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports 6 different color variants for various use cases.'
      }
    }
  }
};

/**
 * Examples of disabled buttons
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <aw-button label_text="Disabled Primary" variant="primary" disabled></aw-button>
      <aw-button label_text="Disabled Secondary" variant="secondary" disabled></aw-button>
      <aw-button label_text="Disabled Danger" variant="danger" disabled></aw-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are not interactive and have reduced opacity.'
      }
    }
  }
};

/**
 * Examples of different button types for forms
 */
export const ButtonTypes: Story = {
  render: () => html`
    <form style="display: flex; gap: 1rem;">
      <aw-button label_text="Regular Button" button_type="button"></aw-button>
      <aw-button label_text="Submit Form" button_type="submit" variant="primary"></aw-button>
      <aw-button label_text="Reset Form" button_type="reset" variant="secondary"></aw-button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports different HTML button types for form interactions.'
      }
    }
  }
};

/**
 * Examples demonstrating accessibility features
 */
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>ARIA Labels for Context</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <aw-button 
            label_text="×" 
            aria_label="Close dialog"
            variant="tertiary"
            size="sm">
          </aw-button>
          <aw-button 
            label_text="🔍" 
            aria_label="Search products"
            variant="secondary">
          </aw-button>
          <aw-button 
            label_text="⚙️" 
            aria_label="Open settings menu"
            variant="tertiary">
          </aw-button>
        </div>
      </div>

      <div>
        <h3>Menu Control Button</h3>
        <aw-button 
          label_text="Options Menu"
          aria_controls="options-menu"
          aria_expanded="false"
          variant="secondary"
          @aw-button-click=${() => {
            const button = document.querySelector('aw-button[aria_controls="options-menu"]');
            const expanded = button?.getAttribute('aria_expanded') === 'true';
            button?.setAttribute('aria_expanded', (!expanded).toString());
          }}>
        </aw-button>
        <div id="options-menu" style="margin-top: 0.5rem; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
          <p>Menu content would appear here</p>
        </div>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.875rem;">
          Use Tab to navigate, Enter/Space to activate, and focus indicators are visible.
        </p>
        <div style="display: flex; gap: 1rem;">
          <aw-button label_text="First" variant="primary"></aw-button>
          <aw-button label_text="Second" variant="secondary"></aw-button>
          <aw-button label_text="Third" variant="tertiary"></aw-button>
          <aw-button label_text="Fourth" disabled variant="primary"></aw-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the accessibility features of the button component:

- **ARIA Labels**: Provide descriptive labels for screen readers when button text isn't sufficient
- **ARIA Controls**: Link buttons to elements they control (like menus or dialogs)  
- **ARIA Expanded**: Indicate the state of collapsible content
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper semantic markup and ARIA attributes

All buttons meet WCAG 2.1 AA guidelines for accessibility.
        `
      }
    }
  }
};