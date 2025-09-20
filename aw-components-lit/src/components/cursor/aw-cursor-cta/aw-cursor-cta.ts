import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Cursor CTA Component
 * 
 * Call-to-action cursor component with rotation animations and velocity-based effects.
 * Displays custom text content that rotates based on mouse movement direction.
 * Features smooth transitions, theme-aware styling, and accessibility support.
 * 
 * @example
 * ```html
 * <aw-cursor-cta 
 *   content="Click me"
 *   color="#ef7801"
 *   background-color="#ffffff"
 *   rotation-sensitivity="20"
 *   offset-x="20"
 *   offset-y="-20">
 * </aw-cursor-cta>
 * ```
 * 
 * @category cursor
 * @since 1.0.0
 */

export enum CursorCtaSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum MouseDirection {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Neutral = 'neutral'
}

@customElement('aw-cursor-cta')
export class AwCursorCta extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 50;
    }

    .cursor-cta {
      position: fixed;
      padding: var(--aw-cursor-cta-padding-y, 0.5rem) var(--aw-cursor-cta-padding-x, 0.75rem);
      font-size: var(--aw-cursor-cta-font-size, var(--aw-font-size-xs, 0.75rem));
      font-weight: var(--aw-cursor-cta-font-weight, var(--aw-font-weight-medium, 500));
      color: var(--aw-cursor-cta-text-color, var(--aw-color-text-primary, #1f2937));
      background-color: var(--aw-cursor-cta-bg-color, var(--aw-color-surface, #ffffff));
      border-radius: var(--aw-cursor-cta-radius, var(--aw-border-radius-full, 9999px));
      white-space: nowrap;
      transform-origin: center center;
      will-change: transform, opacity;
      transition: all var(--aw-cursor-cta-transition-duration, 0.02s) 
                  var(--aw-cursor-cta-easing, ease-out);
      box-shadow: var(--aw-cursor-cta-shadow, 
                  0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                  0 2px 4px -1px rgba(0, 0, 0, 0.06));
      backdrop-filter: blur(var(--aw-cursor-cta-blur, 8px));
      -webkit-backdrop-filter: blur(var(--aw-cursor-cta-blur, 8px));
    }

    /* Size variants */
    .cursor-cta--small {
      padding: var(--aw-cursor-cta-small-padding-y, 0.25rem) 
               var(--aw-cursor-cta-small-padding-x, 0.5rem);
      font-size: var(--aw-cursor-cta-small-font-size, 0.625rem);
      min-width: var(--aw-cursor-cta-small-min-width, 48px);
      min-height: var(--aw-cursor-cta-small-min-height, 20px);
    }

    .cursor-cta--medium {
      padding: var(--aw-cursor-cta-medium-padding-y, 0.5rem) 
               var(--aw-cursor-cta-medium-padding-x, 0.75rem);
      font-size: var(--aw-cursor-cta-medium-font-size, 0.75rem);
      min-width: var(--aw-cursor-cta-medium-min-width, 60px);
      min-height: var(--aw-cursor-cta-medium-min-height, 24px);
    }

    .cursor-cta--large {
      padding: var(--aw-cursor-cta-large-padding-y, 0.75rem) 
               var(--aw-cursor-cta-large-padding-x, 1rem);
      font-size: var(--aw-cursor-cta-large-font-size, 0.875rem);
      min-width: var(--aw-cursor-cta-large-min-width, 80px);
      min-height: var(--aw-cursor-cta-large-min-height, 32px);
    }

    /* Visibility states */
    .cursor-cta--visible {
      opacity: var(--aw-cursor-cta-visible-opacity, 1);
    }

    .cursor-cta--partial {
      opacity: var(--aw-cursor-cta-partial-opacity, 0.5);
    }

    .cursor-cta--hidden {
      opacity: 0;
      transform: scale(0.8);
    }

    /* Direction-based rotation animations */
    .cursor-cta--rotating-up {
      transform: rotate(var(--aw-cursor-cta-rotate-up, 15deg));
    }

    .cursor-cta--rotating-down {
      transform: rotate(var(--aw-cursor-cta-rotate-down, -15deg));
    }

    .cursor-cta--rotating-left {
      transform: rotate(var(--aw-cursor-cta-rotate-left, -5deg));
    }

    .cursor-cta--rotating-right {
      transform: rotate(var(--aw-cursor-cta-rotate-right, 5deg));
    }

    /* High velocity state */
    .cursor-cta--high-velocity {
      transform: scale(var(--aw-cursor-cta-velocity-scale, 1.1));
      opacity: var(--aw-cursor-cta-velocity-opacity, 0.9);
    }

    /* Hover states */
    .cursor-cta--hovering {
      transform: scale(var(--aw-cursor-cta-hover-scale, 1.1));
      background-color: var(--aw-cursor-cta-hover-bg, var(--aw-color-primary-500, #ef7801));
      color: var(--aw-cursor-cta-hover-text, var(--aw-color-text-inverse, #ffffff));
    }

    /* Theme variants */
    .cursor-cta--theme-dark {
      background-color: var(--aw-cursor-cta-dark-bg, rgba(0, 0, 0, 0.8));
      color: var(--aw-cursor-cta-dark-text, #ffffff);
      border: 1px solid var(--aw-cursor-cta-dark-border, rgba(255, 255, 255, 0.2));
    }

    .cursor-cta--theme-light {
      background-color: var(--aw-cursor-cta-light-bg, rgba(255, 255, 255, 0.9));
      color: var(--aw-cursor-cta-light-text, #1f2937);
      border: 1px solid var(--aw-cursor-cta-light-border, rgba(0, 0, 0, 0.1));
    }

    .cursor-cta--theme-accent {
      background-color: var(--aw-cursor-cta-accent-bg, var(--aw-color-primary-500, #ef7801));
      color: var(--aw-cursor-cta-accent-text, var(--aw-color-text-inverse, #ffffff));
    }

    /* Accessibility - hide on reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .cursor-cta {
        transition: opacity 0.2s ease !important;
        transform: none !important;
        animation: none !important;
      }

      .cursor-cta--rotating-up,
      .cursor-cta--rotating-down,
      .cursor-cta--rotating-left,
      .cursor-cta--rotating-right {
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
      .cursor-cta {
        border: 2px solid currentColor;
        background-color: Canvas;
        color: CanvasText;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
    }
  `;

  /**
   * Text content to display in the cursor
   */
  @property() content: string = 'Click';

  /**
   * Size of the cursor CTA
   */
  @property() size: CursorCtaSize = CursorCtaSize.Medium;

  /**
   * CSS color for the text
   */
  @property() color?: string;

  /**
   * CSS background color for the cursor
   */
  @property({ attribute: 'background-color' }) backgroundColor?: string;

  /**
   * Border color for the cursor
   */
  @property({ attribute: 'border-color' }) borderColor?: string;

  /**
   * Theme variant for the cursor
   */
  @property() theme: 'light' | 'dark' | 'accent' | 'auto' = 'auto';

  /**
   * Whether the cursor should be visible
   */
  @property({ type: Boolean }) visible: boolean = true;

  /**
   * Horizontal offset from mouse position
   */
  @property({ type: Number, attribute: 'offset-x' }) offsetX: number = 20;

  /**
   * Vertical offset from mouse position
   */
  @property({ type: Number, attribute: 'offset-y' }) offsetY: number = -20;

  /**
   * Sensitivity for rotation based on velocity (higher = more rotation)
   */
  @property({ type: Number, attribute: 'rotation-sensitivity' }) rotationSensitivity: number = 20;

  /**
   * Maximum rotation angle in degrees
   */
  @property({ type: Number, attribute: 'max-rotation' }) maxRotation: number = 90;

  /**
   * Velocity threshold for high velocity state
   */
  @property({ type: Number, attribute: 'velocity-threshold' }) velocityThreshold: number = 5;

  /**
   * Whether to hide the default system cursor
   */
  @property({ type: Boolean, attribute: 'hide-cursor' }) hideCursor: boolean = false;

  /**
   * Selector for elements that trigger visibility
   */
  @property({ attribute: 'visible-selector' }) visibleSelector?: string;

  /**
   * Selector for elements that trigger hover state
   */
  @property({ attribute: 'hover-selector' }) hoverSelector?: string;

  @state() private _x: number = 0;
  @state() private _y: number = 0;
  @state() private _direction: MouseDirection = MouseDirection.Neutral;
  @state() private _velocity: number = 0;
  @state() private _isHovering: boolean = false;
  @state() private _isVisible: boolean = true;

  private _lastX: number = 0;
  private _lastY: number = 0;
  private _lastTime: number = 0;
  private _animationId?: number;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.hideCursor) {
      document.body.style.cursor = 'none';
    }

    this._setupEventListeners();
    this._startTracking();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    if (this.hideCursor) {
      document.body.style.cursor = '';
    }

    this._removeEventListeners();
    
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
  }

  private _setupEventListeners() {
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseenter', this._handleMouseEnter);
    document.addEventListener('mouseleave', this._handleMouseLeave);

    if (this.visibleSelector || this.hoverSelector) {
      document.addEventListener('mouseover', this._handleElementHover);
      document.addEventListener('mouseout', this._handleElementUnhover);
    }
  }

  private _removeEventListeners() {
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseenter', this._handleMouseEnter);
    document.removeEventListener('mouseleave', this._handleMouseLeave);
    document.removeEventListener('mouseover', this._handleElementHover);
    document.removeEventListener('mouseout', this._handleElementUnhover);
  }

  private _handleMouseMove = (event: MouseEvent) => {
    const currentTime = Date.now();
    const deltaTime = currentTime - this._lastTime;
    
    if (deltaTime > 0) {
      // Calculate velocity and direction
      const deltaX = event.clientX - this._lastX;
      const deltaY = event.clientY - this._lastY;
      
      this._velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime * 1000;
      
      // Determine primary direction based on larger movement
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        this._direction = deltaY > 0 ? MouseDirection.Down : MouseDirection.Up;
      } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
        this._direction = deltaX > 0 ? MouseDirection.Right : MouseDirection.Left;
      } else {
        this._direction = MouseDirection.Neutral;
      }

      // Update mouse position with offset
      this._x = event.clientX + this.offsetX;
      this._y = event.clientY + this.offsetY;

      // Store last position and time
      this._lastX = event.clientX;
      this._lastY = event.clientY;
      this._lastTime = currentTime;
    }

    // Dispatch cursor move event
    const awCursorCtaMoveEvent = new CustomEvent('aw-cursor-cta-move', {
      detail: {
        x: this._x,
        y: this._y,
        direction: this._direction,
        velocity: this._velocity,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorCtaMoveEvent);
  };

  private _handleMouseEnter = () => {
    this.visible = true;
    this._isVisible = true;
  };

  private _handleMouseLeave = () => {
    this.visible = false;
    this._isVisible = false;
  };

  private _handleElementHover = (event: Event) => {
    const target = event.target as Element;
    
    if (this.visibleSelector && target.matches(this.visibleSelector)) {
      this._isVisible = true;
    }
    
    if (this.hoverSelector && target.matches(this.hoverSelector)) {
      this._isHovering = true;
    }
  };

  private _handleElementUnhover = (event: Event) => {
    const target = event.target as Element;
    
    if (this.visibleSelector && target.matches(this.visibleSelector)) {
      this._isVisible = this.visible;
    }
    
    if (this.hoverSelector && target.matches(this.hoverSelector)) {
      this._isHovering = false;
    }
  };

  private _startTracking() {
    const track = () => {
      // Smooth out velocity for better UX
      this._velocity *= 0.95; // Decay velocity over time
      
      this._animationId = requestAnimationFrame(track);
    };
    
    track();
  }

  private _getRotationAngle(): number {
    if (!this.rotationSensitivity || this._direction === MouseDirection.Neutral) {
      return 0;
    }

    let baseAngle = 0;
    const velocityMultiplier = Math.min(this._velocity / this.velocityThreshold, 1);

    switch (this._direction) {
      case MouseDirection.Up:
        baseAngle = Math.min(this.maxRotation, this._velocity * this.rotationSensitivity);
        break;
      case MouseDirection.Down:
        baseAngle = Math.max(-this.maxRotation, -this._velocity * this.rotationSensitivity);
        break;
      case MouseDirection.Left:
        baseAngle = Math.max(-this.maxRotation / 4, -this._velocity * this.rotationSensitivity / 4);
        break;
      case MouseDirection.Right:
        baseAngle = Math.min(this.maxRotation / 4, this._velocity * this.rotationSensitivity / 4);
        break;
    }

    return baseAngle * velocityMultiplier;
  }

  private _getThemeClass(): string {
    if (this.theme !== 'auto') {
      return `cursor-cta--theme-${this.theme}`;
    }

    // Auto-detect theme based on background color or system preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return `cursor-cta--theme-${isDarkMode ? 'dark' : 'light'}`;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--aw-cursor-cta-text-color', this.color);
    }

    if (changedProperties.has('backgroundColor') && this.backgroundColor) {
      this.style.setProperty('--aw-cursor-cta-bg-color', this.backgroundColor);
    }

    if (changedProperties.has('borderColor') && this.borderColor) {
      this.style.setProperty('--aw-cursor-cta-border-color', this.borderColor);
    }
  }

  render() {
    const rotationAngle = this._getRotationAngle();
    const isHighVelocity = this._velocity > this.velocityThreshold;
    const shouldShow = this.visible && this._isVisible;

    const cursorClasses = {
      'cursor-cta': true,
      [`cursor-cta--${this.size}`]: true,
      [this._getThemeClass()]: true,
      'cursor-cta--visible': shouldShow && !this._isHovering,
      'cursor-cta--partial': shouldShow && this._isHovering,
      'cursor-cta--hidden': !shouldShow,
      'cursor-cta--hovering': this._isHovering,
      'cursor-cta--high-velocity': isHighVelocity,
      [`cursor-cta--rotating-${this._direction}`]: this._direction !== MouseDirection.Neutral,
    };

    const transform = `translate3d(${this._x}px, ${this._y}px, 0) rotate(${rotationAngle}deg)`;

    return html`
      <div 
        class=${classMap(cursorClasses)}
        style="transform: ${transform}"
      >
        ${this.content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cursor-cta': AwCursorCta;
  }
}