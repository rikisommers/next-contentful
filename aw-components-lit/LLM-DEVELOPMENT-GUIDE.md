# LLM Development Guide - AW Components Lit

## Overview

This guide provides comprehensive instructions for LLMs working on the AW Components Lit library. It covers all development guidelines, conventions, testing procedures, and quality standards.

## 🏗️ Architecture Guidelines

### Framework & Technology Stack
- **Framework**: Lit 3.x (Web Components)
- **Language**: TypeScript with strict mode
- **Build Tool**: Vite
- **Testing**: Playwright for E2E testing
- **Documentation**: Storybook 8.x for interactive docs
- **Styling**: CSS with CSS custom properties (CSS variables)

### Component Structure
```
src/components/[category]/[component-name]/
├── [component-name].ts        # Main component implementation
├── [component-name].stories.ts # Storybook stories
└── README.md                  # Component documentation (optional)
```

### Categories
- `atoms/` - Basic UI elements (buttons, inputs, icons)
- `molecules/` - Simple component combinations
- `organisms/` - Complex components with multiple molecules
- `blocks/` - Content blocks for CMS integration
- `navigation/` - Navigation-specific components
- `base/` - Foundational/utility components

## 📝 Naming Conventions

### Component Names
- **File names**: `kebab-case` (e.g., `aw-text-input.ts`)
- **Class names**: `PascalCase` (e.g., `AwTextInput`)
- **Custom element tags**: `aw-[component-name]` (e.g., `aw-text-input`)
- **CSS classes**: BEM methodology with `aw-` prefix

### Property Names
- **Properties**: `snake_case` for public properties (e.g., `label_text`, `input_type`)
- **Private properties**: `_camelCase` with underscore prefix (e.g., `_internalValue`)
- **CSS custom properties**: `--aw-[property-name]` (e.g., `--aw-color-primary-500`)

### Example Component Structure
```typescript
@customElement('aw-example-component')
export class AwExampleComponent extends LitElement {
  // Public properties (snake_case)
  @property() label_text: string = '';
  @property() button_type: 'button' | 'submit' = 'button';
  
  // Private state (camelCase with underscore)
  @state() private _isActive: boolean = false;
  
  // CSS classes use BEM with aw- prefix
  static styles = css`
    .aw-example-component { /* block */ }
    .aw-example-component__element { /* element */ }
    .aw-example-component--modifier { /* modifier */ }
  `;
}
```

## 🎯 Component Development Standards

### Base Component Template
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview [Component Name] Component
 * 
 * [Brief description of component functionality and purpose]
 * 
 * @example
 * ```html
 * <aw-component-name 
 *   property_name="value"
 *   ?boolean_property=${true}>
 * </aw-component-name>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-component-name')
export class AwComponentName extends LitElement {
  static styles = css`
    /* ITCSS Architecture - Settings, Tools, Generic, Elements, Objects, Components, Trumps */
    :host {
      display: block;
    }
    
    /* Component styles with BEM methodology */
    .aw-component-name {
      /* Base component styles */
    }
  `;

  // Properties with comprehensive JSDoc
  @property() property_name: string = '';
  
  render() {
    return html`
      <div class="aw-component-name">
        <!-- Component template -->
      </div>
    `;
  }
}

// Global registration for TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'aw-component-name': AwComponentName;
  }
}
```

### Required Accessibility Implementation
Every interactive component MUST include:

```typescript
// ARIA properties
@property() aria_label: string = '';
@property() aria_describedby: string = '';
@property() aria_controls: string = '';
@property({ type: Boolean }) aria_expanded: boolean | null = null;
@property({ type: Boolean }) aria_invalid: boolean = false;

// Render with proper ARIA attributes
render() {
  return html`
    <button
      aria-label=${ifDefined(this.aria_label || undefined)}
      aria-describedby=${ifDefined(this.aria_describedby || undefined)}
      aria-controls=${ifDefined(this.aria_controls || undefined)}
      aria-expanded=${ifDefined(this.aria_expanded)}
      aria-invalid=${this.aria_invalid ? 'true' : 'false'}
      @click=${this.handleClick}>
      ${this.label_text}
    </button>
  `;
}
```

## 📖 JSDoc Documentation Standards

