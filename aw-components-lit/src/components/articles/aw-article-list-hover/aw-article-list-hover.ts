import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export interface HoverArticleItem {
  sys?: { id: string };
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  date?: string;
  img?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  tags?: string[];
}

/**
 * A vertical article list with interactive hover effects and custom cursor integration.
 * Optimized for project showcases, portfolios, or interactive galleries.
 * Shows preview images on hover and provides rich interactive feedback.
 * 
 * @element aw-article-list-hover
 * 
 * @slot - Default slot for custom content
 * 
 * @fires {CustomEvent} awListReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * @fires {CustomEvent} awArticleHover - Dispatched when an article is hovered
 * @fires {CustomEvent} awArticleLeave - Dispatched when hover leaves an article
 * 
 * @example
 * ```html
 * <aw-article-list-hover 
 *   .data=${articles}
 *   show-cursor-image="true"
 *   hover-animation="scale">
 * </aw-article-list-hover>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Creative Portfolio',
 *     subtitle: 'Interactive design showcase',
 *     slug: 'creative-portfolio',
 *     img: {
 *       url: 'https://example.com/image.jpg',
 *       alt: 'Portfolio preview',
 *       width: 800,
 *       height: 600
 *     },
 *     tags: ['Design', 'Interactive']
 *   }
 * ];
 * ```
 */
@customElement('aw-article-list-hover')
export class AwArticleListHover extends LitElement {
  static styles = css`
    :host {
      --aw-hover-text-color: var(--aw-color-text, #333);
      --aw-hover-text-muted: var(--aw-color-text-muted, #666);
      --aw-hover-text-light: var(--aw-color-text-light, #888);
      --aw-hover-accent: var(--aw-color-accent, #0066cc);
      --aw-hover-bg: var(--aw-color-surface, white);
      --aw-hover-bg-hover: var(--aw-color-surface-hover, #f8f9fa);
      --aw-hover-border: var(--aw-color-border, #e5e5e5);
      --aw-hover-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-hover-border-radius: var(--aw-border-radius-lg, 12px);
      --aw-hover-transition: var(--aw-transition-duration, 0.3s) ease;
      --aw-hover-gap: var(--aw-spacing-lg, 1.5rem);
      
      display: block;
      width: 100%;
      position: relative;
    }

    .article-list {
      display: grid;
      grid-auto-rows: 1fr;
      gap: var(--aw-hover-gap);
      width: 100%;
    }

    .article-item {
      position: relative;
      background: var(--aw-hover-bg);
      border: 1px solid var(--aw-hover-border);
      border-radius: var(--aw-hover-border-radius);
      padding: 2rem;
      cursor: pointer;
      transition: all var(--aw-hover-transition);
      overflow: hidden;
    }

    .article-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        var(--aw-hover-accent) 0%, 
        transparent 50%);
      opacity: 0;
      transition: opacity var(--aw-hover-transition);
      z-index: 1;
    }

    .article-item:hover::before {
      opacity: 0.05;
    }

    .article-item:hover {
      background: var(--aw-hover-bg-hover);
      border-color: var(--aw-hover-accent);
      box-shadow: var(--aw-hover-shadow);
      transform: translateY(-4px);
    }

    .article-item:focus {
      outline: 2px solid var(--aw-hover-accent);
      outline-offset: 2px;
    }

    .article-content {
      position: relative;
      z-index: 2;
    }

    .article-header {
      margin-bottom: 1rem;
    }

    .article-title {
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.1;
      color: var(--aw-hover-text-color);
      margin: 0 0 0.5rem 0;
      transition: all var(--aw-hover-transition);
      background: linear-gradient(135deg, 
        var(--aw-hover-text-color) 0%, 
        var(--aw-hover-text-color) 50%,
        var(--aw-hover-accent) 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
    }

    .article-item:hover .article-title {
      background-position: 100% 0;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .article-subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--aw-hover-text-muted);
      margin: 0 0 1rem 0;
      line-height: 1.3;
      transition: color var(--aw-hover-transition);
    }

    .article-item:hover .article-subtitle {
      color: var(--aw-hover-accent);
    }

    .article-excerpt {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--aw-hover-text-muted);
      margin: 0 0 1.5rem 0;
      opacity: 0.8;
      transition: opacity var(--aw-hover-transition);
    }

    .article-item:hover .article-excerpt {
      opacity: 1;
    }

    .article-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
    }

    .article-date {
      font-size: 0.875rem;
      color: var(--aw-hover-text-light);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .article-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .article-tag {
      padding: 0.25rem 0.75rem;
      background: transparent;
      color: var(--aw-hover-text-light);
      border: 1px solid var(--aw-hover-border);
      border-radius: var(--aw-border-radius-full, 9999px);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all var(--aw-hover-transition);
    }

    .article-item:hover .article-tag {
      background: var(--aw-hover-accent);
      color: white;
      border-color: var(--aw-hover-accent);
      transform: translateY(-2px);
    }

    /* Cursor image overlay */
    .cursor-image-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 200px;
      height: 150px;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity var(--aw-hover-transition);
      border-radius: var(--aw-hover-border-radius);
      overflow: hidden;
      box-shadow: var(--aw-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
    }

    .cursor-image-overlay.visible {
      opacity: 1;
    }

    .cursor-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Animation variants */
    :host([hover-animation="scale"]) .article-item:hover {
      transform: scale(1.02);
    }

    :host([hover-animation="lift"]) .article-item:hover {
      transform: translateY(-8px);
    }

    :host([hover-animation="tilt"]) .article-item:hover {
      transform: perspective(1000px) rotateY(2deg) rotateX(2deg);
    }

    /* Layout variants */
    :host([layout="compact"]) .article-item {
      padding: 1.5rem;
    }

    :host([layout="spacious"]) .article-item {
      padding: 3rem;
    }

    :host([layout="minimal"]) .article-item {
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--aw-hover-border);
      border-radius: 0;
      padding: 2rem 0;
    }

    :host([layout="minimal"]) .article-item:hover {
      background: transparent;
      border-color: var(--aw-hover-accent);
      box-shadow: none;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-item {
        padding: 1.5rem;
      }
      
      .article-title {
        font-size: 1.75rem;
      }
      
      .article-subtitle {
        font-size: 1.125rem;
      }
      
      .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
      
      .cursor-image-overlay {
        display: none;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .article-item,
      .article-title,
      .article-tag,
      .cursor-image-overlay {
        transition: none;
      }
      
      .article-item:hover {
        transform: none;
      }
      
      .article-item:hover .article-tag {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-hover-bg-hover: rgba(255, 255, 255, 0.05);
        --aw-hover-border: rgba(255, 255, 255, 0.1);
      }
    }
  `;

