/**
 * @fileoverview Page transition orchestrator component for AW Components
 * Manages page transitions based on theme configuration and routing changes.
 * @version 1.0.0
 * @since 2024-12-19
 * @author AW Components Team
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Page transition types supported by the component
 */
export type TransitionType = 'fade' | 'wipe' | 'tilt' | 'tiltandwipe' | 'none';

/**
 * Route information interface for tracking navigation state
 */
export interface RouteInfo {
  /** Current route path */
  currentRoute: string;
  /** Destination route path */
  destRoute: string;
  /** Transition state */
  isTransitioning: boolean;
}

/**
 * AW Page Transition Component
 * 
 * A comprehensive page transition orchestrator that manages smooth transitions
 * between pages based on theme configuration. Supports multiple transition types
 * including fade, wipe, tilt, and combined effects.
 * 
 * @element aw-page-transition
 * 
 * @slot default - Content that will be transitioned
 * 
 * @csspart container - Main transition container
 * @csspart content - Content wrapper
 * 
 * @cssprop --transition-duration - Duration of transition animations (default: 0.6s)
 * @cssprop --transition-timing - Timing function for transitions (default: cubic-bezier(0.33, 1, 0.68, 1))
 * @cssprop --transition-overlay-bg - Background color for overlays (default: var(--background-color))
 * 
 * @example
 * ```html
 * <aw-page-transition 
 *   transition-type="fade"
 *   reduce-motion="false">
 *   <main>Page content here</main>
 * </aw-page-transition>
 * ```
 * 
 * @example With route detection
 * ```html
 * <aw-page-transition 
 *   transition-type="tiltandwipe"
 *   .routeInfo="${routeInfo}"
 *   auto-detect-routes="true">
 *   <router-outlet></router-outlet>
 * </aw-page-transition>
 * ```
 */
@customElement('aw-page-transition')
export class AwPageTransition extends LitElement {
  /** Component styles */
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .transition-container {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        perspective: 1000px;
        perspective-origin: top;
      }

