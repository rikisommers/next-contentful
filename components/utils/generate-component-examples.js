const fs = require('fs');
const path = require('path');

function findComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.next', 'dist', 'build', 'generated'].includes(file)) {
        findComponentFiles(filePath, fileList);
      }
    } else if (file.match(/\.(js|jsx|ts|tsx)$/) && !file.includes('.test.') && !file.includes('.spec.')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function parsePropsFromCode(exampleCode) {
  const props = {};
  
  // Extract label
  const labelMatch = exampleCode.match(/label="([^"]+)"/);
  if (labelMatch) props.label = labelMatch[1];
  
  // Extract type
  const typeMatch = exampleCode.match(/type=\{ButtonType\.(\w+)\}/);
  if (typeMatch) props.type = typeMatch[1];
  
  // Extract sound
  const soundMatch = exampleCode.match(/sound=\{ButtonSound\.(\w+)\}/);
  if (soundMatch) props.sound = soundMatch[1];
  
  // Check for children
  if (exampleCode.includes('<span>🚀 Launch</span>')) {
    props.children = '🚀 Launch';
  } else if (exampleCode.includes('<span>🚀 Launch App</span>')) {
    props.children = '🚀 Launch App';
  }
  
  // Extract items for grid components (simplified)
  const itemsMatch = exampleCode.match(/items=\{(\[[\s\S]*?\])\}/);
  if (itemsMatch) {
    // Identify grid type by checking first item title
    const itemsString = itemsMatch[1];
    if (itemsString.includes('Interactive Web App')) {
      props.gridType = 'basic';
    } else if (itemsString.includes('Creative Portfolio')) {
      props.gridType = 'bento';
    } else if (itemsString.includes('Photography Portfolio')) {
      props.gridType = 'list';
    } else if (itemsString.includes('Digital Art Gallery')) {
      props.gridType = 'things';
    }
  }
  
  return props;
}

function extractJSDocComments(content) {
  const jsDocRegex = /\/\*\*[\s\S]*?\*\//g;
  const comments = content.match(jsDocRegex) || [];
  return comments;
}

function parseJSDocComment(jsDocComment) {
  const lines = jsDocComment.split('\n').map(line => line.trim());
  
  const result = {
    description: '',
    isComponent: false,
    category: 'uncategorized',
    params: [],
    examples: []
  };
  
  let currentSection = 'description';
  let currentExample = null;
  
  lines.forEach(line => {
    const cleanLine = line.replace(/^\s*\*\s?/, '').trim();
    
    if (cleanLine === '/**' || cleanLine === '*/') return;
    
    if (cleanLine.startsWith('@component')) {
      result.isComponent = true;
      currentSection = 'component';
    } else if (cleanLine.startsWith('@category')) {
      result.category = cleanLine.replace('@category', '').trim();
      currentSection = 'category';
    } else if (cleanLine.startsWith('@param')) {
      const paramMatch = cleanLine.match(/@param\s+\{([^}]+)\}\s+([^\s]+)\s*-?\s*(.*)/);
      if (paramMatch) {
        result.params.push({
          type: paramMatch[1],
          name: paramMatch[2],
          description: paramMatch[3]
        });
      }
      currentSection = 'param';
    } else if (cleanLine.startsWith('@example')) {
      if (currentExample) {
        result.examples.push(currentExample);
      }
      currentExample = {
        title: '',
        code: ''
      };
      currentSection = 'example';
    } else if (currentSection === 'description' && cleanLine && !cleanLine.startsWith('@')) {
      result.description += (result.description ? ' ' : '') + cleanLine;
    } else if (currentSection === 'example' && currentExample) {
      if (cleanLine.startsWith('//') && !currentExample.title) {
        currentExample.title = cleanLine.replace('//', '').trim();
      } else if (cleanLine && !cleanLine.startsWith('@')) {
        currentExample.code += (currentExample.code ? '\n' : '') + cleanLine;
      }
    }
  });
  
  if (currentExample) {
    result.examples.push(currentExample);
  }
  
  return result;
}

