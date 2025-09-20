import{i as ne,a as se,x as a}from"./lit-element-b4b0194a.js";import{n as r,t as ce}from"./property-64877f55.js";import{r as v}from"./state-66c4e041.js";import{e as ie}from"./query-a5550cfe.js";var de=Object.defineProperty,le=Object.getOwnPropertyDescriptor,t=(e,n,s,i)=>{for(var c=i>1?void 0:i?le(n,s):n,f=e.length-1,x;f>=0;f--)(x=e[f])&&(c=(i?x(n,s,c):x(c))||c);return i&&c&&de(n,s,c),c};let o=class extends se{constructor(){super(...arguments),this.title="",this.code="",this.language="javascript",this.theme="dark",this.size="md",this.enable_copy=!0,this.enable_expand=!0,this.show_line_numbers=!1,this.max_height=400,this.embed_url="",this.custom_class="",this._isExpanded=!1,this._showCopyFeedback=!1,this._copyButtonText="Copy"}connectedCallback(){super.connectedCallback(),this._handleEscapeKey=this._handleEscapeKey.bind(this),document.addEventListener("keydown",this._handleEscapeKey)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleEscapeKey),this._isExpanded&&(document.body.style.overflow="unset")}_handleEscapeKey(e){e.key==="Escape"&&this._isExpanded&&this._handleCollapse()}async _handleCopy(){if(!(!this.code||!this.enable_copy))try{await navigator.clipboard.writeText(this.code),this._copyButtonText="Copied!",this._showCopyFeedback=!0,setTimeout(()=>{this._copyButtonText="Copy",this._showCopyFeedback=!1},2e3);const e=new CustomEvent("awCodeCopy",{detail:{code:this.code,language:this.language},bubbles:!0,composed:!0});this.dispatchEvent(e)}catch(e){console.warn("Failed to copy code to clipboard:",e),this._fallbackCopy()}}_fallbackCopy(){const e=document.createElement("textarea");e.value=this.code,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();try{document.execCommand("copy"),this._copyButtonText="Copied!",this._showCopyFeedback=!0,setTimeout(()=>{this._copyButtonText="Copy",this._showCopyFeedback=!1},2e3)}catch(n){console.warn("Fallback copy also failed:",n)}finally{document.body.removeChild(e)}}_handleExpand(){if(!this.enable_expand)return;this._isExpanded=!0,document.body.style.overflow="hidden";const e=new CustomEvent("awCodeExpand",{detail:{code:this.code,language:this.language},bubbles:!0,composed:!0});this.dispatchEvent(e)}_handleCollapse(){this._isExpanded=!1,document.body.style.overflow="unset";const e=new CustomEvent("awCodeCollapse",{detail:{code:this.code,language:this.language},bubbles:!0,composed:!0});this.dispatchEvent(e)}_generateLineNumbers(){return!this.show_line_numbers||!this.code?[]:this.code.split(`
`).map((n,s)=>(s+1).toString())}_getThemeClass(){return this.theme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.theme}render(){const e=["code-block",`code-block--${this._getThemeClass()}`,`code-block--${this.size}`,this._isExpanded?"code-block--expanded":"",this.custom_class].filter(Boolean).join(" "),n=["code-pre",this.show_line_numbers?"code-pre--with-line-numbers":"",`language-${this.language}`].filter(Boolean).join(" "),s=this._generateLineNumbers();return a`
      ${this.embed_url?a`
        <iframe 
          src=${this.embed_url}
          style="width: 100%; height: 300px; border: none; border-radius: var(--aw-code-radius);"
          loading="lazy">
        </iframe>
      `:""}
      
      <div class=${e}>
        ${this.title||this.enable_copy||this.enable_expand?a`
          <div class="code-header">
            ${this.title?a`
              <h3 class="code-title">
                <slot name="title">${this.title}</slot>
              </h3>
            `:a`<div></div>`}
            
            <div class="code-actions">
              <slot name="actions">
                ${this.enable_expand?a`
                  <button
                    class="code-button"
                    @click=${this._isExpanded?this._handleCollapse:this._handleExpand}
                    aria-label=${this._isExpanded?"Collapse code view":"Expand code view"}
                  >
                    ${this._isExpanded?"↙ Collapse":"↗ Expand"}
                  </button>
                `:""}
                
                ${this.enable_copy?a`
                  <button
                    class="code-button ${this._showCopyFeedback?"code-button--success":""}"
                    @click=${this._handleCopy}
                    aria-label="Copy code to clipboard"
                  >
                    📋 ${this._copyButtonText}
                  </button>
                `:""}
              </slot>
            </div>
          </div>
        `:""}
        
        <div 
          class="code-content" 
          style=${this.max_height&&!this._isExpanded?`max-height: ${this.max_height}px`:""}
        >
          ${this.show_line_numbers?a`
            <div class="code-line-numbers">
              ${s.map(i=>a`<div>${i}</div>`)}
            </div>
          `:""}
          
          <pre class=${n}>
            <code class="code-code language-${this.language}">
              <slot name="code">${this.code}</slot>
            </code>
          </pre>
        </div>
        
        <div class="copy-feedback ${this._showCopyFeedback?"copy-feedback--visible":""}">
          Copied to clipboard!
        </div>
      </div>
    `}};o.styles=ne`
    :host {
      --aw-code-bg: var(--aw-color-surface-dark, #1e1e1e);
      --aw-code-surface: var(--aw-color-surface, #2d2d2d);
      --aw-code-text: var(--aw-color-text-inverse, #fff);
      --aw-code-text-muted: var(--aw-color-text-light, #a0a0a0);
      --aw-code-primary: var(--aw-color-primary, #007bff);
      --aw-code-border: var(--aw-color-border-dark, #404040);
      --aw-code-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
      --aw-code-radius: var(--aw-border-radius-md, 8px);
      --aw-code-font-family: var(--aw-font-mono, 'Monaco', 'Menlo', 'Ubuntu Mono', monospace);
      --aw-code-font-size: 0.875rem;
      --aw-code-line-height: 1.5;
      
      display: block;
      margin: 1.5rem 0;
      position: relative;
    }

    .code-block {
      background: var(--aw-code-bg);
      border-radius: var(--aw-code-radius);
      overflow: hidden;
      border: 1px solid var(--aw-code-border);
      transition: all 0.3s ease;
      position: relative;
    }

    .code-block--expanded {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      margin: 1rem;
      max-width: none;
      max-height: none;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
    }

    .code-block--expanded .code-content {
      height: calc(100vh - 120px);
      max-height: none;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--aw-code-surface);
      border-bottom: 1px solid var(--aw-code-border);
    }

    .code-title {
      color: var(--aw-code-text-muted);
      font-size: 0.875rem;
      margin: 0;
      font-weight: 500;
    }

    .code-actions {
      display: flex;
      gap: 0.5rem;
    }

    .code-button {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      background: transparent;
      border: 1px solid var(--aw-code-border);
      color: var(--aw-code-primary);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .code-button:hover {
      background: var(--aw-code-primary);
      color: white;
      border-color: var(--aw-code-primary);
    }

    .code-button:focus {
      outline: 2px solid var(--aw-code-primary);
      outline-offset: 2px;
    }

    .code-button--success {
      background: var(--aw-color-success, #28a745);
      border-color: var(--aw-color-success, #28a745);
      color: white;
    }

    .code-content {
      position: relative;
      max-height: 400px;
      overflow: auto;
    }

    .code-pre {
      margin: 0;
      padding: 1rem;
      background: var(--aw-code-bg);
      color: var(--aw-code-text);
      font-family: var(--aw-code-font-family);
      font-size: var(--aw-code-font-size);
      line-height: var(--aw-code-line-height);
      overflow: auto;
      white-space: pre;
      tab-size: 2;
    }

    .code-code {
      display: block;
    }

    /* Size variants */
    .code-block--sm {
      --aw-code-font-size: 0.75rem;
    }

    .code-block--sm .code-title {
      font-size: 0.75rem;
    }

    .code-block--md {
      --aw-code-font-size: 0.875rem;
    }

    .code-block--lg {
      --aw-code-font-size: 1rem;
    }

    /* Theme variants */
    .code-block--light {
      --aw-code-bg: var(--aw-color-surface-light, #f8f9fa);
      --aw-code-surface: var(--aw-color-surface, #fff);
      --aw-code-text: var(--aw-color-text, #333);
      --aw-code-text-muted: var(--aw-color-text-light, #666);
      --aw-code-border: var(--aw-color-border, #e5e5e5);
    }

    /* Language-specific syntax highlighting placeholders */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #8e8e8e;
      font-style: italic;
    }

    .token.punctuation {
      color: #ccc;
    }

    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #f92672;
    }

    .token.boolean,
    .token.number {
      color: #ae81ff;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #a6e22e;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable {
      color: #f8f8f2;
    }

    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.class-name {
      color: #e6db74;
    }

    .token.keyword {
      color: #66d9ef;
    }

    .token.regex,
    .token.important {
      color: #fd971f;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    /* Line numbers */
    .code-pre--with-line-numbers {
      padding-left: 3rem;
      position: relative;
    }

    .code-line-numbers {
      position: absolute;
      top: 1rem;
      left: 0;
      width: 2.5rem;
      padding: 0 0.5rem;
      color: var(--aw-code-text-muted);
      font-family: var(--aw-code-font-family);
      font-size: var(--aw-code-font-size);
      line-height: var(--aw-code-line-height);
      text-align: right;
      user-select: none;
      border-right: 1px solid var(--aw-code-border);
    }

    /* Copy feedback */
    .copy-feedback {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--aw-color-success, #28a745);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      opacity: 0;
      transform: translateY(-0.5rem);
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 10;
    }

    .copy-feedback--visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        margin: 1rem 0;
      }

      .code-block--expanded {
        margin: 0.5rem;
      }

      .code-header {
        padding: 0.5rem;
        flex-direction: column;
        gap: 0.5rem;
        align-items: stretch;
      }

      .code-actions {
        justify-content: center;
      }

      .code-button {
        flex: 1;
        justify-content: center;
      }

      .code-content {
        max-height: 300px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .code-block,
      .code-button,
      .copy-feedback {
        transition: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .code-block {
        border-width: 2px;
      }

      .code-button {
        border-width: 2px;
      }
    }
  `;t([ie(".code-code")],o.prototype,"_codeElement",2);t([r({type:String})],o.prototype,"title",2);t([r({type:String})],o.prototype,"code",2);t([r({type:String})],o.prototype,"language",2);t([r({type:String})],o.prototype,"theme",2);t([r({type:String})],o.prototype,"size",2);t([r({type:Boolean})],o.prototype,"enable_copy",2);t([r({type:Boolean})],o.prototype,"enable_expand",2);t([r({type:Boolean})],o.prototype,"show_line_numbers",2);t([r({type:Number})],o.prototype,"max_height",2);t([r({type:String})],o.prototype,"embed_url",2);t([r({type:String})],o.prototype,"custom_class",2);t([v()],o.prototype,"_isExpanded",2);t([v()],o.prototype,"_showCopyFeedback",2);t([v()],o.prototype,"_copyButtonText",2);o=t([ce("aw-block-code")],o);const ye={title:"Components/Blocks/BlockCode",component:"aw-block-code",parameters:{layout:"padded",docs:{description:{component:"A code block component for displaying syntax-highlighted code with copy functionality and expandable modal view."}}},argTypes:{title:{control:"text",description:"Code block title"},code:{control:"text",description:"Code content to display"},language:{control:"select",options:["javascript","typescript","jsx","tsx","css","html","json","bash","python","java","cpp","csharp","php","go","rust","yaml","markdown","sql","plaintext"],description:"Programming language for syntax highlighting"},theme:{control:"select",options:["dark","light","auto"],description:"Color theme"},size:{control:"select",options:["sm","md","lg"],description:"Code block size"},enable_copy:{control:"boolean",description:"Enable copy functionality"},enable_expand:{control:"boolean",description:"Enable expand functionality"},show_line_numbers:{control:"boolean",description:"Show line numbers"},max_height:{control:"number",description:"Maximum height in pixels before showing expand button"},embed_url:{control:"text",description:"Optional iframe embed URL"},custom_class:{control:"text",description:"Custom CSS class"}}},k=`// Basic JavaScript example
function greetUser(name) {
  console.log('Hello, ' + name + '!');
  
  const message = \`Welcome to our application, \${name}\`;
  return message;
}

// Usage
const userName = 'Alice';
const welcomeMessage = greetUser(userName);
document.getElementById('output').textContent = welcomeMessage;`,ae=`// TypeScript interface example
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
}`,re=`/* Modern CSS with custom properties */
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
}`,pe=`#!/bin/bash
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

echo "Deployment completed successfully!"`,me=`{
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
}`,d={args:{title:"Basic JavaScript",code:k,language:"javascript",theme:"dark",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!1,max_height:400}},l={args:{title:"TypeScript Class Example",code:ae,language:"typescript",theme:"dark",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!0}},p={args:{title:"Modern CSS with Custom Properties",code:re,language:"css",theme:"light",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!1}},m={args:{title:"Deployment Script",code:pe,language:"bash",theme:"dark",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!0}},u={args:{title:"Package Configuration",code:me,language:"json",theme:"dark",size:"sm",enable_copy:!0,enable_expand:!0,show_line_numbers:!1}},h={args:{code:'console.log("Hello, World!");',language:"javascript",theme:"dark",size:"md",enable_copy:!1,enable_expand:!1,show_line_numbers:!1}},b={args:{title:"CodePen Embed Example",embed_url:"https://codepen.io/pen/embed/preview/abcdef?height=300&theme-id=dark&default-tab=js,result",code:"// This code is also embedded above",language:"javascript",theme:"dark",size:"md",enable_copy:!0,enable_expand:!1}},g={args:{title:"Large Code Block (Expandable)",code:`${k}

${ae}

${re}`,language:"javascript",theme:"dark",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!0,max_height:200}},y={render:()=>a`
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
  `},w={render:()=>a`
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
  `},_={args:{title:"Interactive Code Block",code:k,language:"javascript",theme:"dark",size:"md",enable_copy:!0,enable_expand:!0,show_line_numbers:!0,max_height:300},parameters:{docs:{description:{story:"Try copying the code, expanding/collapsing the view, and observe the interactions."}}}};var C,E,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(S=(E=d.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var z,j,$;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...($=(j=l.parameters)==null?void 0:j.docs)==null?void 0:$.source}}};var T,B,D;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(D=(B=p.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var L,P,U;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(U=(P=m.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var M,O,A;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(A=(O=u.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var I,R,N;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    code: 'console.log("Hello, World!");',
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: false,
    enable_expand: false,
    show_line_numbers: false
  }
}`,...(N=(R=h.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};var F,J,Y;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(Y=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Y.source}}};var W,H,K;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    title: 'Large Code Block (Expandable)',
    code: \`\${javascriptCode}\\n\\n\${typescriptCode}\\n\\n\${cssCode}\`,
    language: 'javascript',
    theme: 'dark',
    size: 'md',
    enable_copy: true,
    enable_expand: true,
    show_line_numbers: true,
    max_height: 200
  }
}`,...(K=(H=g.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var q,G,Q;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
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
  \`
}`,...(Q=(G=y.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var V,X,Z;w.parameters={...w.parameters,docs:{...(V=w.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
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
  \`
}`,...(Z=(X=w.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,oe,te;_.parameters={..._.parameters,docs:{...(ee=_.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(te=(oe=_.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};const we=["Default","TypeScript","CSS","BashScript","JSONConfig","Minimal","WithEmbed","LargeCode","AllSizes","AllThemes","Interactive"];export{y as AllSizes,w as AllThemes,m as BashScript,p as CSS,d as Default,_ as Interactive,u as JSONConfig,g as LargeCode,h as Minimal,l as TypeScript,b as WithEmbed,we as __namedExportsOrder,ye as default};
