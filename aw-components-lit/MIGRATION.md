# Component Migration Guide

## 🔄 Migration Strategy Overview

This document outlines the systematic approach for migrating React/Next.js components to Stencil web components.

## 📋 Migration Phases

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Establish core architecture and base components

**Components to Migrate**:
- `base/button/*` → `aw-button`
- `base/form/*` → `aw-input`, `aw-select`, `aw-checkbox`, etc.
- `base/modal.js` → `aw-modal`
- `base/close.js` → `aw-close-button`

**Success Criteria**:
- ✅ Stencil project setup complete
- ✅ Base components working in isolation
- ✅ Theme system implemented
- ✅ Documentation pipeline established

### Phase 2: Navigation & UI (Weeks 4-5)
**Goal**: Core site navigation components

**Components to Migrate**:
- `navigation/logo.js` → `aw-logo`
- `navigation/primary-navigation.js` → `aw-nav`
- `navigation/menu.js` → `aw-menu`
- `navigation/navbar-*.js` → `aw-navbar` (with variants)

**Success Criteria**:
- ✅ Navigation components functional
- ✅ Responsive behavior preserved
- ✅ Accessibility features implemented

### Phase 3: Motion & Animation (Weeks 6-8)
**Goal**: Text animations and motion effects

**Components to Migrate**:
- `motion/text-anim-*.js` → `aw-text-animation`
- `motion/animated-element.js` → `aw-animated-element`
- `motion/paralax-element.js` → `aw-parallax`
- `cursor/cursor*.js` → `aw-cursor`

**Success Criteria**:
- ✅ Animation performance matches originals
- ✅ Configurable animation parameters
- ✅ Reduced bundle size through shared utilities

### Phase 4: Images & Media (Weeks 7-9)
**Goal**: Image handling and effects

**Components to Migrate**:
- `image/contentful-image.js` → `aw-image`
- `image/blend-image*.js` → `aw-blend-image`
- `image/textured-image.js` → `aw-textured-image`
- `blocks/block-video.js` → `aw-video`

**Success Criteria**:
- ✅ Contentful integration preserved
- ✅ Image optimization maintained
- ✅ Lazy loading implemented

### Phase 5: Content Blocks (Weeks 10-12)
**Goal**: Content display components

**Components to Migrate**:
- `blocks/block-*.js` → `aw-block-*` series
- `rich-text/rich-text.js` → `aw-rich-text`
- `post/post-*.js` → `aw-post-*` series

**Success Criteria**:
- ✅ Rich text rendering functional
- ✅ Content blocks compose properly
- ✅ SEO considerations addressed

## 🔧 Migration Process per Component

### 1. Analysis Phase
```bash
# Document current component
- Props interface
- State management
- External dependencies
- Event handlers
- Styling approach
- Testing coverage
```

### 2. Design Phase
```typescript
// Design Stencil component interface
@Component({
  tag: 'aw-component-name',
  styleUrl: 'aw-component-name.scss',
  shadow: true
})
export class AwComponentName {
  @Prop() propName: string;
  @State() internalState: any;
  @Event() customEvent: EventEmitter;
}
```

### 3. Implementation Phase
- Convert JSX to Stencil TSX
- Migrate styles to SCSS with CSS custom properties
- Implement event system
- Add accessibility features
- Create documentation

### 4. Testing Phase
- Unit tests for component logic
- Visual regression tests
- Accessibility testing
- Performance benchmarks

### 5. Integration Phase
- Create React wrapper (if needed)
- Update documentation
- Add to component library
- Create migration guide for consumers

## 🎯 Component Conversion Patterns

### Pattern 1: Simple Functional Component
```tsx
// Before (React)
const Button = ({ variant, children, onClick }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);

// After (Stencil)
@Component({
  tag: 'aw-button',
  styleUrl: 'aw-button.scss',
  shadow: true
})
export class AwButton {
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Event() awClick: EventEmitter<MouseEvent>;
  
  render() {
    return (
      <button 
        class={`btn btn-${this.variant}`}
        onClick={(e) => this.awClick.emit(e)}
      >
        <slot />
      </button>
    );
  }
}
```

