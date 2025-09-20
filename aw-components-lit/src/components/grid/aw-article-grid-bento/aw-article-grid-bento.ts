import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

export interface BentoGridItem {
  sys?: { id: string };
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  date?: string;
  color?: string;
  img?: {
    url: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
  };
  tags?: string[];
  category?: string;
}

export interface BentoGridSize {
  gridColumn: string;
  gridRow: string;
}

export type CardLayout = 'formal' | 'funky' | 'reone' | 'monks' | 'img' | 'default';
export type BentoPattern = 'dynamic' | 'alternating' | 'featured' | 'uniform';

/**
 * A dynamic bento-style grid layout with intelligent sizing and theming support.
 * Creates visually interesting layouts with varying item sizes in a masonry-like grid.
 * Supports multiple card layouts and responsive design patterns.
 * 
 * @element aw-article-grid-bento
 * 
 * @slot - Default slot for custom content
 * 
 * @fires {CustomEvent} awGridReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * @fires {CustomEvent} awCardHover - Dispatched when a card is hovered
 * 
 * @example
 * ```html
 * <aw-article-grid-bento 
 *   .data=${articles}
 *   card-layout="funky"
 *   pattern="dynamic"
 *   min-column-width="250px"
 *   gap="1rem">
 * </aw-article-grid-bento>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Creative Portfolio',
 *     subtitle: 'Showcase of artistic projects',
 *     slug: 'creative-portfolio',
 *     color: '#f97316',
 *     img: {
 *       url: 'https://example.com/image.jpg',
 *       width: 800,
 *       height: 600
 *     },
 *     tags: ['Design', 'Portfolio']
 *   }
 * ];
 * ```
 */
