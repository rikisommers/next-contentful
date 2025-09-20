import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type PostHeaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type PostHeaderOverlay = 'none' | 'light' | 'dark' | 'gradient';

export interface PostImage {
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * A post header component that combines an intro section with an optional hero image.
 * Features responsive design, overlay options, and flexible sizing.
 * 
 * @element aw-post-header
 * 
 * @slot intro - Custom intro content (replaces title/subtitle)
 * @slot overlay - Custom overlay content for image
 * 
 * @fires {CustomEvent} awHeaderReady - Dispatched when component is ready
 * @fires {CustomEvent} awImageClick - Dispatched when header image is clicked
 * 
 * @example
 * ```html
 * <aw-post-header 
 *   title="Blog Post Title"
 *   subtitle="Post description"
 *   .img=${postImage}
 *   size="lg"
 *   overlay="gradient">
 * </aw-post-header>
 * ```
 */
@customElement('aw-post-header')
export class AwPostHeader extends LitElement {
  static styles = css`
    :host {
      --aw-post-header-bg: var(--aw-color-surface, #fff);
      --aw-post-header-text: var(--aw-color-text, #333);
      --aw-post-header-text-light: var(--aw-color-text-light, #666);
      --aw-post-header-text-inverse: var(--aw-color-text-inverse, #fff);
      --aw-post-header-radius: var(--aw-border-radius-lg, 12px);
      --aw-post-header-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      --aw-post-header-transition: var(--aw-transition-duration, 0.3s) ease;
      --aw-post-header-gap: var(--aw-spacing-lg, 1.5rem);
      
      display: block;
      width: 100%;
    }

    .post-header {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: var(--aw-post-header-gap);
    }

    .post-header__intro {
      padding-top: 4rem;
      padding-bottom: 0.5rem;
    }

    .post-header__image-container {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
      border-radius: var(--aw-post-header-radius);
      background-color: var(--aw-color-surface-muted, #f5f5f5);
      cursor: pointer;
      transition: transform var(--aw-post-header-transition);
    }

    .post-header__image-container:hover {
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    .post-header__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform var(--aw-post-header-transition);
    }

    .post-header__image-container:hover .post-header__image {
      transform: scale(1.05);
    }

    .post-header__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 1rem;
      z-index: 2;
    }

    .post-header__overlay-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .post-header__overlay-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: var(--aw-post-header-text-inverse);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    /* Overlay variants */
    .overlay-light::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      z-index: 1;
    }

    .overlay-dark::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }

    .overlay-gradient::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.2) 50%,
        rgba(0, 0, 0, 0.1) 100%
      );
      z-index: 1;
    }

    /* Size variants */
    .size-sm .post-header__image-container {
      min-height: 250px;
    }

    .size-md .post-header__image-container {
      min-height: 350px;
    }

    .size-lg .post-header__image-container {
      min-height: 450px;
    }

    .size-xl .post-header__image-container {
      min-height: 550px;
    }

    /* No image state */
    .no-image .post-header__image-container {
      background: var(--aw-color-accent-light, #e5f3ff);
      border: 2px dashed var(--aw-color-border, #e5e5e5);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }

    .no-image-placeholder {
      color: var(--aw-post-header-text-light);
      font-size: 1rem;
      text-align: center;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .post-header__intro {
        padding-top: 2rem;
      }

      .size-lg .post-header__image-container,
      .size-xl .post-header__image-container {
        min-height: 300px;
      }

      .post-header__overlay {
        padding: 0.75rem;
      }

      .post-header__overlay-meta {
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .post-header__image-container,
      .post-header__image {
        transition: none;
      }

      .post-header__image-container:hover {
        transform: none;
      }

      .post-header__image-container:hover .post-header__image {
        transform: none;
      }
    }

    /* Focus states */
    .post-header__image-container:focus {
      outline: 2px solid var(--aw-color-focus, #0066cc);
      outline-offset: 2px;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-post-header-bg: #1f1f1f;
        --aw-post-header-text: #f0f0f0;
        --aw-post-header-text-light: #aaa;
      }
    }
  `;

  /**
   * Post title
   */
  @property({ type: String })
  title = '';

  /**
   * Post subtitle/description
   */
  @property({ type: String })
  subtitle = '';

  /**
   * Header image
   */
  @property({ type: Object })
  img?: PostImage;

  /**
   * Header size variant
   */
  @property({ type: String })
  size: PostHeaderSize = 'md';

  /**
   * Image overlay style
   */
  @property({ type: String })
  overlay: PostHeaderOverlay = 'none';

  /**
   * Show date in overlay
   */
  @property({ type: String })
  date = '';

  /**
   * Additional metadata to show in overlay
   */
  @property({ type: Array })
  meta: string[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awHeaderReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  private handleImageClick(event: Event) {
    if (this.img) {
      this.dispatchEvent(new CustomEvent('awImageClick', {
        detail: { 
          image: this.img,
          event 
        },
        bubbles: true
      }));
    }
  }

  render() {
    const hasImage = this.img?.url;

    return html`
      <div class="post-header size-${this.size} ${hasImage ? '' : 'no-image'}">
        <div class="post-header__intro">
          <slot name="intro">
            ${this.title || this.subtitle ? html`
              <aw-post-intro 
                title="${this.title}" 
                content="${this.subtitle}">
              </aw-post-intro>
            ` : ''}
          </slot>
        </div>
        
        <div 
          class="post-header__image-container ${this.overlay !== 'none' ? `overlay-${this.overlay}` : ''}"
          @click=${this.handleImageClick}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.handleImageClick(e);
            }
          }}
          tabindex="${hasImage ? '0' : '-1'}"
          role="${hasImage ? 'button' : 'img'}"
          aria-label="${hasImage ? `View image: ${this.img?.alt || this.title}` : 'No image available'}"
        >
          ${hasImage ? html`
            <img 
              class="post-header__image"
              src="${this.img!.url}"
              alt="${this.img!.alt || this.img!.title || this.title}"
              width="${this.img!.width || 1200}"
              height="${this.img!.height || 600}"
              loading="lazy"
            />
            
            <div class="post-header__overlay">
              <div class="post-header__overlay-content"></div>
              
              <div class="post-header__overlay-meta">
                ${this.date ? html`<span>Date: ${this.date}</span>` : ''}
                ${this.meta.map(item => html`<span>${item}</span>`)}
                <slot name="overlay"></slot>
              </div>
            </div>
          ` : html`
            <div class="no-image-placeholder">
              <p>No image available</p>
            </div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-post-header': AwPostHeader;
  }
}