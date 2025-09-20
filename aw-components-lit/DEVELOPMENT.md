# Development Workflow & Guidelines

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm 7+ or yarn 1.22+
- Git

### Initial Setup
```bash
# Clone the repository
git clone [repository-url] aw-components
cd aw-components

# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
aw-components/
├── src/
│   ├── components/          # Component source files
│   │   ├── aw-button/
│   │   │   ├── aw-button.tsx        # Component implementation
│   │   │   ├── aw-button.scss       # Component styles
│   │   │   ├── aw-button.spec.ts    # Unit tests
│   │   │   ├── aw-button.e2e.ts     # E2E tests
│   │   │   ├── readme.md            # Auto-generated docs
│   │   │   └── usage/               # Usage examples
│   │   │       ├── basic.html
│   │   │       ├── advanced.html
│   │   │       └── react.tsx
│   │   └── ...
│   ├── utils/               # Shared utilities
│   ├── global/              # Global styles and scripts
│   └── index.ts             # Main entry point
├── scripts/                 # Build and development scripts
├── docs/                    # Documentation site
├── dist/                    # Built output
├── www/                     # Development server output
├── stencil.config.ts        # Stencil configuration
├── package.json
└── tsconfig.json
```

## 🛠️ Development Commands

```bash
# Development
npm run start              # Start dev server with hot reload
npm run start:docs         # Start documentation site
npm run build              # Build for production
npm run build:docs         # Build documentation site

# Testing
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:unit          # Run unit tests only
npm run test:e2e           # Run E2E tests only
npm run test:visual        # Run visual regression tests

# Code Quality
npm run lint               # Lint code
npm run lint:fix           # Fix linting issues
npm run format             # Format code with Prettier
npm run type-check         # Check TypeScript types

# Documentation
npm run docs:generate      # Generate component docs
npm run docs:serve         # Serve documentation locally

# Release
npm run release            # Create release (semantic-release)
npm run version            # Bump version
```

## 🏗️ Component Development Guidelines

### Component Structure
```typescript
import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';

@Component({
  tag: 'aw-component-name',
  styleUrl: 'aw-component-name.scss',
  shadow: true,
  scoped: false // Only if shadow DOM causes issues
})
export class AwComponentName {
  @Element() el: HTMLElement;
  
  // Props (external API)
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() disabled: boolean = false;
  @Prop({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  
  // State (internal only)
  @State() isLoading: boolean = false;
  
  // Events
  @Event() awClick: EventEmitter<MouseEvent>;
  @Event() awChange: EventEmitter<{value: string}>;
  
  // Watchers
  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    // React to prop changes
  }
  
  // Lifecycle
  componentWillLoad() {
    // Before first render
  }
  
  componentDidLoad() {
    // After first render
  }
  
  disconnectedCallback() {
    // Cleanup
  }
  
  // Methods
  private handleClick = (e: MouseEvent) => {
    if (this.disabled) return;
    this.awClick.emit(e);
  }
  
  // Render
  render() {
    return (
      <Host
        class={{
          'aw-component-name': true,
          [`aw-component-name--${this.variant}`]: true,
          [`aw-component-name--${this.size}`]: true,
          'aw-component-name--disabled': this.disabled
        }}
      >
        <button
          type="button"
          disabled={this.disabled}
          onClick={this.handleClick}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
```

### Naming Conventions

**Component Tags**: `aw-component-name` (kebab-case, prefixed with `aw-`)
**CSS Classes**: `aw-component-name__element--modifier` (BEM methodology)
**Props**: `camelCase`
**Events**: `awEventName` (camelCase, prefixed with `aw`)
**CSS Custom Properties**: `--aw-component-property` (kebab-case, prefixed with `--aw-`)

### Styling Guidelines

```scss
// aw-component-name.scss
:host {
  // CSS custom properties for theming
  --aw-component-bg: var(--aw-color-background, #fff);
  --aw-component-color: var(--aw-color-text, #000);
  --aw-component-border: var(--aw-border-width, 1px) solid var(--aw-color-border, #ccc);
  
  display: block;
  contain: layout style paint;
}

.aw-component-name {
  background: var(--aw-component-bg);
  color: var(--aw-component-color);
  border: var(--aw-component-border);
  
  // Variants
  &--primary {
    --aw-component-bg: var(--aw-color-primary);
    --aw-component-color: var(--aw-color-on-primary);
  }
  
  // States
  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  
  // Size variants
  &--small {
    font-size: var(--aw-font-size-sm);
    padding: var(--aw-spacing-xs) var(--aw-spacing-sm);
  }
}
```

### Accessibility Guidelines

- Use semantic HTML elements
- Provide ARIA labels and descriptions
- Support keyboard navigation
- Include focus indicators
- Test with screen readers
- Follow WCAG 2.1 AA standards

