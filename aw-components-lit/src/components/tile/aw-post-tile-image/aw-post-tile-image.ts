import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview AW Post Tile Image Component
 * 
 * A post tile component with animated image reveal on hover.
 * Supports hover animations, blend modes, and responsive design.
 * 
 * @example
 * ```html
 * <!-- Basic post tile with image -->
 * <aw-post-tile-image 
 *   title="Project Title"
 *   subtitle="Project Description"
 *   slug="project-slug"
 *   image_src="https://images.ctfassets.net/image-id"
 *   image_alt="Project cover image">
 * </aw-post-tile-image>
 * 
 * <!-- With custom aspect ratio and animation -->
 * <aw-post-tile-image 
 *   title="Featured Project"
 *   subtitle="An amazing project showcase"
 *   slug="featured-project"
 *   image_src="https://images.ctfassets.net/image-id"
 *   aspect_ratio="16:9"
 *   hover_animation_duration="0.5"
 *   hover_easing="cubic-bezier(0.16, 1, 0.3, 1)">
 * </aw-post-tile-image>
 * 
 * <!-- With custom colors and blend mode -->
 * <aw-post-tile-image 
 *   title="Styled Tile"
 *   subtitle="Custom styling example"
 *   slug="styled-tile"
 *   image_src="https://images.ctfassets.net/image-id"
 *   surface_color="var(--surface3)"
 *   text_color="var(--text-color)"
 *   background_color="var(--background-color)"
 *   blend_mode="multiply">
 * </aw-post-tile-image>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-post-tile-image')
export class AwPostTileImage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-post-tile-image */
    .aw-post-tile-image {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: var(--aw-border-radius-lg, 1rem);
      background-color: var(--surface-color, var(--aw-color-neutral-100, #f5f5f5));
      text-decoration: none;
      color: inherit;
      transition: transform var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-post-tile-image:hover {
      transform: translateY(-2px);
    }

    .aw-post-tile-image:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Image container */
    .aw-post-tile-image__image-container {
      position: relative;
      width: 100%;
      aspect-ratio: var(--aspect-ratio, 16/9);
      overflow: hidden;
    }

    .aw-post-tile-image__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      mix-blend-mode: var(--blend-mode, normal);
      transition: transform var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Components: Content overlay */
    .aw-post-tile-image__content {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-sm, 0.5rem);
      align-items: flex-start;
      padding: var(--aw-spacing-lg, 1rem);
      width: 100%;
      transform: translateY(var(--content-translate-y, 100%));
      transition: transform var(--hover-animation-duration, 0.33s) var(--hover-easing, cubic-bezier(0.16, 1, 0.3, 1));
    }

    .aw-post-tile-image__title-wrapper {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-post-tile-image__title {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--text-color, var(--aw-color-neutral-900, #171717));
      background-color: var(--background-color, var(--aw-color-neutral-white, #ffffff));
      border-radius: var(--aw-border-radius-md, 0.5rem);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .aw-post-tile-image__subtitle {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-normal, 400);
      line-height: var(--aw-line-height-tight, 1.25);
      color: var(--text-color, var(--aw-color-neutral-900, #171717));
      background-color: var(--background-color, var(--aw-color-neutral-white, #ffffff));
      border-radius: var(--aw-border-radius-md, 0.5rem);
    }

    /* ITCSS - Utilities: Hover states */
    .aw-post-tile-image--hovered .aw-post-tile-image__content {
      transform: translateY(0);
    }

    .aw-post-tile-image:hover .aw-post-tile-image__content {
      transform: translateY(0);
    }

    .aw-post-tile-image:hover .aw-post-tile-image__image {
      transform: scale(1.05);
    }

    /* ITCSS - Utilities: Aspect ratio variations */
    .aw-post-tile-image--aspect-square .aw-post-tile-image__image-container {
      aspect-ratio: 1;
    }

    .aw-post-tile-image--aspect-portrait .aw-post-tile-image__image-container {
      aspect-ratio: 3/4;
    }

    .aw-post-tile-image--aspect-landscape .aw-post-tile-image__image-container {
      aspect-ratio: 4/3;
    }

    .aw-post-tile-image--aspect-wide .aw-post-tile-image__image-container {
      aspect-ratio: 21/9;
    }

    .aw-post-tile-image--aspect-video .aw-post-tile-image__image-container {
      aspect-ratio: 16/9;
    }

    /* ITCSS - Utilities: Loading and error states */
    .aw-post-tile-image__image--loading {
      opacity: 0;
      transition: opacity var(--aw-transition-duration-slow, 0.3s) var(--aw-transition-timing-ease, ease);
    }

    .aw-post-tile-image__image--loaded {
      opacity: 1;
    }

    .aw-post-tile-image--error .aw-post-tile-image__image-container {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--aw-color-neutral-600, #525252);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    /* ITCSS - Utilities: Responsive design */
    @media (max-width: 768px) {
      .aw-post-tile-image__content {
        padding: var(--aw-spacing-md, 0.75rem);
      }

      .aw-post-tile-image__title,
      .aw-post-tile-image__subtitle {
        font-size: var(--aw-font-size-xs, 0.75rem);
        padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-md, 0.75rem);
      }
    }
  `;

  /**
   * The post title
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-image title="Project Title"></aw-post-tile-image>
   * ```
   */
  @property() title: string = '';

  /**
   * The post subtitle or description
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-image subtitle="Project description"></aw-post-tile-image>
   * ```
   */
  @property() subtitle: string = '';

  /**
   * The post slug for URL generation
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-image slug="project-slug"></aw-post-tile-image>
   * ```
   */
  @property() slug: string = '';

  /**
   * The image source URL
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-image image_src="https://images.ctfassets.net/abc123"></aw-post-tile-image>
   * ```
   */
  @property() image_src: string = '';

  /**
   * The image alt text
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-image image_alt="Project cover image"></aw-post-tile-image>
   * ```
   */
  @property() image_alt: string = '';

  /**
   * The aspect ratio of the tile
   * @type {'square' | 'portrait' | 'landscape' | 'wide' | 'video' | string}
   * @default 'video'
   * @example
   * ```html
   * <aw-post-tile-image aspect_ratio="16:9"></aw-post-tile-image>
   * ```
   */
  @property() aspect_ratio: 'square' | 'portrait' | 'landscape' | 'wide' | 'video' | string = 'video';

  /**
   * The URL path prefix for links
   * @type {string}
   * @default '/articles/'
   * @example
   * ```html
   * <aw-post-tile-image url_prefix="/projects/"></aw-post-tile-image>
   * ```
   */
  @property() url_prefix: string = '/articles/';

  /**
   * Surface background color CSS variable
   * @type {string}
   * @default 'var(--surface3)'
   * @example
   * ```html
   * <aw-post-tile-image surface_color="var(--surface2)"></aw-post-tile-image>
   * ```
   */
  @property() surface_color: string = 'var(--surface3)';

  /**
   * Text color CSS variable
   * @type {string}
   * @default 'var(--text-color)'
   * @example
   * ```html
   * <aw-post-tile-image text_color="var(--text-color-inv)"></aw-post-tile-image>
   * ```
   */
  @property() text_color: string = 'var(--text-color)';

  /**
   * Background color CSS variable for content elements
   * @type {string}
   * @default 'var(--background-color)'
   * @example
   * ```html
   * <aw-post-tile-image background_color="var(--surface1)"></aw-post-tile-image>
   * ```
   */
  @property() background_color: string = 'var(--background-color)';

  /**
   * CSS mix-blend-mode for the image
   * @type {string}
   * @default 'normal'
   * @example
   * ```html
   * <aw-post-tile-image blend_mode="multiply"></aw-post-tile-image>
   * ```
   */
  @property() blend_mode: string = 'normal';

  /**
   * Hover animation duration in seconds
   * @type {string}
   * @default '0.33s'
   * @example
   * ```html
   * <aw-post-tile-image hover_animation_duration="0.5s"></aw-post-tile-image>
   * ```
   */
  @property() hover_animation_duration: string = '0.33s';

  /**
   * Hover animation easing function
   * @type {string}
   * @default 'cubic-bezier(0.16, 1, 0.3, 1)'
   * @example
   * ```html
   * <aw-post-tile-image hover_easing="ease-out"></aw-post-tile-image>
   * ```
   */
  @property() hover_easing: string = 'cubic-bezier(0.16, 1, 0.3, 1)';

  /**
   * Whether to open link in new tab
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-post-tile-image target_blank></aw-post-tile-image>
   * ```
   */
  @property({ type: Boolean }) target_blank: boolean = false;

  /**
   * Internal state for hover tracking
   * @private
   */
  @state() private isHovered: boolean = false;

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
   * Handles mouse enter events
   * @private
   */
  private handleMouseEnter = () => {
    this.isHovered = true;
    
    const event = new CustomEvent('aw-post-tile-hover', {
      detail: { title: this.title, slug: this.slug, hovered: true },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Handles mouse leave events
   * @private
   */
  private handleMouseLeave = () => {
    this.isHovered = false;
    
    const event = new CustomEvent('aw-post-tile-hover', {
      detail: { title: this.title, slug: this.slug, hovered: false },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Handles click events
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    const clickEvent = new CustomEvent('aw-post-tile-click', {
      detail: { 
        title: this.title, 
        slug: this.slug, 
        url: this.getUrl(),
        originalEvent: event 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  };

  /**
   * Handles image load events
   * @private
   */
  private handleImageLoad = () => {
    this.imageLoaded = true;
    this.imageError = false;
  };

  /**
   * Handles image error events
   * @private
   */
  private handleImageError = () => {
    this.imageError = true;
    this.imageLoaded = false;
  };

  /**
   * Gets the full URL for the post
   * @private
   * @returns {string} The full URL
   */
  private getUrl(): string {
    return this.slug ? `${this.url_prefix}${this.slug}` : '/';
  }

  /**
   * Gets the aspect ratio CSS value
   * @private
   * @returns {string} The CSS aspect ratio
   */
  private getAspectRatio(): string {
    const standardRatios: Record<string, string> = {
      square: '1',
      portrait: '3/4',
      landscape: '4/3',
      wide: '21/9',
      video: '16/9',
    };

    return standardRatios[this.aspect_ratio] || this.aspect_ratio;
  }

  /**
   * Renders the component
   * @returns {TemplateResult} The component template
   * @protected
   */
  render() {
    const containerClasses = {
      'aw-post-tile-image': true,
      'aw-post-tile-image--hovered': this.isHovered,
      'aw-post-tile-image--error': this.imageError,
      [`aw-post-tile-image--aspect-${this.aspect_ratio}`]: ['square', 'portrait', 'landscape', 'wide', 'video'].includes(this.aspect_ratio),
    };

    const imageClasses = {
      'aw-post-tile-image__image': true,
      'aw-post-tile-image__image--loading': !this.imageLoaded && !this.imageError,
      'aw-post-tile-image__image--loaded': this.imageLoaded,
    };

    const cssCustomProperties = {
      '--surface-color': this.surface_color,
      '--text-color': this.text_color,
      '--background-color': this.background_color,
      '--blend-mode': this.blend_mode,
      '--hover-animation-duration': this.hover_animation_duration,
      '--hover-easing': this.hover_easing,
      '--aspect-ratio': this.getAspectRatio(),
    };

    return html`
      <a
        class=${classMap(containerClasses)}
        href=${this.getUrl()}
        target=${ifDefined(this.target_blank ? '_blank' : undefined)}
        rel=${ifDefined(this.target_blank ? 'noopener noreferrer' : undefined)}
        aria-label=${`Read more about ${this.title}`}
        style=${Object.entries(cssCustomProperties)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ')}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @click=${this.handleClick}
      >
        <div class="aw-post-tile-image__image-container">
          ${this.imageError ? html`
            <div>Image failed to load</div>
          ` : html`
            <img
              class=${classMap(imageClasses)}
              src=${this.image_src}
              alt=${this.image_alt || `Cover image for ${this.title}`}
              loading="lazy"
              @load=${this.handleImageLoad}
              @error=${this.handleImageError}
            />
          `}

          <div class="aw-post-tile-image__content">
            <div class="aw-post-tile-image__title-wrapper">
              <h2 class="aw-post-tile-image__title">
                ${this.title}
              </h2>
            </div>

            ${this.subtitle ? html`
              <h3 class="aw-post-tile-image__subtitle">
                ${this.subtitle}
              </h3>
            ` : ''}
          </div>
        </div>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-post-tile-image': AwPostTileImage;
  }
}