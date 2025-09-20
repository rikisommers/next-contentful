import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type PostTileVariant = 'default' | 'card' | 'overlay' | 'minimal' | 'featured';
export type PostTileSize = 'sm' | 'md' | 'lg' | 'xl';
export type PostTileLayout = 'vertical' | 'horizontal' | 'square';

/**
 * A post tile component for displaying article previews, blog posts, and content cards.
 * 
 * @element aw-post-tile
 * 
 * @slot default - The main content area
 * @slot header - Header content
 * @slot footer - Footer content
 * @slot actions - Action buttons or links
 * 
 * @fires {CustomEvent} awPostClick - Dispatched when post tile is clicked
 * @fires {CustomEvent} awImageLoad - Dispatched when image loads successfully
 * @fires {CustomEvent} awImageError - Dispatched when image fails to load
 * 
 * @example
 * ```html
 * <aw-post-tile 
 *   post_title="Getting Started with Web Components"
 *   post_excerpt="Learn how to build reusable components..."
 *   post_image="https://example.com/image.jpg"
 *   author_name="John Doe"
 *   published_date="2024-01-15"
 *   variant="card"
 *   size="lg">
 * </aw-post-tile>
 * ```
 */
@customElement('aw-post-tile')
export class AwPostTile extends LitElement {
  static styles = css`
    :host {
      --aw-post-tile-bg: var(--aw-color-surface, #fff);
      --aw-post-tile-border: var(--aw-color-border, #e5e5e5);
      --aw-post-tile-text: var(--aw-color-text, #333);
      --aw-post-tile-text-muted: var(--aw-color-text-light, #666);
      --aw-post-tile-accent: var(--aw-color-primary, #007bff);
      --aw-post-tile-shadow: var(--aw-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
      --aw-post-tile-radius: var(--aw-border-radius-md, 8px);
      --aw-post-tile-transition: var(--aw-transition-medium, 0.3s ease);
      
      display: block;
      width: 100%;
    }

    .post-tile {
      position: relative;
      background-color: var(--aw-post-tile-bg);
      color: var(--aw-post-tile-text);
      border-radius: var(--aw-post-tile-radius);
      transition: all var(--aw-post-tile-transition);
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .post-tile--clickable {
      cursor: pointer;
    }

    .post-tile--clickable:hover {
      transform: translateY(-4px);
      box-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
    }

    .post-tile--clickable:focus {
      outline: 2px solid var(--aw-post-tile-accent);
      outline-offset: 2px;
    }

    .post-tile--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Variants */
    .post-tile--default {
      border: 1px solid var(--aw-post-tile-border);
    }

    .post-tile--card {
      border: 1px solid var(--aw-post-tile-border);
      box-shadow: var(--aw-post-tile-shadow);
    }

    .post-tile--overlay {
      position: relative;
      color: white;
    }

    .post-tile--overlay .post-tile__content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
      padding: 2rem 1.5rem 1.5rem;
    }

    .post-tile--minimal {
      border: none;
      box-shadow: none;
      background: transparent;
    }

    .post-tile--featured {
      border: 2px solid var(--aw-post-tile-accent);
      box-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
    }

    /* Sizes */
    .post-tile--sm {
      font-size: 0.875rem;
    }

    .post-tile--md {
      font-size: 1rem;
    }

    .post-tile--lg {
      font-size: 1.125rem;
    }

    .post-tile--xl {
      font-size: 1.25rem;
    }

    /* Layouts */
    .post-tile--horizontal {
      flex-direction: row;
      min-height: 200px;
    }

    .post-tile--horizontal .post-tile__image {
      width: 40%;
      flex-shrink: 0;
    }

    .post-tile--horizontal .post-tile__content {
      flex: 1;
      position: relative;
    }

    .post-tile--square .post-tile__image {
      aspect-ratio: 1;
    }

    .post-tile--vertical .post-tile__image {
      aspect-ratio: 16/9;
    }

    .post-tile__image {
      position: relative;
      overflow: hidden;
      background-color: var(--aw-color-surface-light, #f8f9fa);
    }

    .post-tile__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--aw-post-tile-transition);
    }

    .post-tile--clickable:hover .post-tile__image img {
      transform: scale(1.05);
    }

    .post-tile__badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background-color: var(--aw-post-tile-accent);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      z-index: 2;
    }

    .post-tile__content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .post-tile--sm .post-tile__content {
      padding: 1rem;
    }

    .post-tile--lg .post-tile__content,
    .post-tile--xl .post-tile__content {
      padding: 2rem;
    }

    .post-tile__header {
      margin-bottom: 1rem;
    }

    .post-tile__category {
      display: inline-block;
      color: var(--aw-post-tile-accent);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .post-tile__title {
      margin: 0 0 0.75rem 0;
      font-weight: 700;
      line-height: 1.3;
      color: inherit;
    }

    .post-tile--sm .post-tile__title {
      font-size: 1rem;
    }

    .post-tile--md .post-tile__title {
      font-size: 1.25rem;
    }

    .post-tile--lg .post-tile__title {
      font-size: 1.5rem;
    }

    .post-tile--xl .post-tile__title {
      font-size: 1.75rem;
    }

    .post-tile__excerpt {
      color: var(--aw-post-tile-text-muted);
      line-height: 1.6;
      margin: 0 0 1rem 0;
      flex: 1;
    }

    .post-tile__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--aw-post-tile-border);
      font-size: 0.875rem;
      color: var(--aw-post-tile-text-muted);
    }

    .post-tile--overlay .post-tile__meta {
      border-top-color: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.8);
    }

    .post-tile__author {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .post-tile__author-avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .post-tile__date {
      white-space: nowrap;
    }

    .post-tile__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    .post-tile__tag {
      background-color: var(--aw-color-surface-light, #f8f9fa);
      color: var(--aw-post-tile-text-muted);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      text-decoration: none;
    }

    .post-tile__actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .post-tile--horizontal {
        flex-direction: column;
      }

      .post-tile--horizontal .post-tile__image {
        width: 100%;
      }

      .post-tile__content {
        padding: 1rem;
      }

      .post-tile__meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `;

