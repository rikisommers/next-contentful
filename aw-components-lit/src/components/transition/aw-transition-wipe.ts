/**
 * @fileoverview Wipe transition component for AW Components
 * Provides smooth wipe transitions with clip-path animations.
 * @version 1.0.0
 * @since 2024-12-19
 * @author AW Components Team
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Wipe direction options
 */
export type WipeDirection = 'up' | 'down' | 'left' | 'right' | 'diagonal-up' | 'diagonal-down';

/**
 * Transition state enumeration
 */
export type WipeTransitionState = 'idle' | 'entering' | 'exiting';

/**
 * AW Wipe Transition Component
 * 
 * A smooth wipe transition component that uses clip-path animations to create
 * directional wipe effects. Supports multiple directions and includes overlay
 * effects for enhanced visual impact.
 * 
 * @element aw-transition-wipe
 * 
 * @slot default - Content to be transitioned
 * 
 * @csspart container - Main transition container
 * @csspart overlay - Background overlay element
 * @csspart content - Content wrapper with wipe animation
 * 
 * @cssprop --wipe-duration - Duration of wipe animation (default: 0.6s)
 * @cssprop --wipe-timing - Timing function for wipe (default: cubic-bezier(0.33, 1, 0.68, 1))
 * @cssprop --wipe-overlay-bg - Background color for overlay (default: var(--body-background-color))
 * @cssprop --wipe-content-bg - Background color for content (default: var(--background-color))
 * 
 * @example
 * ```html
 * <aw-transition-wipe 
 *   direction="up"
 *   show-overlay="true"
 *   duration="0.8"
 *   delay="0.3">
 *   <div>Content to wipe</div>
 * </aw-transition-wipe>
 * ```
 * 
 * @example Diagonal wipe
 * ```html
 * <aw-transition-wipe 
 *   direction="diagonal-up"
 *   rounded-corners="true">
 *   <img src="image.jpg" alt="Wipe image">
 * </aw-transition-wipe>
 * ```
 */
