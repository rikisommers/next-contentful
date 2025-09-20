import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
export type ImageSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ImageShape = 'rectangle' | 'square' | 'circle' | 'rounded';
export type ImageEffect = 'none' | 'blur' | 'grayscale' | 'sepia' | 'contrast' | 'brightness';

export interface ImageSrc {
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * A flexible image block component for displaying images with various effects, shapes, and interactive features.
 * 
 * @element aw-block-image
 * 
 * @slot caption - Custom caption content
 * @slot overlay - Custom overlay content
 * @slot controls - Custom control elements
 * 
 * @fires {CustomEvent} awImageReady - Dispatched when component is ready
 * @fires {CustomEvent} awImageLoad - Dispatched when image loads
 * @fires {CustomEvent} awImageError - Dispatched when image fails to load
 * @fires {CustomEvent} awImageClick - Dispatched when image is clicked
 * 
 * @example
 * ```html
 * <aw-block-image 
 *   title="Product Image"
 *   src="https://example.com/image.jpg"
 *   alt="Product showcase"
 *   size="lg"
 *   shape="rounded"
 *   enable_lightbox="true">
 * </aw-block-image>
 * ```
 */
@customElement('aw-block-image')
export class AwBlockImage extends LitElement {
  static styles = css`
    :host {
      --aw-image-bg: var(--aw-color-surface, #f8f9fa);
      --aw-image-border: var(--aw-color-border, #e5e5e5);
      --aw-image-text: var(--aw-color-text, #333);
      --aw-image-text-muted: var(--aw-color-text-light, #666);
      --aw-image-overlay: var(--aw-color-overlay, rgba(0, 0, 0, 0.7));
      --aw-image-radius: var(--aw-border-radius-md, 8px);
      --aw-image-shadow: var(--aw-shadow-md, 0 4px 8px rgba(0, 0, 0, 0.1));
      --aw-image-transition: var(--aw-transition-medium, 0.3s ease);
      
      display: block;
      width: 100%;
      margin: 1.5rem 0;
    }

    .image-container {
      position: relative;
      display: inline-block;
      overflow: hidden;
      background: var(--aw-image-bg);
      border: 1px solid var(--aw-image-border);
      border-radius: var(--aw-image-radius);
      box-shadow: var(--aw-image-shadow);
      transition: all var(--aw-image-transition);
      max-width: 100%;
    }

    .image-container:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .image-container--clickable {
      cursor: pointer;
    }

    .image-container--clickable:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    /* Size variants */
    .image-container--sm {
      max-width: 320px;
    }

    .image-container--md {
      max-width: 480px;
    }

    .image-container--lg {
      max-width: 720px;
    }

    .image-container--xl {
      max-width: 1024px;
    }

    .image-container--full {
      max-width: 100%;
      width: 100%;
    }

    /* Shape variants */
    .image-container--square {
      aspect-ratio: 1 / 1;
    }

    .image-container--circle {
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }

    .image-container--rounded {
      border-radius: calc(var(--aw-image-radius) * 2);
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: inherit;
    }

    .image-element {
      width: 100%;
      height: 100%;
      transition: all var(--aw-image-transition);
      display: block;
    }

    .image-element--cover {
      object-fit: cover;
    }

    .image-element--contain {
      object-fit: contain;
    }

    .image-element--fill {
      object-fit: fill;
    }

    .image-element--scale-down {
      object-fit: scale-down;
    }

    .image-element--none {
      object-fit: none;
    }

    /* Effects */
    .image-element--blur {
      filter: blur(2px);
    }

    .image-element--grayscale {
      filter: grayscale(100%);
    }

    .image-element--sepia {
      filter: sepia(100%);
    }

    .image-element--contrast {
      filter: contrast(150%);
    }

    .image-element--brightness {
      filter: brightness(120%);
    }

    .image-element:hover {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--aw-image-overlay);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--aw-image-transition);
      z-index: 2;
    }

    .image-container:hover .image-overlay {
      opacity: 1;
    }

    .image-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        transparent 100%
      );
      color: white;
      padding: 1rem;
      z-index: 3;
    }

    .caption-title {
      margin: 0 0 0.25rem 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }

    .caption-text {
      margin: 0;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.4;
    }

    .image-controls {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      display: flex;
      gap: 0.5rem;
      z-index: 4;
      opacity: 0;
      transition: opacity var(--aw-image-transition);
    }

    .image-container:hover .image-controls {
      opacity: 1;
    }

    .control-button {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
    }

    .control-button:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .control-button:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    .loading-placeholder {
      width: 100%;
      height: 200px;
      background: linear-gradient(
        90deg,
        var(--aw-image-bg) 0%,
        var(--aw-color-surface-light, #f0f0f0) 50%,
        var(--aw-image-bg) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--aw-image-text-muted);
      font-size: 0.875rem;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .error-placeholder {
      width: 100%;
      height: 200px;
      background: var(--aw-image-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--aw-image-text-muted);
      text-align: center;
    }

    .error-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      opacity: 0.6;
    }

    .error-message {
      font-size: 0.875rem;
      margin: 0;
    }

    .zoom-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: white;
      opacity: 0;
      transition: all var(--aw-image-transition);
      z-index: 3;
    }

    .image-container--clickable:hover .zoom-indicator {
      opacity: 1;
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host {
        margin: 1rem 0;
      }

      .image-container--xl,
      .image-container--lg {
        max-width: 100%;
      }

      .image-caption {
        padding: 0.75rem;
      }

      .image-controls {
        top: 0.5rem;
        right: 0.5rem;
      }

      .control-button {
        width: 28px;
        height: 28px;
        font-size: 0.75rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .image-container,
      .image-element,
      .image-overlay,
      .image-controls,
      .control-button {
        transition: none;
      }

      .image-container:hover {
        transform: none;
      }

      .image-element:hover {
        transform: none;
      }

      .loading-placeholder {
        animation: none;
        background: var(--aw-image-bg);
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .image-container {
        border-width: 2px;
      }

      .control-button {
        border-width: 2px;
        background: rgba(255, 255, 255, 0.3);
      }
    }

    /* Print styles */
    @media print {
      .image-overlay,
      .image-controls {
        display: none;
      }
    }
  `;

