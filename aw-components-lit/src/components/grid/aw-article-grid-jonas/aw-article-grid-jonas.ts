import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

export interface JonasGridItem {
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

export type JonasCardLayout = 'formal' | 'funky' | 'reone' | 'monks' | 'img' | 'default';
export type JonasAnimationType = 'fadeIn' | 'slideUp' | 'scaleIn' | 'none';

/**
 * A gallery-style grid layout inspired by Jonas design patterns.
 * Features staggered animations, flexible card layouts, and theme-aware styling.
 * Perfect for showcasing creative work, portfolios, or featured content.
 * 
 * @element aw-article-grid-jonas
 * 
 * @slot - Default slot for custom content
 * @slot header - Header section above the grid
 * 
 * @fires {CustomEvent} awGridReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * @fires {CustomEvent} awAnimationComplete - Dispatched when grid animation completes
 * 
 * @example
 * ```html
 * <aw-article-grid-jonas 
 *   .data=${articles}
 *   card-layout="funky"
 *   animation-type="fadeIn"
 *   columns="3"
 *   gap="2rem"
 *   show-header="true">
 *   <h1 slot="header">Featured Projects</h1>
 * </aw-article-grid-jonas>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Creative Agency Site',
 *     subtitle: 'Modern web design',
 *     slug: 'creative-agency',
 *     color: '#ff6b6b',
 *     img: {
 *       url: 'https://example.com/image.jpg',
 *       width: 600,
 *       height: 400
 *     },
 *     tags: ['Web Design', 'Branding']
 *   }
 * ];
 * ```
 */
@customElement('aw-article-grid-jonas')
export class AwArticleGridJonas extends LitElement {
  static styles = css`
    :host {
      --aw-jonas-gap: var(--aw-spacing-lg, 2rem);
      --aw-jonas-columns: 3;
      --aw-jonas-text-color: var(--aw-color-text, #333);
      --aw-jonas-text-muted: var(--aw-color-text-muted, #666);
      --aw-jonas-bg: var(--aw-color-surface, white);
      --aw-jonas-border: var(--aw-color-border, #e5e5e5);
      --aw-jonas-accent: var(--aw-color-accent, #0066cc);
      --aw-jonas-border-radius: var(--aw-border-radius-lg, 12px);
      --aw-jonas-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-jonas-shadow-hover: var(--aw-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      --aw-jonas-transition: var(--aw-transition-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1);
      --aw-jonas-header-color: var(--aw-color-warning, #fbbf24);
      
      display: block;
      width: 100%;
    }

    .grid-header {
      margin-bottom: var(--aw-jonas-gap);
      padding: 0 var(--aw-jonas-gap);
    }

    .grid-header h1 {
      color: var(--aw-jonas-header-color);
      font-size: 2rem;
      font-weight: 800;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(var(--aw-jonas-columns), 1fr);
      gap: var(--aw-jonas-gap);
      padding: 0 var(--aw-jonas-gap);
      align-items: start;
    }

    .grid-item {
      position: relative;
      border-radius: var(--aw-jonas-border-radius);
      overflow: hidden;
      cursor: pointer;
      transition: all var(--aw-jonas-transition);
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }

    .grid-item.animate-in {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .grid-item:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: var(--aw-jonas-shadow-hover);
      z-index: 10;
    }

    .grid-item:focus {
      outline: 2px solid var(--aw-jonas-accent);
      outline-offset: 4px;
    }

    /* Default card style */
    .card-default {
      background: var(--aw-jonas-bg);
      border: 1px solid var(--aw-jonas-border);
      box-shadow: var(--aw-jonas-shadow);
    }

    .card-content {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 300px;
      display: flex;
      flex-direction: column;
    }

    /* Formal card style */
    .card-formal {
      background: var(--aw-jonas-bg);
      border: 3px solid var(--aw-jonas-border);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05);
    }

    .card-formal:hover {
      border-color: var(--aw-jonas-accent);
      box-shadow: 0 0 0 1px var(--aw-jonas-accent), var(--aw-jonas-shadow-hover);
    }

    /* Funky card style */
    .card-funky {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform-origin: center;
      position: relative;
    }

    .card-funky::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
      border-radius: var(--aw-jonas-border-radius);
      z-index: -1;
      animation: gradient-shift 3s ease infinite;
    }

    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .card-funky .card-title,
    .card-funky .card-subtitle,
    .card-funky .card-date {
      color: white;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    /* Reone card style */
    .card-reone {
      background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
      border-radius: 25px;
      position: relative;
      overflow: hidden;
    }

    .card-reone::after {
      content: '';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      opacity: 0.8;
    }

    /* Monks card style */
    .card-monks {
      background: #2d3436;
      color: #ddd;
      position: relative;
      border: 2px solid #636e72;
    }

    .card-monks::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 1;
    }

    .card-monks .card-content {
      position: relative;
      z-index: 2;
    }

    .card-monks .card-title {
      color: #ffd700;
    }

    /* Image card style */
    .card-img .card-content {
      padding: 0;
    }

    .card-image {
      width: 100%;
      height: 200px;
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
      color: var(--aw-jonas-text-color);
      margin: 0 0 0.5rem 0;
      transition: color var(--aw-jonas-transition);
    }

    .grid-item:hover .card-title {
      color: var(--aw-jonas-accent);
    }

    .card-subtitle {
      font-size: 1rem;
      color: var(--aw-jonas-text-muted);
      margin: 0 0 1rem 0;
      line-height: 1.4;
      flex: 1;
    }

    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
    }

    .card-date {
      font-size: 0.875rem;
      color: var(--aw-jonas-text-muted);
      font-weight: 500;
    }

    .card-tags {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }

    .card-tag {
      padding: 0.25rem 0.5rem;
      background: var(--aw-color-accent-light, #e5f3ff);
      color: var(--aw-jonas-accent);
      border-radius: var(--aw-border-radius-sm, 4px);
      font-size: 0.75rem;
      font-weight: 600;
    }

    /* Animation types */
    :host([animation-type="slideUp"]) .grid-item {
      transform: translateY(50px);
    }

    :host([animation-type="scaleIn"]) .grid-item {
      transform: scale(0.8);
    }

    :host([animation-type="none"]) .grid-item {
      opacity: 1;
      transform: none;
    }

    /* Column responsive variants */
    :host([columns="2"]) {
      --aw-jonas-columns: 2;
    }

    :host([columns="4"]) {
      --aw-jonas-columns: 4;
    }

    :host([columns="5"]) {
      --aw-jonas-columns: 5;
    }

    /* Responsive design */
    @media (max-width: 1024px) {
      :host([columns="5"]) {
        --aw-jonas-columns: 4;
      }
      
      :host([columns="4"]) {
        --aw-jonas-columns: 3;
      }
    }

    @media (max-width: 768px) {
      :host {
        --aw-jonas-columns: 2;
        --aw-jonas-gap: 1rem;
      }

      .card-content {
        min-height: 250px;
      }

      .card-info {
        padding: 1rem;
      }

      .card-title {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      :host {
        --aw-jonas-columns: 1;
      }

      .grid-gallery {
        padding: 0 1rem;
      }

      .grid-header {
        padding: 0 1rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .grid-item,
      .card-funky::before {
        transition: none;
        animation: none;
      }
      
      .grid-item {
        opacity: 1;
        transform: none;
      }
      
      .grid-item:hover {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-jonas-bg: #1f1f1f;
        --aw-jonas-border: #333;
        --aw-jonas-text-color: #f0f0f0;
        --aw-jonas-text-muted: #aaa;
      }
    }
  `;

