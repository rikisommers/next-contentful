# Framer Code Components Workflow

## 1. React to Framer Transfer Process

### Component Analysis
Current React components in cms-contentful-app:
- **Block Components**: 15+ components (block-hero, block-intro, block-article, etc.)
- **Motion Components**: Text animations, parallax elements, animated elements
- **Background Components**: WebGL shaders, canvas effects, texture containers
- **Image Components**: Contentful images, blend effects, modal viewers
- **Navigation Components**: Menus, navbars, audio controls
- **Form Components**: Inputs, buttons, checkboxes
- **Utility Components**: Date formatting, toast notifications, scroll containers

### Framer Code Component Structure
```javascript
// Template for Framer Code Component
import { addPropertyControls, ControlType } from "framer"
import React from "react"

export default function ComponentName(props) {
    const { 
        text = "Default text",
        backgroundColor = "#000000",
        // ... other props
    } = props

    return (
        <div style={{ backgroundColor }}>
            {text}
        </div>
    )
}

// Property controls for Framer interface
ComponentName.defaultProps = {
    text: "Default text",
    backgroundColor: "#000000"
}

addPropertyControls(ComponentName, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Default text"
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000"
    }
})
```

### Transfer Workflow Steps

1. **Component Preparation**
   ```bash
   # Create framer-components directory
   mkdir -p /Users/user/Dev/framer-components/src/components
   cd /Users/user/Dev/framer-components
   npm init -y
   npm install framer react react-dom
   ```

2. **Component Conversion Process**
   - Extract core React component logic
   - Add Framer property controls using `addPropertyControls`
   - Convert props to Framer-compatible control types
   - Remove cms-contentful specific dependencies
   - Add responsive design considerations
   - Test in Framer environment

3. **Automated Transfer Script**
   ```javascript
   // components/utils/framer-transfer.js
   const fs = require('fs');
   const path = require('path');

   function convertToFramerComponent(componentPath) {
       // Read React component
       const componentCode = fs.readFileSync(componentPath, 'utf8');
       
       // Extract component name and props
       const componentName = extractComponentName(componentCode);
       const props = extractProps(componentCode);
       
       // Generate Framer version
       const framerCode = generateFramerComponent(componentName, props, componentCode);
       
       // Write to framer-components directory
       const outputPath = path.join('/Users/user/Dev/framer-components/src/components', `${componentName}.jsx`);
       fs.writeFileSync(outputPath, framerCode);
       
       console.log(`Converted ${componentName} to Framer component`);
   }
   ```

## 2. Component Library Restructuring

### Current Structure
```
cms-contentful-app/
├── aw-components/          # Stencil components (production ready)
├── aw-components-lit/      # Lit components (production ready)
└── components/             # React components (to be processed)
```

### Target Structure
```
component-libraries/
├── aw-stencil/            # Stencil components (moved from aw-components)
├── aw-lit/                # Lit components (moved from aw-components-lit)
├── aw-react/              # React components (extracted from cms-contentful-app)
└── aw-framer/             # Framer code components (converted from React)

cms-contentful-app/        # Cleaned up main project
├── pages/
├── styles/
└── lib/                   # Utilities only
```

### Migration Steps

1. **Create New Repository Structure**
   ```bash
   # Create main component libraries directory
   mkdir -p /Users/user/Dev/component-libraries
   cd /Users/user/Dev/component-libraries
   
   # Initialize git repo
   git init
   git remote add origin [new-repo-url]
   ```

2. **Move Stencil Components**
   ```bash
   # Move aw-components to aw-stencil
   mv /Users/user/Dev/cms-contentful-app/aw-components /Users/user/Dev/component-libraries/aw-stencil
   
   # Update package.json name
   cd /Users/user/Dev/component-libraries/aw-stencil
   npm version patch
   ```

3. **Move Lit Components**
   ```bash
   # Move aw-components-lit to aw-lit
   mv /Users/user/Dev/cms-contentful-app/aw-components-lit /Users/user/Dev/component-libraries/aw-lit
   
   # Update package.json name
   cd /Users/user/Dev/component-libraries/aw-lit
   npm version patch
   ```

## 3. NPM Publishing Setup