function extractComponentInfo(content, filePath) {
  let componentName = null;
  let isDefault = false;

  const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?([A-Z]\w*)/);
  if (defaultExportMatch) {
    componentName = defaultExportMatch[1];
    isDefault = true;
  } else {
    const namedExportMatch = content.match(/export\s+(?:const|function)\s+([A-Z]\w*)/);
    if (namedExportMatch) {
      componentName = namedExportMatch[1];
      isDefault = false;
    }
  }

  if (!componentName) {
    const componentNameMatch = content.match(/const\s+([A-Z]\w*)\s*=\s*\(|function\s+([A-Z]\w*)\s*\(/);
    if (componentNameMatch) {
      componentName = componentNameMatch[1] || componentNameMatch[2];
      if (new RegExp(`export\\s+default\\s+${componentName}`).test(content)) {
        isDefault = true;
      }
    }
  }

  if (!componentName) {
    const filename = path.basename(filePath, path.extname(filePath));
    componentName = filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    isDefault = true;
  }
  
  return { name: componentName, isDefault };
}

function processComponentFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsDocComments = extractJSDocComments(content);
    
    let componentDoc = null;
    for (const comment of jsDocComments) {
      const parsed = parseJSDocComment(comment);
      if (parsed.isComponent) {
        componentDoc = parsed;
        break;
      }
    }
    
    if (!componentDoc) {
      return null;
    }
    
    const componentInfo = extractComponentInfo(content, filePath);
    const relativePath = path.relative('components', filePath);
    
    const processedExamples = componentDoc.examples
      .filter(ex => ex.code.trim() !== '')
      .map((example, index) => ({
        ...example,
        id: `${componentInfo.name}_${index}`,
        parsedProps: parsePropsFromCode(example.code)
      }));
    
    return {
      name: componentInfo.name,
      isDefaultExport: componentInfo.isDefault,
      filePath: relativePath,
      importPath: `../../../${relativePath.replace(/\.js$/, '')}`,
      category: componentDoc.category,
      description: componentDoc.description,
      parameters: componentDoc.params,
      examples: processedExamples
    };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return null;
  }
}

function generateComponentExamples() {
  console.log('🔍 Scanning for marked components...');
  
  const componentsDir = './components';
  const componentFiles = findComponentFiles(componentsDir);
  
  console.log(`📁 Found ${componentFiles.length} component files`);
  
  const markedComponents = [];
  const categorizedComponents = {};
  
  componentFiles.forEach(filePath => {
    const componentData = processComponentFile(filePath);
    if (componentData) {
      markedComponents.push(componentData);
      
      if (!categorizedComponents[componentData.category]) {
        categorizedComponents[componentData.category] = [];
      }
      categorizedComponents[componentData.category].push(componentData);
    }
  });
  
  console.log(`✅ Found ${markedComponents.length} marked components`);
  console.log(`📊 Categories found: ${Object.keys(categorizedComponents).join(', ')}`);
  
  const outputDir = './generated';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const completeData = {
    generatedAt: new Date().toISOString(),
    totalComponents: markedComponents.length,
    categories: Object.keys(categorizedComponents),
    components: markedComponents
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'component-examples.json'),
    JSON.stringify(completeData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'components-by-category.json'),
    JSON.stringify(categorizedComponents, null, 2)
  );
  
  const previewData = generatePreviewData(categorizedComponents);
  fs.writeFileSync(
    path.join(outputDir, 'component-preview-data.json'),
    JSON.stringify(previewData, null, 2)
  );
  
  const previewComponent = generatePreviewComponent(categorizedComponents);
  fs.writeFileSync(
    path.join(outputDir, 'ComponentPreview.jsx'),
    previewComponent
  );
  
  const summaryReport = generateSummaryReport(markedComponents, categorizedComponents);
  fs.writeFileSync(
    path.join(outputDir, 'summary-report.md'),
    summaryReport
  );
  
  const exampleRenderer = generateExampleRenderer(categorizedComponents);
  fs.writeFileSync(
    path.join(outputDir, 'component-examples.jsx'),
    exampleRenderer
  );
  
  console.log(`📝 Generated files in ${outputDir}/`);
  console.log('  - component-examples.json');
  console.log('  - components-by-category.json');
  console.log('  - component-preview-data.json');
  console.log('  - ComponentPreview.jsx');
  console.log('  - summary-report.md');
  console.log('  - component-examples.jsx');
}

