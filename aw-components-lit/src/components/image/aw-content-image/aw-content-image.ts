import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview AW Content Image Component
 * 
 * A responsive image component for content display with animation support.
 * Provides optimized loading with Contentful integration and roll-up animation.
 * 
 * @example
 * ```html
 * <!-- Basic content image -->
 * <aw-content-image 
 *   title="Project Title"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Project cover image">
 * </aw-content-image>
 * 
 * <!-- With custom dimensions and loading -->
 * <aw-content-image 
 *   title="Hero Image"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Hero background"
 *   width="1920"
 *   height="1080"
 *   loading="eager"
 *   sizes="100vw">
 * </aw-content-image>
 * 
 * <!-- With animation settings -->
 * <aw-content-image 
 *   title="Animated Image"
 *   src="https://images.ctfassets.net/image-id"
 *   alt="Animated content"
 *   animate_on_visible
 *   animation_duration="0.6">
 * </aw-content-image>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-content-image')
export class AwContentImage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    /* ITCSS - Components: Block - aw-content-image */
    .aw-content-image {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background-color: var(--aw-color-neutral-500, #737373);
      display: grid;
      overflow: hidden;
      justify-content: end;
      align-content: end;
      border-radius: var(--aw-border-radius-md, 0.375rem);
    }

    .aw-content-image__container {
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

    .aw-content-image__wrapper {
      width: 100%;
      height: 100%;
      padding: var(--aw-spacing-md, 0.75rem);
    }

    .aw-content-image__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    /* ITCSS - Utilities: Animation states */
    .aw-content-image--animate {
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--animation-duration, 0.6s) var(--aw-transition-timing-ease-out, ease-out);
    }

    .aw-content-image--visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ITCSS - Utilities: Loading states */
    .aw-content-image__img--loading {
      opacity: 0;
      transition: opacity var(--aw-transition-duration-slow, 0.3s) var(--aw-transition-timing-ease, ease);
    }

    .aw-content-image__img--loaded {
      opacity: 1;
    }

    /* ITCSS - Utilities: Responsive aspect ratios */
    .aw-content-image--aspect-square {
      aspect-ratio: 1;
    }

    .aw-content-image--aspect-portrait {
      aspect-ratio: 3/4;
    }

    .aw-content-image--aspect-landscape {
      aspect-ratio: 4/3;
    }

    .aw-content-image--aspect-wide {
      aspect-ratio: 21/9;
    }

    .aw-content-image--aspect-video {
      aspect-ratio: 16/9;
    }

    /* ITCSS - Utilities: Error state */
    .aw-content-image--error {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--aw-color-neutral-600, #525252);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }
  `;

  /**
   * The image source URL (Contentful asset URL)
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-content-image src="https://images.ctfassets.net/abc123"></aw-content-image>
   * ```
   */
  @property() src: string = '';

  /**
   * The image title for context and accessibility
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-content-image title="Project Hero Image"></aw-content-image>
   * ```
   */
  @property() title: string = '';

  /**
   * Alternative text for accessibility
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-content-image alt="Description of the image"></aw-content-image>
   * ```
   */
  @property() alt: string = '';

  /**
   * The image width for optimization (passed to Contentful)
   * @type {string | number}
   * @default 1920
   * @example
   * ```html
   * <aw-content-image width="800"></aw-content-image>
   * ```
   */
  @property() width: string | number = 1920;

  /**
   * The image height for optimization (passed to Contentful)
   * @type {string | number}
   * @default 1280
   * @example
   * ```html
   * <aw-content-image height="600"></aw-content-image>
   * ```
   */
  @property() height: string | number = 1280;

  /**
   * The sizes attribute for responsive images
   * @type {string}
   * @default "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   * @example
   * ```html
   * <aw-content-image sizes="(max-width: 768px) 100vw, 50vw"></aw-content-image>
   * ```
   */
  @property() sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

  /**
   * The loading strategy for the image
   * @type {'lazy' | 'eager'}
   * @default 'lazy'
   * @example
   * ```html
   * <aw-content-image loading="eager"></aw-content-image>
   * ```
   */
  @property() loading: 'lazy' | 'eager' = 'lazy';

  /**
   * The aspect ratio of the image container
   * @type {'square' | 'portrait' | 'landscape' | 'wide' | 'video'}
   * @default 'video'
   * @example
   * ```html
   * <aw-content-image aspect_ratio="square"></aw-content-image>
   * ```
   */
  @property() aspect_ratio: 'square' | 'portrait' | 'landscape' | 'wide' | 'video' = 'video';

  /**
   * Whether to animate the image when it becomes visible
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-content-image animate_on_visible></aw-content-image>
   * ```
   */
  @property({ type: Boolean }) animate_on_visible: boolean = true;

  /**
   * Animation duration in seconds
   * @type {string}
   * @default '0.6'
   * @example
   * ```html
   * <aw-content-image animation_duration="1.0"></aw-content-image>
   * ```
   */
  @property() animation_duration: string = '0.6';

  /**
   * The image quality for Contentful optimization (1-100)
   * @type {number}
   * @default 75
   * @example
   * ```html
   * <aw-content-image quality="90"></aw-content-image>
   * ```
   */
  @property({ type: Number }) quality: number = 75;

  /**
   * Internal state for visibility tracking
   * @private
   */
  @state() private isVisible: boolean = false;

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
   * Intersection Observer for visibility detection
   * @private
   */
  private observer: IntersectionObserver | null = null;

  /**
   * Lifecycle method - called when element is added to DOM
   * @protected
   */
  connectedCallback() {
    super.connectedCallback();
    
    if (this.animate_on_visible) {
      this.setupIntersectionObserver();
    } else {
      this.isVisible = true;
    }
  }

  /**
   * Lifecycle method - called when element is removed from DOM
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  /**
   * Sets up intersection observer for animation on scroll
   * @private
   */
  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    this.observer.observe(this);
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
    
    const event = new CustomEvent('aw-content-image-load', {
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
    
    const event = new CustomEvent('aw-content-image-error', {
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
      'aw-content-image': true,
      [`aw-content-image--aspect-${this.aspect_ratio}`]: true,
      'aw-content-image--animate': this.animate_on_visible,
      'aw-content-image--visible': this.isVisible,
      'aw-content-image--error': this.imageError,
    };

    const imageClasses = {
      'aw-content-image__img': true,
      'aw-content-image__img--loading': !this.imageLoaded && !this.imageError,
      'aw-content-image__img--loaded': this.imageLoaded,
    };

    if (this.imageError) {
      return html`
        <div 
          class=${classMap(containerClasses)}
          style="--animation-duration: ${this.animation_duration}s"
        >
          <div class="aw-content-image__error">
            Image failed to load
          </div>
        </div>
      `;
    }

    return html`
      <div 
        class=${classMap(containerClasses)}
        style="--animation-duration: ${this.animation_duration}s"
      >
        <div class="aw-content-image__container">
          <div class="aw-content-image__wrapper">
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
    'aw-content-image': AwContentImage;
  }
}