```typescript
// Accessibility example
render() {
  return (
    <button
      type="button"
      aria-label={this.ariaLabel || this.label}
      aria-disabled={this.disabled ? 'true' : null}
      aria-pressed={this.pressed ? 'true' : 'false'}
      tabindex={this.disabled ? -1 : 0}
      role="button"
    >
      <slot />
    </button>
  );
}
```

## 🧪 Testing Guidelines

### Unit Testing
```typescript
// aw-component-name.spec.ts
import { newSpecPage } from '@stencil/core/testing';
import { AwComponentName } from './aw-component-name';

describe('aw-component-name', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AwComponentName],
      html: '<aw-component-name></aw-component-name>',
    });
    
    expect(page.root).toEqualHtml(`
      <aw-component-name>
        <mock:shadow-root>
          <!-- expected HTML -->
        </mock:shadow-root>
      </aw-component-name>
    `);
  });
  
  it('emits events correctly', async () => {
    const page = await newSpecPage({
      components: [AwComponentName],
      html: '<aw-component-name></aw-component-name>',
    });
    
    const eventSpy = jest.fn();
    page.root.addEventListener('awClick', eventSpy);
    
    page.root.click();
    await page.waitForChanges();
    
    expect(eventSpy).toHaveBeenCalled();
  });
});
```

### E2E Testing
```typescript
// aw-component-name.e2e.ts
import { newE2EPage } from '@stencil/core/testing';

describe('aw-component-name', () => {
  it('renders and responds to interactions', async () => {
    const page = await newE2EPage();
    await page.setContent('<aw-component-name>Click me</aw-component-name>');
    
    const element = await page.find('aw-component-name');
    expect(element).toHaveClass('hydrated');
    
    await element.click();
    const clickEvent = await page.spyOnEvent('awClick');
    expect(clickEvent).toHaveReceivedEventTimes(1);
  });
});
```

## 📝 Documentation Guidelines

### Component Documentation
Each component should have comprehensive documentation:

```markdown
# aw-component-name

Brief description of the component.

## Usage

```html
<aw-component-name variant="primary">
  Content
</aw-component-name>
```

## Properties

| Property | Attribute | Description | Type | Default |
| -------- | --------- | ----------- | ---- | ------- |
| `variant` | `variant` | The visual variant | `'primary' \| 'secondary'` | `'primary'` |

## Events

| Event | Description | Type |
| ----- | ----------- | ---- |
| `awClick` | Emitted when clicked | `CustomEvent<MouseEvent>` |

## CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--aw-component-bg` | Background color | `var(--aw-color-background)` |

## Dependencies

### Depends on
- aw-icon

### Graph
```
graph TD;
  aw-component-name --> aw-icon
```
```

### Code Examples
Provide examples for different frameworks:

```html
<!-- Vanilla HTML -->
<aw-button variant="primary">Click me</aw-button>

<!-- React -->
<AwButton variant="primary">Click me</AwButton>

<!-- Vue -->
<aw-button variant="primary">Click me</aw-button>

<!-- Angular -->
<aw-button variant="primary">Click me</aw-button>
```

## 🔧 Build Configuration

### Stencil Config
```typescript
// stencil.config.ts
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'aw-components',
  globalStyle: 'src/global/global.scss',
  plugins: [
    sass({
      includePaths: ['src/global']
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'global/global.css', dest: 'global.css' }
      ]
    }
  ]
};
```

## 🚀 Deployment & Release

### Semantic Versioning
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

### Release Process
1. Create feature branch: `git checkout -b feature/component-name`
2. Develop and test component
3. Create pull request
4. Code review and approval
5. Merge to main
6. Automated release via semantic-release

### npm Package Structure
```
@aw/components/
├── dist/              # ES modules
├── loader/            # Lazy loading utilities
├── react/             # React wrappers
├── vue/               # Vue wrappers
├── angular/           # Angular wrappers
└── README.md
```

## 🐛 Debugging & Troubleshooting

### Common Issues

**Issue**: Component not rendering
**Solution**: Check that component is properly imported and defined

**Issue**: Styles not applying
**Solution**: Verify CSS custom properties and shadow DOM styles

**Issue**: Events not firing
**Solution**: Check event listeners and shadow DOM event bubbling

### Debug Mode
```bash
# Enable debug logging
DEBUG=stencil:* npm run start

# Component-specific debugging
DEBUG=stencil:compiler npm run build
```

## 🤝 Contributing Guidelines

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Update documentation
5. Submit pull request

### Code Review Checklist
- [ ] Component follows naming conventions
- [ ] Tests cover all functionality
- [ ] Documentation is complete
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed
- [ ] No breaking changes (unless major version)

## 📊 Performance Guidelines

### Bundle Size
- Individual component: <10KB
- Component with dependencies: <25KB
- Total library: <100KB (gzipped)

### Runtime Performance
- First render: <16ms
- Subsequent renders: <8ms
- Memory usage: Monitor for leaks

### Monitoring
```bash
# Analyze bundle size
npm run analyze

# Performance testing
npm run perf:test

# Memory leak detection
npm run test:memory
```

---

*This development guide will be updated as the project evolves.*