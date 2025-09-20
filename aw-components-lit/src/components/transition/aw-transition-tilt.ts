/**
 * @fileoverview Tilt transition component for AW Components
 * Provides 3D tilt transitions with perspective and blur effects.
 * @version 1.0.0
 * @since 2024-12-19
 * @author AW Components Team
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Transition state enumeration
 */
export type TiltTransitionState = 'idle' | 'entering' | 'exiting';

/**
 * Tilt direction options
 */
export type TiltDirection = 'forward' | 'backward' | 'left' | 'right';

/**
 * AW Tilt Transition Component
 * 
 * A 3D tilt transition component that creates immersive perspective-based
 * animations with blur effects. Provides smooth transitions that simulate
 * depth and rotation in 3D space.
 * 
 * @element aw-transition-tilt
 * 
 * @slot default - Content to be transitioned
 * 
 * @csspart container - Main transition container with 3D perspective
 * @csspart content - Content wrapper with tilt animations
 * 
 * @cssprop --tilt-duration - Duration of tilt animation (default: 0.6s)
 * @cssprop --tilt-timing - Timing function for tilt (default: cubic-bezier(0.33, 1, 0.68, 1))
 * @cssprop --tilt-perspective - 3D perspective value (default: 1000px)
 * @cssprop --tilt-origin - Transform origin point (default: bottom right 60px)
 * @cssprop --tilt-angle - Maximum tilt angle in degrees (default: 6.2216deg)
 * @cssprop --tilt-scale - Scale factor during transition (default: 0.9)
 * @cssprop --tilt-blur - Maximum blur amount (default: 20px)
 * 
 * @example
 * ```html
 * <aw-transition-tilt 
 *   direction="forward"
 *   active="true"
 *   duration="0.8"
 *   perspective="1200">
 *   <div>Content to tilt</div>
 * </aw-transition-tilt>
 * ```
 * 
 * @example Custom tilt parameters
 * ```html
 * <aw-transition-tilt 
 *   tilt-angle="10"
 *   scale-factor="0.85"
 *   blur-amount="15"
 *   transform-origin="center center">
 *   <img src="image.jpg" alt="Tilt image">
 * </aw-transition-tilt>
 * ```
 */