  /**
   * Array of items to display in the grid
   */
  @property({ type: Array })
  data: JonasGridItem[] = [];

  /**
   * Card layout style
   */
  @property({ type: String, attribute: 'card-layout' })
  cardLayout: JonasCardLayout = 'default';

  /**
   * Animation type for items
   */
  @property({ type: String, attribute: 'animation-type' })
  animationType: JonasAnimationType = 'fadeIn';

  /**
   * Number of columns
   */
  @property({ type: String })
  columns: '1' | '2' | '3' | '4' | '5' = '3';

  /**
   * Gap between items
   */
  @property({ type: String })
  gap = '2rem';

  /**
   * Show header section
   */
  @property({ type: Boolean, attribute: 'show-header' })
  showHeader = true;

  /**
   * Animation delay multiplier
   */
  @property({ type: Number, attribute: 'animation-delay' })
  animationDelay = 0.1;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setupAnimations();
      this.dispatchEvent(new CustomEvent('awGridReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  updated(changedProperties: any) {
    if (changedProperties.has('gap')) {
      this.style.setProperty('--aw-jonas-gap', this.gap);
    }
    if (changedProperties.has('data') && this.animationType !== 'none') {
      this.requestUpdate();
      this.updateComplete.then(() => this.setupAnimations());
    }
  }

  private setupAnimations() {
    if (this.animationType === 'none') return;

    const items = this.shadowRoot?.querySelectorAll('.grid-item');
    if (!items) return;

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
        
        // Dispatch animation complete event for the last item
        if (index === items.length - 1) {
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent('awAnimationComplete', {
              detail: { component: this },
              bubbles: true
            }));
          }, 400);
        }
      }, index * this.animationDelay * 1000);
    });
  }

  private handleItemClick(item: JonasGridItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  render() {
    return html`
      ${this.showHeader ? html`
        <div class="grid-header">
          <slot name="header">
            <h1>Things</h1>
          </slot>
        </div>
      ` : ''}

      <div class="grid-gallery">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item, index) => html`
            <article 
              class=${classMap({
                'grid-item': true,
                [`card-${this.cardLayout}`]: true
              })}
              @click=${(e: Event) => this.handleItemClick(item, e)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleItemClick(item, e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="View article: ${item.title}"
              style="transition-delay: ${index * this.animationDelay}s"
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
                        ${item.tags.slice(0, 3).map(tag => html`
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

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-article-grid-jonas': AwArticleGridJonas;
  }
}