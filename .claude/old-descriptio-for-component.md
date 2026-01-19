# ATUI Components Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**CRITICAL SETUP**: Always run these commands in sequence before making any changes:

```bash
# Enable Yarn 4 (required by this repository)
corepack enable
corepack prepare yarn@4.9.1 --activate

# Set required environment variables to prevent failures
export NPM_AUTH_TOKEN="dummy_token"
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD="true"

# Install dependencies (NEVER CANCEL - takes up to 15 minutes)
yarn install --mode=skip-build --network-timeout 60000
```

**Build Commands** (run from repository root or specific workspace):

```bash
# Build Stencil components (NEVER CANCEL - takes 1-2 minutes)
cd aw-components-stencil && yarn build

# Build Angular wrapper components (NEVER CANCEL - takes 10 seconds)  
cd angular-workspace && yarn build

# Build Storybook documentation (NEVER CANCEL - takes 30 seconds)
cd aw-components-stencil && yarn build:storybook
```

**Development Servers**:

```bash
# Start Stencil development server with watch mode
cd aw-components-stencil && yarn dev
# Runs at http://localhost:3333/ with auto-rebuild on file changes

# Start Storybook development server  
cd aw-components-stencil && yarn storybook
# Runs at http://localhost:6006/ for interactive component documentation
```

## Testing & Validation

**CRITICAL TESTING LIMITATION**: Playwright tests require browsers that cannot be installed in some environments due to network restrictions. If you encounter browser download failures:

```bash
# Tests will fail with: "Executable doesn't exist at /home/runner/.cache/ms-playwright/chromium_headless_shell"
# This is expected - document the limitation but continue with other validation
cd aw-components-stencil && yarn test --max-failures=5
```

**Manual Validation Scenarios**: Always test these workflows after making changes:

1. **Component Development Workflow**:
   ```bash
   cd aw-components-stencil
   yarn dev                    # Start development server
   # Navigate to http://localhost:3333/ and verify components render
   yarn storybook             # Start Storybook
   # Navigate to http://localhost:6006/ and verify component stories
   ```

2. **Build & Package Workflow**:
   ```bash
   yarn build                 # Build Stencil components (1-2 minutes)
   cd ../angular-workspace
   yarn build                 # Build Angular wrappers (10 seconds)
   ```

3. **Framework Integration Test**:
   ```bash
   cd examples/angular
   yarn build --base-href /test/   # Test Angular integration
   ```

## Build Timing & Expectations

**NEVER CANCEL builds or long-running commands**. Set appropriate timeouts:

| Command | Expected Time | Timeout Setting | Notes |
|---------|---------------|-----------------|-------|
| `yarn install --mode=skip-build` | 5-15 minutes | 40+ minutes | Downloads 2000+ packages |
| `yarn build` (Stencil) | 1-2 minutes | 10+ minutes | Transpiles 83 components |
| `yarn build` (Angular) | 10 seconds | 5+ minutes | Fast Angular build |
| `yarn build:storybook` | 30 seconds | 10+ minutes | Generates static docs |
| `yarn dev` | 20 seconds | 5+ minutes | Initial build + watch mode |
| `yarn storybook` | 5 seconds | 2+ minutes | Starts dev server |

## Known Issues & Workarounds

**Environment Variable Requirements**: This repository requires `NPM_AUTH_TOKEN` due to GitHub Packages integration:
```bash
# Always set before yarn commands:
export NPM_AUTH_TOKEN="dummy_token"
```

**Browser Download Failures**: Puppeteer and Playwright browser downloads may fail due to network restrictions:
```bash
# Always set these to prevent download attempts:
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD="true"
```

**Installation Mode**: Use `--mode=skip-build` to avoid post-install script failures:
```bash
yarn install --mode=skip-build --network-timeout 60000
```

## Repository Structure

This is a **Yarn 4 workspace monorepo** with the following packages:

- **`aw-components-stencil/`** - Main Stencil.js web components library (83 components)
- **`angular-workspace/`** - Angular wrapper components and workspace
- **`aw-components-vue/`** - Vue.js wrapper components with v-model support
- **`aw-design-tokens/`** - Design system tokens using Style Dictionary
- **`aw-typography/`** - SCSS typography styles and font definitions
- **`examples/`** - Example applications (Angular, React, Vue, Nuxt, Svelte)
- **`documentation/`** - Design patterns and development guidelines