  /**
   * Image title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * Image source URL
   */
  @property({ type: String }) 
  src: string = '';

  /**
   * Alternative text for accessibility
   */
  @property({ type: String }) 
  alt: string = '';

  /**
   * Image width
   */
  @property({ type: Number }) 
  width?: number;

  /**
   * Image height
   */
  @property({ type: Number }) 
  height?: number;

  /**
   * Object fit behavior
   */
  @property({ type: String }) 
  fit: ImageFit = 'cover';

  /**
   * Image size variant
   */
  @property({ type: String }) 
  size: ImageSize = 'md';

  /**
   * Image shape
   */
  @property({ type: String }) 
  shape: ImageShape = 'rectangle';

  /**
   * Visual effect to apply
   */
  @property({ type: String }) 
  effect: ImageEffect = 'none';

  /**
   * Caption text
   */
  @property({ type: String }) 
  caption: string = '';

  /**
   * Enable click interactions
   */
  @property({ type: Boolean }) 
  clickable: boolean = false;

  /**
   * Enable lightbox/modal view
   */
  @property({ type: Boolean }) 
  enable_lightbox: boolean = false;

  /**
   * Enable lazy loading
   */
  @property({ type: Boolean }) 
  lazy_load: boolean = true;

  /**
   * Show zoom indicator on hover
   */
  @property({ type: Boolean }) 
  show_zoom_indicator: boolean = false;

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  @state()
  private _isLoading: boolean = true;

  @state()
  private _hasError: boolean = false;

  @state()
  private _isLoaded: boolean = false;

