import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview AW Cover Image Component
 * 
 * A responsive cover image component with parallax scroll effects.
 * Provides optimized loading with Contentful integration and smooth parallax animation.
 * 
 * @example
 * ```html
 * <!-- Basic cover image -->
 * <aw-cover-image 
 *   title="Hero Cover"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Hero background image">
 * </aw-cover-image>
 * 
 * <!-- With parallax settings -->
 * <aw-cover-image 
 *   title="Parallax Hero"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Parallax background"
 *   parallax_enabled
 *   parallax_speed="0.5"
 *   loading="eager">
 * </aw-cover-image>
 * 
 * <!-- Without parallax -->
 * <aw-cover-image 
 *   title="Static Cover"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Static cover image"
 *   parallax_enabled="false">
 * </aw-cover-image>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-cover-image')
export class AwCoverImage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    /* ITCSS - Components: Block - aw-cover-image */
    .aw-cover-image {
      position: relative;
      width: 100%;
      background-color: var(--aw-color-neutral-500, #737373);
      display: grid;
      overflow: hidden;
      justify-content: end;
      align-content: end;
      border-radius: var(--aw-border-radius-md, 0.375rem);
    }

    .aw-cover-image__container {
      position: absolute;
      width: 100%;
      height: calc(100% + 200px);
      top: -10px;
      left: 0;
      background-color: var(--aw-color-purple-700, #7c3aed);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .aw-cover-image__wrapper {
      width: 100%;
      height: 100%;
      padding: var(--aw-spacing-md, 0.75rem);
      transform: translateY(var(--parallax-offset, 0px));
      transition: transform 0.1s ease-out;
    }

    .aw-cover-image__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    /* ITCSS - Utilities: Loading states */
    .aw-cover-image__img--loading {
      opacity: 0;
      transition: opacity var(--aw-transition-duration-slow, 0.3s) var(--aw-transition-timing-ease, ease);
    }

    .aw-cover-image__img--loaded {
      opacity: 1;
    }

    /* ITCSS - Utilities: Responsive aspect ratios */
    .aw-cover-image--aspect-square {
      aspect-ratio: 1;
    }

    .aw-cover-image--aspect-portrait {
      aspect-ratio: 3/4;
    }

    .aw-cover-image--aspect-landscape {
      aspect-ratio: 4/3;
    }

    .aw-cover-image--aspect-wide {
      aspect-ratio: 21/9;
    }

    .aw-cover-image--aspect-video {
      aspect-ratio: 16/9;
    }

    /* ITCSS - Utilities: Error state */
    .aw-cover-image--error {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--aw-color-neutral-600, #525252);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    /* ITCSS - Utilities: Parallax disabled */
    .aw-cover-image--no-parallax .aw-cover-image__wrapper {
      transform: none;
      transition: none;
    }
  `;

  /**
   * The image source URL (Contentful asset URL)
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-cover-image src="https://images.ctfassets.net/abc123"></aw-cover-image>
   * ```
   */
  @property() src: string = '';

  /**
   * The image title for context and accessibility
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-cover-image title="Hero Cover Image"></aw-cover-image>
   * ```
   */
  @property() title: string = '';

  /**
   * Alternative text for accessibility
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-cover-image alt="Description of the cover image"></aw-cover-image>
   * ```
   */
  @property() alt: string = '';

  /**
   * The image width for optimization (passed to Contentful)
   * @type {string | number}
   * @default 1920
   * @example
   * ```html
   * <aw-cover-image width="1600"></aw-cover-image>
   * ```
   */
  @property() width: string | number = 1920;

  /**
   * The image height for optimization (passed to Contentful)
   * @type {string | number}
   * @default 1280
   * @example
   * ```html
   * <aw-cover-image height="900"></aw-cover-image>
   * ```
   */
  @property() height: string | number = 1280;

  /**
   * The sizes attribute for responsive images
   * @type {string}
   * @default "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   * @example
   * ```html
   * <aw-cover-image sizes="100vw"></aw-cover-image>
   * ```
   */
  @property() sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  /**
   * The loading strategy for the image
   * @type {'lazy' | 'eager'}
   * @default 'lazy'
   * @example
   * ```html
   * <aw-cover-image loading="eager"></aw-cover-image>
   * ```
   */
  @property() loading: 'lazy' | 'eager' = 'lazy';

  /**
   * The aspect ratio of the image container
   * @type {'square' | 'portrait' | 'landscape' | 'wide' | 'video'}
   * @default 'video'
   * @example
   * ```html
   * <aw-cover-image aspect_ratio="wide"></aw-cover-image>
   * ```
   */
  @property() aspect_ratio: 'square' | 'portrait' | 'landscape' | 'wide' | 'video' = 'video';

  /**
   * Whether to enable parallax scroll effect
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-cover-image parallax_enabled="false"></aw-cover-image>
   * ```
   */
  @property({ type: Boolean }) parallax_enabled: boolean = true;

  /**
   * Parallax scroll speed (0 = no movement, 1 = normal scroll speed)
   * @type {number}
   * @default 0.5
   * @example
   * ```html
   * <aw-cover-image parallax_speed="0.3"></aw-cover-image>
   * ```
   */
  @property({ type: Number }) parallax_speed: number = 0.5;

  /**
   * The image quality for Contentful optimization (1-100)
   * @type {number}
   * @default 75
   * @example
   * ```html
   * <aw-cover-image quality="85"></aw-cover-image>
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
   * Internal state for parallax offset
   * @private
   */
  @state() private parallaxOffset: number = 0;

  /**
   * Request animation frame ID for parallax updates
   * @private
   */
  private rafId: number | null = null;

  /**
   * Lifecycle method - called when element is added to DOM
   * @protected
   */
  connectedCallback() {
    super.connectedCallback();
    
    if (this.parallax_enabled && typeof window !== 'undefined') {
      this.setupParallaxListener();
    }
  }

  /**
   * Lifecycle method - called when element is removed from DOM
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll, { passive: true } as any);
      window.removeEventListener('resize', this.handleResize, { passive: true } as any);
    }
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  /**
   * Sets up scroll and resize listeners for parallax effect
   * @private
   */
  private setupParallaxListener() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    
    // Initial calculation
    this.updateParallax();
  }

  /**
   * Handles scroll events for parallax effect
   * @private
   */
  private handleScroll = () => {
    if (this.rafId) return;
    
    this.rafId = requestAnimationFrame(() => {
      this.updateParallax();
      this.rafId = null;
    });
  };

  /**
   * Handles resize events for parallax effect
   * @private
   */
  private handleResize = () => {
    this.updateParallax();
  };

  /**
   * Updates the parallax offset based on scroll position
   * @private
   */
  private updateParallax() {
    if (!this.parallax_enabled) return;

    const rect = this.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress from element entering viewport until it leaves
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Only calculate parallax when element is in viewport
    if (elementBottom > 0 && elementTop < windowHeight) {
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + rect.height);
      this.parallaxOffset = -200 * scrollProgress * this.parallax_speed;
    }
  }

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
    
    const event = new CustomEvent('aw-cover-image-load', {
      detail: { src: this.src, title: this.title },
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
    
    const event = new CustomEvent('aw-cover-image-error', {
      detail: { src: this.src, title: this.title },
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
      'aw-cover-image': true,
      [`aw-cover-image--aspect-${this.aspect_ratio}`]: true,
      'aw-cover-image--error': this.imageError,
      'aw-cover-image--no-parallax': !this.parallax_enabled,
    };

    const imageClasses = {
      'aw-cover-image__img': true,
      'aw-cover-image__img--loading': !this.imageLoaded && !this.imageError,
      'aw-cover-image__img--loaded': this.imageLoaded,
    };

    if (this.imageError) {
      return html`
        <div class=${classMap(containerClasses)}>
          <div class="aw-cover-image__error">
            Image failed to load
          </div>
        </div>
      `;
    }

    return html`
      <div class=${classMap(containerClasses)}>
        <div class="aw-cover-image__container">
          <div 
            class="aw-cover-image__wrapper"
            style="--parallax-offset: ${this.parallaxOffset}px"
          >
            <img
              class=${classMap(imageClasses)}
              src=${this.getContentfulImageUrl()}
              alt=${this.alt || `Cover Image for ${this.title}`}
              loading=${this.loading}
              sizes=${this.sizes}
              width=${ifDefined(this.width)}
              height=${ifDefined(this.height)}
              @load=${this.handleImageLoad}
              @error=${this.handleImageError}
            />
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cover-image': AwCoverImage;
  }
}