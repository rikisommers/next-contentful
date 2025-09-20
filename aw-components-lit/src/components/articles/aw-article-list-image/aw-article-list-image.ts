import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

export interface ImageArticleItem {
  sys?: { id: string };
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  img: {
    url: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
  };
  tags?: string[];
  category?: string;
}

/**
 * A vertical article list layout with prominent image display.
 * Combines text content with featured images in an elegant card layout.
 * Perfect for blog posts, news articles, or image-rich content.
 * 
 * @element aw-article-list-image
 * 
 * @slot - Default slot for custom content
 * 
 * @fires {CustomEvent} awListReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * @fires {CustomEvent} awImageClick - Dispatched when an image is clicked
 * 
 * @example
 * ```html
 * <aw-article-list-image 
 *   .data=${articles}
 *   image-position="left"
 *   layout="cards"
 *   gap="large">
 * </aw-article-list-image>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Design System Best Practices',
 *     subtitle: 'Building scalable component libraries',
 *     slug: 'design-system-practices',
 *     img: {
 *       url: 'https://example.com/image.jpg',
 *       alt: 'Design system components',
 *       width: 800,
 *       height: 600
 *     },
 *     date: '2024-01-15',
 *     readTime: '8 min read',
 *     tags: ['Design', 'Development']
 *   }
 * ];
 * ```
 */
@customElement('aw-article-list-image')
export class AwArticleListImage extends LitElement {
  static styles = css`
    :host {
      --aw-image-list-gap: var(--aw-spacing-md, 1rem);
      --aw-image-list-text-color: var(--aw-color-text, #333);
      --aw-image-list-text-muted: var(--aw-color-text-muted, #666);
      --aw-image-list-text-light: var(--aw-color-text-light, #888);
      --aw-image-list-bg: var(--aw-color-surface, white);
      --aw-image-list-border: var(--aw-color-border, #e5e5e5);
      --aw-image-list-hover-bg: var(--aw-color-surface-hover, #f8f9fa);
      --aw-image-list-accent: var(--aw-color-accent, #0066cc);
      --aw-image-list-border-radius: var(--aw-border-radius-lg, 12px);
      --aw-image-list-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-image-list-transition: var(--aw-transition-duration, 0.3s) ease;
      
      display: block;
      width: 100%;
      padding: var(--aw-spacing-lg, 1.5rem) 0;
    }

    .article-list {
      display: flex;
      flex-direction: column;
      gap: var(--aw-image-list-gap);
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 var(--aw-spacing-lg, 1.5rem);
    }

    .article-item {
      display: flex;
      background: var(--aw-image-list-bg);
      border-radius: var(--aw-image-list-border-radius);
      overflow: hidden;
      cursor: pointer;
      transition: all var(--aw-image-list-transition);
      border: 1px solid transparent;
      position: relative;
    }

    .article-item:hover {
      background: var(--aw-image-list-hover-bg);
      border-color: var(--aw-image-list-border);
      box-shadow: var(--aw-image-list-shadow);
      transform: translateY(-2px);
    }

    .article-item:focus {
      outline: 2px solid var(--aw-image-list-accent);
      outline-offset: 2px;
    }

    .article-image-container {
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      background: var(--aw-color-surface-muted, #f5f5f5);
    }

    .article-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--aw-image-list-transition);
      display: block;
    }

    .article-item:hover .article-image {
      transform: scale(1.05);
    }

    .article-content {
      flex: 1;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 200px;
    }

    .article-header {
      margin-bottom: 1rem;
    }

    .article-category {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--aw-color-accent-light, #e5f3ff);
      color: var(--aw-image-list-accent);
      border-radius: var(--aw-border-radius-full, 9999px);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .article-title {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: var(--aw-image-list-text-color);
      margin: 0 0 0.5rem 0;
      transition: color var(--aw-image-list-transition);
    }

    .article-item:hover .article-title {
      color: var(--aw-image-list-accent);
    }

    .article-subtitle {
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--aw-image-list-text-muted);
      margin: 0 0 1rem 0;
      line-height: 1.3;
    }

    .article-excerpt {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--aw-image-list-text-muted);
      margin: 0 0 1.5rem 0;
      flex: 1;
    }

    .article-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.875rem;
      color: var(--aw-image-list-text-light);
    }

    .article-date::before {
      content: "📅";
      margin-right: 0.25rem;
    }

    .article-read-time::before {
      content: "⏱️";
      margin-right: 0.25rem;
    }

    .article-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .article-tag {
      padding: 0.25rem 0.5rem;
      background: transparent;
      color: var(--aw-image-list-text-light);
      border: 1px solid var(--aw-image-list-border);
      border-radius: var(--aw-border-radius-sm, 4px);
      font-size: 0.75rem;
      font-weight: 500;
      transition: all var(--aw-image-list-transition);
    }

    .article-item:hover .article-tag {
      background: var(--aw-image-list-accent);
      color: white;
      border-color: var(--aw-image-list-accent);
    }

    /* Image position variants */
    :host([image-position="left"]) .article-image-container {
      width: 300px;
      height: auto;
      min-height: 200px;
    }

    :host([image-position="right"]) .article-item {
      flex-direction: row-reverse;
    }

    :host([image-position="right"]) .article-image-container {
      width: 300px;
      height: auto;
      min-height: 200px;
    }

    :host([image-position="top"]) .article-item {
      flex-direction: column;
    }

    :host([image-position="top"]) .article-image-container {
      width: 100%;
      height: 250px;
    }

    /* Layout variants */
    :host([layout="cards"]) .article-item {
      background: var(--aw-image-list-bg);
      border: 1px solid var(--aw-image-list-border);
      box-shadow: var(--aw-shadow-sm, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
    }

    :host([layout="minimal"]) .article-item {
      background: transparent;
      border-radius: 0;
      border-bottom: 1px solid var(--aw-image-list-border);
    }

    :host([layout="minimal"]) .article-item:hover {
      background: transparent;
      box-shadow: none;
      transform: none;
    }

    /* Gap variants */
    :host([gap="small"]) {
      --aw-image-list-gap: 0.5rem;
    }

    :host([gap="large"]) {
      --aw-image-list-gap: 2rem;
    }

    :host([gap="extra-large"]) {
      --aw-image-list-gap: 3rem;
    }

    /* Compact variant */
    :host([compact]) .article-content {
      padding: 1.5rem;
      min-height: 150px;
    }

    :host([compact]) .article-image-container {
      width: 200px;
      min-height: 150px;
    }

    :host([compact]) .article-title {
      font-size: 1.25rem;
    }

    :host([compact]) .article-subtitle {
      font-size: 1rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-list {
        padding: 0 1rem;
      }

      .article-item {
        flex-direction: column;
      }

      .article-image-container {
        width: 100% !important;
        height: 200px !important;
        min-height: 200px !important;
      }

      .article-content {
        padding: 1.5rem;
        min-height: auto;
      }

      .article-title {
        font-size: 1.25rem;
      }

      .article-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .article-item,
      .article-image,
      .article-title,
      .article-tag {
        transition: none;
      }
      
      .article-item:hover {
        transform: none;
      }
      
      .article-item:hover .article-image {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-image-list-hover-bg: rgba(255, 255, 255, 0.05);
        --aw-image-list-border: rgba(255, 255, 255, 0.1);
      }
    }
  `;