      .content-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: all var(--transition-duration, 0.6s) var(--transition-timing, cubic-bezier(0.33, 1, 0.68, 1));
      }

      /* Accessibility support for reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .transition-container,
        .content-wrapper,
        ::slotted(*) {
          transition: none !important;
          animation: none !important;
          transform: none !important;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .transition-container {
          border: 1px solid;
        }
      }

      /* States */
      :host([transitioning]) .content-wrapper {
        pointer-events: none;
      }

      :host([transition-type="fade"]) .content-wrapper {
        opacity: 1;
      }

      :host([transition-type="fade"][transitioning]) .content-wrapper {
        opacity: 0;
      }

      :host([transition-type="tilt"]) .content-wrapper {
        transform-origin: bottom right 60px;
      }

      :host([transition-type="tilt"][transitioning]) .content-wrapper {
        transform: rotateX(6.2216deg) translateY(-100px) scale(0.9);
        filter: blur(20px);
        opacity: 0;
      }

      :host([transition-type="wipe"]) .content-wrapper {
        clip-path: inset(0 0 0 0);
      }

      :host([transition-type="wipe"][transitioning]) .content-wrapper {
        clip-path: inset(100% 0 0 0);
      }
    `
  ];

  /**
   * Type of transition to apply
   * @attr transition-type
   */
  @property({ type: String, attribute: 'transition-type' })
  transitionType: TransitionType = 'none';

  /**
   * Whether to respect user's reduced motion preference
   * @attr reduce-motion
   */
  @property({ type: Boolean, attribute: 'reduce-motion' })
  reduceMotion: boolean = true;

  /**
   * Auto-detect route changes from browser history
   * @attr auto-detect-routes
   */
  @property({ type: Boolean, attribute: 'auto-detect-routes' })
  autoDetectRoutes: boolean = false;

  /**
   * Duration of transition in seconds
   * @attr transition-duration
   */
  @property({ type: Number, attribute: 'transition-duration' })
  transitionDuration: number = 0.6;

  /**
   * Custom timing function for transitions
   * @attr timing-function
   */
  @property({ type: String, attribute: 'timing-function' })
  timingFunction: string = 'cubic-bezier(0.33, 1, 0.68, 1)';

  /**
   * Route information for tracking navigation
   */
  @property({ type: Object })
  routeInfo?: RouteInfo;

  /**
   * Current transitioning state
   */
  @state()
  private isTransitioning: boolean = false;

  /**
   * Reduced motion preference from media query
   */
  @state()
  private prefersReducedMotion: boolean = false;

  /**
   * Current route for auto-detection
   */
  @state()
  private currentRoute: string = '';

  /**
   * Animation instances for cleanup
   */
  private activeAnimations: Animation[] = [];

  /**
   * Route change observer
   */
  private routeObserver?: MutationObserver;

  /**
   * Component lifecycle - Connected
   */
  connectedCallback(): void {
    super.connectedCallback();
    
    // Check reduced motion preference
    this.checkReducedMotionPreference();
    
    // Set up route detection if enabled
    if (this.autoDetectRoutes) {
      this.setupRouteDetection();
    }

    // Set up popstate listener for browser navigation
    window.addEventListener('popstate', this.handlePopState);
    
    // Set CSS custom properties
    this.style.setProperty('--transition-duration', `${this.transitionDuration}s`);
    this.style.setProperty('--transition-timing', this.timingFunction);
  }

  /**
   * Component lifecycle - Disconnected
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    
    // Cleanup animations
    this.cleanupAnimations();
    
    // Remove route observer
    if (this.routeObserver) {
      this.routeObserver.disconnect();
    }

    // Remove event listeners
    window.removeEventListener('popstate', this.handlePopState);
  }

  /**
   * Property change handler
   */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('transitionDuration')) {
      this.style.setProperty('--transition-duration', `${this.transitionDuration}s`);
    }

    if (changedProperties.has('timingFunction')) {
      this.style.setProperty('--transition-timing', this.timingFunction);
    }

    if (changedProperties.has('routeInfo') && this.routeInfo) {
      this.handleRouteChange(this.routeInfo);
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
   * Setup automatic route detection
   */
  private setupRouteDetection(): void {
    this.currentRoute = window.location.pathname;

    // Create mutation observer to detect DOM changes that might indicate route changes
    this.routeObserver = new MutationObserver(() => {
      const newRoute = window.location.pathname;
      if (newRoute !== this.currentRoute) {
        this.triggerTransition(this.currentRoute, newRoute);
        this.currentRoute = newRoute;
      }
    });

    // Observe document for route changes
    this.routeObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Handle browser back/forward navigation
   */
  private handlePopState = (): void => {
    const newRoute = window.location.pathname;
    if (newRoute !== this.currentRoute) {
      this.triggerTransition(this.currentRoute, newRoute);
      this.currentRoute = newRoute;
    }
  };

  /**
   * Handle route change from external source
   */
  private handleRouteChange(routeInfo: RouteInfo): void {
    if (routeInfo.isTransitioning && routeInfo.currentRoute !== routeInfo.destRoute) {
      this.triggerTransition(routeInfo.currentRoute, routeInfo.destRoute);
    }
  }

  /**
   * Trigger page transition
   */
  public triggerTransition(fromRoute: string, toRoute: string): Promise<void> {
    return new Promise((resolve) => {
      // Skip transition if reduced motion is preferred
      if ((this.reduceMotion && this.prefersReducedMotion) || this.transitionType === 'none') {
        resolve();
        return;
      }

      // Prevent multiple simultaneous transitions
      if (this.isTransitioning) {
        resolve();
        return;
      }

      this.isTransitioning = true;
      this.setAttribute('transitioning', '');

      // Dispatch transition start event
      this.dispatchEvent(new CustomEvent('transition-start', {
        detail: { fromRoute, toRoute, transitionType: this.transitionType },
        bubbles: true,
        composed: true
      }));

      // Apply transition based on type
      this.performTransition(fromRoute, toRoute).then(() => {
        this.isTransitioning = false;
        this.removeAttribute('transitioning');

        // Dispatch transition end event
        this.dispatchEvent(new CustomEvent('transition-end', {
          detail: { fromRoute, toRoute, transitionType: this.transitionType },
          bubbles: true,
          composed: true
        }));

        resolve();
      });
    });
  }

  /**
   * Perform the actual transition animation
   */
  private performTransition(fromRoute: string, toRoute: string): Promise<void> {
    return new Promise((resolve) => {
      const contentWrapper = this.shadowRoot?.querySelector('.content-wrapper') as HTMLElement;
      if (!contentWrapper) {
        resolve();
        return;
      }

      let animation: Animation;

      switch (this.transitionType) {
        case 'fade':
          animation = contentWrapper.animate([
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ], {
            duration: this.transitionDuration * 1000,
            easing: this.timingFunction
          });
          break;

        case 'wipe':
          animation = contentWrapper.animate([
            { clipPath: 'inset(0 0 0 0)' },
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0 0 0 0)' }
          ], {
            duration: this.transitionDuration * 1000,
            easing: this.timingFunction
          });
          break;

        case 'tilt':
          animation = contentWrapper.animate([
            { 
              transform: 'rotateX(0deg) translateY(0px) scale(1)',
              filter: 'blur(0px)',
              opacity: 1
            },
            { 
              transform: 'rotateX(6.2216deg) translateY(-100px) scale(0.9)',
              filter: 'blur(20px)',
              opacity: 0
            },
            { 
              transform: 'rotateX(0deg) translateY(0px) scale(1)',
              filter: 'blur(0px)',
              opacity: 1
            }
          ], {
            duration: this.transitionDuration * 1000,
            easing: this.timingFunction
          });
          break;

        case 'tiltandwipe':
          // Combine tilt and wipe effects
          const tiltAnimation = contentWrapper.animate([
            { 
              transform: 'rotateX(0deg) translateY(0px) scale(1)',
              filter: 'blur(0px)',
              opacity: 1
            },
            { 
              transform: 'rotateX(6.2216deg) translateY(-100px) scale(0.9)',
              filter: 'blur(20px)',
              opacity: 0
            },
            { 
              transform: 'rotateX(0deg) translateY(0px) scale(1)',
              filter: 'blur(0px)',
              opacity: 1
            }
          ], {
            duration: this.transitionDuration * 1000,
            easing: this.timingFunction
          });

          const wipeAnimation = contentWrapper.animate([
            { clipPath: 'inset(0 0 0 0)' },
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0 0 0 0)' }
          ], {
            duration: this.transitionDuration * 1000,
            easing: this.timingFunction,
            delay: this.transitionDuration * 300 // Slight delay for combined effect
          });

          this.activeAnimations.push(tiltAnimation, wipeAnimation);
          animation = tiltAnimation; // Use tilt as primary for finish event
          break;

        default:
          resolve();
          return;
      }

      this.activeAnimations.push(animation);

      animation.addEventListener('finish', () => {
        this.cleanupAnimations();
        resolve();
      });
    });
  }

  /**
   * Cleanup active animations
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
      <div class="transition-container" part="container">
        <div class="content-wrapper" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-page-transition': AwPageTransition;
  }
}