@customElement('aw-transition-wipe')
export class AwTransitionWipe extends LitElement {
  /** Component styles */
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
      }

      .wipe-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .wipe-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        pointer-events: none;
        background-color: var(--wipe-overlay-bg, var(--body-background-color, #000));
        transition: opacity var(--wipe-duration, 0.6s) var(--wipe-timing, cubic-bezier(0.33, 1, 0.68, 1));
        will-change: opacity;
      }

      .wipe-content {
        position: relative;
        width: 100%;
        height: calc(100vh + 4rem);
        top: 0;
        background-color: var(--wipe-content-bg, var(--background-color, #fff));
        clip-path: inset(0 0 0 0);
        transition: all var(--wipe-duration, 0.6s) var(--wipe-timing, cubic-bezier(0.33, 1, 0.68, 1));
        will-change: clip-path, transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      .wipe-content.rounded {
        border-radius: 1.5rem;
      }

      /* Direction-specific animations */
      /* Up wipe */
      :host([direction="up"][state="entering"]) .wipe-content,
      :host([direction="up"][state="exiting"]) .wipe-content {
        clip-path: inset(100% 0 0 0);
      }

      :host([direction="up"][state="entering"]) .wipe-content {
        transform: translateY(100%);
      }

      :host([direction="up"][state="exiting"]) .wipe-content {
        transform: translateY(-2.5rem);
        z-index: 40;
      }

      /* Down wipe */
      :host([direction="down"][state="entering"]) .wipe-content,
      :host([direction="down"][state="exiting"]) .wipe-content {
        clip-path: inset(0 0 100% 0);
      }

      :host([direction="down"][state="entering"]) .wipe-content {
        transform: translateY(-100%);
      }

      :host([direction="down"][state="exiting"]) .wipe-content {
        transform: translateY(2.5rem);
        z-index: 40;
      }

      /* Left wipe */
      :host([direction="left"][state="entering"]) .wipe-content,
      :host([direction="left"][state="exiting"]) .wipe-content {
        clip-path: inset(0 100% 0 0);
      }

      :host([direction="left"][state="entering"]) .wipe-content {
        transform: translateX(100%);
      }

      :host([direction="left"][state="exiting"]) .wipe-content {
        transform: translateX(-2.5rem);
        z-index: 40;
      }

      /* Right wipe */
      :host([direction="right"][state="entering"]) .wipe-content,
      :host([direction="right"][state="exiting"]) .wipe-content {
        clip-path: inset(0 0 0 100%);
      }

      :host([direction="right"][state="entering"]) .wipe-content {
        transform: translateX(-100%);
      }

      :host([direction="right"][state="exiting"]) .wipe-content {
        transform: translateX(2.5rem);
        z-index: 40;
      }

      /* Diagonal up wipe */
      :host([direction="diagonal-up"][state="entering"]) .wipe-content,
      :host([direction="diagonal-up"][state="exiting"]) .wipe-content {
        clip-path: polygon(0 100%, 0 100%, 100% 100%);
      }

      :host([direction="diagonal-up"][state="entering"]) .wipe-content {
        transform: translate(100%, 100%);
      }

      :host([direction="diagonal-up"][state="exiting"]) .wipe-content {
        transform: translate(-2.5rem, -2.5rem);
        z-index: 40;
      }

      /* Diagonal down wipe */
      :host([direction="diagonal-down"][state="entering"]) .wipe-content,
      :host([direction="diagonal-down"][state="exiting"]) .wipe-content {
        clip-path: polygon(0 0, 100% 0, 0 0);
      }

      :host([direction="diagonal-down"][state="entering"]) .wipe-content {
        transform: translate(100%, -100%);
      }

      :host([direction="diagonal-down"][state="exiting"]) .wipe-content {
        transform: translate(-2.5rem, 2.5rem);
        z-index: 40;
      }

      /* Overlay states */
      :host([state="entering"]) .wipe-overlay,
      :host([state="exiting"]) .wipe-overlay {
        opacity: 0.5;
        z-index: 10;
      }

      /* Accessibility - Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        .wipe-overlay,
        .wipe-content {
          transition: none !important;
          animation: none !important;
          transform: none !important;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .wipe-content {
          border: 2px solid;
        }
      }

      /* Focus management during transitions */
      :host([state="entering"]) .wipe-content,
      :host([state="exiting"]) .wipe-content {
        pointer-events: none;
      }
    `
  ];

  /**
   * Direction of the wipe transition
   * @attr direction
   */
  @property({ type: String })
  direction: WipeDirection = 'up';

  /**
   * Whether to show overlay during transition
   * @attr show-overlay
   */
  @property({ type: Boolean, attribute: 'show-overlay' })
  showOverlay: boolean = true;

  /**
   * Duration of wipe animation in seconds
   * @attr duration
   */
  @property({ type: Number })
  duration: number = 0.6;

  /**
   * Delay before starting transition in seconds
   * @attr delay
   */
  @property({ type: Number })
  delay: number = 0.3;

  /**
   * Custom timing function for animation
   * @attr timing-function
   */
  @property({ type: String, attribute: 'timing-function' })
  timingFunction: string = 'cubic-bezier(0.33, 1, 0.68, 1)';

  /**
   * Whether to add rounded corners to wipe content
   * @attr rounded-corners
   */
  @property({ type: Boolean, attribute: 'rounded-corners' })
  roundedCorners: boolean = true;

  /**
   * Whether to respect user's reduced motion preference
   * @attr respect-reduced-motion
   */
  @property({ type: Boolean, attribute: 'respect-reduced-motion' })
  respectReducedMotion: boolean = true;

  /**
   * Custom overlay background color
   * @attr overlay-background
   */
  @property({ type: String, attribute: 'overlay-background' })
  overlayBackground?: string;

  /**
   * Custom content background color
   * @attr content-background
   */
  @property({ type: String, attribute: 'content-background' })
  contentBackground?: string;

  /**
   * Current transition state
   */
  @state()
  private transitionState: WipeTransitionState = 'idle';

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
      this.style.setProperty('--wipe-duration', `${this.duration}s`);
    }

    if (changedProperties.has('timingFunction')) {
      this.style.setProperty('--wipe-timing', this.timingFunction);
    }

    if (changedProperties.has('overlayBackground') && this.overlayBackground) {
      this.style.setProperty('--wipe-overlay-bg', this.overlayBackground);
    }

    if (changedProperties.has('contentBackground') && this.contentBackground) {
      this.style.setProperty('--wipe-content-bg', this.contentBackground);
    }

    // Update attributes for styling
    if (changedProperties.has('direction')) {
      this.setAttribute('direction', this.direction);
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
   * Wipe in animation
   */
  public async wipeIn(): Promise<void> {
    const transitionId = 'wipeIn';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'entering';

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('wipe-start', {
        detail: { 
          direction: 'in', 
          wipeDirection: this.direction,
          duration: this.getEffectiveDuration() 
        },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      const totalDelay = this.delay * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('wipe-end', {
          detail: { 
            direction: 'in', 
            wipeDirection: this.direction,
            duration: this.getEffectiveDuration() 
          },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration + totalDelay);
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Wipe out animation
   */
  public async wipeOut(): Promise<void> {
    const transitionId = 'wipeOut';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'exiting';

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('wipe-start', {
        detail: { 
          direction: 'out', 
          wipeDirection: this.direction,
          duration: this.getEffectiveDuration() 
        },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      const totalDelay = this.delay * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('wipe-end', {
          detail: { 
            direction: 'out', 
            wipeDirection: this.direction,
            duration: this.getEffectiveDuration() 
          },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration + totalDelay);
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Toggle wipe state
   */
  public async toggleWipe(): Promise<void> {
    if (this.transitionState === 'idle') {
      return this.wipeOut();
    } else {
      return this.wipeIn();
    }
  }

  /**
   * Cross-wipe to new content
   */
  public async crossWipe(callback?: () => void): Promise<void> {
    await this.wipeOut();
    
    if (callback) {
      callback();
    }
    
    // Wait a frame for content to update
    await new Promise(resolve => requestAnimationFrame(() => resolve(void 0)));
    
    return this.wipeIn();
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
      <div class="wipe-container" part="container">
        ${this.showOverlay ? html`
          <div class="wipe-overlay" part="overlay" aria-hidden="true"></div>
        ` : ''}
        <div 
          class="wipe-content ${this.roundedCorners ? 'rounded' : ''}" 
          part="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-transition-wipe': AwTransitionWipe;
  }
}