## Key Component Architecture

**Web Components**: Built with Stencil.js, compiled to standard web components that work across all frameworks.

**Framework Wrappers**:
- Angular: Standalone components with TypeScript support
- Vue: Composition API integration with v-model support
- React: JSX wrapper components with event handling

**Styling**: Uses Tailwind CSS with design tokens. Material Icons font required:
```css
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
```

## Validation Checklist

Before committing changes, always:

- [ ] Run `yarn build` in `aw-components-stencil/` (NEVER CANCEL - wait 1-2 minutes)
- [ ] Run `yarn build` in `angular-workspace/` (NEVER CANCEL - wait 10 seconds)
- [ ] Start `yarn storybook` and verify component stories load at http://localhost:6006/
- [ ] Check that component changes appear correctly in Storybook
- [ ] Run `yarn build:storybook` to ensure static build succeeds (NEVER CANCEL - wait 30 seconds)
- [ ] Verify no TypeScript compilation errors in build output

## CI/CD Pipeline

The `.github/workflows/publish.yml` workflow:
- Builds all workspace packages
- Publishes to GitHub Packages registry
- Deploys Storybook to GitHub Pages
- Deploys Angular demo application

**Package Versions**: Automatically bumped on commits using conventional commit format.

## Quick Commands Reference

```bash
# Setup (run once)
corepack enable && corepack prepare yarn@4.9.1 --activate
export NPM_AUTH_TOKEN="dummy_token" PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD="true"
yarn install --mode=skip-build --network-timeout 60000

# Development (most common)
cd aw-components-stencil && yarn dev        # Start component dev server
cd aw-components-stencil && yarn storybook  # Start documentation server

# Build & Test
cd aw-components-stencil && yarn build      # Build components (1-2 minutes)  
cd angular-workspace && yarn build            # Build Angular wrappers (10 seconds)
cd aw-components-stencil && yarn build:storybook  # Build docs (30 seconds)

# Validation
curl -I http://localhost:3333/  # Test dev server
curl -I http://localhost:6006/  # Test Storybook server
```

Remember: **NEVER CANCEL** long-running builds. They may take several minutes but will complete successfully.

## Common File Locations

```
Repository Root:
├── package.json                    # Workspace configuration
├── .yarnrc.yml                    # Yarn 4 configuration (requires NPM_AUTH_TOKEN)
├── aw-components-stencil/
│   ├── src/components/            # 83 Stencil components
│   ├── stencil.config.ts          # Build configuration
│   ├── playwright.config.ts       # Test configuration  
│   └── .storybook/               # Storybook configuration
├── angular-workspace/
│   └── projects/aw-components/  # Angular wrapper library
├── examples/
│   ├── angular/                   # Angular demo app
│   ├── vue/                      # Vue demo app
│   └── react/                    # React demo app
└── documentation/
    └── development-guidelines/    # Development guides
```

# Project Overview

This project is a Component Library for building consistent UI in Allied Telesis applications.
Built with Stencil.js. It provides Web Components and framework specific wrappers for Angular, React and Vue.

## Folder Structure

- `/aw-components-stenci` : Contains the source code for Stencil web components library with all ATUI components
- `/aw-design-tokens` - Design system tokens (colors, typography, spacing) built with Style Dictionary
- `/aw-typography` - SCSS typography styles and font definitions for consistent text styling
- `/angular-workspace` - Angular component wrappers and workspace for seamless Angular integration
- `/aw-components-vue` - Vue-specific wrappers with v-model support and Vue bindings
- `/documentation` -  Design patterns, development guidelines, and architecture documentation
- `/Examples` - Example applications for Angular, React, Vue, Svelte, and Nuxt frameworks
    - `/examples/angular/` - Angular demo showcasing ATUI components integration with Angular CLI
    - `/examples/nuxt/` - Nuxt.js demo demonstrating ATUI components in a full-stack Vue framework with SSR support


## Libraries and Frameworks

| Technology | Purpose |
|------------|---------|
| Tailwind CSS | Style component library and application UI |
| StyleDictionary | Manage design tokens in SCSS, CSS, JS, Figma variables |
| Stencil JS | Develop cross/no-framework web-components |
| Framework Wrappers | Provide native framework support for all components |
| JSDoc | Handle component documentation within components |

