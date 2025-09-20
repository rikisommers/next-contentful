import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type HotspotTrigger = 'click' | 'hover' | 'focus';
export type HotspotPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type HotspotStyle = 'dot' | 'pin' | 'pulse' | 'glow' | 'custom';

export interface HotspotData {
  id: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  title?: string;
  content?: string;
  url?: string;
  position?: HotspotPosition;
  trigger?: HotspotTrigger;
  style?: HotspotStyle;
  icon?: string;
  customClass?: string;
}

export interface HotspotImageData {
  imageUrl: string;
  imageAlt?: string;
  imageTitle?: string;
  hotspots: HotspotData[];
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

/**
 * An interactive image component with hotspot markers that can display content,
 * tooltips, or navigate to URLs when clicked or hovered.
 * 
 * @slot image - Custom image content
 * @slot hotspot-{id} - Custom hotspot content
 * @slot tooltip-{id} - Custom tooltip content for hotspot
 * 
 * @cssproperty --aw-hotspot-color - Hotspot marker color
 * @cssproperty --aw-hotspot-border-color - Hotspot marker border color
 * @cssproperty --aw-hotspot-active-color - Active hotspot color
 * @cssproperty --aw-tooltip-bg-color - Tooltip background color
 * @cssproperty --aw-tooltip-text-color - Tooltip text color
 */
@customElement('aw-block-hotspot-image')
export class AwBlockHotspotImage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .hotspot-image {
      position: relative;
      width: 100%;
      margin: 0;
    }

