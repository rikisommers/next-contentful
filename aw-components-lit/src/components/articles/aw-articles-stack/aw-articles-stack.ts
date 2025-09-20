import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

export interface ArticleItem {
  sys?: { id: string };
  title: string;
  subtitle?: string;
  slug: string;
  img?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    title?: string;
  };
  date?: string;
  tags?: string[];
}

export interface ScrollTransform {
  opacity: number;
  zIndex: number;
}

/**
 * A vertical stack layout component with sticky positioning and scroll-based animations.
 * Each article item sticks to the top of the viewport with animated opacity changes.
 * 
 * @element aw-articles-stack
 * 
 * @slot - Default slot for custom content
 * 
 * @fires {CustomEvent} awStackReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * 
 * @example
 * ```html
 * <aw-articles-stack 
 *   .data=${articles}
 *   sticky-offset="80px"
 *   animation-type="opacity">
 * </aw-articles-stack>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Article Title',
 *     subtitle: 'Article description',
 *     slug: 'article-slug',
 *     img: {
 *       url: 'https://example.com/image.jpg',
 *       alt: 'Article image',
 *       width: 800,
 *       height: 600
 *     }
 *   }
 * ];
 * ```
 */
@customElement('aw-articles-stack')
export class AwArticlesStack extends LitElement {
  static styles = css`
    :host {
      --aw-stack-gap: var(--aw-spacing-md, 1rem);
      --aw-stack-sticky-offset: 80px;
      --aw-stack-text-color: var(--aw-color-text, #333);
      --aw-stack-border-radius: var(--aw-border-radius-md, 8px);
      --aw-stack-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-stack-animation-duration: var(--aw-transition-duration, 0.3s);
      
      display: block;
      width: 100%;
      position: relative;
      height: auto;
      overflow: visible;
    }

    .articles-stack {
      display: block;
      width: 100%;
      position: relative;
    }

    .article-item {
      position: sticky;
      top: var(--aw-stack-sticky-offset);
      width: 100%;
      transition: opacity var(--aw-stack-animation-duration) ease,
                  transform var(--aw-stack-animation-duration) ease;
    }

    .article-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: var(--aw-stack-gap);
    }

    .article-card {
      display: flex;
      flex-direction: column;
      background: var(--aw-color-surface, white);
      border-radius: var(--aw-stack-border-radius);
      box-shadow: var(--aw-stack-shadow);
      overflow: hidden;
      width: 100%;
      max-width: 800px;
      cursor: pointer;
      transition: transform var(--aw-stack-animation-duration) ease,
                  box-shadow var(--aw-stack-animation-duration) ease;
    }

    .article-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    .article-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      display: block;
    }

    .article-info {
      padding: 1.5rem;
    }

    .article-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--aw-stack-text-color);
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
    }

    .article-subtitle {
      font-size: 1rem;
      color: var(--aw-color-text-muted, #666);
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
      color: var(--aw-color-text-light, #888);
    }

    .article-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .article-tag {
      padding: 0.25rem 0.5rem;
      background: var(--aw-color-accent-light, #e5f3ff);
      color: var(--aw-color-accent, #0066cc);
      border-radius: var(--aw-border-radius-sm, 4px);
      font-size: 0.75rem;
      font-weight: 500;
    }

    /* Animation variants */
    :host([animation-type="scale"]) .article-content {
      transform-origin: center;
    }

    :host([animation-type="fade"]) .article-item {
      transition: opacity var(--aw-stack-animation-duration) ease;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-card {
        margin: 0 1rem;
      }
      
      .article-image {
        height: 200px;
      }
      
      .article-info {
        padding: 1rem;
      }
      
      .article-title {
        font-size: 1.25rem;
      }
    }

    /* Accessibility */
    .article-card:focus {
      outline: 2px solid var(--aw-color-focus, #0066cc);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .article-card,
      .article-item,
      .article-content {
        transition: none;
      }
    }
  `;

  /**
   * Array of article items to display in the stack
   */
  @property({ type: Array })
  data: ArticleItem[] = [];

  /**
   * Sticky offset from top of viewport
   */
  @property({ type: String, attribute: 'sticky-offset' })
  stickyOffset = '80px';

  /**
   * Animation type for scroll effects
   */
  @property({ type: String, attribute: 'animation-type' })
  animationType: 'opacity' | 'scale' | 'fade' = 'opacity';

  /**
   * Enable hover effects
   */
  @property({ type: Boolean, attribute: 'hover-effects' })
  hoverEffects = true;

  @state()
  private intersectionObserver?: IntersectionObserver;

  @state()
  private scrollTransforms: Map<string, ScrollTransform> = new Map();

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setupScrollObserver();
      this.dispatchEvent(new CustomEvent('awStackReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupScrollObserver();
  }

  updated(changedProperties: any) {
    if (changedProperties.has('stickyOffset')) {
      this.style.setProperty('--aw-stack-sticky-offset', this.stickyOffset);
    }
  }

  private setupScrollObserver() {
    if (typeof window === 'undefined') return;

    const options = {
      root: null,
      rootMargin: '-80px 0px',
      threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-id');
        if (!id) return;

        const rect = entry.boundingClientRect;
        const viewport = window.innerHeight;
        
        // Calculate scroll progress (0 = entering, 1 = exiting)
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / (viewport * 0.8))));
        
        // Transform opacity (1 when entering, 0.2 when exiting)
        const opacity = Math.max(0.2, 1 - progress * 0.8);
        
        // Calculate z-index based on scroll position
        const totalItems = this.data.length;
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        const zIndex = progress > 0 ? -index : totalItems - index;

        this.scrollTransforms.set(id, { opacity, zIndex });
        this.requestUpdate();
      });
    }, options);

    // Observe all article items
    this.shadowRoot?.querySelectorAll('.article-item').forEach((item) => {
      this.intersectionObserver?.observe(item);
    });
  }

  private cleanupScrollObserver() {
    this.intersectionObserver?.disconnect();
  }

  private handleArticleClick(item: ArticleItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  private getArticleStyles(item: ArticleItem, index: number): Record<string, string> {
    const id = item.sys?.id || index.toString();
    const transform = this.scrollTransforms.get(id);
    
    return {
      opacity: transform?.opacity?.toString() || '1',
      zIndex: transform?.zIndex?.toString() || (this.data.length - index).toString()
    };
  }

  render() {
    return html`
      <div class="articles-stack">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item, index) => html`
            <div 
              class="article-item"
              data-id="${item.sys?.id || index}"
              data-index="${index}"
              style=${styleMap(this.getArticleStyles(item, index))}
            >
              <div class="article-content">
                <article 
                  class="article-card"
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
                  ${item.img?.url ? html`
                    <img 
                      class="article-image"
                      src="${item.img.url}"
                      alt="${item.img.alt || item.img.title || item.title}"
                      loading="lazy"
                      width="${item.img.width || 800}"
                      height="${item.img.height || 600}"
                    />
                  ` : ''}
                  
                  <div class="article-info">
                    <h2 class="article-title">${item.title}</h2>
                    ${item.subtitle ? html`
                      <p class="article-subtitle">${item.subtitle}</p>
                    ` : ''}
                    
                    <div class="article-meta">
                      ${item.date ? html`<span class="article-date">${item.date}</span>` : ''}
                      ${item.tags?.length ? html`
                        <div class="article-tags">
                          ${item.tags.map(tag => html`
                            <span class="article-tag">${tag}</span>
                          `)}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-articles-stack': AwArticlesStack;
  }
}