@customElement('aw-transition-tilt')
export class AwTransitionTilt extends LitElement {
  /** Component styles */
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 49;
      }

      .tilt-container {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        perspective: var(--tilt-perspective, 1000px);
        perspective-origin: var(--tilt-perspective-origin, top);
        transition: perspective var(--tilt-duration, 0.6s) var(--tilt-timing, cubic-bezier(0.33, 1, 0.68, 1));
      }

      .tilt-content {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 40;
        transform-origin: var(--tilt-origin, bottom right 60px);
        transition: all var(--tilt-duration, 0.6s) var(--tilt-timing, cubic-bezier(0.33, 1, 0.68, 1));
        will-change: transform, filter, opacity;
        backface-visibility: hidden;
        transform: translateZ(0);
      }

      /* Initial state */
      .tilt-content {
        transform: rotateX(0deg) translateY(0px) scale(1) translateZ(40px);
        filter: blur(0px);
        opacity: 1;
      }

      /* Forward tilt states */
      :host([direction="forward"][state="entering"]) .tilt-content,
      :host([direction="forward"][state="exiting"]) .tilt-content {
        transform: rotateX(var(--tilt-angle, 6.2216deg)) 
                   translateY(-100px) 
                   scale(var(--tilt-scale, 0.9)) 
                   translateZ(0px);
        filter: blur(var(--tilt-blur, 20px));
        opacity: 0;
      }

      /* Backward tilt states */
      :host([direction="backward"][state="entering"]) .tilt-content,
      :host([direction="backward"][state="exiting"]) .tilt-content {
        transform: rotateX(calc(-1 * var(--tilt-angle, 6.2216deg))) 
                   translateY(100px) 
                   scale(var(--tilt-scale, 0.9)) 
                   translateZ(-40px);
        filter: blur(var(--tilt-blur, 20px));
        opacity: 0;
      }

      /* Left tilt states */
      :host([direction="left"][state="entering"]) .tilt-content,
      :host([direction="left"][state="exiting"]) .tilt-content {
        transform: rotateY(calc(-1 * var(--tilt-angle, 6.2216deg))) 
                   translateX(-100px) 
                   scale(var(--tilt-scale, 0.9)) 
                   translateZ(0px);
        filter: blur(var(--tilt-blur, 20px));
        opacity: 0;
      }

      /* Right tilt states */
      :host([direction="right"][state="entering"]) .tilt-content,
      :host([direction="right"][state="exiting"]) .tilt-content {
        transform: rotateY(var(--tilt-angle, 6.2216deg)) 
                   translateX(100px) 
                   scale(var(--tilt-scale, 0.9)) 
                   translateZ(0px);
        filter: blur(var(--tilt-blur, 20px));
        opacity: 0;
      }

      /* Container perspective changes during transition */
      :host([state="entering"]) .tilt-container,
      :host([state="exiting"]) .tilt-container {
        perspective: 0px;
        z-index: 0;
      }

      /* Active state - component is ready for transitions */
      :host([active]) .tilt-content {
        transform: rotateX(0deg) translateY(1px) scale(1) translateZ(40px);
      }

      /* Accessibility - Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        .tilt-container,
        .tilt-content {
          transition: none !important;
          animation: none !important;
          transform: none !important;
          filter: none !important;
          perspective: none !important;
        }

        :host([state="entering"]) .tilt-content,
        :host([state="exiting"]) .tilt-content {
          opacity: 0.5;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .tilt-content {
          border: 2px solid;
        }
      }

      /* Focus management during transitions */
      :host([state="entering"]) .tilt-content,
      :host([state="exiting"]) .tilt-content {
        pointer-events: none;
      }

      /* Performance optimizations for 3D transforms */
      .tilt-container {
        will-change: perspective;
      }

      /* Custom class names for additional styling */
      :host(.z-100) {
        z-index: 100;
      }
    `
  ];

  /**
   * Direction of the tilt transition
   * @attr direction
   */
  @property({ type: String })
  direction: TiltDirection = 'forward';

  /**
   * Whether the component is active and ready for transitions
   * @attr active
   */
  @property({ type: Boolean })
  active: boolean = true;

  /**
   * Duration of tilt animation in seconds
   * @attr duration
   */
  @property({ type: Number })
  duration: number = 0.6;

  /**
   * 3D perspective value in pixels
   * @attr perspective
   */
  @property({ type: Number })
  perspective: number = 1000;

  /**
   * Transform origin for the tilt animation
   * @attr transform-origin
   */
  @property({ type: String, attribute: 'transform-origin' })
  transformOrigin: string = 'bottom right 60px';

  /**
   * Maximum tilt angle in degrees
   * @attr tilt-angle
   */
  @property({ type: Number, attribute: 'tilt-angle' })
  tiltAngle: number = 6.2216;

  /**
   * Scale factor during transition
   * @attr scale-factor
   */
  @property({ type: Number, attribute: 'scale-factor' })
  scaleFactor: number = 0.9;

  /**
   * Maximum blur amount in pixels
   * @attr blur-amount
   */
  @property({ type: Number, attribute: 'blur-amount' })
  blurAmount: number = 20;

  /**
   * Custom timing function for animation
   * @attr timing-function
   */
  @property({ type: String, attribute: 'timing-function' })
  timingFunction: string = 'cubic-bezier(0.33, 1, 0.68, 1)';

  /**
   * Whether to respect user's reduced motion preference
   * @attr respect-reduced-motion
   */
  @property({ type: Boolean, attribute: 'respect-reduced-motion' })
  respectReducedMotion: boolean = true;

  /**
   * Additional CSS class name
   * @attr css-class
   */
  @property({ type: String, attribute: 'css-class' })
  cssClass?: string;

  /**
   * Current transition state
   */
  @state()
  private transitionState: TiltTransitionState = 'idle';

  /**
   * Whether user prefers reduced motion
   */
  @state()
  private prefersReducedMotion: boolean = false;

  /**
   * Active animation references for cleanup
   */
  private activeAnimations: Animation[] = [];

  /**
   * Transition promises for chaining
   */
  private transitionPromises: Map<string, Promise<void>> = new Map();

  /**
   * Component lifecycle - Connected
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.checkReducedMotionPreference();
    
    // Apply class name if provided
    if (this.cssClass) {
      this.classList.add(this.cssClass);
    }
  }

  /**
   * Component lifecycle - Disconnected
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cleanupAnimations();
  }

  /**
   * Property changes handler
   */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // Update CSS custom properties
    if (changedProperties.has('duration')) {
      this.style.setProperty('--tilt-duration', `${this.duration}s`);
    }

    if (changedProperties.has('timingFunction')) {
      this.style.setProperty('--tilt-timing', this.timingFunction);
    }

    if (changedProperties.has('perspective')) {
      this.style.setProperty('--tilt-perspective', `${this.perspective}px`);
    }

    if (changedProperties.has('transformOrigin')) {
      this.style.setProperty('--tilt-origin', this.transformOrigin);
    }

    if (changedProperties.has('tiltAngle')) {
      this.style.setProperty('--tilt-angle', `${this.tiltAngle}deg`);
    }

    if (changedProperties.has('scaleFactor')) {
      this.style.setProperty('--tilt-scale', this.scaleFactor.toString());
    }

    if (changedProperties.has('blurAmount')) {
      this.style.setProperty('--tilt-blur', `${this.blurAmount}px`);
    }

    // Update attributes for styling
    if (changedProperties.has('direction')) {
      this.setAttribute('direction', this.direction);
    }

    if (changedProperties.has('active')) {
      this.toggleAttribute('active', this.active);
    }

    if (changedProperties.has('transitionState')) {
      if (this.transitionState !== 'idle') {
        this.setAttribute('state', this.transitionState);
      } else {
        this.removeAttribute('state');
      }
    }
  }

  /**
   * Check user's reduced motion preference
   */
  private checkReducedMotionPreference(): void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });
  }

  /**
   * Get effective duration considering reduced motion
   */
  private getEffectiveDuration(): number {
    if (this.respectReducedMotion && this.prefersReducedMotion) {
      return 0.01; // Near-instant for reduced motion
    }
    return this.duration;
  }

  /**
   * Tilt in animation (return to normal)
   */
  public async tiltIn(): Promise<void> {
    if (!this.active) return Promise.resolve();

    const transitionId = 'tiltIn';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'entering';

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('tilt-start', {
        detail: { 
          direction: 'in', 
          tiltDirection: this.direction,
          duration: this.getEffectiveDuration() 
        },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('tilt-end', {
          detail: { 
            direction: 'in', 
            tiltDirection: this.direction,
            duration: this.getEffectiveDuration() 
          },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration);
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Tilt out animation (apply tilt effect)
   */
  public async tiltOut(): Promise<void> {
    if (!this.active) return Promise.resolve();

    const transitionId = 'tiltOut';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'exiting';

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('tilt-start', {
        detail: { 
          direction: 'out', 
          tiltDirection: this.direction,
          duration: this.getEffectiveDuration() 
        },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('tilt-end', {
          detail: { 
            direction: 'out', 
            tiltDirection: this.direction,
            duration: this.getEffectiveDuration() 
          },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration);
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Toggle tilt state
   */
  public async toggleTilt(): Promise<void> {
    if (this.transitionState === 'idle') {
      return this.tiltOut();
    } else {
      return this.tiltIn();
    }
  }

  /**
   * Cross-tilt to new content
   */
  public async crossTilt(callback?: () => void): Promise<void> {
    await this.tiltOut();
    
    if (callback) {
      callback();
    }
    
    // Wait a frame for content to update
    await new Promise(resolve => requestAnimationFrame(() => resolve(void 0)));
    
    return this.tiltIn();
  }

  /**
   * Reset transition to initial state
   */
  public reset(): void {
    this.cleanupAnimations();
    this.transitionPromises.clear();
    this.transitionState = 'idle';
  }

  /**
   * Cleanup active animations and promises
   */
  private cleanupAnimations(): void {
    this.activeAnimations.forEach(animation => {
      if (animation.playState !== 'finished') {
        animation.cancel();
      }
    });
    this.activeAnimations = [];
  }

  /**
   * Render the component
   */
  render() {
    return html`
      <div class="tilt-container" part="container">
        <div class="tilt-content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-transition-tilt': AwTransitionTilt;
  }
}