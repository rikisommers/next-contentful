import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Cursor Dot Component
 * 
 * Animated cursor dot component with smooth spring physics that follows mouse movement.
 * Features click states, hover effects, theme-aware styling, and magnetic attraction.
 * Optimized for performance with requestAnimationFrame and respects accessibility preferences.
 * 
 * @example
 * ```html
 * <aw-cursor-dot 
 *   size="medium"
 *   color="#ef7801"
 *   magnetic="true"
 *   hover-selector="button, a, .interactive">
 * </aw-cursor-dot>
 * ```
 * 
 * @category cursor
 * @since 1.0.0
 */

export enum CursorDotSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum CursorDotBlendMode {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Difference = 'difference',
  Exclusion = 'exclusion'
}

@customElement('aw-cursor-dot')
export class AwCursorDot extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: var(--aw-cursor-dot-blend-mode, normal);
    }

    .cursor-dot {
      position: fixed;
      border-radius: 50%;
      background-color: var(--aw-cursor-dot-color, var(--aw-color-primary-600, #ef7801));
      transform-origin: center center;
      will-change: transform, opacity;
      transition: transform var(--aw-cursor-dot-transition-duration, 0.15s) 
                  var(--aw-cursor-dot-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94)),
                  opacity var(--aw-cursor-dot-transition-duration, 0.15s) 
                  var(--aw-cursor-dot-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
    }

    .cursor-dot--smooth {
      transition: transform var(--aw-cursor-dot-smooth-duration, 0.2s) 
                  var(--aw-cursor-dot-smooth-easing, cubic-bezier(0.23, 1, 0.320, 1)),
                  opacity var(--aw-cursor-dot-transition-duration, 0.15s) 
                  var(--aw-cursor-dot-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
    }

    /* Size variants */
    .cursor-dot--small {
      width: var(--aw-cursor-dot-size-small, 8px);
      height: var(--aw-cursor-dot-size-small, 8px);
    }

    .cursor-dot--medium {
      width: var(--aw-cursor-dot-size-medium, 16px);
      height: var(--aw-cursor-dot-size-medium, 16px);
    }

    .cursor-dot--large {
      width: var(--aw-cursor-dot-size-large, 24px);
      height: var(--aw-cursor-dot-size-large, 24px);
    }

    /* Interactive states */
    .cursor-dot--hovering {
      transform: scale(var(--aw-cursor-dot-hover-scale, 1.5));
      opacity: var(--aw-cursor-dot-hover-opacity, 0.8);
    }

    .cursor-dot--clicking {
      transform: scale(var(--aw-cursor-dot-click-scale, 0.7));
    }

    .cursor-dot--magnetic {
      transition: transform var(--aw-cursor-dot-magnetic-duration, 0.3s) 
                  var(--aw-cursor-dot-magnetic-easing, cubic-bezier(0.23, 1, 0.320, 1));
    }

    /* Visibility states */
    .cursor-dot--hidden {
      opacity: 0;
      transform: scale(0);
    }

    .cursor-dot--within-viewport {
      opacity: 0;
    }

    /* Special hover states for specific elements */
    .cursor-dot--back {
      background-color: var(--aw-cursor-dot-back-color, #ff6b6b);
      transform: scale(var(--aw-cursor-dot-back-scale, 1.8));
    }

    .cursor-dot--next {
      background-color: var(--aw-cursor-dot-next-color, #4ecdc4);
      transform: scale(var(--aw-cursor-dot-next-scale, 1.8));
    }

    .cursor-dot--custom {
      background-color: var(--aw-cursor-dot-custom-color, #45b7d1);
      transform: scale(var(--aw-cursor-dot-custom-scale, 2));
      mix-blend-mode: var(--aw-cursor-dot-custom-blend, difference);
    }

    /* Accessibility - hide on reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .cursor-dot {
        transition: none !important;
        animation: none !important;
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
      .cursor-dot {
        border: 2px solid currentColor;
        background-color: transparent;
      }
    }
  `;

  /**
   * Size of the cursor dot
   */
  @property() size: CursorDotSize = CursorDotSize.Medium;

  /**
   * CSS color for the cursor dot
   */
  @property() color?: string;

  /**
   * CSS blend mode for the cursor
   */
  @property({ attribute: 'blend-mode' }) blendMode: CursorDotBlendMode = CursorDotBlendMode.Normal;

  /**
   * Whether to enable smooth movement with spring physics
   */
  @property({ type: Boolean }) smooth: boolean = true;

  /**
   * Whether to enable magnetic attraction to elements
   */
  @property({ type: Boolean }) magnetic: boolean = false;

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
  @property({ attribute: 'hover-selector' }) hoverSelector: string = 'a, button, .interactive';

  /**
   * Selector for magnetic elements
   */
  @property({ attribute: 'magnetic-selector' }) magneticSelector: string = 'button, .magnetic';

  /**
   * Spring stiffness for smooth movement (higher = faster)
   */
  @property({ type: Number }) stiffness: number = 1200;

  /**
   * Spring damping for smooth movement (higher = less bouncy)
   */
  @property({ type: Number }) damping: number = 40;

  /**
   * Spring mass for smooth movement (higher = slower)
   */
  @property({ type: Number }) mass: number = 0.5;

  @state() private _x: number = 0;
  @state() private _y: number = 0;
  @state() private _mouseX: number = 0;
  @state() private _mouseY: number = 0;
  @state() private _isHovering: boolean = false;
  @state() private _isClicking: boolean = false;
  @state() private _cursorWithinViewport: boolean = false;
  @state() private _specialHoverState: string = '';

  private _animationId?: number;
  private _velocityX: number = 0;
  private _velocityY: number = 0;
  private _lastTime: number = 0;

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
    document.addEventListener('mouseover', this._handleElementHover);
    document.addEventListener('mouseout', this._handleElementUnhover);
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
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Normalize cursor position for viewport detection
    const normalizedX = (event.clientX / windowWidth) * 2 - 1;
    const normalizedY = (event.clientY / windowHeight) * 2 - 1;
    
    this._cursorWithinViewport = normalizedX < -0.9 || normalizedX > 0.9 || 
                                normalizedY < -0.9 || normalizedY > 0.9;

    this._mouseX = event.clientX;
    this._mouseY = event.clientY;

    // Handle magnetic effect
    if (this.magnetic) {
      const magneticElement = this._getNearestMagneticElement(event.clientX, event.clientY);
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2)
        );

        // Apply magnetic pull within 60px radius
        if (distance < 60) {
          const force = (60 - distance) / 60;
          this._mouseX = event.clientX + (centerX - event.clientX) * force * 0.4;
          this._mouseY = event.clientY + (centerY - event.clientY) * force * 0.4;
        }
      }
    }

    // Check for special hover states
    this._updateSpecialHoverStates();

    // Dispatch cursor move event
    const awCursorMoveEvent = new CustomEvent('aw-cursor-dot-move', {
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
    
    const awCursorDownEvent = new CustomEvent('aw-cursor-dot-down', {
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
    
    const awCursorUpEvent = new CustomEvent('aw-cursor-dot-up', {
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
    if (target.matches(this.hoverSelector)) {
      this._isHovering = true;
    }
  };

  private _handleElementUnhover = (event: Event) => {
    const target = event.target as Element;
    if (target.matches(this.hoverSelector)) {
      this._isHovering = false;
    }
  };

  private _updateSpecialHoverStates() {
    // Check for specific element hover states based on React component logic
    this._specialHoverState = '';
    
    if (document.querySelector('.c-back:hover')) {
      this._specialHoverState = 'back';
    } else if (document.querySelector('.next-project:hover')) {
      this._specialHoverState = 'next';
    } else if (document.querySelector('.cursor-as--post:hover')) {
      this._specialHoverState = 'custom';
    }
  };

  private _getNearestMagneticElement(x: number, y: number): Element | null {
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

  private _startAnimation() {
    const animate = (currentTime: number) => {
      if (this._lastTime === 0) {
        this._lastTime = currentTime;
      }
      
      const deltaTime = (currentTime - this._lastTime) / 1000; // Convert to seconds
      this._lastTime = currentTime;

      if (this.smooth) {
        // Spring physics animation with configurable parameters
        const dx = this._mouseX - this._x;
        const dy = this._mouseY - this._y;
        
        // Calculate spring forces
        const springForceX = dx * this.stiffness;
        const springForceY = dy * this.stiffness;
        
        // Calculate damping forces
        const dampingForceX = this._velocityX * this.damping;
        const dampingForceY = this._velocityY * this.damping;
        
        // Update velocities
        this._velocityX += (springForceX - dampingForceX) / this.mass * deltaTime;
        this._velocityY += (springForceY - dampingForceY) / this.mass * deltaTime;
        
        // Update positions
        this._x += this._velocityX * deltaTime;
        this._y += this._velocityY * deltaTime;
      } else {
        // Immediate movement
        this._x = this._mouseX;
        this._y = this._mouseY;
        this._velocityX = 0;
        this._velocityY = 0;
      }

      this._animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--aw-cursor-dot-color', this.color);
    }

    if (changedProperties.has('blendMode')) {
      this.style.setProperty('--aw-cursor-dot-blend-mode', this.blendMode);
    }
  }

  render() {
    const cursorClasses = {
      'cursor-dot': true,
      [`cursor-dot--${this.size}`]: true,
      'cursor-dot--smooth': this.smooth,
      'cursor-dot--magnetic': this.magnetic,
      'cursor-dot--hovering': this._isHovering,
      'cursor-dot--clicking': this._isClicking,
      'cursor-dot--hidden': !this.visible,
      'cursor-dot--within-viewport': this._cursorWithinViewport,
      [`cursor-dot--${this._specialHoverState}`]: this._specialHoverState !== '',
    };

    const transform = `translate3d(${this._x}px, ${this._y}px, 0)`;

    return html`
      <div 
        class=${classMap(cursorClasses)}
        style="transform: ${transform}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cursor-dot': AwCursorDot;
  }
}