### Package Configuration

#### Stencil Components (aw-stencil)
```json
{
  "name": "@aw-components/stencil",
  "version": "1.0.0",
  "description": "AW Design System - Stencil Components",
  "main": "dist/index.cjs.js",
  "module": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "collection": "dist/collection/collection-manifest.json",
  "files": [
    "dist/",
    "loader/"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

#### Lit Components (aw-lit)
```json
{
  "name": "@aw-components/lit",
  "version": "1.0.0",
  "description": "AW Design System - Lit Components",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### Publishing Commands
```bash
# Stencil components
cd /Users/user/Dev/component-libraries/aw-stencil
npm run build
npm publish

# Lit components
cd /Users/user/Dev/component-libraries/aw-lit
npm run build
npm publish
```

## 4. LLM Component Transfer Workflow

### Automated Component Detection
```javascript
// scripts/component-detector.js
const fs = require('fs');
const path = require('path');

function detectNewComponents(cmsPath) {
    const componentsDir = path.join(cmsPath, 'components');
    const existingComponents = loadExistingComponents();
    
    // Scan for new .js/.jsx files
    const allComponents = scanDirectory(componentsDir);
    const newComponents = allComponents.filter(comp => 
        !existingComponents.includes(comp.name)
    );
    
    return newComponents;
}

function generateTransferTasks(newComponents) {
    return newComponents.map(component => ({
        source: component.path,
        targetStencil: generateStencilTarget(component),
        targetLit: generateLitTarget(component),
        targetFramer: generateFramerTarget(component)
    }));
}
```

### Component Conversion Templates

#### Stencil Conversion
```typescript
// Template for converting React to Stencil
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'aw-{component-name}',
  styleUrl: '{component-name}.scss',
  shadow: true
})
export class {ComponentName} {
  @Prop() text: string = 'Default text';
  @Prop() backgroundColor: string = '#000000';

  render() {
    return (
      <div style={{ backgroundColor: this.backgroundColor }}>
        {this.text}
      </div>
    );
  }
}
```

#### Lit Conversion
```typescript
// Template for converting React to Lit
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aw-{component-name}')
export class {ComponentName} extends LitElement {
  @property() text = 'Default text';
  @property() backgroundColor = '#000000';

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <div style="background-color: ${this.backgroundColor}">
        ${this.text}
      </div>
    `;
  }
}
```

### GitHub Actions Workflow
```yaml
# .github/workflows/component-sync.yml
name: Component Library Sync

on:
  push:
    paths:
      - 'cms-contentful-app/components/**'

jobs:
  detect-and-convert:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Detect New Components
        run: node scripts/component-detector.js
        
      - name: Convert to Stencil
        run: node scripts/convert-to-stencil.js
        
      - name: Convert to Lit
        run: node scripts/convert-to-lit.js
        
      - name: Convert to Framer
        run: node scripts/convert-to-framer.js
        
      - name: Create Pull Requests
        run: |
          gh pr create --title "Auto: New Stencil components" --body "Automated component conversion"
          gh pr create --title "Auto: New Lit components" --body "Automated component conversion"
```

## 5. Implementation Priority

### Phase 1: Setup (Current)
1. ✅ Create Framer workflow documentation
2. ⏳ Move component libraries out of cms-contentful-app
3. ⏳ Setup npm publishing for Stencil components

### Phase 2: Automation
1. Create component detection scripts
2. Build conversion templates for each framework
3. Setup GitHub Actions workflows

### Phase 3: Component Migration
1. Convert high-priority React components to Framer
2. Test Framer components in production environment
3. Update cms-contentful-app to use published npm packages

## 6. Testing Strategy

### Component Testing
```javascript
// Test Framer components
describe('Framer Component Tests', () => {
  test('Component renders with default props', () => {
    // Test implementation
  });
  
  test('Property controls work correctly', () => {
    // Test property controls
  });
});
```

### Integration Testing
- Test published npm packages in clean environment
- Verify Framer components work in Framer Web/Desktop
- Validate component library imports work correctly

This workflow provides a comprehensive approach to transferring React components to Framer while setting up automated processes for maintaining consistency across all component libraries.