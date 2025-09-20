import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Cursor Component
 * 
 * Custom cursor component with multiple variants and interactive behaviors.
 * Tracks mouse movement and provides smooth animations, hover effects, and accessibility support.
 * 
 * @example
 * ```html
 * <aw-cursor 
 *   variant="dot"
 *   size="medium"
 *   magnetic="true"
 *   trail-effect="true">
 * </aw-cursor>
 * ```
 */

export enum CursorVariant {
  Dot = 'dot',
  Ring = 'ring',
  Cross = 'cross',
  Arrow = 'arrow',
  Text = 'text',
  Pointer = 'pointer',
  CTA = 'cta',
  Image = 'image',
  Gabriel = 'gabriel'
}

export enum CursorSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge'
}

export enum BlendMode {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Difference = 'difference',
  Exclusion = 'exclusion'
}

@customElement('aw-cursor')
export class AwCursor extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: var(--aw-cursor-blend-mode, normal);
    }

    .aw-cursor {
      position: fixed;
      transform-origin: center center;
      transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform;
    }

    .aw-cursor--smooth {
      transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Inner cursor (main element) */
    .aw-cursor__inner {
      position: relative;
      border-radius: 50%;
      background-color: var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
      transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Outer cursor (follower ring) */
    .aw-cursor__outer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 0.6;
    }

    /* Size variants */
    .aw-cursor--size-small .aw-cursor__inner {
      width: 4px;
      height: 4px;
    }

    .aw-cursor--size-small .aw-cursor__outer {
      width: 16px;
      height: 16px;
    }

    .aw-cursor--size-medium .aw-cursor__inner {
      width: 6px;
      height: 6px;
    }

    .aw-cursor--size-medium .aw-cursor__outer {
      width: 24px;
      height: 24px;
    }

    .aw-cursor--size-large .aw-cursor__inner {
      width: 8px;
      height: 8px;
    }

    .aw-cursor--size-large .aw-cursor__outer {
      width: 32px;
      height: 32px;
    }

    .aw-cursor--size-xlarge .aw-cursor__inner {
      width: 12px;
      height: 12px;
    }

    .aw-cursor--size-xlarge .aw-cursor__outer {
      width: 48px;
      height: 48px;
    }

    /* Variant styles */
    .aw-cursor--variant-dot .aw-cursor__outer {
      display: none;
    }

    .aw-cursor--variant-ring .aw-cursor__inner {
      background-color: transparent;
      border: 2px solid var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
    }

    .aw-cursor--variant-cross .aw-cursor__inner {
      border-radius: 0;
      background-color: transparent;
      position: relative;
    }

    .aw-cursor--variant-cross .aw-cursor__inner::before,
    .aw-cursor--variant-cross .aw-cursor__inner::after {
      content: '';
      position: absolute;
      background-color: var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
    }

    .aw-cursor--variant-cross .aw-cursor__inner::before {
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      transform: translateY(-50%);
    }

    .aw-cursor--variant-cross .aw-cursor__inner::after {
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      transform: translateX(-50%);
    }

    .aw-cursor--variant-arrow .aw-cursor__inner {
      border-radius: 0;
      background-color: transparent;
      border-left: 8px solid var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      transform: rotate(-45deg);
    }

    .aw-cursor--variant-cta .aw-cursor__inner {
      border-radius: var(--aw-border-radius-md, 0.375rem);
      background-color: var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-text-inverse, #fafafa);
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      white-space: nowrap;
      min-width: 60px;
      min-height: 24px;
    }

    .aw-cursor--variant-gabriel {
      background: radial-gradient(
        circle,
        rgba(239, 120, 1, 0.8) 0%,
        rgba(239, 120, 1, 0.4) 30%,
        rgba(239, 120, 1, 0.1) 60%,
        transparent 100%
      );
      border-radius: 50%;
    }

    .aw-cursor--variant-gabriel .aw-cursor__inner {
      background: linear-gradient(45deg, 
        var(--aw-color-primary-500, #f97316), 
        var(--aw-color-primary-700, #c2410c)
      );
      box-shadow: 
        0 0 20px rgba(239, 120, 1, 0.4),
        0 0 40px rgba(239, 120, 1, 0.2);
    }

    /* Image variant */
    .aw-cursor--variant-image .aw-cursor__inner {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    /* Hover states */
    .aw-cursor--hovering .aw-cursor__inner {
      transform: scale(1.5);
      opacity: 0.8;
    }

    .aw-cursor--hovering .aw-cursor__outer {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.3;
    }

    .aw-cursor--clicking .aw-cursor__inner {
      transform: scale(0.8);
    }

    .aw-cursor--clicking .aw-cursor__outer {
      transform: translate(-50%, -50%) scale(0.9);
    }

    /* Trail effect */
    .aw-cursor__trail {
      position: absolute;
      border-radius: 50%;
      background-color: var(--aw-cursor-color, var(--aw-color-primary-600, #ef7801));
      opacity: 0.3;
      pointer-events: none;
      will-change: transform, opacity;
    }

    .aw-cursor__trail--fade {
      animation: trail-fade 0.5s ease-out forwards;
    }

    @keyframes trail-fade {
      from {
        opacity: 0.3;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(1.5);
      }
    }

    /* Magnetic effect */
    .aw-cursor--magnetic {
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    }

    /* Hidden cursor */
    .aw-cursor--hidden {
      opacity: 0;
      transform: scale(0);
    }

    /* Accessibility - hide on reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .aw-cursor {
        transition: none !important;
        animation: none !important;
      }
      
      .aw-cursor__trail {
        display: none;
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
      .aw-cursor__inner,
      .aw-cursor__outer {
        border: 2px solid currentColor;
        background-color: transparent;
      }
    }
  `;

  /**
   * Cursor variant/style
   */
  @property() variant: CursorVariant = CursorVariant.Dot;

  /**
   * Cursor size
   */
  @property() size: CursorSize = CursorSize.Medium;

  /**
   * CSS color for the cursor
   */
  @property() color?: string;

  /**
   * Image URL for image variant
   */
  @property() image?: string;

  /**
   * Text content for CTA variant
   */
  @property() text?: string;

  /**
   * CSS blend mode
   */
  @property({ attribute: 'blend-mode' }) blendMode: BlendMode = BlendMode.Normal;

  /**
   * Whether to enable smooth movement
   */
  @property({ type: Boolean }) smooth: boolean = true;

  /**
   * Whether to enable magnetic attraction to elements
   */
  @property({ type: Boolean }) magnetic: boolean = false;

  /**
   * Whether to show trail effect
   */
  @property({ type: Boolean, attribute: 'trail-effect' }) trailEffect: boolean = false;

  /**
   * Whether to hide the default system cursor
   */
  @property({ type: Boolean, attribute: 'hide-cursor' }) hideCursor: boolean = true;

  /**
   * Whether the cursor should be visible
   */
  @property({ type: Boolean }) visible: boolean = true;

  /**
   * Selector for elements that trigger hover state
   */
  @property({ attribute: 'hover-selector' }) hoverSelector?: string;

  /**
   * Selector for magnetic elements
   */
  @property({ attribute: 'magnetic-selector' }) magneticSelector?: string;

  @state() private _x: number = 0;
  @state() private _y: number = 0;
  @state() private _isHovering: boolean = false;
  @state() private _isClicking: boolean = false;
  @state() private _trailElements: Array<{ id: number; x: number; y: number }> = [];

  private _animationId?: number;
  private _lastTrailTime: number = 0;
  private _mouseX: number = 0;
  private _mouseY: number = 0;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.hideCursor) {
      document.body.style.cursor = 'none';
    }

    this._setupEventListeners();
    this._startAnimation();
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
    document.addEventListener('mousedown', this._handleMouseDown);
    document.addEventListener('mouseup', this._handleMouseUp);
    document.addEventListener('mouseleave', this._handleMouseLeave);
    document.addEventListener('mouseenter', this._handleMouseEnter);

    if (this.hoverSelector) {
      document.addEventListener('mouseover', this._handleElementHover);
      document.addEventListener('mouseout', this._handleElementUnhover);
    }
  }

  private _removeEventListeners() {
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mousedown', this._handleMouseDown);
    document.removeEventListener('mouseup', this._handleMouseUp);
    document.removeEventListener('mouseleave', this._handleMouseLeave);
    document.removeEventListener('mouseenter', this._handleMouseEnter);
    document.removeEventListener('mouseover', this._handleElementHover);
    document.removeEventListener('mouseout', this._handleElementUnhover);
  }

  private _handleMouseMove = (event: MouseEvent) => {
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;

    // Handle magnetic effect
    if (this.magnetic && this.magneticSelector) {
      const magneticElement = this._getNearestMagneticElement(event.clientX, event.clientY);
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2)
        );

        // Apply magnetic pull within 50px radius
        if (distance < 50) {
          const force = (50 - distance) / 50;
          this._mouseX = event.clientX + (centerX - event.clientX) * force * 0.3;
          this._mouseY = event.clientY + (centerY - event.clientY) * force * 0.3;
        }
      }
    }

    // Add trail element
    if (this.trailEffect && Date.now() - this._lastTrailTime > 50) {
      this._addTrailElement(this._mouseX, this._mouseY);
      this._lastTrailTime = Date.now();
    }

    // Dispatch cursor move event
    const awCursorMoveEvent = new CustomEvent('aw-cursor-move', {
      detail: {
        x: this._mouseX,
        y: this._mouseY,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorMoveEvent);
  };

  private _handleMouseDown = (event: MouseEvent) => {
    this._isClicking = true;
    
    const awCursorDownEvent = new CustomEvent('aw-cursor-down', {
      detail: {
        x: this._mouseX,
        y: this._mouseY,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorDownEvent);
  };

  private _handleMouseUp = (event: MouseEvent) => {
    this._isClicking = false;
    
    const awCursorUpEvent = new CustomEvent('aw-cursor-up', {
      detail: {
        x: this._mouseX,
        y: this._mouseY,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorUpEvent);
  };

  private _handleMouseLeave = () => {
    this.visible = false;
  };

  private _handleMouseEnter = () => {
    this.visible = true;
  };

  private _handleElementHover = (event: Event) => {
    const target = event.target as Element;
    if (this.hoverSelector && target.matches(this.hoverSelector)) {
      this._isHovering = true;
    }
  };

  private _handleElementUnhover = (event: Event) => {
    const target = event.target as Element;
    if (this.hoverSelector && target.matches(this.hoverSelector)) {
      this._isHovering = false;
    }
  };

  private _getNearestMagneticElement(x: number, y: number): Element | null {
    if (!this.magneticSelector) return null;

    const elements = document.querySelectorAll(this.magneticSelector);
    let nearest: Element | null = null;
    let shortestDistance = Infinity;

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = element;
      }
    });

    return nearest;
  }

  private _addTrailElement(x: number, y: number) {
    const trailId = Date.now() + Math.random();
    this._trailElements = [...this._trailElements, { id: trailId, x, y }];

    // Remove trail element after animation
    setTimeout(() => {
      this._trailElements = this._trailElements.filter(trail => trail.id !== trailId);
    }, 500);
  }

  private _startAnimation() {
    const animate = () => {
      // Smooth cursor movement
      if (this.smooth) {
        const dx = this._mouseX - this._x;
        const dy = this._mouseY - this._y;
        this._x += dx * 0.1;
        this._y += dy * 0.1;
      } else {
        this._x = this._mouseX;
        this._y = this._mouseY;
      }

      this._animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--aw-cursor-color', this.color);
    }

    if (changedProperties.has('blendMode')) {
      this.style.setProperty('--aw-cursor-blend-mode', this.blendMode);
    }
  }

  render() {
    const cursorClasses = {
      'aw-cursor': true,
      [`aw-cursor--variant-${this.variant}`]: true,
      [`aw-cursor--size-${this.size}`]: true,
      'aw-cursor--smooth': this.smooth,
      'aw-cursor--magnetic': this.magnetic,
      'aw-cursor--hovering': this._isHovering,
      'aw-cursor--clicking': this._isClicking,
      'aw-cursor--hidden': !this.visible,
    };

    const transform = `translate3d(${this._x}px, ${this._y}px, 0)`;

    const innerStyle = this.variant === CursorVariant.Image && this.image
      ? `background-image: url(${this.image})`
      : '';

    return html`
      <!-- Main cursor -->
      <div 
        class=${classMap(cursorClasses)}
        style="transform: ${transform}"
      >
        <div class="aw-cursor__inner" style="${innerStyle}">
          ${this.variant === CursorVariant.CTA && this.text ? this.text : ''}
        </div>
        
        ${this.variant === CursorVariant.Ring || this.variant === CursorVariant.Dot ? html`
          <div class="aw-cursor__outer"></div>
        ` : ''}
      </div>

      <!-- Trail elements -->
      ${this.trailEffect ? this._trailElements.map(trail => html`
        <div 
          class="aw-cursor__trail aw-cursor__trail--fade"
          style="
            left: ${trail.x}px; 
            top: ${trail.y}px; 
            width: 4px; 
            height: 4px;
            transform: translate(-50%, -50%);
          "
        ></div>
      `) : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cursor': AwCursor;
  }
}