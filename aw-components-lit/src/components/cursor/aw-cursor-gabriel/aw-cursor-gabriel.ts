import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Cursor Gabriel Component
 * 
 * Advanced cursor component with SVG motion trail inspired by gabrielveres.com.
 * Features a sophisticated two-layer animation system with a trailing circle, foreground dot,
 * mix-blend-mode effects, and an SVG path trail that follows mouse movement.
 * 
 * @example
 * ```html
 * <aw-cursor-gabriel 
 *   color="#ef7801"
 *   accent-color="#ffffff"
 *   trail-length="15"
 *   trail-opacity="0.6"
 *   blend-mode="difference">
 * </aw-cursor-gabriel>
 * ```
 * 
 * @category cursor
 * @since 1.0.0
 */

export interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export enum CursorGabrielSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum CursorGabrielBlendMode {
  Normal = 'normal',
  Multiply = 'multiply',
  Screen = 'screen',
  Overlay = 'overlay',
  Difference = 'difference',
  Exclusion = 'exclusion'
}

@customElement('aw-cursor-gabriel')
export class AwCursorGabriel extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
    }

    .cursor-gabriel {
      position: fixed;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .cursor-gabriel__svg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
    }

    .cursor-gabriel__trail-path {
      fill: none;
      stroke: var(--aw-cursor-gabriel-trail-color, var(--aw-color-primary-500, #ef7801));
      stroke-width: var(--aw-cursor-gabriel-trail-width, 2);
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: var(--aw-cursor-gabriel-trail-opacity, 0.6);
      transition: opacity var(--aw-cursor-gabriel-trail-transition, 0.2s ease);
    }

    .cursor-gabriel__background {
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      border-radius: 50%;
      transform-origin: center center;
      will-change: transform, opacity;
      background-color: var(--aw-cursor-gabriel-bg-color, var(--aw-color-primary-400, #fb923c));
      transition: all var(--aw-cursor-gabriel-bg-transition-duration, 0.2s) 
                  var(--aw-cursor-gabriel-bg-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
      opacity: var(--aw-cursor-gabriel-bg-opacity, 0.3);
    }

    .cursor-gabriel__foreground {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      border-radius: 50%;
      transform-origin: center center;
      will-change: transform, opacity;
      background-color: var(--aw-cursor-gabriel-fg-color, var(--aw-color-primary-600, #ef7801));
      mix-blend-mode: var(--aw-cursor-gabriel-blend-mode, difference);
      transition: all var(--aw-cursor-gabriel-fg-transition-duration, 0.15s) 
                  var(--aw-cursor-gabriel-fg-easing, cubic-bezier(0.25, 0.46, 0.45, 0.94));
    }

    /* Size variants */
    .cursor-gabriel--small .cursor-gabriel__background {
      width: var(--aw-cursor-gabriel-small-bg-size, 24px);
      height: var(--aw-cursor-gabriel-small-bg-size, 24px);
    }

    .cursor-gabriel--small .cursor-gabriel__foreground {
      width: var(--aw-cursor-gabriel-small-fg-size, 8px);
      height: var(--aw-cursor-gabriel-small-fg-size, 8px);
    }

    .cursor-gabriel--medium .cursor-gabriel__background {
      width: var(--aw-cursor-gabriel-medium-bg-size, 32px);
      height: var(--aw-cursor-gabriel-medium-bg-size, 32px);
    }

    .cursor-gabriel--medium .cursor-gabriel__foreground {
      width: var(--aw-cursor-gabriel-medium-fg-size, 12px);
      height: var(--aw-cursor-gabriel-medium-fg-size, 12px);
    }

    .cursor-gabriel--large .cursor-gabriel__background {
      width: var(--aw-cursor-gabriel-large-bg-size, 48px);
      height: var(--aw-cursor-gabriel-large-bg-size, 48px);
    }

    .cursor-gabriel--large .cursor-gabriel__foreground {
      width: var(--aw-cursor-gabriel-large-fg-size, 16px);
      height: var(--aw-cursor-gabriel-large-fg-size, 16px);
    }

    /* Hover states */
    .cursor-gabriel--hovering .cursor-gabriel__background {
      transform: scale(var(--aw-cursor-gabriel-hover-bg-scale, 2)) 
                 translate(-50%, -50%);
      opacity: var(--aw-cursor-gabriel-hover-bg-opacity, 0.2);
    }

    .cursor-gabriel--hovering .cursor-gabriel__foreground {
      transform: scale(var(--aw-cursor-gabriel-hover-fg-scale, 1.5)) 
                 translate(-50%, -50%);
      opacity: var(--aw-cursor-gabriel-hover-fg-opacity, 0.8);
    }

    .cursor-gabriel--hovering .cursor-gabriel__trail-path {
      stroke-width: var(--aw-cursor-gabriel-hover-trail-width, 3);
      opacity: var(--aw-cursor-gabriel-hover-trail-opacity, 0.8);
    }

    /* Clicking state */
    .cursor-gabriel--clicking .cursor-gabriel__background {
      transform: scale(var(--aw-cursor-gabriel-click-bg-scale, 0.8)) 
                 translate(-50%, -50%);
    }

    .cursor-gabriel--clicking .cursor-gabriel__foreground {
      transform: scale(var(--aw-cursor-gabriel-click-fg-scale, 0.6)) 
                 translate(-50%, -50%);
    }

    /* High velocity state */
    .cursor-gabriel--high-velocity .cursor-gabriel__background {
      opacity: var(--aw-cursor-gabriel-velocity-bg-opacity, 0.5);
      transform: scale(var(--aw-cursor-gabriel-velocity-bg-scale, 1.2)) 
                 translate(-50%, -50%);
    }

    .cursor-gabriel--high-velocity .cursor-gabriel__foreground {
      opacity: var(--aw-cursor-gabriel-velocity-fg-opacity, 1);
    }

    .cursor-gabriel--high-velocity .cursor-gabriel__trail-path {
      stroke-width: var(--aw-cursor-gabriel-velocity-trail-width, 4);
      opacity: var(--aw-cursor-gabriel-velocity-trail-opacity, 0.9);
    }

    /* Hidden states */
    .cursor-gabriel--hidden .cursor-gabriel__background,
    .cursor-gabriel--hidden .cursor-gabriel__foreground {
      opacity: 0;
      transform: scale(0) translate(-50%, -50%);
    }

    .cursor-gabriel--hidden .cursor-gabriel__trail-path {
      opacity: 0;
    }

    /* Special blend modes */
    .cursor-gabriel--blend-multiply .cursor-gabriel__foreground {
      mix-blend-mode: multiply;
    }

    .cursor-gabriel--blend-screen .cursor-gabriel__foreground {
      mix-blend-mode: screen;
    }

    .cursor-gabriel--blend-overlay .cursor-gabriel__foreground {
      mix-blend-mode: overlay;
    }

    .cursor-gabriel--blend-exclusion .cursor-gabriel__foreground {
      mix-blend-mode: exclusion;
    }

    /* Enhanced glow effect */
    .cursor-gabriel--glow .cursor-gabriel__foreground {
      box-shadow: 
        0 0 var(--aw-cursor-gabriel-glow-inner, 10px) var(--aw-cursor-gabriel-fg-color, #ef7801),
        0 0 var(--aw-cursor-gabriel-glow-outer, 20px) rgba(239, 120, 1, 0.4),
        0 0 var(--aw-cursor-gabriel-glow-far, 40px) rgba(239, 120, 1, 0.2);
    }

    .cursor-gabriel--glow .cursor-gabriel__background {
      background: radial-gradient(
        circle,
        var(--aw-cursor-gabriel-bg-color, rgba(239, 120, 1, 0.8)) 0%,
        var(--aw-cursor-gabriel-bg-color, rgba(239, 120, 1, 0.4)) 30%,
        var(--aw-cursor-gabriel-bg-color, rgba(239, 120, 1, 0.1)) 60%,
        transparent 100%
      );
    }

    /* Magnetic effect */
    .cursor-gabriel--magnetic .cursor-gabriel__background,
    .cursor-gabriel--magnetic .cursor-gabriel__foreground {
      transition: all var(--aw-cursor-gabriel-magnetic-duration, 0.3s) 
                  var(--aw-cursor-gabriel-magnetic-easing, cubic-bezier(0.23, 1, 0.320, 1));
    }

    /* Accessibility - hide on reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .cursor-gabriel__background,
      .cursor-gabriel__foreground,
      .cursor-gabriel__trail-path {
        transition: opacity 0.2s ease !important;
        animation: none !important;
      }

      .cursor-gabriel__trail-path {
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
      .cursor-gabriel__background,
      .cursor-gabriel__foreground {
        border: 2px solid currentColor;
        background-color: transparent;
        mix-blend-mode: normal;
        box-shadow: none;
      }
      
      .cursor-gabriel__trail-path {
        stroke: currentColor;
      }
    }
  `;

  /**
   * Size of the cursor elements
   */
  @property() size: CursorGabrielSize = CursorGabrielSize.Medium;

  /**
   * Primary color for the cursor elements
   */
  @property() color?: string;

  /**
   * Accent color for the trail and background
   */
  @property({ attribute: 'accent-color' }) accentColor?: string;

  /**
   * CSS blend mode for the foreground cursor
   */
  @property({ attribute: 'blend-mode' }) blendMode: CursorGabrielBlendMode = CursorGabrielBlendMode.Difference;

  /**
   * Maximum number of trail points to track
   */
  @property({ type: Number, attribute: 'trail-length' }) trailLength: number = 15;

  /**
   * Opacity of the trail path
   */
  @property({ type: Number, attribute: 'trail-opacity' }) trailOpacity: number = 0.6;

  /**
   * Width of the trail stroke
   */
  @property({ type: Number, attribute: 'trail-width' }) trailWidth: number = 2;

  /**
   * Smoothing factor for the trail path (0-1)
   */
  @property({ type: Number, attribute: 'trail-smoothing' }) trailSmoothing: number = 0.3;

  /**
   * Whether to enable glow effect
   */
  @property({ type: Boolean }) glow: boolean = false;

  /**
   * Whether to enable magnetic attraction to elements
   */
  @property({ type: Boolean }) magnetic: boolean = false;

  /**
   * Whether the cursor should be visible
   */
  @property({ type: Boolean }) visible: boolean = true;

  /**
   * Velocity threshold for high velocity state
   */
  @property({ type: Number, attribute: 'velocity-threshold' }) velocityThreshold: number = 5;

  /**
   * Spring stiffness for background cursor (lower = slower)
   */
  @property({ type: Number, attribute: 'background-stiffness' }) backgroundStiffness: number = 400;

  /**
   * Spring stiffness for foreground cursor (higher = faster)
   */
  @property({ type: Number, attribute: 'foreground-stiffness' }) foregroundStiffness: number = 800;

  /**
   * Selector for elements that trigger hover state
   */
  @property({ attribute: 'hover-selector' }) hoverSelector: string = 'a, button, .cursor-hover';

  /**
   * Selector for magnetic elements
   */
  @property({ attribute: 'magnetic-selector' }) magneticSelector: string = 'button, .magnetic';

  @state() private _mouseX: number = 0;
  @state() private _mouseY: number = 0;
  @state() private _bgX: number = 0;
  @state() private _bgY: number = 0;
  @state() private _fgX: number = 0;
  @state() private _fgY: number = 0;
  @state() private _isHovering: boolean = false;
  @state() private _isClicking: boolean = false;
  @state() private _velocity: number = 0;
  @state() private _trailPoints: TrailPoint[] = [];
  @state() private _trailPath: string = '';
  @state() private _trailVisible: boolean = false;

  private _animationId?: number;
  private _lastX: number = 0;
  private _lastY: number = 0;
  private _lastTime: number = 0;
  private _bgVelX: number = 0;
  private _bgVelY: number = 0;
  private _fgVelX: number = 0;
  private _fgVelY: number = 0;
  private _trailId: number = 0;

  connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
    this._startAnimation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
    
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
  }

  private _setupEventListeners() {
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mousedown', this._handleMouseDown);
    document.addEventListener('mouseup', this._handleMouseUp);
    document.addEventListener('mouseenter', this._handleMouseEnter);
    document.addEventListener('mouseleave', this._handleMouseLeave);
    document.addEventListener('mouseover', this._handleElementHover);
    document.addEventListener('mouseout', this._handleElementUnhover);
  }

  private _removeEventListeners() {
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mousedown', this._handleMouseDown);
    document.removeEventListener('mouseup', this._handleMouseUp);
    document.removeEventListener('mouseenter', this._handleMouseEnter);
    document.removeEventListener('mouseleave', this._handleMouseLeave);
    document.removeEventListener('mouseover', this._handleElementHover);
    document.removeEventListener('mouseout', this._handleElementUnhover);
  }

  private _handleMouseMove = (event: MouseEvent) => {
    const currentTime = Date.now();
    
    // Calculate velocity
    if (this._lastTime > 0) {
      const deltaTime = (currentTime - this._lastTime) / 1000;
      const deltaX = event.clientX - this._lastX;
      const deltaY = event.clientY - this._lastY;
      this._velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
    }

    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
    this._lastX = event.clientX;
    this._lastY = event.clientY;
    this._lastTime = currentTime;

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

        // Apply magnetic pull within 50px radius
        if (distance < 50) {
          const force = (50 - distance) / 50;
          this._mouseX = event.clientX + (centerX - event.clientX) * force * 0.3;
          this._mouseY = event.clientY + (centerY - event.clientY) * force * 0.3;
        }
      }
    }

    // Add trail point
    this._addTrailPoint(this._mouseX, this._mouseY);

    // Dispatch cursor move event
    const awCursorGabrielMoveEvent = new CustomEvent('aw-cursor-gabriel-move', {
      detail: {
        x: this._mouseX,
        y: this._mouseY,
        velocity: this._velocity,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awCursorGabrielMoveEvent);
  };

  private _handleMouseDown = (event: MouseEvent) => {
    this._isClicking = true;
  };

  private _handleMouseUp = (event: MouseEvent) => {
    this._isClicking = false;
  };

  private _handleMouseEnter = () => {
    this.visible = true;
  };

  private _handleMouseLeave = () => {
    this.visible = false;
    this._trailVisible = false;
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

  private _addTrailPoint(x: number, y: number) {
    const now = Date.now();
    const newPoint: TrailPoint = {
      id: this._trailId++,
      x,
      y,
      timestamp: now
    };

    // Add new point and remove old points
    this._trailPoints = [newPoint, ...this._trailPoints.slice(0, this.trailLength - 1)];

    // Update trail path
    this._updateTrailPath();
    this._trailVisible = this._trailPoints.length > 1;
  }

  private _updateTrailPath() {
    if (this._trailPoints.length < 2) {
      this._trailPath = '';
      return;
    }

    // Create smoothed path using quadratic curves
    let pathData = `M ${this._trailPoints[0].x} ${this._trailPoints[0].y}`;
    
    for (let i = 1; i < this._trailPoints.length - 1; i++) {
      const current = this._trailPoints[i];
      const next = this._trailPoints[i + 1];
      
      // Control point for smooth curves
      const cpX = current.x + (next.x - current.x) * this.trailSmoothing;
      const cpY = current.y + (next.y - current.y) * this.trailSmoothing;
      
      pathData += ` Q ${current.x} ${current.y} ${cpX} ${cpY}`;
    }

    // Add final point
    if (this._trailPoints.length > 1) {
      const lastPoint = this._trailPoints[this._trailPoints.length - 1];
      pathData += ` L ${lastPoint.x} ${lastPoint.y}`;
    }

    this._trailPath = pathData;
  }

  private _startAnimation() {
    const animate = (currentTime: number) => {
      const deltaTime = currentTime / 1000; // Convert to seconds

      // Spring physics for background cursor (slower, trailing)
      const bgSpringForceX = (this._mouseX - this._bgX) * (this.backgroundStiffness / 1000);
      const bgSpringForceY = (this._mouseY - this._bgY) * (this.backgroundStiffness / 1000);
      const bgDampingX = this._bgVelX * 0.9;
      const bgDampingY = this._bgVelY * 0.9;
      
      this._bgVelX += (bgSpringForceX - bgDampingX) * deltaTime;
      this._bgVelY += (bgSpringForceY - bgDampingY) * deltaTime;
      
      this._bgX += this._bgVelX * deltaTime;
      this._bgY += this._bgVelY * deltaTime;

      // Spring physics for foreground cursor (faster, more responsive)
      const fgSpringForceX = (this._mouseX - this._fgX) * (this.foregroundStiffness / 1000);
      const fgSpringForceY = (this._mouseY - this._fgY) * (this.foregroundStiffness / 1000);
      const fgDampingX = this._fgVelX * 0.8;
      const fgDampingY = this._fgVelY * 0.8;
      
      this._fgVelX += (fgSpringForceX - fgDampingX) * deltaTime;
      this._fgVelY += (fgSpringForceY - fgDampingY) * deltaTime;
      
      this._fgX += this._fgVelX * deltaTime;
      this._fgY += this._fgVelY * deltaTime;

      // Decay velocity over time
      this._velocity *= 0.95;

      // Clean up old trail points
      const cutoffTime = Date.now() - 2000; // 2 seconds
      this._trailPoints = this._trailPoints.filter(point => point.timestamp > cutoffTime);

      this._animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--aw-cursor-gabriel-fg-color', this.color);
      this.style.setProperty('--aw-cursor-gabriel-trail-color', this.color);
    }

    if (changedProperties.has('accentColor') && this.accentColor) {
      this.style.setProperty('--aw-cursor-gabriel-bg-color', this.accentColor);
    }

    if (changedProperties.has('trailOpacity')) {
      this.style.setProperty('--aw-cursor-gabriel-trail-opacity', this.trailOpacity.toString());
    }

    if (changedProperties.has('trailWidth')) {
      this.style.setProperty('--aw-cursor-gabriel-trail-width', this.trailWidth.toString());
    }

    if (changedProperties.has('blendMode')) {
      this.style.setProperty('--aw-cursor-gabriel-blend-mode', this.blendMode);
    }
  }

  render() {
    const isHighVelocity = this._velocity > this.velocityThreshold;

    const cursorClasses = {
      'cursor-gabriel': true,
      [`cursor-gabriel--${this.size}`]: true,
      'cursor-gabriel--hovering': this._isHovering,
      'cursor-gabriel--clicking': this._isClicking,
      'cursor-gabriel--high-velocity': isHighVelocity,
      'cursor-gabriel--hidden': !this.visible,
      'cursor-gabriel--glow': this.glow,
      'cursor-gabriel--magnetic': this.magnetic,
      [`cursor-gabriel--blend-${this.blendMode}`]: this.blendMode !== CursorGabrielBlendMode.Normal,
    };

    const bgTransform = `translate(${this._bgX - 16}px, ${this._bgY - 16}px)`;
    const fgTransform = `translate(${this._fgX - 6}px, ${this._fgY - 6}px)`;

    return html`
      <div class=${classMap(cursorClasses)}>
        <!-- SVG Trail -->
        <svg 
          class="cursor-gabriel__svg"
          style="opacity: ${this._trailVisible ? 1 : 0}"
        >
          <path 
            class="cursor-gabriel__trail-path"
            d="${this._trailPath}"
            stroke-width="${this.trailWidth}"
            opacity="${this.trailOpacity}"
          />
        </svg>
        
        <!-- Background cursor (trailing circle) -->
        <div 
          class="cursor-gabriel__background"
          style="transform: ${bgTransform}"
        ></div>
        
        <!-- Foreground cursor (main dot) -->
        <div 
          class="cursor-gabriel__foreground"
          style="transform: ${fgTransform}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-cursor-gabriel': AwCursorGabriel;
  }
}