import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type EmbedType = 'iframe' | 'video' | 'audio' | 'document' | 'widget';
export type EmbedAspectRatio = '16:9' | '4:3' | '1:1' | '9:16' | 'auto';
export type EmbedVariant = 'default' | 'framed' | 'minimal' | 'card';

export interface EmbedData {
  url: string;
  title?: string;
  description?: string;
  caption?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  provider?: string;
  embed_type?: EmbedType;
}

/**
 * A flexible embed block component for displaying external content via iframes,
 * videos, documents, and other embeddable media with security considerations.
 * 
 * @slot caption - Custom caption content
 * @slot placeholder - Custom placeholder content shown before load
 * @slot error - Custom error message content
 * 
 * @cssproperty --aw-embed-bg-color - Background color
 * @cssproperty --aw-embed-border-radius - Border radius
 * @cssproperty --aw-embed-caption-color - Caption text color
 * @cssproperty --aw-embed-placeholder-bg - Placeholder background color
 */
@customElement('aw-block-embed')
export class AwBlockEmbed extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .embed-block {
      position: relative;
      width: 100%;
      margin: 0;
      background: var(--aw-embed-bg-color, transparent);
      border-radius: var(--aw-embed-border-radius, 8px);
      overflow: hidden;
    }

    .embed-block--responsive .embed-block__container {
      position: relative;
      width: 100%;
    }

    .embed-block--16x9 .embed-block__media {
      aspect-ratio: 16 / 9;
    }

    .embed-block--4x3 .embed-block__media {
      aspect-ratio: 4 / 3;
    }

    .embed-block--1x1 .embed-block__media {
      aspect-ratio: 1 / 1;
    }

    .embed-block--9x16 .embed-block__media {
      aspect-ratio: 9 / 16;
    }

    .embed-block__media {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .embed-block__iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    .embed-block__placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--aw-embed-placeholder-bg, rgba(0, 0, 0, 0.1));
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .embed-block__placeholder:hover {
      background: var(--aw-embed-placeholder-bg, rgba(0, 0, 0, 0.2));
    }

    .embed-block__placeholder-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .embed-block__placeholder-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
    }

    .embed-block__placeholder-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      fill: currentColor;
      opacity: 0.8;
    }

    .embed-block__placeholder-title {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .embed-block__placeholder-description {
      margin: 0 0 1.5rem;
      opacity: 0.8;
    }

    .embed-block__activate-button {
      background: var(--aw-button-bg-color, #007bff);
      color: var(--aw-button-text-color, white);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .embed-block__activate-button:hover {
      background: var(--aw-button-hover-bg-color, #0056b3);
    }

    .embed-block__loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--aw-embed-placeholder-bg, rgba(255, 255, 255, 0.9));
    }

    .embed-block__loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--aw-border-color, #e0e0e0);
      border-top-color: var(--aw-primary-color, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .embed-block__loading-text {
      margin: 1rem 0 0;
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .embed-block__error {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--aw-error-bg-color, #fff5f5);
      color: var(--aw-error-text-color, #d32f2f);
    }

    .embed-block__error-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      fill: currentColor;
      opacity: 0.8;
    }

    .embed-block__caption {
      padding: 1rem 0 0;
      color: var(--aw-embed-caption-color, var(--aw-text-secondary, #666));
    }

    .embed-block__caption-title {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--aw-text-primary, inherit);
    }

    .embed-block__caption-text {
      margin: 0;
      font-size: 0.875rem;
    }

    .embed-block--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .embed-block--framed {
      border: 1px solid var(--aw-border-color, #e0e0e0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .embed-block--card {
      background: var(--aw-surface-color, white);
      border: 1px solid var(--aw-border-color, #e0e0e0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .embed-block--minimal {
      background: transparent;
      border-radius: 0;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 768px) {
      .embed-block__placeholder-content {
        padding: 1rem;
      }

      .embed-block__placeholder-icon {
        width: 48px;
        height: 48px;
      }

      .embed-block__placeholder-title {
        font-size: 1.125rem;
      }
    }
  `;

  /**
   * Embed URL
   */
  @property({ type: String, attribute: 'embed-url' })
  embedUrl = '';

  /**
   * Embed title
   */
  @property({ type: String, attribute: 'embed-title' })
  embedTitle = '';

  /**
   * Embed description
   */
  @property({ type: String, attribute: 'embed-description' })
  embedDescription = '';

  /**
   * Caption text
   */
  @property({ type: String, attribute: 'caption-text' })
  captionText = '';

  /**
   * Embed data object (alternative to individual props)
   */
  @property({ type: Object, attribute: 'embed-data' })
  embedData?: EmbedData;

  /**
   * Embed type
   */
  @property({ type: String, attribute: 'embed-type' })
  embedType: EmbedType = 'iframe';

  /**
   * Aspect ratio for the embed container
   */
  @property({ type: String, attribute: 'aspect-ratio' })
  aspectRatio: EmbedAspectRatio = '16:9';

  /**
   * Visual variant
   */
  @property({ type: String })
  variant: EmbedVariant = 'default';

  /**
   * Enable lazy loading
   */
  @property({ type: Boolean, attribute: 'lazy-load' })
  lazyLoad = true;

  /**
   * Enable sandbox mode for iframe security
   */
  @property({ type: Boolean, attribute: 'enable-sandbox' })
  enableSandbox = true;

  /**
   * Custom sandbox permissions
   */
  @property({ type: String, attribute: 'sandbox-permissions' })
  sandboxPermissions = 'allow-scripts allow-same-origin allow-forms';

  /**
   * Show loading placeholder
   */
  @property({ type: Boolean, attribute: 'show-placeholder' })
  showPlaceholder = true;

  /**
   * Custom placeholder image URL
   */
  @property({ type: String, attribute: 'placeholder-image' })
  placeholderImage = '';

  /**
   * Allow fullscreen mode
   */
  @property({ type: Boolean, attribute: 'allow-fullscreen' })
  allowFullscreen = true;

  /**
   * Custom width (overrides aspect ratio)
   */
  @property({ type: Number, attribute: 'custom-width' })
  customWidth = 0;

  /**
   * Custom height (overrides aspect ratio)
   */
  @property({ type: Number, attribute: 'custom-height' })
  customHeight = 0;

  /**
   * Enable responsive sizing
   */
  @property({ type: Boolean })
  responsive = true;

  /**
   * Referrer policy
   */
  @property({ type: String, attribute: 'referrer-policy' })
  referrerPolicy = 'no-referrer-when-downgrade';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * CSS class for custom styling
   */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /**
   * Loading state
   */
  @state()
  private isLoading = true;

  /**
   * Error state
   */
  @state()
  private hasError = false;

  /**
   * Whether embed has been activated (for lazy loading)
   */
  @state()
  private isActivated = false;

  private get effectiveEmbedData(): EmbedData {
    if (this.embedData) {
      return this.embedData;
    }

    return {
      url: this.embedUrl,
      title: this.embedTitle,
      description: this.embedDescription,
      caption: this.captionText,
      width: this.customWidth || undefined,
      height: this.customHeight || undefined,
      thumbnail: this.placeholderImage || undefined,
      embed_type: this.embedType
    };
  }

  private handleIframeLoad = (e: Event) => {
    this.isLoading = false;
    this.hasError = false;

    const embedData = this.effectiveEmbedData;

    this.dispatchEvent(new CustomEvent('aw-embed-load', {
      detail: {
        url: embedData.url,
        title: embedData.title || '',
        type: embedData.embed_type || this.embedType,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleIframeError = (e: Event) => {
    this.isLoading = false;
    this.hasError = true;

    const embedData = this.effectiveEmbedData;

    this.dispatchEvent(new CustomEvent('aw-embed-error', {
      detail: {
        url: embedData.url,
        title: embedData.title || '',
        error: 'Failed to load embed content',
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleActivate = (e: MouseEvent | KeyboardEvent) => {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this.isActivated = true;

    const embedData = this.effectiveEmbedData;

    this.dispatchEvent(new CustomEvent('aw-embed-activate', {
      detail: {
        url: embedData.url,
        title: embedData.title || '',
        type: embedData.embed_type || this.embedType,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleClick = (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-embed-interaction', {
      detail: {
        type: 'click',
        url: this.effectiveEmbedData.url,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleHover = (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-embed-interaction', {
      detail: {
        type: 'hover',
        url: this.effectiveEmbedData.url,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleFocus = (e: FocusEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('aw-embed-interaction', {
      detail: {
        type: 'focus',
        url: this.effectiveEmbedData.url,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      this.handleActivate(e);
    }
  };

  private isUrlSafe(url: string): boolean {
    try {
      const urlObj = new URL(url);
      // Basic security checks
      return (
        (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') &&
        !url.includes('javascript:') &&
        !url.includes('data:') &&
        !url.includes('vbscript:')
      );
    } catch {
      return false;
    }
  }

  private renderPlaceholder() {
    if (!this.showPlaceholder || this.isActivated) return nothing;

    const embedData = this.effectiveEmbedData;

    return html`
      <div 
        class="embed-block__placeholder"
        @click=${this.handleActivate}
        @keydown=${this.handleKeyPress}
        tabindex=${this.disabled ? -1 : 0}
        role="button"
        aria-label=${`Load ${embedData.title || 'embed content'}`}
      >
        ${embedData.thumbnail ? html`
          <img 
            src=${embedData.thumbnail}
            alt=${`${embedData.title} thumbnail`}
            class="embed-block__placeholder-image"
          />
        ` : nothing}
        
        <div class="embed-block__placeholder-content">
          <slot name="placeholder">
            <div class="embed-block__placeholder-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            
            ${embedData.title ? html`
              <h4 class="embed-block__placeholder-title">${embedData.title}</h4>
            ` : nothing}
            
            ${embedData.description ? html`
              <p class="embed-block__placeholder-description">
                ${embedData.description}
              </p>
            ` : nothing}
            
            <button 
              class="embed-block__activate-button"
              @click=${this.handleActivate}
              ?disabled=${this.disabled}
            >
              Load Content
            </button>
          </slot>
        </div>
      </div>
    `;
  }

  private renderEmbed() {
    if (this.lazyLoad && !this.isActivated) return nothing;

    const embedData = this.effectiveEmbedData;
    
    if (!embedData.url || !this.isUrlSafe(embedData.url)) {
      return this.renderError('Invalid or unsafe URL');
    }

    const iframeAttributes: Record<string, any> = {
      src: embedData.url,
      title: embedData.title || 'Embedded content',
      loading: 'lazy',
      referrerpolicy: this.referrerPolicy,
    };

    if (this.enableSandbox) {
      iframeAttributes.sandbox = this.sandboxPermissions;
    }

    if (this.allowFullscreen) {
      iframeAttributes.allowfullscreen = true;
    }

    if (embedData.width && embedData.height) {
      iframeAttributes.width = embedData.width.toString();
      iframeAttributes.height = embedData.height.toString();
    }

    return html`
      <iframe
        class="embed-block__iframe"
        src=${embedData.url}
        title=${embedData.title || 'Embedded content'}
        loading="lazy"
        referrerpolicy=${this.referrerPolicy}
        sandbox=${this.enableSandbox ? this.sandboxPermissions : nothing}
        ?allowfullscreen=${this.allowFullscreen}
        width=${embedData.width ? embedData.width.toString() : nothing}
        height=${embedData.height ? embedData.height.toString() : nothing}
        @load=${this.handleIframeLoad}
        @error=${this.handleIframeError}
        @click=${this.handleClick}
        @mouseenter=${this.handleHover}
        @focus=${this.handleFocus}
      ></iframe>
    `;
  }

  private renderError(message?: string) {
    return html`
      <div class="embed-block__error">
        <slot name="error">
          <div class="embed-block__error-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p class="embed-block__error-message">
            ${message || 'Failed to load embed content'}
          </p>
        </slot>
      </div>
    `;
  }

  private renderCaption() {
    const embedData = this.effectiveEmbedData;
    if (!embedData.caption && !embedData.title && !embedData.description) return nothing;

    return html`
      <figcaption class="embed-block__caption">
        <slot name="caption">
          ${embedData.title ? html`
            <h4 class="embed-block__caption-title">${embedData.title}</h4>
          ` : nothing}
          
          ${embedData.caption ? html`
            <p class="embed-block__caption-text">${embedData.caption}</p>
          ` : nothing}
          
          ${embedData.description && !embedData.caption ? html`
            <p class="embed-block__caption-text">${embedData.description}</p>
          ` : nothing}
        </slot>
      </figcaption>
    `;
  }

  private renderLoadingState() {
    if (!this.isLoading || !this.isActivated) return nothing;

    return html`
      <div class="embed-block__loading">
        <div class="embed-block__loading-spinner" aria-hidden="true"></div>
        <p class="embed-block__loading-text">Loading content...</p>
      </div>
    `;
  }

  render() {
    const embedData = this.effectiveEmbedData;

    const classes = {
      'embed-block': true,
      [`embed-block--${this.aspectRatio.replace(':', 'x')}`]: !embedData.width || !embedData.height,
      [`embed-block--${this.variant}`]: true,
      [`embed-block--${embedData.embed_type || this.embedType}`]: true,
      'embed-block--responsive': this.responsive,
      'embed-block--activated': this.isActivated,
      'embed-block--loading': this.isLoading,
      'embed-block--error': this.hasError,
      'embed-block--disabled': this.disabled,
      [this.cssClass]: !!this.cssClass
    };

    return html`
      <figure 
        class=${classMap(classes)}
        role="figure"
        aria-label=${embedData.title || 'Embedded content'}
        aria-busy=${this.isLoading ? 'true' : 'false'}
      >
        <div class="embed-block__container">
          <div class="embed-block__media">
            ${this.renderPlaceholder()}
            ${this.renderEmbed()}
            ${this.renderLoadingState()}
            ${this.hasError ? this.renderError() : nothing}
          </div>
        </div>
        
        ${this.renderCaption()}
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-embed': AwBlockEmbed;
  }
}