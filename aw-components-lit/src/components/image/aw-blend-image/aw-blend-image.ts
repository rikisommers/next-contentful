import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview AW Blend Image Component
 * 
 * A responsive image component with CSS blend mode effects and theme integration.
 * Provides optimized loading with Contentful integration and customizable blend modes.
 * 
 * @example
 * ```html
 * <!-- Basic blend image -->
 * <aw-blend-image 
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Blend image">
 * </aw-blend-image>
 * 
 * <!-- With custom blend mode -->
 * <aw-blend-image 
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Overlay image"
 *   blend_mode="overlay"
 *   grayscale>
 * </aw-blend-image>
 * 
 * <!-- With custom dimensions -->
 * <aw-blend-image 
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Custom size image"
 *   width="800"
 *   height="600"
 *   object_fit="contain">
 * </aw-blend-image>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-blend-image')
export class AwBlendImage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-blend-image */
    .aw-blend-image {
      display: block;
      width: 100%;
      height: 100%;
    }

    .aw-blend-image__img {
      width: 100%;
      height: 100%;
      object-fit: var(--object-fit, cover);
      display: block;
      mix-blend-mode: var(--blend-mode, normal);
      filter: var(--image-filter, none);
      transition: filter var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Utilities: Loading states */
    .aw-blend-image__img--loading {
      opacity: 0;
      transition: opacity var(--aw-transition-duration-slow, 0.3s) var(--aw-transition-timing-ease, ease);
    }

    .aw-blend-image__img--loaded {
      opacity: 1;
    }

    /* ITCSS - Utilities: Object fit variations */
    .aw-blend-image--object-cover .aw-blend-image__img {
      object-fit: cover;
    }

    .aw-blend-image--object-contain .aw-blend-image__img {
      object-fit: contain;
    }

    .aw-blend-image--object-fill .aw-blend-image__img {
      object-fit: fill;
    }

    .aw-blend-image--object-none .aw-blend-image__img {
      object-fit: none;
    }

    .aw-blend-image--object-scale-down .aw-blend-image__img {
      object-fit: scale-down;
    }

    /* ITCSS - Utilities: Filter states */
    .aw-blend-image--grayscale .aw-blend-image__img {
      filter: grayscale(1);
    }

    .aw-blend-image--sepia .aw-blend-image__img {
      filter: sepia(1);
    }

    .aw-blend-image--blur .aw-blend-image__img {
      filter: blur(4px);
    }

    .aw-blend-image--brightness .aw-blend-image__img {
      filter: brightness(1.2);
    }

    .aw-blend-image--contrast .aw-blend-image__img {
      filter: contrast(1.2);
    }

    .aw-blend-image--saturate .aw-blend-image__img {
      filter: saturate(1.5);
    }

    .aw-blend-image--invert .aw-blend-image__img {
      filter: invert(1);
    }

    /* ITCSS - Utilities: Error state */
    .aw-blend-image--error {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--aw-color-neutral-600, #525252);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      min-height: 200px;
      width: 100%;
    }

    /* ITCSS - Utilities: Hover effects */
    .aw-blend-image--hover-zoom:hover .aw-blend-image__img {
      transform: scale(1.05);
      transition: transform var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-blend-image--hover-filter:hover .aw-blend-image__img {
      filter: none;
    }
  `;

  /**
   * The image source URL (Contentful asset URL)
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-blend-image src="https://images.ctfassets.net/abc123"></aw-blend-image>
   * ```
   */
  @property() src: string = '';

  /**
   * Alternative text for accessibility
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-blend-image alt="Description of the image"></aw-blend-image>
   * ```
   */
  @property() alt: string = '';

  /**
   * The image width for optimization (passed to Contentful)
   * @type {string | number}
   * @default 400
   * @example
   * ```html
   * <aw-blend-image width="800"></aw-blend-image>
   * ```
   */
  @property() width: string | number = 400;

  /**
   * The image height for optimization (passed to Contentful)
   * @type {string | number}
   * @default 200
   * @example
   * ```html
   * <aw-blend-image height="600"></aw-blend-image>
   * ```
   */
  @property() height: string | number = 200;

  /**
   * The sizes attribute for responsive images
   * @type {string}
   * @default "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   * @example
   * ```html
   * <aw-blend-image sizes="50vw"></aw-blend-image>
   * ```
   */
  @property() sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  /**
   * The loading strategy for the image
   * @type {'lazy' | 'eager'}
   * @default 'lazy'
   * @example
   * ```html
   * <aw-blend-image loading="eager"></aw-blend-image>
   * ```
   */
  @property() loading: 'lazy' | 'eager' = 'lazy';

  /**
   * CSS mix-blend-mode value
   * @type {string}
   * @default 'normal'
   * @example
   * ```html
   * <aw-blend-image blend_mode="multiply"></aw-blend-image>
   * ```
   */
  @property() blend_mode: string = 'normal';

  /**
   * CSS object-fit value
   * @type {'cover' | 'contain' | 'fill' | 'none' | 'scale-down'}
   * @default 'cover'
   * @example
   * ```html
   * <aw-blend-image object_fit="contain"></aw-blend-image>
   * ```
   */
  @property() object_fit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' = 'cover';

  /**
   * Apply grayscale filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image grayscale></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) grayscale: boolean = false;

  /**
   * Apply sepia filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image sepia></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) sepia: boolean = false;

  /**
   * Apply blur filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image blur></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) blurEnabled: boolean = false;

  /**
   * Apply brightness filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image brightness></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) brightness: boolean = false;

  /**
   * Apply contrast filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image contrast></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) contrast: boolean = false;

  /**
   * Apply saturate filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image saturate></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) saturate: boolean = false;

  /**
   * Apply invert filter
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image invert></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) invert: boolean = false;

  /**
   * Enable zoom effect on hover
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image hover_zoom></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) hover_zoom: boolean = false;

  /**
   * Remove filter on hover
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-blend-image hover_filter></aw-blend-image>
   * ```
   */
  @property({ type: Boolean }) hover_filter: boolean = false;

  /**
   * The image quality for Contentful optimization (1-100)
   * @type {number}
   * @default 75
   * @example
   * ```html
   * <aw-blend-image quality="90"></aw-blend-image>
   * ```
   */
  @property({ type: Number }) quality: number = 75;

  /**
   * Internal state for image loading
   * @private
   */
  @state() private imageLoaded: boolean = false;

  /**
   * Internal state for image error
   * @private
   */
  @state() private imageError: boolean = false;

  /**
   * Generates the optimized Contentful URL
   * @private
   * @returns {string} The optimized image URL
   */
  private getContentfulImageUrl(): string {
    if (!this.src) return '';
    
    const url = new URL(this.src);
    url.searchParams.set('w', this.width.toString());
    url.searchParams.set('q', this.quality.toString());
    
    return url.toString();
  }

  /**
   * Handles image load event
   * @private
   */
  private handleImageLoad = () => {
    this.imageLoaded = true;
    this.imageError = false;
    
    const event = new CustomEvent('aw-blend-image-load', {
      detail: { src: this.src },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Handles image error event
   * @private
   */
  private handleImageError = () => {
    this.imageError = true;
    this.imageLoaded = false;
    
    const event = new CustomEvent('aw-blend-image-error', {
      detail: { src: this.src },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Renders the component
   * @returns {TemplateResult} The component template
   * @protected
   */
  render() {
    const containerClasses = {
      'aw-blend-image': true,
      [`aw-blend-image--object-${this.object_fit}`]: true,
      'aw-blend-image--grayscale': this.grayscale,
      'aw-blend-image--sepia': this.sepia,
      'aw-blend-image--blur': this.blurEnabled,
      'aw-blend-image--brightness': this.brightness,
      'aw-blend-image--contrast': this.contrast,
      'aw-blend-image--saturate': this.saturate,
      'aw-blend-image--invert': this.invert,
      'aw-blend-image--hover-zoom': this.hover_zoom,
      'aw-blend-image--hover-filter': this.hover_filter,
      'aw-blend-image--error': this.imageError,
    };

    const imageClasses = {
      'aw-blend-image__img': true,
      'aw-blend-image__img--loading': !this.imageLoaded && !this.imageError,
      'aw-blend-image__img--loaded': this.imageLoaded,
    };

    if (this.imageError) {
      return html`
        <div class=${classMap(containerClasses)}>
          <div class="aw-blend-image--error">
            Image failed to load
          </div>
        </div>
      `;
    }

    return html`
      <div 
        class=${classMap(containerClasses)}
        style="--blend-mode: ${this.blend_mode}; --object-fit: ${this.object_fit}"
      >
        <img
          class=${classMap(imageClasses)}
          src=${this.getContentfulImageUrl()}
          alt=${this.alt || 'Blend image'}
          loading=${this.loading}
          sizes=${this.sizes}
          width=${ifDefined(this.width)}
          height=${ifDefined(this.height)}
          @load=${this.handleImageLoad}
          @error=${this.handleImageError}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-blend-image': AwBlendImage;
  }
}