    .hotspot-image--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .hotspot-image__header {
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .hotspot-image__title {
      margin: 0 0 0.5rem;
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--aw-text-primary, #000);
    }

    .hotspot-image__description {
      margin: 0;
      font-size: 1rem;
      color: var(--aw-text-secondary, #666);
      line-height: 1.6;
    }

    .hotspot-image__container {
      position: relative;
      width: 100%;
      display: inline-block;
    }

    .hotspot-image__media {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .hotspot-image__image {
      width: 100%;
      height: auto;
      display: block;
      border-radius: var(--aw-border-radius, 8px);
    }

    .hotspot-image--responsive .hotspot-image__image {
      max-width: 100%;
      height: auto;
    }

    .hotspot-image__loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--aw-surface-color, #f5f5f5);
      border-radius: var(--aw-border-radius, 8px);
    }

    .hotspot-image__loading p {
      margin: 1rem 0 0;
      color: var(--aw-text-secondary, #666);
    }

    .hotspot-image__loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--aw-border-color, #e0e0e0);
      border-top-color: var(--aw-primary-color, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .hotspot-image__error {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--aw-error-bg-color, #fff5f5);
      color: var(--aw-error-text-color, #d32f2f);
      border-radius: var(--aw-border-radius, 8px);
    }

    .hotspot-image__error p {
      margin: 0;
    }

    .hotspot-image__hotspot {
      position: absolute;
      z-index: 1;
    }

    .hotspot-image__marker {
      position: absolute;
      transform: translate(-50%, -50%);
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      z-index: 2;
      transition: all 0.2s ease;
    }

    .hotspot-image__marker:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .hotspot-image__marker:focus {
      outline: 2px solid var(--aw-focus-color, #007bff);
      outline-offset: 2px;
    }

    .hotspot-image__marker--dot .hotspot-image__marker-dot {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--aw-hotspot-color, #007bff);
      border: 3px solid var(--aw-hotspot-border-color, white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
    }

    .hotspot-image__marker--dot:hover .hotspot-image__marker-dot {
      transform: scale(1.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .hotspot-image__marker--dot.hotspot-image__marker--active .hotspot-image__marker-dot {
      background: var(--aw-hotspot-active-color, #dc3545);
      transform: scale(1.1);
    }

    .hotspot-image__marker--pulse .hotspot-image__marker-dot {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--aw-hotspot-color, #007bff);
      border: 3px solid var(--aw-hotspot-border-color, white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .hotspot-image__marker--pulse .hotspot-image__marker-dot::before {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 2px solid var(--aw-hotspot-color, #007bff);
      opacity: 0;
      animation: pulse 2s infinite;
    }

    .hotspot-image__marker--pulse.hotspot-image__marker--active .hotspot-image__marker-dot {
      background: var(--aw-hotspot-active-color, #dc3545);
    }

    .hotspot-image__marker--pulse.hotspot-image__marker--active .hotspot-image__marker-dot::before {
      border-color: var(--aw-hotspot-active-color, #dc3545);
    }

    .hotspot-image__marker--glow .hotspot-image__marker-dot {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--aw-hotspot-color, #007bff);
      border: 3px solid var(--aw-hotspot-border-color, white);
      box-shadow: 
        0 0 8px rgba(0, 123, 255, 0.4),
        0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
    }

    .hotspot-image__marker--glow:hover .hotspot-image__marker-dot {
      box-shadow: 
        0 0 16px rgba(0, 123, 255, 0.6),
        0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .hotspot-image__marker--glow.hotspot-image__marker--active .hotspot-image__marker-dot {
      background: var(--aw-hotspot-active-color, #dc3545);
      box-shadow: 
        0 0 12px rgba(220, 53, 69, 0.5),
        0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .hotspot-image__marker--animated .hotspot-image__marker-dot {
      animation: bounce 1s ease-in-out infinite;
    }

    .hotspot-image__marker--animated:hover .hotspot-image__marker-dot {
      animation: none;
    }

    .hotspot-image__marker-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: var(--aw-hotspot-icon-color, white);
      background: var(--aw-hotspot-color, #007bff);
      border-radius: 50%;
      border: 3px solid var(--aw-hotspot-border-color, white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .hotspot-image__marker-icon svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }

    .hotspot-image__tooltip {
      position: absolute;
      z-index: 10;
      background: var(--aw-tooltip-bg-color, rgba(0, 0, 0, 0.9));
      color: var(--aw-tooltip-text-color, white);
      border-radius: var(--aw-tooltip-border-radius, 6px);
      padding: 0;
      min-width: 200px;
      max-width: 300px;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.9);
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .hotspot-image__tooltip--visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .hotspot-image__tooltip--top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      margin-bottom: 10px;
    }

    .hotspot-image__tooltip--top.hotspot-image__tooltip--visible {
      transform: translateX(-50%) scale(1);
    }

    .hotspot-image__tooltip--bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      margin-top: 10px;
    }

    .hotspot-image__tooltip--bottom.hotspot-image__tooltip--visible {
      transform: translateX(-50%) scale(1);
    }

    .hotspot-image__tooltip--left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
      margin-right: 10px;
    }

    .hotspot-image__tooltip--left.hotspot-image__tooltip--visible {
      transform: translateY(-50%) scale(1);
    }

    .hotspot-image__tooltip--right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
      margin-left: 10px;
    }

    .hotspot-image__tooltip--right.hotspot-image__tooltip--visible {
      transform: translateY(-50%) scale(1);
    }

    .hotspot-image__tooltip--center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
    }

    .hotspot-image__tooltip--center.hotspot-image__tooltip--visible {
      transform: translate(-50%, -50%) scale(1);
    }

    .hotspot-image__tooltip-content {
      padding: 1rem;
    }

    .hotspot-image__tooltip-title {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .hotspot-image__tooltip-text {
      margin: 0 0 0.75rem;
      font-size: 0.875rem;
      line-height: 1.4;
      opacity: 0.9;
    }

    .hotspot-image__tooltip-text:last-child {
      margin-bottom: 0;
    }

    .hotspot-image__tooltip-link {
      display: inline-flex;
      align-items: center;
      color: var(--aw-tooltip-link-color, #66b3ff);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .hotspot-image__tooltip-link:hover {
      color: var(--aw-tooltip-link-hover-color, #99ccff);
    }

    .hotspot-image__tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
    }

    .hotspot-image__tooltip--top .hotspot-image__tooltip-arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--aw-tooltip-bg-color, rgba(0, 0, 0, 0.9));
    }

    .hotspot-image__tooltip--bottom .hotspot-image__tooltip-arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--aw-tooltip-bg-color, rgba(0, 0, 0, 0.9));
    }

    .hotspot-image__tooltip--left .hotspot-image__tooltip-arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: var(--aw-tooltip-bg-color, rgba(0, 0, 0, 0.9));
    }

    .hotspot-image__tooltip--right .hotspot-image__tooltip-arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: var(--aw-tooltip-bg-color, rgba(0, 0, 0, 0.9));
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        transform: scale(1.4);
      }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-4px);
      }
      60% {
        transform: translateY(-2px);
      }
    }

    @media (max-width: 768px) {
      .hotspot-image__tooltip {
        min-width: 180px;
        max-width: 250px;
      }

      .hotspot-image__marker--dot .hotspot-image__marker-dot {
        width: 20px;
        height: 20px;
      }

      .hotspot-image__marker-icon {
        width: 28px;
        height: 28px;
      }

      .hotspot-image__marker-icon svg {
        width: 14px;
        height: 14px;
      }
    }

    @media (max-width: 480px) {
      .hotspot-image__tooltip {
        position: fixed;
        bottom: 10px;
        left: 10px;
        right: 10px;
        top: auto;
        transform: none !important;
        min-width: auto;
        max-width: none;
      }

      .hotspot-image__tooltip--visible {
        transform: none !important;
      }

      .hotspot-image__tooltip-arrow {
        display: none;
      }

      .hotspot-image__title {
        font-size: 1.5rem;
      }
    }
  `;

  /**
   * Hotspot image data
   */
  @property({ type: Object, attribute: 'image-data' })
  imageData: HotspotImageData = { imageUrl: '', hotspots: [] };

  /**
   * Image URL (alternative to imageData)
   */
  @property({ type: String, attribute: 'image-url' })
  imageUrl = '';

  /**
   * Image alt text
   */
  @property({ type: String, attribute: 'image-alt' })
  imageAlt = '';

  /**
   * Image title
   */
  @property({ type: String, attribute: 'image-title' })
  imageTitle = '';

  /**
   * Hotspots array (alternative to imageData.hotspots)
   */
  @property({ type: Array })
  hotspots: HotspotData[] = [];

  /**
   * Main title
   */
  @property({ type: String })
  title = '';

  /**
   * Main description
   */
  @property({ type: String })
  description = '';

  /**
   * Default hotspot trigger
   */
  @property({ type: String, attribute: 'default-trigger' })
  defaultTrigger: HotspotTrigger = 'click';

  /**
   * Default hotspot position
   */
  @property({ type: String, attribute: 'default-position' })
  defaultPosition: HotspotPosition = 'top';

  /**
   * Default hotspot style
   */
  @property({ type: String, attribute: 'default-style' })
  defaultStyle: HotspotStyle = 'dot';

  /**
   * Enable lazy loading for image
   */
  @property({ type: Boolean, attribute: 'lazy-loading' })
  lazyLoading = true;

  /**
   * Show hotspot animations
   */
  @property({ type: Boolean, attribute: 'show-animations' })
  showAnimations = true;

  /**
   * Auto close tooltips after delay (ms, 0 to disable)
   */
  @property({ type: Number, attribute: 'auto-close-delay' })
  autoCloseDelay = 0;

  /**
   * Enable keyboard navigation
   */
  @property({ type: Boolean, attribute: 'keyboard-navigation' })
  keyboardNavigation = true;

  /**
   * Enable responsive scaling
   */
  @property({ type: Boolean })
  responsive = true;

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

  /**
   * Currently active hotspot ID
   */
  @state()
  private activeHotspot: string | null = null;

  /**
   * Image loaded state
   */
  @state()
  private imageLoaded = false;

  /**
   * Image error state
   */
  @state()
  private imageError = false;

  private get effectiveImageData(): HotspotImageData {
    if (this.imageData.imageUrl) {
      return this.imageData;
    }

    return {
      imageUrl: this.imageUrl,
      imageAlt: this.imageAlt,
      imageTitle: this.imageTitle,
      hotspots: this.hotspots,
      title: this.title,
      description: this.description
    };
  }

  private handleImageLoad = (e: Event) => {
    this.imageLoaded = true;
    this.imageError = false;
    
    this.dispatchEvent(new CustomEvent('aw-image-load', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  };

  private handleImageError = (e: Event) => {
    this.imageLoaded = false;
    this.imageError = true;
    
    this.dispatchEvent(new CustomEvent('aw-image-error', {
      detail: {
        error: 'Failed to load image',
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleHotspotClick = (hotspot: HotspotData) => (e: MouseEvent) => {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    // Handle URL navigation
    if (hotspot.url) {
      window.open(hotspot.url, '_blank', 'noopener,noreferrer');
    }

    // Toggle tooltip for click trigger
    if (hotspot.trigger === 'click' || this.defaultTrigger === 'click') {
      this.toggleTooltip(hotspot, e);
    }

    this.dispatchEvent(new CustomEvent('aw-hotspot-click', {
      detail: {
        hotspot,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleHotspotHover = (hotspot: HotspotData, action: 'enter' | 'leave') => (e: MouseEvent) => {
    if (this.disabled) return;

    if (action === 'enter') {
      if (hotspot.trigger === 'hover' || this.defaultTrigger === 'hover') {
        this.showTooltip(hotspot, e);
      }
    } else {
      if (hotspot.trigger === 'hover' || this.defaultTrigger === 'hover') {
        this.hideTooltip(hotspot, e);
      }
    }

    this.dispatchEvent(new CustomEvent('aw-hotspot-hover', {
      detail: {
        hotspot,
        action,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleHotspotFocus = (hotspot: HotspotData, action: 'focus' | 'blur') => (e: FocusEvent) => {
    if (this.disabled) return;

    if (action === 'focus') {
      if (hotspot.trigger === 'focus' || this.defaultTrigger === 'focus') {
        this.showTooltip(hotspot, e);
      }
    } else {
      if (hotspot.trigger === 'focus' || this.defaultTrigger === 'focus') {
        this.hideTooltip(hotspot, e);
      }
    }

    this.dispatchEvent(new CustomEvent('aw-hotspot-focus', {
      detail: {
        hotspot,
        action,
        originalEvent: e
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleKeyPress = (hotspot: HotspotData) => (e: KeyboardEvent) => {
    if (this.disabled || !this.keyboardNavigation) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleHotspotClick(hotspot)(e as any);
    }
    
    if (e.key === 'Escape') {
      this.hideAllTooltips();
    }
  };

  private showTooltip(hotspot: HotspotData, originalEvent: Event) {
    this.activeHotspot = hotspot.id;
    
    this.dispatchEvent(new CustomEvent('aw-tooltip-toggle', {
      detail: {
        hotspot,
        visible: true,
        originalEvent
      },
      bubbles: true,
      composed: true
    }));

    // Auto close after delay
    if (this.autoCloseDelay > 0) {
      setTimeout(() => {
        if (this.activeHotspot === hotspot.id) {
          this.hideTooltip(hotspot, originalEvent);
        }
      }, this.autoCloseDelay);
    }
  }

  private hideTooltip(hotspot: HotspotData, originalEvent: Event) {
    if (this.activeHotspot === hotspot.id) {
      this.activeHotspot = null;
      
      this.dispatchEvent(new CustomEvent('aw-tooltip-toggle', {
        detail: {
          hotspot,
          visible: false,
          originalEvent
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  private toggleTooltip(hotspot: HotspotData, originalEvent: Event) {
    if (this.activeHotspot === hotspot.id) {
      this.hideTooltip(hotspot, originalEvent);
    } else {
      this.showTooltip(hotspot, originalEvent);
    }
  }

  private hideAllTooltips() {
    this.activeHotspot = null;
  }

  private renderHotspotMarker(hotspot: HotspotData) {
    const style = hotspot.style || this.defaultStyle;
    const isActive = this.activeHotspot === hotspot.id;

    const markerClasses = {
      'hotspot-image__marker': true,
      [`hotspot-image__marker--${style}`]: true,
      'hotspot-image__marker--active': isActive,
      'hotspot-image__marker--animated': this.showAnimations,
      [hotspot.customClass || '']: !!hotspot.customClass
    };

    const markerStyles = {
      left: `${hotspot.x}%`,
      top: `${hotspot.y}%`
    };

    return html`
      <button
        class=${classMap(markerClasses)}
        style=${styleMap(markerStyles)}
        @click=${this.handleHotspotClick(hotspot)}
        @mouseenter=${this.handleHotspotHover(hotspot, 'enter')}
        @mouseleave=${this.handleHotspotHover(hotspot, 'leave')}
        @focus=${this.handleHotspotFocus(hotspot, 'focus')}
        @blur=${this.handleHotspotFocus(hotspot, 'blur')}
        @keydown=${this.handleKeyPress(hotspot)}
        ?disabled=${this.disabled}
        aria-label=${hotspot.title || `Hotspot ${hotspot.id}`}
        aria-describedby=${`tooltip-${hotspot.id}`}
        role="button"
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot name=${`hotspot-${hotspot.id}`}>
          ${hotspot.icon ? html`
            <span class="hotspot-image__marker-icon">${unsafeHTML(hotspot.icon)}</span>
          ` : html`
            <span class="hotspot-image__marker-dot"></span>
          `}
        </slot>
      </button>
    `;
  }

  private renderTooltip(hotspot: HotspotData) {
    const isVisible = this.activeHotspot === hotspot.id;
    if (!isVisible) return nothing;

    const position = hotspot.position || this.defaultPosition;

    const tooltipClasses = {
      'hotspot-image__tooltip': true,
      [`hotspot-image__tooltip--${position}`]: true,
      'hotspot-image__tooltip--visible': isVisible
    };

    const tooltipStyles = {
      left: `${hotspot.x}%`,
      top: `${hotspot.y}%`
    };

    return html`
      <div
        id=${`tooltip-${hotspot.id}`}
        class=${classMap(tooltipClasses)}
        style=${styleMap(tooltipStyles)}
        role="tooltip"
        aria-live="polite"
      >
        <div class="hotspot-image__tooltip-content">
          <slot name=${`tooltip-${hotspot.id}`}>
            ${hotspot.title ? html`
              <h4 class="hotspot-image__tooltip-title">${hotspot.title}</h4>
            ` : nothing}
            ${hotspot.content ? html`
              <p class="hotspot-image__tooltip-text">${hotspot.content}</p>
            ` : nothing}
            ${hotspot.url ? html`
              <a 
                href=${hotspot.url}
                target="_blank"
                rel="noopener noreferrer"
                class="hotspot-image__tooltip-link"
              >
                Learn More →
              </a>
            ` : nothing}
          </slot>
        </div>
        <div class="hotspot-image__tooltip-arrow"></div>
      </div>
    `;
  }

  private renderImage() {
    const imageData = this.effectiveImageData;

    if (this.imageError) {
      return html`
        <div class="hotspot-image__error">
          <p>Failed to load image</p>
        </div>
      `;
    }

    return html`
      <div class="hotspot-image__media">
        <slot name="image">
          <img
            src=${imageData.imageUrl}
            alt=${imageData.imageAlt || imageData.imageTitle || 'Interactive image'}
            title=${imageData.imageTitle || ''}
            loading=${this.lazyLoading ? 'lazy' : 'eager'}
            class="hotspot-image__image"
            @load=${this.handleImageLoad}
            @error=${this.handleImageError}
          />
        </slot>

        ${this.imageLoaded ? imageData.hotspots.map(hotspot => html`
          <div class="hotspot-image__hotspot">
            ${this.renderHotspotMarker(hotspot)}
            ${this.renderTooltip(hotspot)}
          </div>
        `) : nothing}

        ${!this.imageLoaded && !this.imageError ? html`
          <div class="hotspot-image__loading">
            <div class="hotspot-image__loading-spinner"></div>
            <p>Loading image...</p>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private renderHeader() {
    const imageData = this.effectiveImageData;
    if (!imageData.title && !imageData.description) return nothing;

    return html`
      <header class="hotspot-image__header">
        ${imageData.title ? html`
          <h2 class="hotspot-image__title">${imageData.title}</h2>
        ` : nothing}
        ${imageData.description ? html`
          <p class="hotspot-image__description">${imageData.description}</p>
        ` : nothing}
      </header>
    `;
  }

  render() {
    const imageData = this.effectiveImageData;

    const figureClasses = {
      'hotspot-image': true,
      'hotspot-image--responsive': this.responsive,
      'hotspot-image--animated': this.showAnimations,
      'hotspot-image--disabled': this.disabled,
      'hotspot-image--loaded': this.imageLoaded,
      'hotspot-image--error': this.imageError,
      [this.cssClass]: !!this.cssClass
    };

    return html`
      <figure
        class=${classMap(figureClasses)}
        role="img"
        aria-label=${imageData.imageAlt || imageData.imageTitle || 'Interactive image with hotspots'}
        @click=${() => this.hideAllTooltips()}
      >
        ${this.renderHeader()}
        
        <div class="hotspot-image__container">
          ${this.renderImage()}
        </div>
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-hotspot-image': AwBlockHotspotImage;
  }
}