@customElement('aw-article-grid-bento')
export class AwArticleGridBento extends LitElement {
  static styles = css`
    :host {
      --aw-bento-gap: var(--aw-spacing-md, 1rem);
      --aw-bento-min-column-width: 250px;
      --aw-bento-row-height: 200px;
      --aw-bento-text-color: var(--aw-color-text, #333);
      --aw-bento-text-muted: var(--aw-color-text-muted, #666);
      --aw-bento-bg: var(--aw-color-surface, white);
      --aw-bento-border: var(--aw-color-border, #e5e5e5);
      --aw-bento-accent: var(--aw-color-accent, #0066cc);
      --aw-bento-border-radius: var(--aw-border-radius-lg, 12px);
      --aw-bento-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-bento-shadow-hover: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --aw-bento-transition: var(--aw-transition-duration, 0.3s) ease;
      
      display: block;
      width: 100%;
    }

    .grid-bento {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--aw-bento-min-column-width), 1fr));
      grid-auto-rows: var(--aw-bento-row-height);
      gap: var(--aw-bento-gap);
      width: 100%;
      padding: var(--aw-bento-gap);
    }

    .grid-item {
      position: relative;
      border-radius: var(--aw-bento-border-radius);
      overflow: hidden;
      cursor: pointer;
      transition: all var(--aw-bento-transition);
      min-height: var(--aw-bento-row-height);
    }

    .grid-item:hover {
      transform: translateY(-4px);
      box-shadow: var(--aw-bento-shadow-hover);
      z-index: 10;
    }

    .grid-item:focus {
      outline: 2px solid var(--aw-bento-accent);
      outline-offset: 2px;
    }

    /* Default card style */
    .card-default {
      background: var(--aw-bento-bg);
      border: 1px solid var(--aw-bento-border);
      box-shadow: var(--aw-bento-shadow);
    }

    .card-content {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      background: var(--aw-bento-bg);
    }

    /* Image card style */
    .card-img .card-content {
      padding: 0;
      position: relative;
    }

    .card-image {
      width: 100%;
      height: 60%;
      object-fit: cover;
      display: block;
    }

    .card-info {
      flex: 1;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.2;
      color: var(--aw-bento-text-color);
      margin: 0 0 0.5rem 0;
    }

    .card-subtitle {
      font-size: 1rem;
      color: var(--aw-bento-text-muted);
      margin: 0 0 1rem 0;
      line-height: 1.4;
      flex: 1;
    }

    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: auto;
    }

    .card-date {
      font-size: 0.75rem;
      color: var(--aw-bento-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-tags {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }

    .card-tag {
      padding: 0.125rem 0.5rem;
      background: var(--aw-color-accent-light, #e5f3ff);
      color: var(--aw-bento-accent);
      border-radius: var(--aw-border-radius-sm, 4px);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    /* Funky card style */
    .card-funky {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: rotate(-1deg);
    }

    .card-funky:hover {
      transform: rotate(0deg) translateY(-4px);
    }

    .card-funky .card-title,
    .card-funky .card-subtitle,
    .card-funky .card-date {
      color: white;
    }

    .card-funky .card-tag {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* Formal card style */
    .card-formal {
      background: var(--aw-bento-bg);
      border: 2px solid var(--aw-bento-border);
      box-shadow: none;
    }

    .card-formal:hover {
      border-color: var(--aw-bento-accent);
      box-shadow: var(--aw-bento-shadow);
    }

    /* Reone card style */
    .card-reone {
      background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      border-radius: 20px;
    }

    .card-reone .card-title {
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Monks card style */
    .card-monks {
      background: #1a1a1a;
      color: #f0f0f0;
      position: relative;
    }

    .card-monks::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
      z-index: 1;
    }

    .card-monks .card-content {
      position: relative;
      z-index: 2;
      background: transparent;
    }

    .card-monks .card-title,
    .card-monks .card-subtitle,
    .card-monks .card-date {
      color: #f0f0f0;
    }

    /* Size patterns */
    .size-large {
      grid-column: span 2;
      grid-row: span 2;
    }

    .size-wide {
      grid-column: span 2;
      grid-row: span 1;
    }

    .size-tall {
      grid-column: span 1;
      grid-row: span 2;
    }

    .size-small {
      grid-column: span 1;
      grid-row: span 1;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      :host {
        --aw-bento-min-column-width: 200px;
        --aw-bento-row-height: 180px;
      }

      .grid-bento {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }

      .size-large,
      .size-wide {
        grid-column: span 2;
        grid-row: span 2;
      }

      .size-tall {
        grid-column: span 1;
        grid-row: span 2;
      }

      .card-content {
        padding: 1rem;
      }

      .card-info {
        padding: 1rem;
      }
    }

    @media (max-width: 480px) {
      .grid-bento {
        grid-template-columns: 1fr;
      }

      .size-large,
      .size-wide,
      .size-tall,
      .size-small {
        grid-column: span 1;
        grid-row: span 1;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .grid-item,
      .card-funky {
        transition: none;
      }
      
      .grid-item:hover,
      .card-funky:hover {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-bento-bg: #1f1f1f;
        --aw-bento-border: #333;
        --aw-bento-text-color: #f0f0f0;
        --aw-bento-text-muted: #aaa;
      }
    }
  `;

  /**
   * Array of items to display in the bento grid
   */
  @property({ type: Array })
  data: BentoGridItem[] = [];

  /**
   * Card layout style
   */
  @property({ type: String, attribute: 'card-layout' })
  cardLayout: CardLayout = 'default';

  /**
   * Bento grid pattern
   */
  @property({ type: String })
  pattern: BentoPattern = 'dynamic';

  /**
   * Minimum column width
   */
  @property({ type: String, attribute: 'min-column-width' })
  minColumnWidth = '250px';

  /**
   * Grid gap
   */
  @property({ type: String })
  gap = '1rem';

  /**
   * Show hover effects
   */
  @property({ type: Boolean, attribute: 'hover-effects' })
  hoverEffects = true;

  @state()
  private gridSizes: Map<string, BentoGridSize> = new Map();

