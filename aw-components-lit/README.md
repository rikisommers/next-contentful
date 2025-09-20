[![Built With Lit](https://img.shields.io/badge/-Built%20With%20Lit-324FFF.svg?logo=lit&logoColor=white&style=flat-square)](https://lit.dev)

# AW Components - Lit Edition

> This is a Lit-based clone of the aw-components library, migrated from Stencil to Lit for improved performance and developer experience.

Lit is a simple library for building fast, lightweight web components. It provides a declarative template syntax with efficient updates, and a component base class with reactive properties and lifecycle callbacks.

Lit components are just Web Components, so they work in any major framework or with no framework at all. This library maintains the same component API as the original aw-components while leveraging Lit's modern features.

## Getting Started

To start using or developing these Lit components:

```bash
cd aw-components-lit
npm install
npm run dev
```

To build the component library for production, run:

```bash
npm run build
```

To run type checking:

```bash
npm run type-check
```

Need help? Check out the [Lit documentation](https://lit.dev/docs/).

## Naming Components

All components in this library use the `aw-` prefix to maintain consistency with the original aw-components library. This prefix helps avoid naming conflicts with other component libraries.

## Using these components

You can use these Lit components in several ways:

### ES Modules

Import the entire library:

```js
import 'aw-components-lit';
```

Or import individual components:

```js
import 'aw-components-lit/dist/components/aw-test-button.js';
```

### In HTML

Include the bundled script:

```html
<script type="module" src="node_modules/aw-components-lit/dist/aw-components.es.js"></script>
<aw-test-button label="Click me"></aw-test-button>
```

### With Frameworks

These components work with any framework. For React:

```jsx
import 'aw-components-lit/dist/components/aw-test-button.js';

function App() {
  return <aw-test-button label="Click me" />;
}
```

For Vue:

```vue
<template>
  <aw-test-button label="Click me"></aw-test-button>
</template>

<script>
import 'aw-components-lit/dist/components/aw-test-button.js';
</script>
```