> **Note:** We plan to move away from a single CSS export in the future in order to ship styles with individual components. In the short term this may mean inline talwind classes are relaced with @apply or ITCSS classnames.
>

## Coding Standards

- Use semicolons at the end of each statement.
- Use double quotes for strings.
- **NEVER modify autogenerated files**: Files like `readme.md` in component directories are automatically generated from JSDoc comments in the source component files. Always update the source JSDoc comments in the component `.tsx` files instead of modifying the generated documentation files directly.

## Storybook

### ATUI Component Usage in Examples

**Always Use ATUI Components in Examples and Stories**
- Replace all HTML elements with ATUI equivalents where available (e.g., `<aw-button>` instead of `<button>`)
- Maintain visual consistency across documentation and examples
- Demonstrate proper ATUI component usage patterns
- Ensure external trigger examples showcase ATUI components working together

```typescript
// ✅ Good - Use ATUI components
const ExternalTriggerTemplate = (args) => `
<aw-button id="${args.triggerId}" label="${args.triggerLabel}" type="secondary"></aw-button>
<aw-menu trigger_id="${args.triggerId}">
    <div slot="menu-content">
        <aw-menu-item label="Action 1"></aw-menu-item>
    </div>
</aw-menu>`;

// ❌ Bad - Don't use HTML elements
const ExternalTriggerTemplate = (args) => `
<button id="${args.triggerId}">${args.triggerLabel}</button>
<aw-menu trigger_id="${args.triggerId}">
    <div slot="menu-content">
        <aw-menu-item label="Action 1"></aw-menu-item>
    </div>
</aw-menu>`;
```

## Demo Applications

### Angular Demo
The Angular demo showcases ATUI components integrated with Angular CLI and provides examples of:
- Component usage with Angular framework wrappers
- Reactive forms integration
- Routing and navigation patterns

**Getting Started:**
```bash
cd examples/angular
npm install
ng serve
```
Visit `http://localhost:4200` to view the demo.

### Nuxt Demo
The Nuxt.js demo demonstrates ATUI components in a full-stack Vue framework with server-side rendering support:
- Vue 3 components with ATUI integration
- SSR-compatible component loading
- Tailwind CSS styling integration

**Getting Started:**
```bash
cd examples/nuxt
npm install
npm run dev
```
Visit `http://localhost:3000` to view the demo.

For more details, see [examples/nuxt/README.md](../examples/nuxt/README.md).

## Naming Conventions

### **Component naming conventions**

All components must be prefixed with aw-{component-name}
The name must start with a lowercase letter and contain a hyphen.

- **kebab-case** for all file names: `button.tsx`, `data-table.scss`
- Avoid splitting compound words, e.g. `aw-tool-tip`
- Always extend names for existing elements, e.g. `aw-button`
- Always include parent name in child component, e.g. `aw-menu-item`
- Make the name concise, but clear. Describe the specific role, e.g. `aw-multi-select`

```typescript
// ✅ Correct component naming
@Component({
    tag: 'aw-button',           // kebab-case, aw- prefix
    shadow: false,
})
export class AwButtonComponent { }

@Component({
    tag: 'aw-input-range',      // compound word, clear purpose
    shadow: false,
})
export class AwInputRangeComponent { }

@Component({
    tag: 'aw-button-group-option',  // parent name included
    shadow: false,
})
export class AwButtonGroupOptionComponent { }

// ❌ Incorrect naming
@Component({
    tag: 'button',                // Missing aw- prefix
})
@Component({
    tag: 'aw-tool-tip',         // Unnecessarily split compound word
})
```


### Component Properties naming conventions

- kebab-case for slots
- camelCase for local vars
- snake_case for props

```typescript
// ✅ Property naming examples
export class AwInputComponent {
    @Prop() label: string;                    // Simple camelCase
    @Prop() hint_text: string;               // snake_case for readability
    @Prop() error_text: string;              // snake_case for complex props
    @Prop() icon_right?: string;             // snake_case for compound names
    
    // Local variables use camelCase
    private inputId = `input-${Math.random()}`;
    inputEl: HTMLInputElement;
}
```

