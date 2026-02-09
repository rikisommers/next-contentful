# Component Architecture Guidelines

> Standards for building, documenting, and maintaining components in this project.
> Use `components/base/button/button.js` as the gold standard reference.

---

## File Structure

Each component follows a flat file structure within its category directory:

```
components/
├── base/                     # Reusable primitives (buttons, inputs, modals)
│   ├── button/
│   │   ├── button.js         # Main component
│   │   ├── button-wipe.js    # Variant component
│   │   └── button.util.js    # Enums, constants, helpers
│   ├── error-boundary.js     # Standalone components
│   └── svg-filters.js
├── blocks/                   # Content blocks mapped to Contentful types
│   ├── block-hero.js
│   ├── block-article.js
│   └── ...
├── context/                  # React context providers
├── footer/                   # Footer variants
├── navigation/               # Navigation components
├── motion/                   # Animation wrappers
├── background/               # Canvas/shader backgrounds
├── tile/                     # Card/tile components
├── post/                     # Blog post layout components
└── utils/                    # Component utilities (preloader, etc.)
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Block component | `block-{name}.js` | `block-hero.js` |
| Base component | `{name}.js` | `button.js` |
| Variant | `{name}-{variant}.js` | `button-wipe.js` |
| Utilities/enums | `{name}.util.js` | `button.util.js` |
| Context | `{name}Context.js` | `themeContext.js` |
| Footer variant | `footer-{variant}.js` | `footer-default.js` |

---

## JSDoc Documentation Standard

Every exported component **must** have a JSDoc block that includes:

### Required Tags

| Tag | Purpose |
|-----|---------|
| Description (first line) | One-line summary of the component |
| `@component` | Marks as a component for doc generators |
| `@category` | Groups in docs: `base`, `blocks`, `footer`, `navigation`, `motion`, `layout` |
| `@param` | Document every prop with type path |
| `@example` (2+ required) | Usage examples showing different configurations |

### Optional Tags

| Tag | Purpose |
|-----|---------|
| `@slot` | Document children/render prop patterns |
| `@see` | Cross-reference related components |
| `@deprecated` | Mark components being phased out |

### Gold Standard Example

```javascript
/**
 * Basic button component with customizable styling and sound effects
 * @component
 * @category base
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Button text displayed inside the button
 * @param {Function} props.onClick - Click handler function
 * @param {ButtonType} props.type - Visual style variant (DEFAULT, PRIMARY, SECONDARY, TRANSPARENT)
 * @param {ButtonSound} props.sound - Sound effect played on click (CLICK, ON, OFF)
 * @param {React.ReactNode} props.children - Child elements rendered inside the button
 * @param {ButtonSize} props.size - Button size (SM, MD, LG)
 *
 * @example
 * // Default button with click sound
 * <Button
 *   label="Default Button"
 *   type={ButtonType.DEFAULT}
 *   sound={ButtonSound.CLICK}
 * />
 *
 * @example
 * // Primary button with children content
 * <Button type={ButtonType.PRIMARY} sound={ButtonSound.CLICK}>
 *   <span>Launch App</span>
 * </Button>
 */
```

### Block Component Example

```javascript
/**
 * Renders a hero section with title, intro text, and optional background
 * @component
 * @category blocks
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Contentful entry data
 * @param {string} props.data.title - Hero headline text
 * @param {string} props.data.intro - Subtitle/intro text
 * @param {string} [props.data.tag] - Optional category tag
 * @param {Object} [props.data.image] - Hero background image asset
 * @param {string} props.data.image.url - Image URL from Contentful
 *
 * @example
 * // Basic hero with title only
 * <BlockHero data={{ title: "Welcome", intro: "Hello world" }} />
 *
 * @example
 * // Hero with full data from Contentful
 * <BlockHero data={pageData.hero} />
 */
```

---

## PropTypes Standard

Every component **must** define PropTypes after the component declaration.

### Rules

1. Import `prop-types` at the top of the file
2. Place PropTypes between the component and the export
3. Use `PropTypes.shape()` for nested objects
4. Use inline `/** */` comments for each prop
5. Mark required props with `.isRequired`
6. Use enum imports with `PropTypes.oneOf(Object.values(EnumName))`

### Pattern

```javascript
import PropTypes from "prop-types";

const MyComponent = ({ data, variant }) => { /* ... */ };

MyComponent.propTypes = {
  /** Contentful entry data */
  data: PropTypes.shape({
    /** Display title */
    title: PropTypes.string.isRequired,
    /** Rich text content */
    content: PropTypes.string,
    /** Associated images */
    imagesCollection: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  /** Visual variant */
  variant: PropTypes.oneOf(["default", "compact", "featured"]),
};

export default MyComponent;
```

---

## Component Code Standards

### Structure Order

1. `"use client"` directive (if needed)
2. Imports (React, libraries, local utilities, styles)
3. JSDoc documentation block
4. Component function
5. PropTypes definition
6. Default export

### Clean Code Rules

- **No `console.log`** in committed code (use `console.warn` or `console.error` for errors only)
- **No commented-out code blocks** -- delete unused code, git history preserves it
- **Single Responsibility** -- each function does one thing
- **Extract utilities** -- move enums and helpers to `.util.js` files
- **Destructure props** in function signature: `({ data, variant })` not `(props)`
- **Default values** in destructuring: `({ size = "md" })` not inside the function body
- **Early returns** for null/missing data: `if (!data) return null;`

### Naming

- Components: `PascalCase` (`BlockHero`, `Button`)
- Props/variables: `camelCase` (`isLoading`, `handleClick`)
- Enums/constants: `PascalCase` object, `UPPER_CASE` values (`ButtonType.PRIMARY`)
- Files: `kebab-case` (`block-hero.js`, `button-wipe.js`)
- CSS classes: Tailwind utilities or `kebab-case` SCSS

### Error Handling

Wrap complex or external-data-dependent components with `ErrorBoundary`:

```javascript
import ErrorBoundary from "../base/error-boundary";

const PageSection = ({ blocks }) => (
  <>
    {blocks.map((block) => (
      <ErrorBoundary key={block.id}>
        <BlockRenderer block={block} />
      </ErrorBoundary>
    ))}
  </>
);
```

---

## Contentful Block Pattern

Block components receive data directly from Contentful entries:

```javascript
/**
 * Renders a quote block with author attribution
 * @component
 * @category blocks
 * @param {Object} props
 * @param {Object} props.data - Contentful BlockQuote entry
 * @param {string} props.data.title - Quote heading
 * @param {string} props.data.content - Quote text
 * @param {string} [props.data.author] - Attribution name
 */
const BlockQuote = ({ data }) => {
  if (!data) return null;

  const { title, content, author } = data;

  return (
    <blockquote role="figure" aria-label={`Quote: ${title}`}>
      <p>{content}</p>
      {author && <cite>{author}</cite>}
    </blockquote>
  );
};
```

---

## Storybook Integration

JSDoc examples are automatically picked up by Storybook's autodocs. Structure examples as valid JSX:

```javascript
/**
 * @example
 * // Default state
 * <Button label="Click me" type={ButtonType.DEFAULT} />
 *
 * @example
 * // Loading state
 * <Button label="Loading..." type={ButtonType.PRIMARY} disabled />
 */
```

These render as live previews in the Storybook docs tab when autodocs is enabled.
