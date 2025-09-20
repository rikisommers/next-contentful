import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-code';
import type { AwBlockCode } from './aw-block-code';

const meta: Meta<AwBlockCode> = {
  title: 'Components/Blocks/BlockCode',
  component: 'aw-block-code',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A code block component for displaying syntax-highlighted code with copy functionality and expandable modal view.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Code block title'
    },
    code: {
      control: 'text',
      description: 'Code content to display'
    },
    language: {
      control: 'select',
      options: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'css',
        'html',
        'json',
        'bash',
        'python',
        'java',
        'cpp',
        'csharp',
        'php',
        'go',
        'rust',
        'yaml',
        'markdown',
        'sql',
        'plaintext'
      ],
      description: 'Programming language for syntax highlighting'
    },
    theme: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
      description: 'Color theme'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Code block size'
    },
    enable_copy: {
      control: 'boolean',
      description: 'Enable copy functionality'
    },
    enable_expand: {
      control: 'boolean',
      description: 'Enable expand functionality'
    },
    show_line_numbers: {
      control: 'boolean',
      description: 'Show line numbers'
    },
    max_height: {
      control: 'number',
      description: 'Maximum height in pixels before showing expand button'
    },
    embed_url: {
      control: 'text',
      description: 'Optional iframe embed URL'
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<AwBlockCode>;

const javascriptCode = `// Basic JavaScript example
function greetUser(name) {
  console.log('Hello, ' + name + '!');
  
  const message = \`Welcome to our application, \${name}\`;
  return message;
}

// Usage
const userName = 'Alice';
const welcomeMessage = greetUser(userName);
document.getElementById('output').textContent = welcomeMessage;`;

const typescriptCode = `// TypeScript interface example
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  permissions?: string[];
}

class UserService {
  private users: User[] = [];
  
  constructor() {
    this.loadUsers();
  }
  
  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...userData
    };
    
    this.users.push(newUser);
    return newUser;
  }
  
  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`;

const cssCode = `/* Modern CSS with custom properties */
.card {
  --card-bg: #ffffff;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-radius: 8px;
  --card-padding: 1.5rem;
  
  background: var(--card-bg);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: var(--card-padding);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: #2d3748;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
}`;

const bashCode = `#!/bin/bash
# Deployment script

set -e  # Exit on error

PROJECT_NAME="my-app"
BUILD_DIR="./dist"
DEPLOY_DIR="/var/www/$PROJECT_NAME"

echo "Starting deployment for $PROJECT_NAME..."

# Install dependencies
npm ci

# Run tests
npm run test

# Build project
npm run build

# Create backup
sudo cp -r $DEPLOY_DIR $DEPLOY_DIR.backup.$(date +%Y%m%d_%H%M%S)

# Deploy new version
sudo rsync -av --delete $BUILD_DIR/ $DEPLOY_DIR/

# Restart services
sudo systemctl reload nginx
sudo systemctl restart $PROJECT_NAME

echo "Deployment completed successfully!"`;

const jsonCode = `{
  "name": "@aw-components/lit",
  "version": "1.0.0",
  "description": "AW Components Lit Element library",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite",
    "test": "jest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "lit": "^3.0.0",
    "@motionone/dom": "^10.0.0"
  },
  "devDependencies": {
    "@storybook/web-components": "^7.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  },
  "keywords": [
    "web-components",
    "lit-element",
    "design-system",
    "typescript"
  ]
}`;

export const Default: Story = {
  args: {
    title: 'Basic JavaScript',
    code: javascriptCode,
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: false,
    max_height: 400
  }
};

export const TypeScript: Story = {
  args: {
    title: 'TypeScript Class Example',
    code: typescriptCode,
    language: 'typescript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: true
  }
};

export const CSS: Story = {
  args: {
    title: 'Modern CSS with Custom Properties',
    code: cssCode,
    language: 'css',
    theme: 'light',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: false
  }
};

export const BashScript: Story = {
  args: {
    title: 'Deployment Script',
    code: bashCode,
    language: 'bash',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: true
  }
};

export const JSONConfig: Story = {
  args: {
    title: 'Package Configuration',
    code: jsonCode,
    language: 'json',
    theme: 'dark',
    size: 'sm',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: false
  }
};

export const Minimal: Story = {
  args: {
    code: 'console.log("Hello, World!");',
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: false,
    enable_expand: false,
    show_line_numbers: false
  }
};

export const WithEmbed: Story = {
  args: {
    title: 'CodePen Embed Example',
    embed_url: 'https://codepen.io/pen/embed/preview/abcdef?height=300&theme-id=dark&default-tab=js,result',
    code: '// This code is also embedded above',
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: false
  }
};

export const LargeCode: Story = {
  args: {
    title: 'Large Code Block (Expandable)',
    code: `${javascriptCode}\n\n${typescriptCode}\n\n${cssCode}`,
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: true,
    max_height: 200
  }
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <aw-block-code
        title="Small Size"
        code="const small = 'code';"
        language="javascript"
        size="sm"
        enable_copy="true">
      </aw-block-code>
      
      <aw-block-code
        title="Medium Size (Default)"
        code="const medium = 'code';"
        language="javascript"
        size="md"
        enable_copy="true">
      </aw-block-code>
      
      <aw-block-code
        title="Large Size"
        code="const large = 'code';"
        language="javascript"
        size="lg"
        enable_copy="true">
      </aw-block-code>
    </div>
  `
};

export const AllThemes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <aw-block-code
        title="Dark Theme"
        code="const darkTheme = true;"
        language="javascript"
        theme="dark"
        enable_copy="true">
      </aw-block-code>
      
      <aw-block-code
        title="Light Theme"
        code="const lightTheme = true;"
        language="javascript"
        theme="light"
        enable_copy="true">
      </aw-block-code>
      
      <aw-block-code
        title="Auto Theme (follows system)"
        code="const autoTheme = true;"
        language="javascript"
        theme="auto"
        enable_copy="true">
      </aw-block-code>
    </div>
  `
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Code Block',
    code: javascriptCode,
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: true,
    max_height: 300
  },
  parameters: {
    docs: {
      description: {
        story: 'Try copying the code, expanding/collapsing the view, and observe the interactions.'
      }
    }
  }
};