```html
<!-- ✅ Slot naming uses kebab-case -->
<slot name="card-header" />
<slot name="card-header-actions" />
<slot name="input-actions" />
```




## **Property naming conventions**

### **General**

- Use lowercase single words or camelcase compound words when required TBC
- use snake_case for props
- All props should be descriptive of the role, e.g. **`tooltipPosition`**
- Avoid HTML attributes like title and style. use componentname_title
- Use affirmative naming for booleans, e.g. `hasIcon`
- Use is, has, or can prefix for booleans, e.g. `isActive`
- Flatten the structure as much as possible.
  Avoid inputs that require types intended for child components, instead provide content slots.

```typescript
// ✅ Good property naming
export class AwButtonComponent {
    @Prop() type: ButtonType = 'primary';        // Simple descriptive name
    @Prop() size: ButtonSize = 'lg';             // Clear purpose
    @Prop() tooltip_position: string;            // snake_case compound
    @Prop() card_title?: string;                 // Avoid HTML 'title' attribute
    @Prop() disabled: boolean = false;           // Affirmative boolean
    @Prop() icon?: string;                       // Simple material icon name
    @Prop() icon_right?: string;                 // snake_case directional
}

// ❌ Poor property naming
export class BadComponent {
    @Prop() t: string;                           // Too abbreviated
    @Prop() isNotDisabled: boolean;              // Double negative
    @Prop() style?: CSSStyleDeclaration;         // Conflicts with HTML attribute
    @Prop() complexConfig?: {                    // Should use slots instead
        title: string;
        icon: string;
    };
}
```

### Method Properties

Method props should be named using `on` as a prefix to describe an action, e.g., `onClick`, `onChange`, or `onClose`.

```typescript
// ✅ Method property naming
export class AwModalComponent {
    @Prop() onOpen?: () => void;
    @Prop() onClose?: () => void;
    @Prop() onConfirm?: (data: any) => void;
    @Prop() onChange?: (value: string) => void;
}

// ✅ Event handlers use 'handle' prefix
handleClick(event: Event): void {
    event.stopPropagation();
    // Handle click logic
}

handleChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.awChange.emit(this.value);
}
```

### **Boolean Properties**

- Use affirmative names for booleans, e.g. `showIcon` excluding disabled states.
- Use is, has, show or can prefix for booleans when the name is not already descriptive of behavior
- Avoid adding unnecessary boolean inputs for UI that can be determined by method inputs
  E.g if `(onGoBack)` is defined then display UI

```typescript
// ✅ Good boolean naming
export class AwInputComponent {
    @Prop() required: boolean;                   // Affirmative, clear meaning
    @Prop() disabled: boolean = false;           // Standard state
    @Prop() readonly: boolean;                   // Clear behavior
    @Prop() clearable: boolean;                  // Capability boolean
    @Prop() invalid: boolean;                    // State boolean
}

export class AwCardComponent {
    @Prop() sticky_header?: boolean = true;      // Descriptive behavior
    @Prop() sticky_footer?: boolean = true;      // Descriptive behavior
    @Prop() overflow_content?: boolean = false;  // Clear purpose
}

// ✅ Boolean with descriptive prefixes when needed
export class AwModalComponent {
    @Prop() isOpen: boolean = false;             // State with 'is' prefix
    @Prop() hasBackdrop: boolean = true;         // Feature with 'has' prefix
    @Prop() canClose: boolean = true;            // Capability with 'can' prefix
}

// ❌ Poor boolean naming
@Prop() notDisabled: boolean;                    // Double negative
@Prop() shouldNotShow: boolean;                  // Negation
@Prop() hideIcon: boolean;                       // Negative action
```

**Boolean Tips**

Here are some naming conventions for boolean inputs:

- **Avoid negations**: Avoid using words like "not", "no", "never", "won't", or "doesn't" in variable names. Instead, you can remove the negation or flip the value.
- **Use nouns**: Use nouns instead of verbs to create a static feeling. For example, use "isVisible" instead of "shouldShow".
- **Use "is" or "has" as a prefix**: Use "is" or "has" as a prefix to indicate that the function is checking a condition and will return a boolean value. For example, use "isLoggedIn" or "hasAccess".
- **Use mnemonic names**: Use names that indicate the intent of the variable's use.

### **Variant properties**