function generatePreviewData(categorizedComponents) {
  const previewData = {
    generatedAt: new Date().toISOString(),
    categories: {}
  };
  
  Object.entries(categorizedComponents).forEach(([category, components]) => {
    previewData.categories[category] = {
      title: category.charAt(0).toUpperCase() + category.slice(1),
      description: getCategoryDescription(category),
      components: []
    };
    
    components.forEach(component => {
      component.examples.forEach((example, index) => {
        previewData.categories[category].components.push({
          id: example.id,
          title: example.title || `${component.name} Example ${index + 1}`,
          description: `${component.description} - ${example.title || 'Example'}`,
          componentName: component.name,
          importPath: component.importPath,
          category: component.category,
          code: example.code,
          parsedProps: example.parsedProps
        });
      });
    });
  });
  
  return previewData;
}

function getCategoryDescription(category) {
  const descriptions = {
    buttons: 'Interactive button components with various styles and animations',
    grid: 'Layout grid components for organizing content with different patterns',
    navigation: 'Navigation components for site and app navigation',
    forms: 'Form input and interaction components',
    animations: 'Animation and motion components',
    layout: 'Layout and structural components'
  };
  
  return descriptions[category] || `${category} components`;
}

function generatePreviewComponent(categorizedComponents) {
  const imports = [];
  const categoryComponents = [];
  
  Object.entries(categorizedComponents).forEach(([category, components]) => {
    const categoryImports = components.map(comp => {
      const importPath = `../../${comp.filePath.replace(/\.js$/, '')}`;
      imports.push(`import ${comp.name} from '${importPath}';`);
      return comp.name;
    });
    
    const categoryExamples = components.map(comp => {
      const examples = comp.examples.map((example, index) => {
        const cleanCode = example.code.replace(/^\s*</gm, '<').replace(/^\s*/gm, '  ');
        return `        <div key="${index}" className="example-item">
          <h4>{example.title || \`Example \${index + 1}\`}</h4>
          <div className="example-preview">
            {/* ${cleanCode} */}
            <p>Code: {example.code}</p>
          </div>
        </div>`;
      }).join('\n');
      
      return `      <div className="component-section">
        <h3>${comp.name}</h3>
        <p>${comp.description}</p>
        <div className="examples">
${examples}
        </div>
      </div>`;
    }).join('\n');
    
    categoryComponents.push(`    <div className="category-section">
      <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
${categoryExamples}
    </div>`);
  });
  
  return `// Auto-generated component preview
import React from 'react';
${imports.join('\n')}

/**
 * Auto-generated component preview showcasing all marked components
 * Generated on: ${new Date().toISOString()}
 */
const ComponentPreview = () => {
  return (
    <div className="component-preview">
      <h1>Component Examples</h1>
${categoryComponents.join('\n')}
    </div>
  );
};

export default ComponentPreview;
`;
}

function generateSummaryReport(markedComponents, categorizedComponents) {
  const categories = Object.keys(categorizedComponents);
  
  let report = `# Component Examples Summary

Generated on: ${new Date().toISOString()}

## Overview
- **Total Components**: ${markedComponents.length}
- **Categories**: ${categories.length}
- **Categories**: ${categories.join(', ')}

## Components by Category

`;

  Object.entries(categorizedComponents).forEach(([category, components]) => {
    report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${components.length} components)\n\n`;
    
    components.forEach(comp => {
      report += `#### ${comp.name}\n`;
      report += `- **File**: \`${comp.filePath}\`\n`;
      report += `- **Description**: ${comp.description}\n`;
      report += `- **Examples**: ${comp.examples.length}\n`;
      
      if (comp.parameters.length > 0) {
        report += `- **Parameters**:\n`;
        comp.parameters.forEach(param => {
          report += `  - \`${param.name}\` (${param.type}): ${param.description}\n`;
        });
      }
      
      report += '\n';
    });
  });
  
  return report;
}

