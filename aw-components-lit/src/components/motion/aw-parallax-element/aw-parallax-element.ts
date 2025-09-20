import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ParallaxDirection = 'vertical' | 'horizontal' | 'both';
export type ParallaxTrigger = 'scroll' | 'inview' | 'hover' | 'custom';

/**
 * @description Element that creates parallax effects based on scroll position
 * @category animations
 * @element aw-parallax-element
 * 
 * @fires awParallaxChange - Fired when parallax position changes
 * @fires awParallaxComplete - Fired when animation completes
 * 
 * @slot - Content with parallax effect
 * @slot background - Background element for parallax
 * 
 * @cssproperty --aw-parallax-bg - Background color
 * @cssproperty --aw-parallax-accent - Accent color
 * @cssproperty --aw-parallax-height - Container height
 * @cssproperty --aw-parallax-clip-radius - Clip-path border radius
 * 
 * @example
 * ```html
 * <aw-parallax-element 
 *   offset_distance="100"
 *   direction="vertical"
 *   speed="0.5"
 *   enable_clip_path="true"
 *   scroll_offset_start="start end"
 *   scroll_offset_end="end end"
 *   use_grid_layout="true">
 *   <div slot="background">Background content</div>
 *   <div>Main content with parallax effect</div>
 * </aw-parallax-element>
 * ```
 */
@customElement('aw-parallax-element')
export class AwParallaxElement extends LitElement {
  static styles = css`
    :host {
      --aw-parallax-bg: var(--aw-color-background, #ffffff);
      --aw-parallax-accent: var(--aw-color-accent, #007bff);
      --aw-parallax-height: var(--aw-viewport-height, 100vh);
      --aw-parallax-clip-radius: var(--aw-border-radius, 1rem);
      
      display: block;
      position: relative;
      width: 100%;
      height: var(--aw-parallax-height);
    }

    .parallax-container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--aw-parallax-bg);
    }

    .parallax-container--clipped {
      clip-path: inset(1rem round var(--aw-parallax-clip-radius));
    }

    .parallax-container--hoverable {
      cursor: pointer;
    }

    .parallax-content {
      position: relative;
      z-index: 20;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
      padding: 4rem 2rem;
      width: 100%;
      align-items: start;
    }

    .parallax-content--simple {
      display: block;
      padding: 2rem;
    }

    .parallax-main {
      grid-column: 1 / 13;
    }

    @media (min-width: 768px) {
      .parallax-main {
        grid-column: 1 / 7;
      }
    }

    .parallax-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: var(--aw-parallax-accent);
      transition: transform 0.1s ease-out;
      will-change: transform;
    }

    .parallax-background--animating {
      transition: none;
    }

    /* Trigger element for intersection observer */
    .parallax-trigger {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
    }

    /* Debug mode */
    :host([debug]) .parallax-container {
      border: 2px dashed var(--aw-color-debug, #ff6b6b);
    }

    :host([debug]) .parallax-container::before {
      content: attr(data-debug-info);
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 107, 107, 0.9);
      color: white;
      padding: 4px 8px;
      font-size: 11px;
      border-radius: 4px;
      z-index: 1000;
      font-family: monospace;
      white-space: nowrap;
    }

    :host([debug]) .parallax-trigger {
      background: rgba(0, 255, 0, 0.2);
      opacity: 0.3;
      border: 1px dashed #00ff00;
    }

    :host([debug]) .parallax-background {
      opacity: 0.7;
      border: 2px solid var(--aw-color-debug, #ff6b6b);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .parallax-background {
        transform: none !important;
        transition: none !important;
      }
    }

    /* Focus styles for accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--aw-color-focus, #005fcc);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .parallax-content {
        padding: 2rem 1rem;
        gap: 0.5rem;
      }
      
      :host {
        --aw-parallax-height: 100svh;
      }
    }
  `;

  @property({ type: Number }) 
  offset_distance: number = 100; // Distance to move in pixels