  /**
   * Array of article items to display
   */
  @property({ type: Array })
  data: HoverArticleItem[] = [];

  /**
   * Show cursor image on hover
   */
  @property({ type: Boolean, attribute: 'show-cursor-image' })
  showCursorImage = true;

  /**
   * Hover animation type
   */
  @property({ type: String, attribute: 'hover-animation' })
  hoverAnimation: 'scale' | 'lift' | 'tilt' | 'none' = 'lift';

  /**
   * Layout variant
   */
  @property({ type: String })
  layout: 'default' | 'compact' | 'spacious' | 'minimal' = 'default';

  /**
   * Show article excerpts
   */
  @property({ type: Boolean, attribute: 'show-excerpts' })
  showExcerpts = false;

  @state()
  private hoveredItem: HoverArticleItem | null = null;

  @state()
  private cursorPosition = { x: 0, y: 0 };

  connectedCallback() {
    super.connectedCallback();
    if (this.showCursorImage) {
      document.addEventListener('mousemove', this.handleMouseMove);
    }
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awListReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.showCursorImage) {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.cursorPosition = { x: e.clientX, y: e.clientY };
    this.requestUpdate();
  };

  private handleArticleHover(item: HoverArticleItem, event: Event) {
    this.hoveredItem = item;
    this.dispatchEvent(new CustomEvent('awArticleHover', {
      detail: { 
        item, 
        event 
      },
      bubbles: true
    }));
  }

  private handleArticleLeave(item: HoverArticleItem, event: Event) {
    this.hoveredItem = null;
    this.dispatchEvent(new CustomEvent('awArticleLeave', {
      detail: { 
        item, 
        event 
      },
      bubbles: true
    }));
  }

  private handleArticleClick(item: HoverArticleItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  private getCursorImageStyles() {
    return {
      transform: `translate(${this.cursorPosition.x + 20}px, ${this.cursorPosition.y + 20}px)`
    };
  }

  render() {
    return html`
      ${this.showCursorImage && this.hoveredItem?.img?.url ? html`
        <div 
          class=${classMap({
            'cursor-image-overlay': true,
            'visible': !!this.hoveredItem
          })}
          style=${styleMap(this.getCursorImageStyles())}
        >
          <img 
            class="cursor-image"
            src="${this.hoveredItem.img.url}"
            alt="${this.hoveredItem.img.alt || this.hoveredItem.title}"
            loading="lazy"
          />
        </div>
      ` : ''}

      <div class="article-list">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item) => html`
            <article 
              class="article-item"
              @mouseenter=${(e: Event) => this.handleArticleHover(item, e)}
              @mouseleave=${(e: Event) => this.handleArticleLeave(item, e)}
              @click=${(e: Event) => this.handleArticleClick(item, e)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleArticleClick(item, e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="View project: ${item.title}"
            >
              <div class="article-content">
                <header class="article-header">
                  <h2 class="article-title">${item.title}</h2>
                  ${item.subtitle ? html`
                    <p class="article-subtitle">${item.subtitle}</p>
                  ` : ''}
                </header>

                ${this.showExcerpts && item.excerpt ? html`
                  <p class="article-excerpt">${item.excerpt}</p>
                ` : ''}

                <footer class="article-meta">
                  ${item.date ? html`
                    <span class="article-date">${item.date}</span>
                  ` : ''}
                  
                  ${item.tags?.length ? html`
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
    'aw-article-list-hover': AwArticleListHover;
  }
}