### Pattern 2: State Management Component
```tsx
// Before (React)
const [isOpen, setIsOpen] = useState(false);

// After (Stencil)
@State() isOpen: boolean = false;

private toggleOpen = () => {
  this.isOpen = !this.isOpen;
}
```

### Pattern 3: Context Consumer
```tsx
// Before (React)
const theme = useContext(ThemeContext);

// After (Stencil)
@State() theme: Theme;

connectedCallback() {
  this.theme = getGlobalTheme();
  document.addEventListener('theme-change', this.handleThemeChange);
}

disconnectedCallback() {
  document.removeEventListener('theme-change', this.handleThemeChange);
}
```

## 🚨 Migration Challenges & Solutions

### Challenge 1: React Context
**Problem**: Web components don't support React context
**Solution**: Custom event system + global state management

```typescript
// Global theme manager
class ThemeManager {
  private theme: Theme;
  
  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    document.dispatchEvent(new CustomEvent('theme-change', {
      detail: newTheme
    }));
  }
}
```

### Challenge 2: Complex State Management
**Problem**: Components with complex internal state
**Solution**: Break down into smaller components or use state machines

### Challenge 3: Animation Libraries
**Problem**: Dependencies on React-specific animation libraries
**Solution**: Use web-native animation APIs or vanilla JS libraries

### Challenge 4: Form Validation
**Problem**: React form libraries don't work with web components
**Solution**: Implement native form validation or create validation utilities

## 📊 Priority Matrix

### High Impact, Low Effort
- Base button component
- Simple text animations
- Logo component
- Close button

### High Impact, High Effort
- Complex navigation components
- Rich text rendering
- Form components with validation
- Canvas/WebGL components

### Low Impact, Low Effort
- Utility functions
- Simple wrappers
- Icon components

### Low Impact, High Effort
- Legacy animation components
- Complex state management components
- Rarely used specialized components

## 🔄 Backwards Compatibility Strategy

### React Wrapper Generation
```bash
# Automated wrapper generation
npm run generate:react-wrappers

# Output: react-wrappers/
├── AwButton.tsx
├── AwModal.tsx
└── index.ts
```

### Migration Timeline for Consumers
1. **Week 1**: Install new component library alongside existing
2. **Weeks 2-4**: Gradually replace components page by page
3. **Week 5**: Remove old component dependencies
4. **Week 6**: Update build process and documentation

## ✅ Migration Checklist Template

For each component migration:

**Pre-Migration**:
- [ ] Component analysis documented
- [ ] Dependencies identified
- [ ] API design approved
- [ ] Test plan created

**During Migration**:
- [ ] Stencil component implemented
- [ ] Styles converted and themed
- [ ] Events system implemented
- [ ] Unit tests passing
- [ ] Visual regression tests passing
- [ ] Accessibility tests passing
- [ ] Performance benchmarks met

**Post-Migration**:
- [ ] Documentation updated
- [ ] Usage examples created
- [ ] React wrapper generated (if needed)
- [ ] Migration guide written
- [ ] Component released
- [ ] Original component deprecated

## 🎯 Success Metrics

**Technical Metrics**:
- Bundle size reduction: Target 30-50%
- Performance improvement: Target 20% faster renders
- Test coverage: Maintain 80%+

**Developer Experience Metrics**:
- Documentation completeness: 100%
- Example coverage: All components
- Migration time: <2 weeks per major component

**Business Metrics**:
- Framework flexibility: Support 3+ frameworks
- Maintenance overhead: Reduce by 40%
- Reusability: Increase component reuse by 60%

---

*This migration guide will be updated as we progress through the implementation phases.*