  /**
   * Post title
   */
  @property({ type: String }) 
  post_title: string = '';

  /**
   * Post excerpt or description
   */
  @property({ type: String }) 
  post_excerpt: string = '';

  /**
   * Post featured image URL
   */
  @property({ type: String }) 
  post_image: string = '';

  /**
   * Post category
   */
  @property({ type: String }) 
  post_category: string = '';

  /**
   * Author name
   */
  @property({ type: String }) 
  author_name: string = '';

  /**
   * Author avatar URL
   */
  @property({ type: String }) 
  author_avatar: string = '';

  /**
   * Published date
   */
  @property({ type: String }) 
  published_date: string = '';

  /**
   * Post tags
   */
  @property({ type: Array }) 
  post_tags: string[] = [];

  /**
   * Badge text (e.g., "Featured", "New")
   */
  @property({ type: String }) 
  badge_text: string = '';

  /**
   * Link URL
   */
  @property({ type: String }) 
  href: string = '';

  /**
   * Link target
   */
  @property({ type: String }) 
  target: string = '';

  /**
   * Visual variant
   */
  @property({ type: String }) 
  variant: PostTileVariant = 'default';

  /**
   * Size variant
   */
  @property({ type: String }) 
  size: PostTileSize = 'md';

  /**
   * Layout variant
   */
  @property({ type: String }) 
  layout: PostTileLayout = 'vertical';

  /**
   * Make tile clickable
   */
  @property({ type: Boolean }) 
  is_clickable: boolean = true;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true }) 
  disabled: boolean = false;

  @state()
  private _imageLoaded = false;

  @state()
  private _imageError = false;

  private _handleClick(e: MouseEvent) {
    if (this.disabled || !this.is_clickable) return;

    const clickEvent = new CustomEvent('awPostClick', {
      detail: {
        title: this.post_title,
        href: this.href,
        originalEvent: e
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);

    // Handle navigation
    if (this.href && !e.defaultPrevented) {
      if (this.target === '_blank') {
        window.open(this.href, '_blank');
      } else {
        window.location.href = this.href;
      }
    }
  }

  private _handleKeyPress(e: KeyboardEvent) {
    if (this.disabled || !this.is_clickable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e as any);
    }
  }

  private _handleImageLoad(e: Event) {
    this._imageLoaded = true;
    this._imageError = false;

    const imageLoadEvent = new CustomEvent('awImageLoad', {
      detail: { 
        src: this.post_image,
        originalEvent: e 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(imageLoadEvent);
  }

  private _handleImageError(e: Event) {
    this._imageLoaded = false;
    this._imageError = true;

    const imageErrorEvent = new CustomEvent('awImageError', {
      detail: { 
        src: this.post_image,
        originalEvent: e 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(imageErrorEvent);
  }

  render() {
    const classes = [
      'post-tile',
      `post-tile--${this.variant}`,
      `post-tile--${this.size}`,
      `post-tile--${this.layout}`,
      this.is_clickable ? 'post-tile--clickable' : '',
      this.disabled ? 'post-tile--disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <article 
        class=${classes}
        @click=${this._handleClick}
        @keydown=${this._handleKeyPress}
        tabindex=${this.is_clickable && !this.disabled ? 0 : -1}
        role=${this.is_clickable ? 'button' : 'article'}
        aria-disabled=${this.disabled}
      >
        ${this.post_image ? html`
          <div class="post-tile__image">
            <img
              src=${this.post_image}
              alt=${`Featured image for ${this.post_title}`}
              @load=${this._handleImageLoad}
              @error=${this._handleImageError}
            />
            ${this.badge_text ? html`
              <div class="post-tile__badge">${this.badge_text}</div>
            ` : ''}
          </div>
        ` : ''}
        
        <div class="post-tile__content">
          <div class="post-tile__header">
            <slot name="header">
              ${this.post_category ? html`
                <div class="post-tile__category">${this.post_category}</div>
              ` : ''}
              
              ${this.post_title ? html`
                <h3 class="post-tile__title">${this.post_title}</h3>
              ` : ''}
            </slot>
          </div>
          
          ${this.post_excerpt ? html`
            <div class="post-tile__excerpt">
              <slot>${this.post_excerpt}</slot>
            </div>
          ` : ''}
          
          ${this.post_tags.length > 0 ? html`
            <div class="post-tile__tags">
              ${this.post_tags.map(tag => html`
                <span class="post-tile__tag">${tag}</span>
              `)}
            </div>
          ` : ''}
          
          <div class="post-tile__actions">
            <slot name="actions"></slot>
          </div>
          
          ${(this.author_name || this.published_date) ? html`
            <div class="post-tile__meta">
              <slot name="footer">
                ${this.author_name ? html`
                  <div class="post-tile__author">
                    ${this.author_avatar ? html`
                      <img 
                        src=${this.author_avatar} 
                        alt=${`${this.author_name} avatar`}
                        class="post-tile__author-avatar"
                      />
                    ` : ''}
                    <span>${this.author_name}</span>
                  </div>
                ` : ''}
                
                ${this.published_date ? html`
                  <div class="post-tile__date">${this.published_date}</div>
                ` : ''}
              </slot>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-post-tile': AwPostTile;
  }
}