### Component Class Documentation
```typescript
/**
 * @fileoverview [Component Name] Component
 * 
 * [Detailed description of component functionality, use cases, and features]
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <aw-component property="value"></aw-component>
 * 
 * <!-- Advanced usage -->
 * <aw-component 
 *   property="value"
 *   ?boolean_prop=${true}
 *   @custom-event=${handler}>
 * </aw-component>
 * ```
 * 
 * @fires component-event - Dispatched when [condition]
 * @csspart container - The main container element
 * @cssprop --aw-component-color - Color of the component
 * 
 * @since 1.0.0
 */
```

### Property Documentation
```typescript
/**
 * [Brief description of property purpose]
 * @type {string | number}
 * @default 'defaultValue'
 * @example
 * ```html
 * <aw-component property_name="example"></aw-component>
 * ```
 */
@property() property_name: string = 'defaultValue';
```

### Method Documentation
```typescript
/**
 * [Method description and purpose]
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @fires custom-event - Event dispatched by this method
 * @example
 * ```javascript
 * component.methodName('parameter');
 * ```
 * @private
 */
private methodName(paramName: Type): ReturnType {
  // Implementation
}
```

## 🎨 Storybook Implementation

### Story File Template
```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './aw-component-name.ts';

/**
 * [Component description and overview for Storybook docs]
 */
const meta: Meta = {
  title: 'Components/[Category]/[ComponentName]',
  component: 'aw-component-name',
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen'
    docs: {
      description: {
        component: `
[Detailed component description with features and usage guidelines]

## Features
- Feature 1
- Feature 2
- Accessibility compliant (WCAG 2.1 AA)

## Usage
\`\`\`html
<aw-component-name property="value"></aw-component-name>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    property_name: {
      control: 'text', // or 'select', 'boolean', 'number'
      description: 'Property description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    }
  },
  args: {
    property_name: 'default value'
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default story showing basic usage
 */
export const Default: Story = {
  render: (args) => {
    // Clean args to prevent [object Object] issues
    const cleanArgs = {
      property_name: String(args.property_name || 'default'),
      boolean_prop: Boolean(args.boolean_prop),
      optional_prop: args.optional_prop ? String(args.optional_prop) : undefined
    };

    return html`
      <aw-component-name 
        property_name=${cleanArgs.property_name}
        ?boolean_prop=${cleanArgs.boolean_prop}
        optional_prop=${ifDefined(cleanArgs.optional_prop)}
        @custom-event=${(e: CustomEvent) => {
          console.log('Event:', e.detail);
        }}>
      </aw-component-name>
    `;
  }
};

/**
 * Accessibility features demonstration
 */
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>ARIA Labels</h3>
        <aw-component-name 
          property_name="Example"
          aria_label="Descriptive label for screen readers">
        </aw-component-name>
      </div>
      
      <!-- More accessibility examples -->
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates accessibility features:

- **ARIA Labels**: Provide descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus indicators
- **Screen Reader Support**: Complete ARIA implementation

All components meet WCAG 2.1 AA guidelines.
        `
      }
    }
  }
};
```

### Story Best Practices
1. **Always clean args** to prevent `[object Object]` display issues
2. **Use `ifDefined`** for optional string properties  
3. **Use `?` directive** for boolean properties
4. **Include accessibility story** for every interactive component
5. **Provide comprehensive examples** showing all variants and states
6. **Document interactions** with event handlers and console logging

## 🧪 Testing Guidelines

### E2E Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('AW Component Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-category-component--default&viewMode=story');
    await page.waitForSelector('aw-component-name');
  });

  test('should render with default properties', async ({ page }) => {
    const component = page.locator('aw-component-name');
    await expect(component).toBeVisible();
    
    // Test specific functionality
    const element = component.locator('.aw-component-name__element');
    await expect(element).toHaveText('Expected Text');
  });

  test('should handle user interactions', async ({ page }) => {
    const component = page.locator('aw-component-name');
    
    // Listen for custom events
    await page.addInitScript(() => {
      window.customEvents = [];
      window.addEventListener('component-event', (e) => {
        window.customEvents.push(e.detail);
      });
    });
    
    await component.click();
    
    const events = await page.evaluate(() => window.customEvents);
    expect(events.length).toBeGreaterThan(0);
  });
});

test.describe('AW Component Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-category-component--accessibility&viewMode=story');
    await page.waitForSelector('aw-component-name');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const element = page.locator('aw-component-name [role]');
    
    await expect(element).toHaveAttribute('aria-label');
    await expect(element).toHaveAttribute('role', 'expected-role');
  });

  test('should support keyboard navigation', async ({ page }) => {
    const element = page.locator('aw-component-name button');
    
    // Tab navigation
    await page.keyboard.press('Tab');
    await expect(element).toBeFocused();
    
    // Activation
    await page.keyboard.press('Enter');
    // Assert expected behavior
  });
});
```

