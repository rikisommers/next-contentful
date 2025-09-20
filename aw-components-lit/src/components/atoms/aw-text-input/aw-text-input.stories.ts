import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './aw-text-input.ts';

/**
 * The AW Text Input component is a fully accessible form input that follows AW design system guidelines.
 * It supports validation, error states, various input types, and comprehensive accessibility features.
 */
const meta: Meta = {
  title: 'Components/Atoms/TextInput',
  component: 'aw-text-input',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile text input component with full accessibility support.

## Features
- Multiple input types (text, email, password, url, tel, search)
- Size variants (sm, md, lg)  
- Form validation with error states
- Required field indicators
- ARIA support for screen readers
- Live error announcements
- Proper label association

## Accessibility
- WCAG 2.1 AA compliant
- Screen reader optimized
- Keyboard navigation support
- Error state announcements
- Proper focus management

## Usage
\`\`\`html
<aw-text-input 
  label_text="Email Address"
  input_type="email" 
  required="true"
  placeholder="Enter your email">
</aw-text-input>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    label_text: {
      control: 'text',
      description: 'Input label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    input_value: {
      control: 'text',
      description: 'Input value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    input_type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'search'],
      description: 'Input type',
      table: {
        type: { summary: 'text | email | password | url | tel | search' },
        defaultValue: { summary: 'text' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size variant',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Input disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Input required state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Input readonly state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    has_error: {
      control: 'boolean',
      description: 'Error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error_message: {
      control: 'text',
      description: 'Error message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    aria_describedby: {
      control: 'text',
      description: 'Accessible description for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    aria_invalid: {
      control: 'boolean',
      description: 'ARIA invalid state for form validation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    label_text: 'Label',
    input_value: '',
    placeholder: '',
    input_type: 'text',
    size: 'md',
    disabled: false,
    required: false,
    readonly: false,
    has_error: false,
    error_message: '',
    aria_describedby: '',
    aria_invalid: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default text input with standard settings
 */
export const Default: Story = {
  render: (args) => {
    // Clean args to ensure we only pass primitive values
    const cleanArgs = {
      label_text: String(args.label_text || 'Label'),
      input_value: String(args.input_value || ''),
      placeholder: String(args.placeholder || ''),
      input_type: String(args.input_type || 'text'),
      size: String(args.size || 'md'),
      disabled: Boolean(args.disabled),
      required: Boolean(args.required),
      readonly: Boolean(args.readonly),
      has_error: Boolean(args.has_error),
      error_message: args.error_message ? String(args.error_message) : undefined,
      aria_describedby: args.aria_describedby ? String(args.aria_describedby) : undefined,
      aria_invalid: Boolean(args.aria_invalid)
    };

    return html`
      <aw-text-input 
        label_text=${cleanArgs.label_text}
        input_value=${cleanArgs.input_value}
        placeholder=${cleanArgs.placeholder}
        input_type=${cleanArgs.input_type}
        size=${cleanArgs.size}
        ?disabled=${cleanArgs.disabled}
        ?required=${cleanArgs.required}
        ?readonly=${cleanArgs.readonly}
        ?has_error=${cleanArgs.has_error}
        error_message=${ifDefined(cleanArgs.error_message)}
        aria_describedby=${ifDefined(cleanArgs.aria_describedby)}
        ?aria_invalid=${cleanArgs.aria_invalid}
        @aw-text-input-input=${(e: CustomEvent) => {
          console.log('Input changed:', e.detail);
        }}>
      </aw-text-input>
    `;
  }
};

/**
 * Examples of different input types
 */
export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Text Input" input_type="text" placeholder="Enter text"></aw-text-input>
      <aw-text-input label_text="Email" input_type="email" placeholder="email@example.com"></aw-text-input>
      <aw-text-input label_text="Password" input_type="password" placeholder="Enter password"></aw-text-input>
      <aw-text-input label_text="URL" input_type="url" placeholder="https://example.com"></aw-text-input>
      <aw-text-input label_text="Phone" input_type="tel" placeholder="+1 (555) 123-4567"></aw-text-input>
      <aw-text-input label_text="Search" input_type="search" placeholder="Search..."></aw-text-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports multiple HTML5 input types with appropriate validation.'
      }
    }
  }
};

/**
 * Examples of different sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Small Input" size="sm" placeholder="Small size"></aw-text-input>
      <aw-text-input label_text="Medium Input" size="md" placeholder="Medium size"></aw-text-input>
      <aw-text-input label_text="Large Input" size="lg" placeholder="Large size"></aw-text-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports three different sizes: small, medium, and large.'
      }
    }
  }
};

/**
 * Form validation and error states
 */
export const Validation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <div>
        <h3>Valid State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="user@example.com"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Required Field</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
      </div>
      
      <div>
        <h3>Error State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="invalid-email"
          has_error
          error_message="Please enter a valid email address"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Disabled State</h3>
        <aw-text-input 
          label_text="Readonly Field" 
          input_value="Cannot be edited"
          disabled>
        </aw-text-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports validation states with live error announcements for screen readers.'
      }
    }
  }
};

/**
 * Accessibility features demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <div>
        <h3>ARIA Described By</h3>
        <aw-text-input 
          label_text="Password" 
          input_type="password"
          aria_describedby="password-help"
          placeholder="Enter password">
        </aw-text-input>
        <p id="password-help" style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Must be at least 8 characters with uppercase, lowercase, and numbers.
        </p>
      </div>

      <div>
        <h3>Error State with Live Announcements</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email"
          has_error
          aria_invalid="true"
          error_message="This email address is already registered"
          placeholder="Enter your email">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Error messages are announced to screen readers with role="alert"
        </p>
      </div>

      <div>
        <h3>Required Field Indicators</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Required fields show asterisk (*) with aria-hidden="true"
        </p>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <aw-text-input label_text="First Field" placeholder="Tab to navigate"></aw-text-input>
          <aw-text-input label_text="Second Field" placeholder="Focus indicators visible"></aw-text-input>
          <aw-text-input label_text="Third Field" placeholder="Screen reader friendly"></aw-text-input>
        </div>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Use Tab to navigate between fields. Focus indicators are clearly visible.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the accessibility features of the text input component:

- **ARIA Described By**: Link help text to inputs for screen reader context
- **Live Error Announcements**: Errors are announced immediately with role="alert"
- **Required Field Indicators**: Visual asterisks with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Form Association**: Proper label-input relationship for screen readers
- **Validation States**: ARIA invalid attributes for form validation

All inputs meet WCAG 2.1 AA guidelines for accessibility.
        `
      }
    }
  }
};

/**
 * Real-world form example
 */
export const FormExample: Story = {
  render: () => html`
    <form style="max-width: 500px; display: flex; flex-direction: column; gap: 1rem;">
      <h3>Contact Form</h3>
      
      <aw-text-input 
        label_text="Full Name" 
        input_name="name"
        required
        placeholder="Enter your full name">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Email Address" 
        input_type="email"
        input_name="email"
        required
        placeholder="your@email.com">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Phone Number" 
        input_type="tel"
        input_name="phone"
        placeholder="+1 (555) 123-4567">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Company Website" 
        input_type="url"
        input_name="website"
        placeholder="https://your-company.com">
      </aw-text-input>
      
      <button type="submit" style="margin-top: 1rem; padding: 0.75rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
        Submit Form
      </button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A complete form example showing how text inputs work together in a real-world scenario.'
      }
    }
  }
};