  private _observer?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.lazy_load) {
      this._setupIntersectionObserver();
    } else {
      this._isLoaded = true;
    }
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awImageReady', {
      detail: {
        title: this.title,
        src: this.src,
        alt: this.alt,
        size: this.size,
        shape: this.shape
      },
      bubbles: true,
      composed: true,
    }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  private _setupIntersectionObserver() {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this._isLoaded) {
            this._isLoaded = true;
            this._observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px'
      }
    );
    this._observer.observe(this);
  }

  private _handleImageLoad() {
    this._isLoading = false;
    this._hasError = false;
    
    this.dispatchEvent(new CustomEvent('awImageLoad', {
      detail: {
        src: this.src,
        naturalWidth: (event?.target as HTMLImageElement)?.naturalWidth || 0,
        naturalHeight: (event?.target as HTMLImageElement)?.naturalHeight || 0
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleImageError() {
    this._isLoading = false;
    this._hasError = true;
    
    this.dispatchEvent(new CustomEvent('awImageError', {
      detail: {
        src: this.src
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleImageClick(event: MouseEvent) {
    if (!this.clickable) return;

    const clickEvent = new CustomEvent('awImageClick', {
      detail: {
        src: this.src,
        alt: this.alt,
        title: this.title,
        enableLightbox: this.enable_lightbox,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleImageClick(event as any);
    }
  }

  private _handleDownload() {
    if (!this.src) return;
    
    const link = document.createElement('a');
    link.href = this.src;
    link.download = this.title || 'image';
    link.target = '_blank';
    link.click();
  }

  private _handleShare() {
    if (navigator.share && this.src) {
      navigator.share({
        title: this.title,
        url: this.src
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(this.src);
      });
    }
  }

  render() {
    const containerClasses = [
      'image-container',
      `image-container--${this.size}`,
      `image-container--${this.shape}`,
      this.clickable ? 'image-container--clickable' : '',
      this.custom_class
    ].filter(Boolean).join(' ');

    const imageClasses = [
      'image-element',
      `image-element--${this.fit}`,
      this.effect !== 'none' ? `image-element--${this.effect}` : ''
    ].filter(Boolean).join(' ');

    if (this._hasError) {
      return html`
        <div class=${containerClasses}>
          <div class="error-placeholder">
            <div class="error-icon">🖼️</div>
            <p class="error-message">Failed to load image</p>
          </div>
        </div>
      `;
    }

    if (!this._isLoaded) {
      return html`
        <div class=${containerClasses}>
          <div class="loading-placeholder">
            Loading image...
          </div>
        </div>
      `;
    }

    return html`
      <figure 
        class=${containerClasses}
        tabindex=${this.clickable ? 0 : -1}
        role=${this.clickable ? 'button' : 'img'}
        aria-label=${this.alt || this.title}
        @click=${this._handleImageClick}
        @keydown=${this._handleKeyPress}
      >
        <div class="image-wrapper">
          <img
            class=${imageClasses}
            src=${this.src}
            alt=${this.alt}
            width=${this.width || undefined}
            height=${this.height || undefined}
            loading=${this.lazy_load ? 'lazy' : 'eager'}
            @load=${this._handleImageLoad}
            @error=${this._handleImageError}
          />
          
          ${this.clickable && !this._isLoading ? html`
            <div class="image-overlay">
              <slot name="overlay">
                ${this.show_zoom_indicator ? html`
                  <div class="zoom-indicator">🔍</div>
                ` : ''}
              </slot>
            </div>
          ` : ''}
          
          ${this.caption || this.title ? html`
            <figcaption class="image-caption">
              <slot name="caption">
                ${this.title ? html`
                  <h3 class="caption-title">${this.title}</h3>
                ` : ''}
                ${this.caption ? html`
                  <p class="caption-text">${this.caption}</p>
                ` : ''}
              </slot>
            </figcaption>
          ` : ''}
          
          <div class="image-controls">
            <slot name="controls">
              <button
                class="control-button"
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  this._handleDownload();
                }}
                aria-label="Download image"
                title="Download"
              >
                ⬇
              </button>
              
              ${typeof navigator !== 'undefined' && 'share' in navigator ? html`
                <button
                  class="control-button"
                  @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this._handleShare();
                  }}
                  aria-label="Share image"
                  title="Share"
                >
                  📤
                </button>
              ` : ''}
            </slot>
          </div>
        </div>
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-image': AwBlockImage;
  }
}