  /**
   * Array of article items to display
   */
  @property({ type: Array })
  data: ImageArticleItem[] = [];

  /**
   * Position of the image relative to content
   */
  @property({ type: String, attribute: 'image-position' })
  imagePosition: 'left' | 'right' | 'top' = 'left';

  /**
   * Layout style variant
   */
  @property({ type: String })
  layout: 'default' | 'cards' | 'minimal' = 'default';

  /**
   * Gap size between articles
   */
  @property({ type: String })
  gap: 'small' | 'medium' | 'large' | 'extra-large' = 'medium';

  /**
   * Compact layout with smaller dimensions
   */
  @property({ type: Boolean })
  compact = false;

  /**
   * Show article excerpts
   */
  @property({ type: Boolean, attribute: 'show-excerpts' })
  showExcerpts = false;

  /**
   * Show article categories
   */
  @property({ type: Boolean, attribute: 'show-categories' })
  showCategories = false;

  /**
   * Show article tags
   */
  @property({ type: Boolean, attribute: 'show-tags' })
  showTags = true;

  /**
   * Show read time
   */
  @property({ type: Boolean, attribute: 'show-read-time' })
  showReadTime = true;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awListReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  private handleArticleClick(item: ImageArticleItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  private handleImageClick(item: ImageArticleItem, event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('awImageClick', {
      detail: { 
        item,
        image: item.img,
        event 
      },
      bubbles: true
    }));
  }

  render() {
    return html`
      <div class="article-list">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item) => html`
            <article 
              class=${classMap({
                'article-item': true
              })}
              @click=${(e: Event) => this.handleArticleClick(item, e)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleArticleClick(item, e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="Read article: ${item.title}"
            >
              <div 
                class="article-image-container"
                @click=${(e: Event) => this.handleImageClick(item, e)}
              >
                <img 
                  class="article-image"
                  src="${item.img.url}"
                  alt="${item.img.alt || item.img.title || item.title}"
                  loading="lazy"
                  width="${item.img.width || 800}"
                  height="${item.img.height || 600}"
                />
              </div>
              
              <div class="article-content">
                <header class="article-header">
                  ${this.showCategories && item.category ? html`
                    <div class="article-category">${item.category}</div>
                  ` : ''}
                  
                  <h2 class="article-title">${item.title}</h2>
                  
                  ${item.subtitle ? html`
                    <p class="article-subtitle">${item.subtitle}</p>
                  ` : ''}
                </header>

                ${this.showExcerpts && item.excerpt ? html`
                  <p class="article-excerpt">${item.excerpt}</p>
                ` : ''}

                <footer class="article-footer">
                  <div class="article-meta">
                    ${item.date ? html`
                      <span class="article-date">${item.date}</span>
                    ` : ''}
                    ${this.showReadTime && item.readTime ? html`
                      <span class="article-read-time">${item.readTime}</span>
                    ` : ''}
                  </div>
                  
                  ${this.showTags && item.tags?.length ? html`
                    <div class="article-tags">
                      ${item.tags.map(tag => html`
                        <span class="article-tag">${tag}</span>
                      `)}
                    </div>
                  ` : ''}
                </footer>
              </div>
            </article>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-article-list-image': AwArticleListImage;
  }
}