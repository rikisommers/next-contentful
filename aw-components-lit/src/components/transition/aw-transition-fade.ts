/**
 * @fileoverview Fade transition component for AW Components
 * Provides smooth fade in/out transitions with overlay support.
 * @version 1.0.0
 * @since 2024-12-19
 * @author AW Components Team
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Transition state enumeration
 */
export type FadeTransitionState = 'idle' | 'entering' | 'exiting';

/**
 * AW Fade Transition Component
 * 
 * A smooth fade transition component that handles entrance and exit animations
 * with optional overlay effects. Supports accessibility features and performance
 * optimizations.
 * 
 * @element aw-transition-fade
 * 
 * @slot default - Content to be transitioned
 * 
 * @csspart container - Main transition container
 * @csspart overlay - Overlay element for background transitions
 * @csspart content - Content wrapper
 * 
 * @cssprop --fade-duration - Duration of fade animation (default: 0.3s)
 * @cssprop --fade-timing - Timing function for fade (default: cubic-bezier(0.33, 1, 0.68, 1))
 * @cssprop --fade-overlay-bg - Background color for overlay (default: var(--background-color))
 * @cssprop --fade-overlay-opacity - Maximum opacity of overlay (default: 1)
 * 
 * @example
 * ```html
 * <aw-transition-fade 
 *   show-overlay="true"
 *   duration="0.5"
 *   auto-start="true">
 *   <div>Content to fade</div>
 * </aw-transition-fade>
 * ```
 * 
 * @example Programmatic control
 * ```html
 * <aw-transition-fade id="fadeTransition">
 *   <img src="image.jpg" alt="Transition image">
 * </aw-transition-fade>
 * 
 * <script>
 *   const transition = document.getElementById('fadeTransition');
 *   await transition.fadeOut();
 *   // Change content...
 *   await transition.fadeIn();
 * </script>
 * ```
 */
@customElement('aw-transition-fade')
export class AwTransitionFade extends LitElement {
  /** Component styles */
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
      }

      .fade-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .fade-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        pointer-events: none;
        background-color: var(--fade-overlay-bg, var(--background-color, #000));
        opacity: 0;
        transition: opacity var(--fade-duration, 0.3s) var(--fade-timing, cubic-bezier(0.33, 1, 0.68, 1));
        will-change: opacity;
      }

      .fade-content {
        position: relative;
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: opacity var(--fade-duration, 0.3s) var(--fade-timing, cubic-bezier(0.33, 1, 0.68, 1));
        will-change: opacity;
      }

      /* Transition states */
      :host([state="entering"]) .fade-overlay {
        opacity: var(--fade-overlay-opacity, 1);
      }

      :host([state="entering"]) .fade-content {
        opacity: 0;
      }

      :host([state="exiting"]) .fade-overlay {
        opacity: var(--fade-overlay-opacity, 1);
      }

      :host([state="exiting"]) .fade-content {
        opacity: 0;
      }

      /* Accessibility - Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        .fade-overlay,
        .fade-content {
          transition: none !important;
          animation: none !important;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .fade-overlay {
          border: 2px solid;
        }
      }

      /* Focus management during transitions */
      :host([state="entering"]) .fade-content,
      :host([state="exiting"]) .fade-content {
        pointer-events: none;
      }

      /* Performance optimizations */
      .fade-overlay,
      .fade-content {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `
  ];

  /**
   * Whether to show overlay during transition
   * @attr show-overlay
   */
  @property({ type: Boolean, attribute: 'show-overlay' })
  showOverlay: boolean = true;

  /**
   * Duration of fade animation in seconds
   * @attr duration
   */
  @property({ type: Number })
  duration: number = 0.3;

  /**
   * Delay before starting transition in seconds
   * @attr delay
   */
  @property({ type: Number })
  delay: number = 0;

  /**
   * Custom timing function for animation
   * @attr timing-function
   */
  @property({ type: String, attribute: 'timing-function' })
  timingFunction: string = 'cubic-bezier(0.33, 1, 0.68, 1)';

  /**
   * Whether to automatically start transition on connect
   * @attr auto-start
   */
  @property({ type: Boolean, attribute: 'auto-start' })
  autoStart: boolean = false;

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
   * Current transition state
   */
  @state()
  private transitionState: FadeTransitionState = 'idle';

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
    
    // Check reduced motion preference
    this.checkReducedMotionPreference();
    
    // Auto-start if enabled
    if (this.autoStart) {
      setTimeout(() => {
        this.fadeIn();
      }, 0);
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
      this.style.setProperty('--fade-duration', `${this.duration}s`);
    }

    if (changedProperties.has('timingFunction')) {
      this.style.setProperty('--fade-timing', this.timingFunction);
    }

    if (changedProperties.has('overlayBackground') && this.overlayBackground) {
      this.style.setProperty('--fade-overlay-bg', this.overlayBackground);
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
   * Fade in animation
   */
  public async fadeIn(): Promise<void> {
    const transitionId = 'fadeIn';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'entering';
      this.setAttribute('state', 'entering');

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('fade-start', {
        detail: { direction: 'in', duration: this.getEffectiveDuration() },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        this.removeAttribute('state');
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('fade-end', {
          detail: { direction: 'in', duration: this.getEffectiveDuration() },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration + (this.delay * 1000));
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Fade out animation
   */
  public async fadeOut(): Promise<void> {
    const transitionId = 'fadeOut';
    
    // Return existing promise if already running
    if (this.transitionPromises.has(transitionId)) {
      return this.transitionPromises.get(transitionId)!;
    }

    const promise = new Promise<void>((resolve) => {
      this.transitionState = 'exiting';
      this.setAttribute('state', 'exiting');

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('fade-start', {
        detail: { direction: 'out', duration: this.getEffectiveDuration() },
        bubbles: true,
        composed: true
      }));

      const effectiveDuration = this.getEffectiveDuration() * 1000;
      
      setTimeout(() => {
        this.transitionState = 'idle';
        this.removeAttribute('state');
        
        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('fade-end', {
          detail: { direction: 'out', duration: this.getEffectiveDuration() },
          bubbles: true,
          composed: true
        }));

        this.transitionPromises.delete(transitionId);
        resolve();
      }, effectiveDuration + (this.delay * 1000));
    });

    this.transitionPromises.set(transitionId, promise);
    return promise;
  }

  /**
   * Toggle fade state
   */
  public async toggleFade(): Promise<void> {
    if (this.transitionState === 'idle') {
      return this.fadeOut();
    } else {
      return this.fadeIn();
    }
  }

  /**
   * Crossfade to new content
   */
  public async crossFade(callback?: () => void): Promise<void> {
    await this.fadeOut();
    
    if (callback) {
      callback();
    }
    
    // Wait a frame for content to update
    await new Promise(resolve => requestAnimationFrame(() => resolve(void 0)));
    
    return this.fadeIn();
  }

  /**
   * Reset transition to initial state
   */
  public reset(): void {
    this.cleanupAnimations();
    this.transitionPromises.clear();
    this.transitionState = 'idle';
    this.removeAttribute('state');
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
      <div class="fade-container" part="container">
        ${this.showOverlay ? html`
          <div class="fade-overlay" part="overlay" aria-hidden="true"></div>
        ` : ''}
        <div class="fade-content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-transition-fade': AwTransitionFade;
  }
}