import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type CodeLanguage = 
  | 'javascript' 
  | 'typescript' 
  | 'jsx' 
  | 'tsx' 
  | 'css' 
  | 'html' 
  | 'json' 
  | 'bash' 
  | 'python' 
  | 'java' 
  | 'cpp' 
  | 'csharp' 
  | 'php' 
  | 'go' 
  | 'rust' 
  | 'yaml' 
  | 'markdown' 
  | 'sql' 
  | 'plaintext';

export type CodeTheme = 'dark' | 'light' | 'auto';
export type CodeSize = 'sm' | 'md' | 'lg';

/**
 * A code block component for displaying syntax-highlighted code with copy functionality and expandable modal view.
 * 
 * @element aw-block-code
 * 
 * @slot title - Custom title content
 * @slot code - Custom code content
 * @slot actions - Custom action buttons
 * 
 * @fires {CustomEvent} awCodeCopy - Dispatched when code is copied
 * @fires {CustomEvent} awCodeExpand - Dispatched when code is expanded
 * @fires {CustomEvent} awCodeCollapse - Dispatched when code is collapsed
 * 
 * @example
 * ```html
 * <aw-block-code 
 *   title="Basic JavaScript"
 *   code="console.log('Hello World');"
 *   language="javascript"
 *   theme="dark"
 *   enable_copy="true"
 *   enable_expand="true">
 * </aw-block-code>
 * ```
 */
@customElement('aw-block-code')
export class AwBlockCode extends LitElement {
  static styles = css`
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
  `;

  @query('.code-code')
  private _codeElement?: HTMLElement;

  /**
   * Code title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * Code content
   */
  @property({ type: String }) 
  code: string = '';

  /**
   * Programming language for syntax highlighting
   */
  @property({ type: String }) 
  language: CodeLanguage = 'javascript';

  /**
   * Theme variant
   */
  @property({ type: String }) 
  theme: CodeTheme = 'dark';

  /**
   * Size variant
   */
  @property({ type: String }) 
  size: CodeSize = 'md';

  /**
   * Enable copy functionality
   */
  @property({ type: Boolean }) 
  enable_copy: boolean = true;

  /**
   * Enable expand functionality
   */
  @property({ type: Boolean }) 
  enable_expand: boolean = true;

  /**
   * Show line numbers
   */
  @property({ type: Boolean }) 
  show_line_numbers: boolean = false;

  /**
   * Maximum height before showing expand button (in pixels)
   */
  @property({ type: Number }) 
  max_height: number = 400;

  /**
   * Embed URL for iframe (optional)
   */
  @property({ type: String }) 
  embed_url: string = '';

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  @state()
  private _isExpanded: boolean = false;

  @state()
  private _showCopyFeedback: boolean = false;

  @state()
  private _copyButtonText: string = 'Copy';

  connectedCallback() {
    super.connectedCallback();
    
    // Handle escape key for expanded view
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleEscapeKey);
    
    // Clean up body scroll lock
    if (this._isExpanded) {
      document.body.style.overflow = 'unset';
    }
  }

  private _handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && this._isExpanded) {
      this._handleCollapse();
    }
  }

  private async _handleCopy() {
    if (!this.code || !this.enable_copy) return;

    try {
      await navigator.clipboard.writeText(this.code);
      
      this._copyButtonText = 'Copied!';
      this._showCopyFeedback = true;
      
      // Reset after delay
      setTimeout(() => {
        this._copyButtonText = 'Copy';
        this._showCopyFeedback = false;
      }, 2000);

      // Dispatch copy event
      const copyEvent = new CustomEvent('awCodeCopy', {
        detail: {
          code: this.code,
          language: this.language
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(copyEvent);

    } catch (error) {
      console.warn('Failed to copy code to clipboard:', error);
      
      // Fallback for older browsers
      this._fallbackCopy();
    }
  }

  private _fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = this.code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this._copyButtonText = 'Copied!';
      this._showCopyFeedback = true;
      
      setTimeout(() => {
        this._copyButtonText = 'Copy';
        this._showCopyFeedback = false;
      }, 2000);
    } catch (error) {
      console.warn('Fallback copy also failed:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private _handleExpand() {
    if (!this.enable_expand) return;
    
    this._isExpanded = true;
    document.body.style.overflow = 'hidden';
    
    // Dispatch expand event
    const expandEvent = new CustomEvent('awCodeExpand', {
      detail: {
        code: this.code,
        language: this.language
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(expandEvent);
  }

  private _handleCollapse() {
    this._isExpanded = false;
    document.body.style.overflow = 'unset';
    
    // Dispatch collapse event
    const collapseEvent = new CustomEvent('awCodeCollapse', {
      detail: {
        code: this.code,
        language: this.language
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(collapseEvent);
  }

  private _generateLineNumbers(): string[] {
    if (!this.show_line_numbers || !this.code) return [];
    
    const lines = this.code.split('\n');
    return lines.map((_, index) => (index + 1).toString());
  }

  private _getThemeClass(): string {
    if (this.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.theme;
  }

  render() {
    const classes = [
      'code-block',
      `code-block--${this._getThemeClass()}`,
      `code-block--${this.size}`,
      this._isExpanded ? 'code-block--expanded' : '',
      this.custom_class
    ].filter(Boolean).join(' ');

    const codeClasses = [
      'code-pre',
      this.show_line_numbers ? 'code-pre--with-line-numbers' : '',
      `language-${this.language}`
    ].filter(Boolean).join(' ');

    const lineNumbers = this._generateLineNumbers();

    return html`
      ${this.embed_url ? html`
        <iframe 
          src=${this.embed_url}
          style="width: 100%; height: 300px; border: none; border-radius: var(--aw-code-radius);"
          loading="lazy">
        </iframe>
      ` : ''}
      
      <div class=${classes}>
        ${this.title || this.enable_copy || this.enable_expand ? html`
          <div class="code-header">
            ${this.title ? html`
              <h3 class="code-title">
                <slot name="title">${this.title}</slot>
              </h3>
            ` : html`<div></div>`}
            
            <div class="code-actions">
              <slot name="actions">
                ${this.enable_expand ? html`
                  <button
                    class="code-button"
                    @click=${this._isExpanded ? this._handleCollapse : this._handleExpand}
                    aria-label=${this._isExpanded ? 'Collapse code view' : 'Expand code view'}
                  >
                    ${this._isExpanded ? '↙ Collapse' : '↗ Expand'}
                  </button>
                ` : ''}
                
                ${this.enable_copy ? html`
                  <button
                    class="code-button ${this._showCopyFeedback ? 'code-button--success' : ''}"
                    @click=${this._handleCopy}
                    aria-label="Copy code to clipboard"
                  >
                    📋 ${this._copyButtonText}
                  </button>
                ` : ''}
              </slot>
            </div>
          </div>
        ` : ''}
        
        <div 
          class="code-content" 
          style=${this.max_height && !this._isExpanded ? `max-height: ${this.max_height}px` : ''}
        >
          ${this.show_line_numbers ? html`
            <div class="code-line-numbers">
              ${lineNumbers.map(num => html`<div>${num}</div>`)}
            </div>
          ` : ''}
          
          <pre class=${codeClasses}>
            <code class="code-code language-${this.language}">
              <slot name="code">${this.code}</slot>
            </code>
          </pre>
        </div>
        
        <div class="copy-feedback ${this._showCopyFeedback ? 'copy-feedback--visible' : ''}">
          Copied to clipboard!
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-code': AwBlockCode;
  }
}