For theme variant properties use enums defined within the component to provide fixed options:

e.g. `type Size = 'xs' | 'sm' | 'md' | 'lg';`

```typescript
// ✅ Variant property examples
export type ButtonType =
    | 'primary'
    | 'primaryOutline'
    | 'primaryText'
    | 'secondary'
    | 'secondaryOutline'
    | 'secondaryText'
    | 'destructive'
    | 'destructiveOutline'
    | 'destructiveText';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type InputType = 'text' | 'url' | 'email' | 'password';

export class AwButtonComponent {
    @Prop() type: ButtonType = 'primary';        // Enum with clear options
    @Prop() size: ButtonSize = 'lg';             // Size variants
}

export class AwInputComponent {
    @Prop() type: InputType = 'text';            // Input type variants
}

// ✅ Shadow variant example
export class AwCardComponent {
    @Prop() shadow?: 'none' | 'sm' | 'lg' = 'sm';
}
```

## Custom events

prefix with aw e.g awClick

What: any stencil event

```typescript
// ✅ Custom event naming examples
export class AwButtonComponent {
    @Event() awClick: EventEmitter<any>;                    // Simple action
}

export class AwInputComponent {
    @Event() awChange: EventEmitter<string | number>;       // Value change
}

export class AwTableComponent {
    @Event() awSortChange: EventEmitter<{                   // Complex data
        colId: string;
        sortDirection: 'asc' | 'desc' | null;
    }>;
}

// ✅ Stencil event decorator with configuration
@Event({
    eventName: 'awRemoveChip',
    bubbles: true,
    composed: true,
    cancelable: false,
})
awRemoveChip: EventEmitter<string[]>;

// ✅ Multiple related events
export class AwButtonGroupComponent {
    @Event() awClick: EventEmitter<any>;           // click event
    @Event() awChange: EventEmitter<any>;          // change event  
    @Event() awIndexChange: EventEmitter<number>;  // index change event
}
```

Usage examples:
- click event is now awClick event on aw-button-group-option
- change event is now awChange on aw-button-group
- indexChange event is now awIndexChange on aw-button-group
- change event is now awChange on aw-checkbox, change event is still emitted from 'input' element
-

# Component architecture

```
src/components/
├── {component-name}/
│   ├── {component-name}.tsx          # Main component file
│   ├── {component-name}.scss         # Component styles
│   ├── {component-name}.stories.ts   # Storybook stories (autogenerated from jsdoc comments)
│   ├── readme.md                     # Component documentation (autogenerated from jsdoc comments)
│   └── test/   
│       ├── {component-name}.e2e.html      # Playwright E2E tests
│       └──{component-name}.e2e.ts    # Playwright E2E tests
```

## Styles
LIT
- Use ITCSS with BEM to define component styles.
- Use css custom properties to define key component styles.
- Provide Global variabels that can be passed down to component specific variables.
- Add css ::part to allow for styling of the component & slots from the host.
- Enable shadow DOM to encapsulate styles.

```css  
/* Global variables */
:root {
    --aw-color-primary: #007bff;
    --aw-color-secondary: #6c757d;
}
```
```css
/* Component styles */
.aw-button {
    background-color: var(--aw-color-primary);
    color: white;
}
```
```css
/* BEM CLass */
.aw-button__label--active {
    background-color: var(--aw-color-primary);
    color: white;
}
```

STENCIL
- use tailwind to define component styles.
- use variables-based classes from tailwind.config to allow for the application of themes.
- Enable shadow DOM to encapsulate styles.
- Use a custom util function to apply variant styles vis dynamic classes similar to cva. 
- Ensure the component theme can also be controlled via CSS variables.
- Rely on content slots and host styles to add decoration
  Avoid adding style and decoration inputs for unique scenarios
  . E.g DONT DO `@Input() titleColor?: string;`



```typescript
// ❌ Don't add styling props
@Prop() titleColor?: string;
@Prop() border?: boolean;

```

- Allow styling to be applied to the host.
  Avoid adding styling inputs for styles that can be applied on the host,
  DONT `@Input() border?: boolean;`

## Slots

Provide slots for custom content to avoid detaching from components.
Slot names to match the input you are replacing of the area in the component.
`titleContent footerContent`

**Example from aw-header:**