  connectedCallback() {
    super.connectedCallback();
    this.generateGridSizes();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awGridReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  updated(changedProperties: any) {
    if (changedProperties.has('data')) {
      this.generateGridSizes();
    }
    if (changedProperties.has('minColumnWidth')) {
      this.style.setProperty('--aw-bento-min-column-width', this.minColumnWidth);
    }
    if (changedProperties.has('gap')) {
      this.style.setProperty('--aw-bento-gap', this.gap);
    }
  }

  private generateGridSizes() {
    const patterns: BentoGridSize[] = [
      { gridColumn: 'span 2', gridRow: 'span 2' }, // Large
      { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
      { gridColumn: 'span 1', gridRow: 'span 2' }, // Tall
      { gridColumn: 'span 2', gridRow: 'span 1' }, // Wide
      { gridColumn: 'span 1', gridRow: 'span 1' }, // Small
    ];

    this.gridSizes.clear();
    this.data.forEach((item, index) => {
      const id = item.sys?.id || item.slug || index.toString();
      let size: BentoGridSize;

      switch (this.pattern) {
        case 'uniform':
          size = { gridColumn: 'span 1', gridRow: 'span 1' };
          break;
        case 'featured':
          size = index === 0 
            ? { gridColumn: 'span 2', gridRow: 'span 2' }
            : { gridColumn: 'span 1', gridRow: 'span 1' };
          break;
        case 'alternating':
          size = index % 3 === 0 
            ? { gridColumn: 'span 2', gridRow: 'span 1' }
            : { gridColumn: 'span 1', gridRow: 'span 1' };
          break;
        default: // dynamic
          size = patterns[index % patterns.length];
      }

      this.gridSizes.set(id, size);
    });
  }

  private getItemSize(item: BentoGridItem, index: number): string {
    const id = item.sys?.id || item.slug || index.toString();
    const size = this.gridSizes.get(id);
    
    if (!size) return 'size-small';
    
    if (size.gridColumn === 'span 2' && size.gridRow === 'span 2') return 'size-large';
    if (size.gridColumn === 'span 2' && size.gridRow === 'span 1') return 'size-wide';
    if (size.gridColumn === 'span 1' && size.gridRow === 'span 2') return 'size-tall';
    return 'size-small';
  }

  private getCardStyles(item: BentoGridItem): Record<string, string> {
    const styles: Record<string, string> = {};
    
    if (item.color) {
      styles['--card-accent-color'] = item.color;
      styles.background = `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`;
    }
    
    return styles;
  }

  private handleItemClick(item: BentoGridItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  private handleItemHover(item: BentoGridItem, event: Event) {
    if (this.hoverEffects) {
      this.dispatchEvent(new CustomEvent('awCardHover', {
        detail: { 
          item,
          event 
        },
        bubbles: true
      }));
    }
  }

  render() {
    return html`
      <div class="grid-bento">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item, index) => html`
            <article 
              class=${classMap({
                'grid-item': true,
                [`card-${this.cardLayout}`]: true,
                [this.getItemSize(item, index)]: true
              })}
              style=${styleMap(this.getCardStyles(item))}
              @click=${(e: Event) => this.handleItemClick(item, e)}
              @mouseenter=${(e: Event) => this.handleItemHover(item, e)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleItemClick(item, e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="View article: ${item.title}"
            >
              <div class="card-content">
                ${this.cardLayout === 'img' && item.img?.url ? html`
                  <img 
                    class="card-image"
                    src="${item.img.url}"
                    alt="${item.img.alt || item.img.title || item.title}"
                    loading="lazy"
                    width="${item.img.width || 400}"
                    height="${item.img.height || 300}"
                  />
                  <div class="card-info">
                ` : html`<div class="card-info" style="height: 100%; padding: 1.5rem;">`}
                
                  <header>
                    <h2 class="card-title">${item.title}</h2>
                    ${item.subtitle ? html`
                      <p class="card-subtitle">${item.subtitle}</p>
                    ` : ''}
                  </header>

                  <footer class="card-meta">
                    ${item.date ? html`
                      <span class="card-date">${item.date}</span>
                    ` : ''}
                    
                    ${item.tags?.length ? html`
                      <div class="card-tags">
                        ${item.tags.slice(0, 2).map(tag => html`
                          <span class="card-tag">${tag}</span>
                        `)}
                      </div>
                    ` : ''}
                  </footer>
                </div>
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
    'aw-article-grid-bento': AwArticleGridBento;
  }
}