function generateExampleRenderer(categorizedComponents) {
  const allComponents = Object.values(categorizedComponents).flat();

  const defaultImports = [];
  const namedImports = {};
  const importedNames = new Set();

  allComponents.forEach(comp => {
    const importPath = `../components/${comp.filePath.replace(/\.js$/, '')}`;
    if (comp.isDefaultExport) {
      // Handle duplicate component names
      let componentName = comp.name;
      if (importPath.includes('post-tile-hovertext')) {
        componentName = 'PostTileHoverText';
      } else if (importPath.includes('post-tile-text')) {
        componentName = 'PostTileTextBasic';
      }
      
      if (importedNames.has(componentName)) {
        console.warn(`Warning: Duplicate component name ${componentName} from ${importPath}`);
      } else {
        defaultImports.push(`import ${componentName} from '${importPath}';`);
        importedNames.add(componentName);
      }
    } else {
      if (!namedImports[importPath]) {
        namedImports[importPath] = new Set();
      }
      namedImports[importPath].add(comp.name);
    }
  });

  let imports = [...defaultImports];
  for (const [path, names] of Object.entries(namedImports)) {
    imports.push(`import { ${[...names].join(', ')} } from '${path}';`);
  }

  // Filter out duplicates and button utils
  imports = imports.filter(imp => !imp.includes('button.util'));
  
  // Remove duplicate PostTileText import
  const textImports = imports.filter(imp => imp.includes('post-tile-text'));
  if (textImports.length > 1) {
    imports = imports.filter(imp => !imp.includes('post-tile-text'));
    imports.push(`import PostTileTextBasic from '../components/tile/post-tile-text';`);
  }
  
  // Remove duplicate PostTile import
  imports = imports.filter(imp => !imp.includes('audio-trigger'));

  // Add Link import for examples that use it
  imports.push(`import Link from 'next/link';`);

  // Add HOC imports
  imports.push(`import { withDeclarativeAudio, PostTile as AudioPostTileBase } from '../components/audio/audio-trigger';`);

  // Define HOC components and enums at the top level
  const hocDefinitions = `
// Define button enums
const ButtonType = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TRANSPARENT: 'transparent'
};

const ButtonSound = {
  CLICK: 'click',
  HOVER: 'hover',
  NONE: 'none'
};

// Define HOC components
const AudioPostTile = withDeclarativeAudio(AudioPostTileBase);

const AudioGridTile = withDeclarativeAudio(({ post, children, ...props }) => (
  <Link href={\`/posts/\${post.slug}\`} {...props}>
    {children}
  </Link>
));

const PostContent = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.subtitle}</p>
  </div>
);

// Create example data
const examplePost = {
  title: "Example Post",
  slug: "example-post",
  subtitle: "Example description"
};`;

  const exampleEntries = [];
  allComponents.forEach(comp => {
    comp.examples.forEach(example => {
      let jsxCode = example.code.replace(/\/\s*$/, '').trim();
      
      // Handle special cases
      if (example.id.startsWith('PostTile_')) {
        if (example.id === 'PostTile_0') {
          jsxCode = `<AudioPostTile
            post={examplePost}
            data-audio-click="beepOn"
            data-audio-hover="plink"
          />`;
        } else if (example.id === 'PostTile_1') {
          jsxCode = `<div className="grid">
            <AudioGridTile
              post={examplePost}
              data-audio-click="beepOn"
              data-audio-hover="plink"
            >
              <PostContent post={examplePost} />
            </AudioGridTile>
          </div>`;
        }
      }
      // Handle conditional rendering examples
      else if (jsxCode.includes('currentTheme.data.cursor') || jsxCode.includes('showCursor')) {
        const componentMatch = jsxCode.match(/<([A-Za-z]+)[^>]*>/);
        if (componentMatch) {
          const componentName = componentMatch[1];
          jsxCode = `<${componentName} content="Example" />`;
        }
      }
      // For other components, if they contain component definitions, extract just the JSX part
      else if (jsxCode.includes('const') && jsxCode.includes('=')) {
        const jsxMatch = jsxCode.match(/<.*>.*<\/.*>|<.*\/>/s);
        if (jsxMatch) {
          jsxCode = jsxMatch[0];
        }
      }
      
      // Update prop names for grid components
      if (comp.category === 'grid' && jsxCode.includes('items={')) {
        jsxCode = jsxCode.replace('items={', 'data={');
      }
      
      // Update component names in examples
      jsxCode = jsxCode.replace(/PostTileText/g, 'PostTileTextBasic');
      
      exampleEntries.push(`  "${example.id}": (${jsxCode})`);
    });
  });

  return `// Auto-generated file with rendered component examples
import React from 'react';
${[...imports].join('\n')}
${hocDefinitions}

export const exampleComponents = {
${exampleEntries.join(',\n')}
};
`;
}

if (require.main === module) {
  generateComponentExamples();
}

module.exports = {
  generateComponentExamples,
  findComponentFiles,
  processComponentFile
};