### Testing Requirements
- **Functional tests** for all component behaviors
- **Accessibility tests** for WCAG compliance
- **Keyboard navigation tests** for interactive components
- **Cross-browser testing** via Playwright configuration
- **Error state testing** for form components
- **Event handling tests** for custom events

## 🎨 CSS and Styling Guidelines

### CSS Architecture (ITCSS)
```css
/* Settings: Global variables and config */
:host {
  --aw-component-color: var(--aw-color-primary-500, #3b82f6);
  --aw-component-size: var(--aw-size-md, 1rem);
}

/* Components: UI components using BEM */
.aw-component-name {
  /* Block styles */
  display: flex;
  color: var(--aw-component-color);
}

.aw-component-name__element {
  /* Element styles */
  padding: var(--aw-spacing-sm, 0.5rem);
}

.aw-component-name--variant {
  /* Modifier styles */
  background-color: var(--aw-color-secondary-500, #6b7280);
}

/* States */
.aw-component-name:hover {
  /* Hover state */
}

.aw-component-name:focus-visible {
  outline: 2px solid var(--aw-color-primary-500, #3b82f6);
  outline-offset: 2px;
}
```

### CSS Custom Properties
- Use `--aw-` prefix for all custom properties
- Provide fallback values: `var(--aw-color-primary, #3b82f6)`
- Follow design token structure: `--aw-[category]-[property]-[variant]`

## 🔧 Build and Development

### Commands
```bash
# Development
npm run dev                    # Start development server
npm run build                 # Build for production
npm run type-check           # TypeScript type checking

# Testing
npm test                     # Run E2E tests
npm run test:headed         # Run tests with browser UI
npm run test:debug          # Debug tests interactively

# Documentation
npm run storybook           # Start Storybook dev server
npm run build-storybook     # Build static Storybook
```

### File Structure Requirements
```
src/
├── components/
│   ├── atoms/
│   │   └── aw-component/
│   │       ├── aw-component.ts
│   │       └── aw-component.stories.ts
│   └── index.ts                    # Export all components
├── styles/
│   ├── index.css                   # Global styles
│   └── aw-theme-variables.css      # Design tokens
├── types/
│   └── index.ts                    # Type definitions
└── utils/
    └── utils.ts                    # Shared utilities
```

## ✅ Quality Checklist

Before completing any component, verify:

### Implementation
- [ ] Follows naming conventions (snake_case properties, BEM CSS)
- [ ] Includes comprehensive JSDoc documentation
- [ ] Uses TypeScript with proper typing
- [ ] Implements accessibility features (ARIA attributes)
- [ ] Follows CSS architecture (ITCSS + BEM)
- [ ] Includes proper error handling

### Testing
- [ ] Has Storybook stories with all variants
- [ ] Includes accessibility story with WCAG examples
- [ ] Args are properly cleaned in stories (no [object Object])
- [ ] Has comprehensive E2E tests
- [ ] Tests accessibility compliance
- [ ] Tests keyboard navigation
- [ ] Tests across multiple browsers

### Documentation
- [ ] Component has complete JSDoc
- [ ] Stories include usage examples
- [ ] Accessibility features are documented
- [ ] Breaking changes are noted
- [ ] Examples show best practices

### Accessibility
- [ ] Meets WCAG 2.1 AA standards
- [ ] Supports keyboard navigation
- [ ] Has proper focus management
- [ ] Includes ARIA attributes where needed
- [ ] Works with screen readers
- [ ] Has proper color contrast
- [ ] Supports reduced motion

## 🚀 Deployment

### Component Export
```typescript
// src/index.ts
export { AwComponentName } from './components/category/aw-component-name/aw-component-name.js';
```

### Version Updates
Follow semantic versioning:
- **Patch**: Bug fixes, non-breaking changes
- **Minor**: New features, backward compatible
- **Major**: Breaking changes

### Release Process
1. Update component documentation
2. Run full test suite
3. Build and verify Storybook
4. Update changelog
5. Version bump and publish

---

**Last Updated**: 2025-08-25  
**Version**: 1.0.0  
**Status**: Production Ready ✅

This guide ensures consistent, high-quality component development with comprehensive testing and documentation.