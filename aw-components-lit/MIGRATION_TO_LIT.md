# Migration Guide: Stencil to Lit

This document outlines the differences between the original Stencil-based aw-components and this Lit-based version.

## Key Differences

### Component Definition

**Stencil:**
```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'aw-test-button',
  styleUrl: 'aw-test-button.scss',
  shadow: true,
})
export class AwTestButton {
  @Prop() label: string = 'Button';
  
  render() {
    return <button>{this.label}</button>;
  }
}
```

**Lit:**
```ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aw-test-button')
export class AwTestButton extends LitElement {
  static styles = css`
    /* styles here */
  `;
  
  @property() label: string = 'Button';
  
  render() {
    return html`<button>${this.label}</button>`;
  }
}
```

### Templating

- **Stencil**: Uses JSX syntax
- **Lit**: Uses HTML template literals with `html` tagged template

### Styling

- **Stencil**: Separate SCSS files referenced in component config
- **Lit**: CSS defined inline using `css` tagged template in `static styles`

### Events

**Stencil:**
```tsx
@Event() awClick!: EventEmitter<MouseEvent>;

this.awClick.emit(event);
```

**Lit:**
```ts
const customEvent = new CustomEvent('aw-click', {
  detail: event,
  bubbles: true,
  composed: true,
});
this.dispatchEvent(customEvent);
```

### Property Declaration

- **Stencil**: `@Prop()`
- **Lit**: `@property()` with optional type configuration

### Class Binding

**Stencil:**
```tsx
class={{
  'btn': true,
  'btn--active': this.active
}}
```

**Lit:**
```ts
import { classMap } from 'lit/directives/class-map.js';

class=${classMap({
  'btn': true,
  'btn--active': this.active
})}
```

## Benefits of Lit

1. **Smaller Bundle Size**: Lit is lighter than Stencil runtime
2. **Better Tree Shaking**: Only import what you use
3. **Modern Standards**: Built on latest web standards
4. **Simplified Tooling**: No custom compiler needed
5. **Better TypeScript Integration**: Native TS support
6. **Active Development**: Google-maintained with frequent updates

## API Compatibility

The public API of components remains the same:
- Same tag names (`aw-test-button`, `my-component`)
- Same properties and attributes
- Same events (though event names may have slight differences)

## Development Workflow

### Stencil
```bash
npm start    # dev server with compiler
npm build    # build with Stencil compiler
npm test     # Stencil test runner
```

### Lit
```bash
npm run dev        # Vite dev server
npm run build      # Vite build
npm run type-check # TypeScript checking
```

## Browser Support

Both Stencil and Lit support modern browsers. Lit requires:
- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browser support, polyfills may be needed.