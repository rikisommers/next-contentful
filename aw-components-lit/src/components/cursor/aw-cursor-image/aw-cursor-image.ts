import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Cursor Image Component
 * 
 * Large animated cursor image component with fade transitions and scale effects.
 * Designed for use in grid layouts to provide visual feedback on interactive elements.
 * Features smooth animations, responsive scaling, and optimized performance.
 * 
 * @example
 * ```html
 * <aw-cursor-image 
 *   src="https://example.com/image.jpg"
 *   alt="Preview image"
 *   size="300"
 *   offset-x="-150"
 *   offset-y="-150"
 *   border-radius="8px">
 * </aw-cursor-image>
 * ```
 * 
 * @category cursor
 * @since 1.0.0
 */

export enum CursorImageSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge'
}

export enum ImageFit {
  Cover = 'cover',
  Contain = 'contain',
  Fill = 'fill',
  ScaleDown = 'scale-down',
  None = 'none'
}

@customElement('aw-cursor-image')
export class AwCursorImage extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }

    .cursor-image {
      position: fixed;
      overflow: hidden;
      border-radius: var(--aw-cursor-image-radius, var(--aw-border-radius-lg, 0.5rem));
      background-color: var(--aw-cursor-image-bg, var(--aw-color-surface-elevated, #ffffff));
      transform-origin: center center;
      will-change: transform, opacity;
      transition: all var(--aw-cursor-image-transition-duration, 0.2s) 
                  var(--aw-cursor-image-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
      box-shadow: var(--aw-cursor-image-shadow, 
                  0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                  0 4px 6px -2px rgba(0, 0, 0, 0.05));
      backdrop-filter: blur(var(--aw-cursor-image-backdrop-blur, 4px));
      -webkit-backdrop-filter: blur(var(--aw-cursor-image-backdrop-blur, 4px));
      border: var(--aw-cursor-image-border, 1px solid rgba(255, 255, 255, 0.2));
    }

    /* Size variants */
    .cursor-image--small {
      width: var(--aw-cursor-image-small-size, 200px);
      height: var(--aw-cursor-image-small-size, 200px);
    }

    .cursor-image--medium {
      width: var(--aw-cursor-image-medium-size, 300px);
      height: var(--aw-cursor-image-medium-size, 300px);
    }

    .cursor-image--large {
      width: var(--aw-cursor-image-large-size, 400px);
      height: var(--aw-cursor-image-large-size, 400px);
    }

    .cursor-image--xlarge {
      width: var(--aw-cursor-image-xlarge-size, 500px);
      height: var(--aw-cursor-image-xlarge-size, 500px);
    }

    /* Custom size */
    .cursor-image--custom {
      width: var(--aw-cursor-image-width, 300px);
      height: var(--aw-cursor-image-height, 300px);
    }

    .cursor-image__content {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      border-radius: inherit;
    }

    .cursor-image__img {
      width: 100%;
      height: 100%;
      object-fit: var(--aw-cursor-image-object-fit, cover);
      object-position: var(--aw-cursor-image-object-position, center);
      display: block;
      transition: transform var(--aw-cursor-image-img-transition, 0.3s ease);
    }

    .cursor-image__placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--aw-cursor-image-placeholder-bg, 
                  linear-gradient(45deg, #f3f4f6, #e5e7eb));
      color: var(--aw-cursor-image-placeholder-text, var(--aw-color-text-secondary, #6b7280));
      font-size: var(--aw-cursor-image-placeholder-font-size, var(--aw-font-size-sm, 0.875rem));
    }

    .cursor-image__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--aw-cursor-image-overlay-bg, 
                  linear-gradient(45deg, rgba(239, 120, 1, 0.1), rgba(239, 120, 1, 0.05)));
      opacity: var(--aw-cursor-image-overlay-opacity, 0.4);
      transition: opacity var(--aw-cursor-image-overlay-transition, 0.3s ease);
    }

    /* Animation states */
    .cursor-image--entering {
      opacity: 0;
      transform: scale(var(--aw-cursor-image-enter-scale, 0.8));
    }

    .cursor-image--visible {
      opacity: var(--aw-cursor-image-visible-opacity, 1);
      transform: scale(var(--aw-cursor-image-visible-scale, 1));
    }

    .cursor-image--exiting {
      opacity: 0;
      transform: scale(var(--aw-cursor-image-exit-scale, 0.8));
    }

    .cursor-image--hidden {
      opacity: 0;
      transform: scale(0);
      transition: all var(--aw-cursor-image-hide-duration, 0.2s) ease;
    }

    /* Hover and interaction states */
    .cursor-image--hovering .cursor-image__img {
      transform: scale(var(--aw-cursor-image-hover-img-scale, 1.05));
    }

    .cursor-image--hovering .cursor-image__overlay {
      opacity: var(--aw-cursor-image-hover-overlay-opacity, 0.2);
    }

    .cursor-image--clicking {
      transform: scale(var(--aw-cursor-image-click-scale, 0.95));
    }

    /* Loading state */
    .cursor-image--loading .cursor-image__placeholder {
      background: linear-gradient(
        90deg, 
        #f3f4f6 25%, 
        #e5e7eb 50%, 
        #f3f4f6 75%
      );
      background-size: 200% 100%;
      animation: loading-shimmer 2s infinite;
    }

    @keyframes loading-shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    /* Error state */
    .cursor-image--error .cursor-image__placeholder {
      background-color: var(--aw-cursor-image-error-bg, #fef2f2);
      color: var(--aw-cursor-image-error-text, #dc2626);
      border: 2px dashed var(--aw-cursor-image-error-border, #fca5a5);
    }

    /* Blend modes */
    .cursor-image--blend-multiply {
      mix-blend-mode: multiply;
    }

    .cursor-image--blend-screen {
      mix-blend-mode: screen;
    }

    .cursor-image--blend-overlay {
      mix-blend-mode: overlay;
    }

    .cursor-image--blend-difference {
      mix-blend-mode: difference;
    }

    /* Spring animation variant */
    .cursor-image--spring {
      transition: all var(--aw-cursor-image-spring-duration, 0.5s) 
                  var(--aw-cursor-image-spring-easing, cubic-bezier(0.68, -0.55, 0.265, 1.55));
    }

    /* Parallax effect */
    .cursor-image--parallax .cursor-image__img {
      transform: scale(1.1);
      transition: transform var(--aw-cursor-image-parallax-duration, 0.5s) ease;
    }

    .cursor-image--parallax:hover .cursor-image__img {
      transform: scale(1.15) translate(var(--parallax-x, 0), var(--parallax-y, 0));
    }

    /* Accessibility - hide on reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .cursor-image,
      .cursor-image__img,
      .cursor-image__overlay {
        transition: opacity 0.2s ease !important;
        animation: none !important;
      }

      .cursor-image--spring {
        transition: opacity 0.2s ease !important;
      }

      .cursor-image--parallax .cursor-image__img {
        transform: none !important;
      }
    }

    /* Hide on touch devices */
    @media (hover: none) and (pointer: coarse) {
      :host {
        display: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .cursor-image {
        border: 2px solid currentColor;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
      
      .cursor-image__overlay {
        display: none;
      }
    }

    /* Responsive sizing */
    @media (max-width: 768px) {
      .cursor-image--small {
        width: var(--aw-cursor-image-mobile-small, 150px);
        height: var(--aw-cursor-image-mobile-small, 150px);
      }

      .cursor-image--medium {
        width: var(--aw-cursor-image-mobile-medium, 200px);
        height: var(--aw-cursor-image-mobile-medium, 200px);
      }

      .cursor-image--large {
        width: var(--aw-cursor-image-mobile-large, 250px);
        height: var(--aw-cursor-image-mobile-large, 250px);
      }
    }
  `;

  /**
   * Image source URL
   */
  @property() src?: string;

  /**
   * Alternative text for the image
   */
  @property() alt?: string;

  /**
   * Predefined size of the cursor image
   */
  @property() size: CursorImageSize = CursorImageSize.Medium;

  /**
   * Custom width in pixels (overrides size)
   */
  @property({ type: Number }) width?: number;

  /**
   * Custom height in pixels (overrides size)
   */
  @property({ type: Number }) height?: number;

  /**
   * How the image should fit within the container
   */
  @property({ attribute: 'object-fit' }) objectFit: ImageFit = ImageFit.Cover;

  /**
   * Position of the image within the container
   */
  @property({ attribute: 'object-position' }) objectPosition: string = 'center';

  /**
   * Border radius for the cursor image
   */
  @property({ attribute: 'border-radius' }) borderRadius?: string;

  /**
   * Background color for the container
   */
  @property({ attribute: 'background-color' }) backgroundColor?: string;

  /**
   * Horizontal offset from mouse position
   */
  @property({ type: Number, attribute: 'offset-x' }) offsetX: number = -150;

  /**
   * Vertical offset from mouse position
   */
  @property({ type: Number, attribute: 'offset-y' }) offsetY: number = -150;

  /**
   * Whether the cursor should be visible
   */
  @property({ type: Boolean }) visible: boolean = true;

  /**
   * Whether to show loading placeholder
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * Whether to show error state
   */
  @property({ type: Boolean }) error: boolean = false;

  /**
   * CSS blend mode for the image
   */
  @property({ attribute: 'blend-mode' }) blendMode?: 'multiply' | 'screen' | 'overlay' | 'difference';

  /**
   * Whether to use spring animation
   */
  @property({ type: Boolean }) spring: boolean = false;

  /**
   * Whether to enable parallax effect
   */
  @property({ type: Boolean }) parallax: boolean = false;

  /**
   * Placeholder text when no image is provided
   */
  @property() placeholder: string = 'No image';

  /**
   * Whether to show overlay effect
   */
  @property({ type: Boolean, attribute: 'show-overlay' }) showOverlay: boolean = true;

  /**
   * Selector for elements that trigger visibility
   */
  @property({ attribute: 'trigger-selector' }) triggerSelector?: string;

  @state() private _x: number = 0;
  @state() private _y: number = 0;
  @state() private _isVisible: boolean = false;
  @state() private _isHovering: boolean = false;
  @state() private _isLoading: boolean = true;
  @state() private _hasError: boolean = false;
  @state() private _animationState: 'hidden' | 'entering' | 'visible' | 'exiting' = 'hidden';

  private _animationId?: number;
  private _showTimeout?: number;
  private _hideTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
    this._startTracking();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
    
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
    }
    
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
  }

  private _setupEventListeners() {
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseenter', this._handleMouseEnter);
    document.addEventListener('mouseleave', this._handleMouseLeave);

    if (this.triggerSelector) {
      document.addEventListener('mouseover', this._handleTriggerHover);
      document.addEventListener('mouseout', this._handleTriggerUnhover);
    }
  }

  private _removeEventListeners() {
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseenter', this._handleMouseEnter);
    document.removeEventListener('mouseleave', this._handleMouseLeave);
    document.removeEventListener('mouseover', this._handleTriggerHover);
    document.removeEventListener('mouseout', this._handleTriggerUnhover);
  }

  private _handleMouseMove = (event: MouseEvent) => {
    this._x = event.clientX + this.offsetX;
    this._y = event.clientY + this.offsetY;

    // Handle parallax effect
    if (this.parallax) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const parallaxX = ((event.clientX - centerX) / centerX) * 10;
      const parallaxY = ((event.clientY - centerY) / centerY) * 10;
      
      this.style.setProperty('--parallax-x', `${parallaxX}px`);
      this.style.setProperty('--parallax-y', `${parallaxY}px`);
    }

    // Dispatch cursor move event
    const awCursorImageMoveEvent = new CustomEvent('aw-cursor-image-move', {
      detail: {
        x: this._x,
        y: this._y,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorImageMoveEvent);
  };

  private _handleMouseEnter = () => {
    if (!this.triggerSelector) {
      this._showCursor();
    }
  };

  private _handleMouseLeave = () => {
    if (!this.triggerSelector) {
      this._hideCursor();
    }
  };

  private _handleTriggerHover = (event: Event) => {
    const target = event.target as Element;
    if (this.triggerSelector && target.matches(this.triggerSelector)) {
      this._isHovering = true;
      this._showCursor();
    }
  };

  private _handleTriggerUnhover = (event: Event) => {
    const target = event.target as Element;
    if (this.triggerSelector && target.matches(this.triggerSelector)) {
      this._isHovering = false;
      this._hideCursor();
    }
  };

  private _showCursor() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }

    if (this._animationState !== 'visible') {
      this._isVisible = true;
      this._animationState = 'entering';
      
      this._showTimeout = window.setTimeout(() => {
        this._animationState = 'visible';
      }, 50);
    }
  }

  private _hideCursor() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    }

    if (this._animationState !== 'hidden') {
      this._animationState = 'exiting';
      
      this._hideTimeout = window.setTimeout(() => {
        this._isVisible = false;
        this._animationState = 'hidden';
      }, 200);
    }
  }

  private _startTracking() {
    const track = () => {
      // Smooth cursor following can be added here if needed
      this._animationId = requestAnimationFrame(track);
    };
    
    track();
  }

  private _handleImageLoad = () => {
    this._isLoading = false;
    this._hasError = false;
  };

  private _handleImageError = () => {
    this._isLoading = false;
    this._hasError = true;
  };

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('width') && this.width) {
      this.style.setProperty('--aw-cursor-image-width', `${this.width}px`);
    }

    if (changedProperties.has('height') && this.height) {
      this.style.setProperty('--aw-cursor-image-height', `${this.height}px`);
    }

    if (changedProperties.has('borderRadius') && this.borderRadius) {
      this.style.setProperty('--aw-cursor-image-radius', this.borderRadius);
    }

    if (changedProperties.has('backgroundColor') && this.backgroundColor) {
      this.style.setProperty('--aw-cursor-image-bg', this.backgroundColor);
    }

    if (changedProperties.has('objectFit')) {
      this.style.setProperty('--aw-cursor-image-object-fit', this.objectFit);
    }

    if (changedProperties.has('objectPosition')) {
      this.style.setProperty('--aw-cursor-image-object-position', this.objectPosition);
    }
  }

  render() {
    const shouldShow = this.visible && this._isVisible;
    const useCustomSize = this.width || this.height;

    const cursorClasses: Record<string, boolean> = {
      'cursor-image': true,
      [`cursor-image--${this.size}`]: !useCustomSize,
      'cursor-image--custom': !!useCustomSize,
      [`cursor-image--${this._animationState}`]: true,
      'cursor-image--hovering': this._isHovering,
      'cursor-image--loading': this._isLoading || this.loading,
      'cursor-image--error': this._hasError || this.error,
      'cursor-image--spring': this.spring,
      'cursor-image--parallax': this.parallax,
    };

    if (this.blendMode) {
      cursorClasses[`cursor-image--blend-${this.blendMode}`] = true;
    }

    const transform = `translate3d(${this._x}px, ${this._y}px, 0)`;

    const renderImage = () => {
      if (this.src && !this._hasError && !this.error) {
        return html`
          <img 
            class="cursor-image__img"
            src="${this.src}"
            alt="${this.alt || ''}"
            @load=${this._handleImageLoad}
            @error=${this._handleImageError}
          >
        `;
      }
      
      return html`
        <div class="cursor-image__placeholder">
          ${this._hasError || this.error ? 'Failed to load' : 
            this._isLoading || this.loading ? 'Loading...' : this.placeholder}
        </div>
      `;
    };

    return html`
      <div 
        class=${classMap(cursorClasses)}
        style="transform: ${transform}; display: ${shouldShow ? 'block' : 'none'}"
      >
        <div class="cursor-image__content">
          ${renderImage()}
          ${this.showOverlay && this.src && !this._hasError && !this.error ? html`
            <div class="cursor-image__overlay"></div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cursor-image': AwCursorImage;
  }
}