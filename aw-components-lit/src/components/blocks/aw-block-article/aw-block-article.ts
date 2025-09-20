import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type ArticleAlign = 'center' | 'left' | 'split';
export type ArticleSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ArticleImage {
  title: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface RichTextContent {
  content: string;
  json?: any; // For future rich text integration
}

/**
 * A single article block component for displaying article content with optional images and rich text.
 * 
 * @element aw-block-article
 * 
 * @slot title - Custom title content
 * @slot content - Custom content area
 * @slot images - Custom image gallery
 * 
 * @fires {CustomEvent} awArticleReady - Dispatched when component is ready
 * @fires {CustomEvent} awImageClick - Dispatched when an image is clicked
 * 
 * @example
 * ```html
 * <aw-block-article 
 *   title="Introduction to Web Components"
 *   content="Web components are a powerful way to create reusable UI elements."
 *   text_align="center"
 *   text_indent="true"
 *   size="lg">
 * </aw-block-article>
 * ```
 */
@customElement('aw-block-article')
export class AwBlockArticle extends LitElement {
  static styles = css`
    :host {
      --aw-article-text: var(--aw-color-text, #333);
      --aw-article-text-muted: var(--aw-color-text-light, #666);
      --aw-article-spacing: var(--aw-spacing-lg, 2rem);
      --aw-article-gap: var(--aw-spacing-md, 1rem);
      --aw-article-border-radius: var(--aw-border-radius-md, 8px);
      --aw-article-line-height: 1.6;
      --aw-article-max-width: 65ch;
      
      display: block;
      width: 100%;
    }

    .article-block {
      color: var(--aw-article-text);
      line-height: var(--aw-article-line-height);
    }

    .article-content {
      margin-bottom: var(--aw-article-spacing);
    }

    /* Alignment variants */
    .article-block--center {
      margin: 0 auto;
      max-width: var(--aw-article-max-width);
    }

    .article-block--left {
      max-width: var(--aw-article-max-width);
    }

    .article-block--split {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--aw-article-spacing);
      max-width: none;
    }

    .article-title {
      margin-bottom: var(--aw-article-gap);
      font-size: 0.875rem;
      font-weight: normal;
      color: var(--aw-article-text-muted);
    }

    .article-text {
      margin-bottom: calc(var(--aw-article-spacing) / 2);
      font-size: 1rem;
      line-height: var(--aw-article-line-height);
      color: var(--aw-article-text-muted);
    }

    .article-text--indent {
      text-indent: 3rem;
    }

    .article-rich-content {
      color: var(--aw-article-text);
      line-height: var(--aw-article-line-height);
    }

    .article-rich-content--indent :first-child {
      text-indent: 3rem;
    }

    /* Size variants */
    .article-block--sm {
      font-size: 0.875rem;
    }

    .article-block--sm .article-title {
      font-size: 0.75rem;
    }

    .article-block--md {
      font-size: 1rem;
    }

    .article-block--lg {
      font-size: 1.125rem;
    }

    .article-block--lg .article-title {
      font-size: 1rem;
    }

    .article-block--xl {
      font-size: 1.25rem;
    }

    .article-block--xl .article-title {
      font-size: 1.125rem;
    }

    /* Image gallery */
    .article-images {
      margin-top: var(--aw-article-spacing);
      display: flex;
      flex-direction: column;
      gap: var(--aw-article-gap);
    }

    .article-image {
      width: 100%;
      height: auto;
      border-radius: var(--aw-article-border-radius);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .article-image:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .article-image:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    /* Rich text content styling */
    .article-rich-content h1,
    .article-rich-content h2,
    .article-rich-content h3,
    .article-rich-content h4,
    .article-rich-content h5,
    .article-rich-content h6 {
      color: var(--aw-article-text);
      line-height: 1.4;
      margin: 1.5em 0 0.5em 0;
    }

    .article-rich-content h1:first-child,
    .article-rich-content h2:first-child,
    .article-rich-content h3:first-child,
    .article-rich-content h4:first-child,
    .article-rich-content h5:first-child,
    .article-rich-content h6:first-child {
      margin-top: 0;
    }

    .article-rich-content p {
      margin: 0 0 1em 0;
      line-height: var(--aw-article-line-height);
    }

    .article-rich-content ul,
    .article-rich-content ol {
      margin: 1em 0;
      padding-left: 2em;
    }

    .article-rich-content li {
      margin: 0.5em 0;
    }

    .article-rich-content blockquote {
      margin: 1.5em 0;
      padding: 1em 1.5em;
      border-left: 4px solid var(--aw-color-primary, #007bff);
      background-color: var(--aw-color-surface-light, #f8f9fa);
      font-style: italic;
    }

    .article-rich-content code {
      background-color: var(--aw-color-surface-light, #f8f9fa);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
    }

    .article-rich-content pre {
      background-color: var(--aw-color-surface-light, #f8f9fa);
      padding: 1em;
      border-radius: var(--aw-article-border-radius);
      overflow-x: auto;
      margin: 1em 0;
    }

    .article-rich-content pre code {
      background: none;
      padding: 0;
    }

    .article-rich-content a {
      color: var(--aw-color-primary, #007bff);
      text-decoration: underline;
    }

    .article-rich-content a:hover {
      text-decoration: none;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-block--split {
        grid-template-columns: 1fr;
        gap: var(--aw-article-gap);
      }

      .article-text--indent {
        text-indent: 1.5rem;
      }

      .article-rich-content--indent :first-child {
        text-indent: 1.5rem;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .article-title {
        color: var(--aw-article-text);
        font-weight: bold;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .article-image {
        transition: none;
      }

      .article-image:hover {
        transform: none;
      }
    }

    /* Focus management */
    .article-block:focus-within {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
      border-radius: var(--aw-article-border-radius);
    }
  `;

  /**
   * Article title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * Plain text content
   */
  @property({ type: String }) 
  content: string = '';

  /**
   * Rich text content (HTML)
   */
  @property({ type: String }) 
  rich_content: string = '';

  /**
   * Array of image objects
   */
  @property({ type: Array }) 
  images: ArticleImage[] = [];

  /**
   * Text alignment
   */
  @property({ type: String }) 
  text_align: ArticleAlign = 'center';

  /**
   * Whether to indent the first paragraph
   */
  @property({ type: Boolean }) 
  text_indent: boolean = false;

  /**
   * Article size variant
   */
  @property({ type: String }) 
  size: ArticleSize = 'md';

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  /**
   * Article ID for anchor links
   */
  @property({ type: String }) 
  article_id: string = '';

  connectedCallback() {
    super.connectedCallback();
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awArticleReady', {
      detail: {
        title: this.title,
        content: this.content,
        rich_content: this.rich_content,
        images: this.images
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleImageClick(image: ArticleImage, event: MouseEvent) {
    const clickEvent = new CustomEvent('awImageClick', {
      detail: {
        image,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleImageKeyPress(image: ArticleImage, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleImageClick(image, event as any);
    }
  }

  render() {
    const classes = [
      'article-block',
      `article-block--${this.text_align}`,
      `article-block--${this.size}`,
      this.custom_class
    ].filter(Boolean).join(' ');

    const textClasses = [
      'article-text',
      this.text_indent ? 'article-text--indent' : ''
    ].filter(Boolean).join(' ');

    const richContentClasses = [
      'article-rich-content',
      this.text_indent ? 'article-rich-content--indent' : ''
    ].filter(Boolean).join(' ');

    return html`
      <article 
        class=${classes}
        id=${this.article_id || this.title}
      >
        <div class="article-content">
          ${this.title ? html`
            <h2 class="article-title">
              <slot name="title">${this.title}</slot>
            </h2>
          ` : ''}

          ${this.content ? html`
            <p class=${textClasses}>
              <slot name="content">${this.content}</slot>
            </p>
          ` : ''}

          ${this.rich_content ? html`
            <div class=${richContentClasses}>
              ${unsafeHTML(this.rich_content)}
            </div>
          ` : ''}
        </div>

        ${this.images && this.images.length > 0 ? html`
          <div class="article-images">
            <slot name="images">
              ${this.images.map((image, index) => html`
                <img
                  class="article-image"
                  src=${image.url}
                  alt=${image.alt || `Cover Image for ${image.title}`}
                  width=${image.width || 2000}
                  height=${image.height || 1000}
                  tabindex="0"
                  @click=${(e: MouseEvent) => this._handleImageClick(image, e)}
                  @keydown=${(e: KeyboardEvent) => this._handleImageKeyPress(image, e)}
                />
              `)}
            </slot>
          </div>
        ` : ''}
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-article': AwBlockArticle;
  }
}