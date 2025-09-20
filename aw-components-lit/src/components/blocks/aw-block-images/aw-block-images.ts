import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ImageGridLayout = 'basic' | 'masonry' | 'mosaic' | 'carousel' | 'gallery';
export type ImageGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type ImageAspect = 'square' | 'landscape' | 'portrait' | 'auto';

export interface ImageItem {
  url: string;
  title?: string;
  description?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ImagesCollectionData {
  imagesCollection?: {
    items: ImageItem[];
  };
  title?: string;
  description?: string;
}

/**
 * A flexible images gallery component that displays multiple images in various layouts.
 * Supports grid layouts, image galleries, and individual image interactions.
 * 
 * @slot title - Custom title content
 * @slot images - Custom images content
 * @slot image-{index} - Individual image slot for custom content
 * 
 * @cssproperty --aw-images-gap - Gap between images
 * @cssproperty --aw-images-border-radius - Border radius for images
 * @cssproperty --aw-images-hover-scale - Scale transform on hover
 * @cssproperty --aw-images-caption-bg - Caption background color
 */
@customElement('aw-block-images')
export class AwBlockImages extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .images-block {
      width: 100%;
    }

    .images-block__header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .images-block__title {
      margin: 0 0 1rem;
      font-size: 2rem;
      font-weight: 600;
      color: var(--aw-text-primary, #000);
    }

    .images-block__description {
      margin: 0;
      font-size: 1.125rem;
      color: var(--aw-text-secondary, #666);
      line-height: 1.6;
    }

    .images-block__content {
      width: 100%;
    }

    .images-block__empty {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--aw-text-secondary, #666);
    }

    /* Grid Layout */
    .images-block__grid {
      display: grid;
      width: 100%;
    }

    .images-block__grid--cols-1 { grid-template-columns: 1fr; }
    .images-block__grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
    .images-block__grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
    .images-block__grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
    .images-block__grid--cols-5 { grid-template-columns: repeat(5, 1fr); }
    .images-block__grid--cols-6 { grid-template-columns: repeat(6, 1fr); }

    .images-block__grid--gap-none { gap: 0; }
    .images-block__grid--gap-sm { gap: var(--aw-images-gap, 0.5rem); }
    .images-block__grid--gap-md { gap: var(--aw-images-gap, 1rem); }
    .images-block__grid--gap-lg { gap: var(--aw-images-gap, 1.5rem); }
    .images-block__grid--gap-xl { gap: var(--aw-images-gap, 2rem); }

    /* Masonry Layout */
    .images-block__masonry {
      columns: var(--masonry-columns, 3);
      column-gap: var(--aw-images-gap, 1rem);
    }

    .images-block__masonry--cols-1 { --masonry-columns: 1; }
    .images-block__masonry--cols-2 { --masonry-columns: 2; }
    .images-block__masonry--cols-3 { --masonry-columns: 3; }
    .images-block__masonry--cols-4 { --masonry-columns: 4; }
    .images-block__masonry--cols-5 { --masonry-columns: 5; }
    .images-block__masonry--cols-6 { --masonry-columns: 6; }

    .images-block__masonry-item {
      break-inside: avoid;
      margin-bottom: var(--aw-images-gap, 1rem);
      display: inline-block;
      width: 100%;
    }

    /* Image Container */
    .images-block__image-container {
      position: relative;
      margin: 0;
      overflow: hidden;
      border-radius: var(--aw-images-border-radius, 8px);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .images-block--hover-effects .images-block__image-container:hover {
      transform: scale(var(--aw-images-hover-scale, 1.02));
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .images-block--lightbox .images-block__image-container {
      cursor: pointer;
    }

    .images-block--lightbox .images-block__image-container:focus {
      outline: 2px solid var(--aw-focus-color, #007bff);
      outline-offset: 2px;
    }

    /* Aspect Ratios */
    .images-block__grid--aspect-square .images-block__image-wrapper {
      aspect-ratio: 1 / 1;
    }

    .images-block__grid--aspect-landscape .images-block__image-wrapper {
      aspect-ratio: 16 / 9;
    }

    .images-block__grid--aspect-portrait .images-block__image-wrapper {
      aspect-ratio: 3 / 4;
    }

    .images-block__image-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .images-block__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: all 0.2s ease;
    }

    .images-block--hover-effects .images-block__image:hover {
      transform: scale(1.05);
    }

    /* Captions */
    .images-block__image-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--aw-images-caption-bg, linear-gradient(transparent, rgba(0, 0, 0, 0.7)));
      color: white;
      padding: 1rem;
      transform: translateY(100%);
      transition: transform 0.2s ease;
    }

    .images-block__image-container:hover .images-block__image-caption {
      transform: translateY(0);
    }

    .images-block__image-title {
      margin: 0 0 0.25rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .images-block__image-text {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    /* Disabled State */
    .images-block--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .images-block__grid--cols-3 { grid-template-columns: repeat(2, 1fr); }
      .images-block__grid--cols-4 { grid-template-columns: repeat(2, 1fr); }
      .images-block__grid--cols-5 { grid-template-columns: repeat(2, 1fr); }
      .images-block__grid--cols-6 { grid-template-columns: repeat(2, 1fr); }
      
      .images-block__masonry--cols-3 { --masonry-columns: 2; }
      .images-block__masonry--cols-4 { --masonry-columns: 2; }
      .images-block__masonry--cols-5 { --masonry-columns: 2; }
      .images-block__masonry--cols-6 { --masonry-columns: 2; }
    }

    @media (max-width: 480px) {
      .images-block__grid {
        grid-template-columns: 1fr !important;
      }
      
      .images-block__masonry {
        --masonry-columns: 1 !important;
      }

      .images-block__title {
        font-size: 1.5rem;
      }
    }
  `;

  /**
   * Images collection data
   */
  @property({ type: Object, attribute: 'images-data' })
  imagesData: ImagesCollectionData = {};

  /**
   * Array of image items (alternative to imagesData)
   */
  @property({ type: Array, attribute: 'image-items' })
  imageItems: ImageItem[] = [];

  /**
   * Grid layout type
   */
  @property({ type: String })
  layout: ImageGridLayout = 'basic';

  /**
   * Number of columns for grid layout
   */
  @property({ type: Number })
  columns = 3;

  /**
   * Gap between images
   */
  @property({ type: String })
  gap: ImageGap = 'md';

  /**
   * Image aspect ratio
   */
  @property({ type: String, attribute: 'image-aspect' })
  imageAspect: ImageAspect = 'auto';

  /**
   * Show image titles
   */
  @property({ type: Boolean, attribute: 'show-titles' })
  showTitles = true;

  /**
   * Show image captions
   */
  @property({ type: Boolean, attribute: 'show-captions' })
  showCaptions = true;

  /**
   * Show main title
   */
  @property({ type: Boolean, attribute: 'show-main-title' })
  showMainTitle = true;

  /**
   * Show main description
   */
  @property({ type: Boolean, attribute: 'show-description' })
  showDescription = false;

  /**
   * Custom title override
   */
  @property({ type: String, attribute: 'custom-title' })
  customTitle = '';

  /**
   * Custom description override
   */
  @property({ type: String, attribute: 'custom-description' })
  customDescription = '';

  /**
   * Enable lazy loading for images
   */
  @property({ type: Boolean, attribute: 'lazy-loading' })
  lazyLoading = true;

  /**
   * Enable hover effects
   */
  @property({ type: Boolean, attribute: 'hover-effects' })
  hoverEffects = true;

  /**
   * Enable image click/zoom
   */
  @property({ type: Boolean, attribute: 'enable-lightbox' })
  enableLightbox = false;

  /**
   * Blur amount for blend effect (0-10)
   */
  @property({ type: Number, attribute: 'blur-amount' })
  blurAmount = 0;

  /**
   * Opacity for blend effect (0-1)
   */
  @property({ type: Number, attribute: 'blend-opacity' })
  blendOpacity = 1;

  /**
   * Background blend mode
   */
  @property({ type: String, attribute: 'blend-mode' })
  blendMode = 'normal';

  /**
   * CSS class for custom styling
   */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private get effectiveImageItems(): ImageItem[] {
    if (this.imageItems && this.imageItems.length > 0) {
      return this.imageItems;
    }
    return this.imagesData?.imagesCollection?.items || [];
  }

  private handleImageClick = (image: ImageItem, index: number) => (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-image-click', {
      detail: {
        image,
        index,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleImageLoad = (image: ImageItem, index: number) => (e: Event) => {
    this.dispatchEvent(new CustomEvent('aw-image-load', {
      detail: {
        image,
        index,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleImageError = (image: ImageItem, index: number) => (e: Event) => {
    this.dispatchEvent(new CustomEvent('aw-image-error', {
      detail: {
        image,
        index,
        error: 'Failed to load image',
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleImageHover = (index: number) => (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-gallery-interaction', {
      detail: {
        action: 'hover',
        imageIndex: index,
        totalImages: this.effectiveImageItems.length,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleImageFocus = (index: number) => (e: FocusEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-gallery-interaction', {
      detail: {
        action: 'focus',
        imageIndex: index,
        totalImages: this.effectiveImageItems.length,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private getImageStyle(image: ImageItem) {
    const style: any = {};

    if (this.blurAmount > 0) {
      style.filter = `blur(${this.blurAmount}px)`;
    }

    if (this.blendOpacity < 1) {
      style.opacity = this.blendOpacity.toString();
    }

    if (this.blendMode !== 'normal') {
      style.mixBlendMode = this.blendMode;
    }

    return style;
  }

  private renderTitle() {
    const title = this.customTitle || this.imagesData?.title;
    if (!this.showMainTitle || !title) return nothing;

    return html`
      <h2 class="images-block__title">
        <slot name="title">${title}</slot>
      </h2>
    `;
  }

  private renderDescription() {
    const description = this.customDescription || this.imagesData?.description;
    if (!this.showDescription || !description) return nothing;

    return html`
      <p class="images-block__description">${description}</p>
    `;
  }

  private renderImageCaption(image: ImageItem, index: number) {
    if (!this.showCaptions && !this.showTitles) return nothing;

    const hasTitle = this.showTitles && image.title;
    const hasCaption = this.showCaptions && image.caption;

    if (!hasTitle && !hasCaption) return nothing;

    return html`
      <figcaption class="images-block__image-caption">
        ${hasTitle ? html`
          <h4 class="images-block__image-title">${image.title}</h4>
        ` : nothing}
        ${hasCaption && image.caption !== image.title ? html`
          <p class="images-block__image-text">${image.caption}</p>
        ` : nothing}
      </figcaption>
    `;
  }

  private renderGridLayout() {
    const gridClasses = {
      'images-block__grid': true,
      [`images-block__grid--${this.layout}`]: true,
      [`images-block__grid--cols-${this.columns}`]: true,
      [`images-block__grid--gap-${this.gap}`]: true,
      [`images-block__grid--aspect-${this.imageAspect}`]: true
    };

    return html`
      <div class=${classMap(gridClasses)}>
        ${this.effectiveImageItems.map((image, index) => html`
          <figure 
            class="images-block__image-container"
            @click=${this.handleImageClick(image, index)}
            @mouseenter=${this.handleImageHover(index)}
            @focus=${this.handleImageFocus(index)}
            tabindex=${this.enableLightbox && !this.disabled ? 0 : -1}
            role=${this.enableLightbox ? 'button' : 'img'}
            aria-label=${image.alt || image.title || `Image ${index + 1}`}
          >
            <div class="images-block__image-wrapper">
              <slot name=${`image-${index}`}>
                <img
                  src=${image.url}
                  alt=${image.alt || image.title || `Image ${index + 1}`}
                  title=${image.title || ''}
                  loading=${this.lazyLoading ? 'lazy' : 'eager'}
                  class="images-block__image"
                  style=${styleMap(this.getImageStyle(image))}
                  @load=${this.handleImageLoad(image, index)}
                  @error=${this.handleImageError(image, index)}
                />
              </slot>
              
              ${this.renderImageCaption(image, index)}
            </div>
          </figure>
        `)}
      </div>
    `;
  }

  private renderMasonryLayout() {
    const masonryClasses = {
      'images-block__masonry': true,
      [`images-block__masonry--cols-${this.columns}`]: true,
      [`images-block__masonry--gap-${this.gap}`]: true
    };

    return html`
      <div class=${classMap(masonryClasses)}>
        ${this.effectiveImageItems.map((image, index) => html`
          <figure 
            class="images-block__masonry-item"
            @click=${this.handleImageClick(image, index)}
            @mouseenter=${this.handleImageHover(index)}
            @focus=${this.handleImageFocus(index)}
            tabindex=${this.enableLightbox && !this.disabled ? 0 : -1}
          >
            <div class="images-block__image-wrapper">
              <slot name=${`image-${index}`}>
                <img
                  src=${image.url}
                  alt=${image.alt || image.title || `Image ${index + 1}`}
                  title=${image.title || ''}
                  loading=${this.lazyLoading ? 'lazy' : 'eager'}
                  class="images-block__image"
                  style=${styleMap(this.getImageStyle(image))}
                  @load=${this.handleImageLoad(image, index)}
                  @error=${this.handleImageError(image, index)}
                />
              </slot>
              
              ${this.renderImageCaption(image, index)}
            </div>
          </figure>
        `)}
      </div>
    `;
  }

  private renderImagesByLayout() {
    if (this.effectiveImageItems.length === 0) {
      return html`
        <div class="images-block__empty">
          <p>No images available.</p>
        </div>
      `;
    }

    switch (this.layout) {
      case 'masonry':
        return this.renderMasonryLayout();
      case 'mosaic':
        return this.renderGridLayout(); // TODO: Implement mosaic-specific layout
      case 'carousel':
        return this.renderGridLayout(); // TODO: Implement carousel layout
      case 'gallery':
        return this.renderGridLayout(); // TODO: Implement gallery-specific layout
      case 'basic':
      default:
        return this.renderGridLayout();
    }
  }

  render() {
    const blockClasses = {
      'images-block': true,
      [`images-block--${this.layout}`]: true,
      'images-block--hover-effects': this.hoverEffects,
      'images-block--lightbox': this.enableLightbox,
      'images-block--disabled': this.disabled,
      [this.cssClass]: !!this.cssClass
    };

    return html`
      <section 
        class=${classMap(blockClasses)}
        role="region"
        aria-label="Image gallery"
        aria-disabled=${this.disabled.toString()}
      >
        ${this.showMainTitle || this.showDescription ? html`
          <header class="images-block__header">
            ${this.renderTitle()}
            ${this.renderDescription()}
          </header>
        ` : nothing}

        <div class="images-block__content">
          <slot name="images">
            ${this.renderImagesByLayout()}
          </slot>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-images': AwBlockImages;
  }
}