```html
<!-- ✅ Simple prop usage -->
<aw-header header_title="Page Title" />

<!-- ✅ Custom slot content -->
<aw-header>
    <div slot="custom-title">
        <strong>Custom</strong> <em>Styled</em> Title
    </div>
</aw-header>
```

## Child Components

- For list-based components (menu, select, accordion) provide an individual component for list items. This allows devs to enter data as an array or manually via the host template.

```html
<!-- ✅ Dual API - props or slots -->
<!-- Via props -->
<aw-select options={[{key: 'option1', value: 'Option 1'}]} />

<!-- Via individual components -->
<aw-select>
    <aw-select-option value="option1">Option 1</aw-select-option>
    <aw-select-group label="Advanced">
        <aw-select-option value="option2">Custom Option</aw-select-option>
    </aw-select-group>
</aw-select>
```

# Component Checklist

## General

| Criteria | Description                                                                           | Status |
|----------|---------------------------------------------------------------------------------------|--------|
| Does not duplicate | Avoid creating components for very unique use cases                                   |  |
| Component naming conventions | Component uses aw-prefix                                                            |  |
| Input naming conventions | Text/numeric, boolean and method inputs follow conventions                            |  |
| Input naming conventions | Does not use input names matching HTML attributes (e.g. title)                        |  |
| Required inputs are marked | Dependent on framework                                                                |  |
| Types | Type definitions are properly defined                                                 |  |
| JSDoc | All props, methods and events are documented with JSDoc                               |  |
| Events | Provide types when emitting events. Use AwEvent for click events when no type is specified. |  |

## Content

| Criteria            | Description                                                                | Status |
|---------------------|----------------------------------------------------------------------------|--------|
| Content slots       | Slots provided for primary inputs/content areas                            |  |
| Content slot naming | Slots are named using parent prefix (e.g. sidebar-header)                  |  |
| Child components    | Provide composable child components for flexibility                        |  |
| Template logic      | Split longer template HTML into digestible chunks, name as render{Section} |  |

## Data

| Criteria | Description | Status |
|----------|-------------|--------|
| Data does not require external types | Use slots to display child components |  |
| Lists (select, tabs, list-selector, etc.) | List items can be added via array input or manually via primary content slot |  |

## Accessibility

| Criteria | Description | Status |
|----------|-------------|--------|
| Focus states | Provide visual indication of focus states for selectable elements |  |
| Disabled state is marked | Indicate state using theme, prevent interaction, and update cursor |  |
| Role attribute | Mark elements by role, include decoration and hide |  |
| Aria attributes | Include appropriate aria labeling |  |
| Accessible via tabindex | Components can be selected via keyboard |  |
| Selectable via enter and space | Selectable elements can be selected via keyboard |  |
| Screen reader | Hide purely decorative content |  |

## Testing

| Criteria | Description | Status |
|----------|-------------|--------|
| Testing hooks have been provided | data-name attributes are provided for primary input containers |  |
| Cross Browser testing | Works in all major browsers (last 2 versions) |  |
| E2E tests | End-to-end tests are implemented |  |

## Theme

| Criteria | Description | Status |
|----------|-------------|--------|
| CSS | Component uses Tailwind CSS to apply all styling |  |
| Element class | Component can be styled via element classnames |  |
| CSS variables | Component can be styled internally via CSS variables |  |
| Theme variables | Variable names allow for light and dark themes (--foreground --background) |  |
| data-state | Include data-state attributes to allow styling with Tailwind |  |
| Variants | Use variants to define complex Tailwind strings for state and interaction |  |

## Forms

| Criteria | Description | Status |
|----------|-------------|--------|
| Disabled state | Form components properly handle disabled state |  |

---


### Git

### Commit messages
Use [semantic naming conventions](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) in commit messages.


Format: `<type>(<scope>): <subject>`

`<scope>` is optional

**Example:**
```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

**More Examples:**

- `feat:` (new feature for the user, not a new feature for build script)
- `fix:` (bug fix for the user, not a fix to a build script)
- `docs:` (changes to the documentation)
- `style:` (formatting, missing semi colons, etc; no production code change)
- `refactor:` (refactoring production code, eg. renaming a variable)
- `test:` (adding missing tests, refactoring tests; no production code change)
- `chore:` (updating grunt tasks etc; no production code change)