  @property({ type: String }) 
  direction: ParallaxDirection = 'vertical';

  @property({ type: Number }) 
  speed: number = 0.5; // Parallax speed multiplier (0 = no movement, 1 = moves with scroll)

  @property({ type: String }) 
  trigger_type: ParallaxTrigger = 'scroll';

  @property({ type: Boolean }) 
  enable_clip_path: boolean = true;

  @property({ type: String }) 
  scroll_offset_start: string = 'start end';

  @property({ type: String }) 
  scroll_offset_end: string = 'end end';

  @property({ type: Number }) 
  intersection_threshold: number = 0.1;

  @property({ type: Boolean }) 
  use_grid_layout: boolean = true;

  @property({ type: Boolean }) 
  smooth_animation: boolean = true;

  @property({ type: Number }) 
  animation_delay: number = 0;

  @property({ type: Boolean }) 
  invert_direction: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  debug: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_active: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_in_view: boolean = false;

  @state()
  private _currentTransformX = 0;

  @state()
  private _currentTransformY = 0;

  @state()
  private _scrollProgress = 0;

  @state()
  private _isTriggered = false;

  private _intersectionObserver?: IntersectionObserver;
  private _animationFrame?: number;
  private _animationTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.trigger_type === 'scroll') {
      this._setupScrollAnimation();
    } else if (this.trigger_type === 'inview') {
      this._setupIntersectionObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupAnimations();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('trigger_type')) {
      this._cleanupAnimations();
      
      if (this.trigger_type === 'scroll') {
        this._setupScrollAnimation();
      } else if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      }
    }

    // Update debug info
    if (this.debug) {
      const container = this.shadowRoot?.querySelector('.parallax-container') as HTMLElement;
      if (container) {
        container.setAttribute('data-debug-info', 
          `Progress: ${(this._scrollProgress * 100).toFixed(1)}% | X: ${this._currentTransformX.toFixed(1)}px | Y: ${this._currentTransformY.toFixed(1)}px`
        );
      }
    }
  }

  private _setupScrollAnimation() {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (!this._animationFrame) {
          this._animationFrame = requestAnimationFrame(() => {
            this._updateScrollProgress();
            this._animationFrame = undefined;
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });

      // Initial update
      this._updateScrollProgress();
    }
  }

  private _updateScrollProgress() {
    const container = this.shadowRoot?.querySelector('.parallax-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress based on element position
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    let progress = 0;
    
    // Parse scroll offsets
    if (this.scroll_offset_start.includes('start') && this.scroll_offset_end.includes('end')) {
      // Element animation progresses as it scrolls through viewport
      const startOffset = windowHeight; // start end = element top at bottom of viewport
      const endOffset = -elementHeight; // end end = element bottom at top of viewport
      progress = Math.max(0, Math.min(1, (startOffset - elementTop) / (startOffset - endOffset)));
    } else {
      // Default behavior
      progress = Math.max(0, Math.min(1, 1 - (elementTop / windowHeight)));
    }

    this._scrollProgress = progress;
    this.is_in_view = progress > 0 && progress < 1;
    this._updateParallax(progress);
  }

  private _updateParallax(progress: number) {
    // Calculate transform values based on progress and settings
    let transformX = 0;
    let transformY = 0;
    
    const adjustedProgress = this.invert_direction ? 1 - progress : progress;
    const moveDistance = this.offset_distance * this.speed * adjustedProgress;

    switch (this.direction) {
      case 'vertical':
        transformY = -moveDistance; // Negative for upward movement
        break;
      case 'horizontal':
        transformX = moveDistance;
        break;
      case 'both':
        transformX = moveDistance * 0.5;
        transformY = -moveDistance * 0.5;
        break;
    }

    this._currentTransformX = transformX;
    this._currentTransformY = transformY;

    // Apply transform
    const background = this.shadowRoot?.querySelector('.parallax-background') as HTMLElement;
    if (background) {
      background.style.transform = `translate(${transformX}px, ${transformY}px)`;
    }

    // Update active state
    this.is_active = Math.abs(transformX) > 1 || Math.abs(transformY) > 1;

    // Dispatch change event
    const changeEvent = new CustomEvent('awParallaxChange', {
      detail: {
        transformX,
        transformY,
        progress,
        isActive: this.is_active,
        isInView: this.is_in_view
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEvent);
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.is_in_view = entry.isIntersecting;
          
          if (entry.isIntersecting && !this._isTriggered) {
            this._triggerParallax();
          }
        });
      },
      { threshold: this.intersection_threshold }
    );

    const trigger = this.shadowRoot?.querySelector('.parallax-trigger');
    if (trigger) {
      this._intersectionObserver.observe(trigger);
    }
  }

  private _triggerParallax() {
    if (this._isTriggered) return;

    this._isTriggered = true;
    
    if (this.animation_delay > 0) {
      this._animationTimeout = window.setTimeout(() => {
        this._animateParallax();
      }, this.animation_delay);
    } else {
      this._animateParallax();
    }
  }

  private _animateParallax() {
    // For intersection observer mode, animate to full effect
    this._updateParallax(1);
    
    const completeEvent = new CustomEvent('awParallaxComplete', {
      detail: {
        finalTransformX: this._currentTransformX,
        finalTransformY: this._currentTransformY,
        direction: this.direction
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(completeEvent);
  }

  private _handleTrigger() {
    if (this.trigger_type === 'hover' || this.trigger_type === 'custom') {
      this._triggerParallax();
    }
  }

  private _cleanupAnimations() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._updateScrollProgress.bind(this));
      window.removeEventListener('resize', this._updateScrollProgress.bind(this));
    }
    
    this._intersectionObserver?.disconnect();
    
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
    
    if (this._animationTimeout) {
      clearTimeout(this._animationTimeout);
      this._animationTimeout = undefined;
    }
  }

  /**
   * Public method to trigger parallax manually
   */
  public triggerParallax() {
    this._triggerParallax();
  }

  /**
   * Public method to reset the parallax effect
   */
  public reset() {
    this._isTriggered = false;
    this.is_active = false;
    this.is_in_view = false;
    this._currentTransformX = 0;
    this._currentTransformY = 0;
    this._scrollProgress = 0;
    
    const background = this.shadowRoot?.querySelector('.parallax-background') as HTMLElement;
    if (background) {
      background.style.transform = 'translate(0px, 0px)';
    }
  }

  /**
   * Public method to set progress manually
   */
  public setProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this._updateParallax(clampedProgress);
  }

  /**
   * Public method to get current values
   */
  public getCurrentValues() {
    return {
      transformX: this._currentTransformX,
      transformY: this._currentTransformY,
      progress: this._scrollProgress,
      isActive: this.is_active,
      isInView: this.is_in_view
    };
  }

  render() {
    const containerClasses = {
      'parallax-container': true,
      'parallax-container--clipped': this.enable_clip_path,
      'parallax-container--hoverable': this.trigger_type === 'hover'
    };

    const contentClasses = {
      'parallax-content': true,
      'parallax-content--simple': !this.use_grid_layout
    };

    const backgroundClasses = {
      'parallax-background': true,
      'parallax-background--animating': this.is_active && !this.smooth_animation
    };

    return html`
      ${this.trigger_type === 'inview' ? html`
        <div class="parallax-trigger"></div>
      ` : ''}
      
      <div 
        class=${classMap(containerClasses)}
        role="presentation"
        aria-label="Parallax effect container"
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && this.trigger_type === 'hover') {
            e.preventDefault();
            this._handleTrigger();
          }
        }}
        tabindex=${this.trigger_type === 'hover' ? '0' : '-1'}
      >
        <div class=${classMap(backgroundClasses)}>
          <slot name="background"></slot>
        </div>
        
        <div class=${classMap(contentClasses)}>
          <div class="parallax-main">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-parallax-element': AwParallaxElement;
  }
}